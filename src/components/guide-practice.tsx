import { useState } from "react";
import { QuestionIllustration } from "@/components/site";
import type { Question } from "@/lib/exam";
import { GUIDE_CASE_ANALYSIS } from "@/lib/guide-case-analysis";
import {
  diagnosticBreakdown,
  diagnosticQuestions,
  recommendedFocus,
  SUBJECT_LESSONS,
  type Diagnostic,
  type GuideTopic,
  type GuideTrack,
} from "@/lib/study-guide";

export function QuestionChoices({
  question,
  answer,
  onAnswer,
  disabled = false,
}: {
  question: Question;
  answer: string | undefined;
  onAnswer: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset className="guide-choices" disabled={disabled}>
      <legend className="sr-only">Pilih jawaban</legend>
      {question.options.map((option) => (
        <label key={option.label} className={answer === option.label ? "is-selected" : ""}>
          <input
            type="radio"
            name={`guide-${question.id}`}
            value={option.label}
            checked={answer === option.label}
            onChange={() => onAnswer(option.label)}
          />
          <span className="guide-option-letter" aria-hidden="true">
            {option.label}
          </span>
          <span>{option.text}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function WorkedQuestion({
  question,
  onSave,
}: {
  question: Question;
  onSave: (q: Question) => void;
}) {
  const [answer, setAnswer] = useState<string>();
  const [checked, setChecked] = useState(false);
  return (
    <div className="guide-worked">
      <p className="guide-eyebrow">
        {question.subject} · {question.difficulty}
      </p>
      <h4 className="mt-2 text-base font-bold leading-7">{question.prompt}</h4>
      <QuestionIllustration question={question} />
      <QuestionChoices
        question={question}
        answer={answer}
        disabled={checked}
        onAnswer={setAnswer}
      />
      {!checked ? (
        <button
          className="guide-btn guide-btn-blue"
          disabled={!answer}
          onClick={() => setChecked(true)}
        >
          Periksa jawaban
        </button>
      ) : (
        <>
          <div
            className={`guide-feedback ${answer === question.answer ? "is-correct" : "is-review"}`}
            role="status"
          >
            <strong>
              {answer === question.answer
                ? "Jawaban sesuai kunci."
                : `Perlu ditinjau. Jawaban Anda ${answer}; kunci ${question.answer}.`}
            </strong>
            <p className="mt-2 leading-7">{question.explanation}</p>
            <p className="mt-2 text-sm leading-6">
              <strong>Cara menalar:</strong> {question.tip}
            </p>
          </div>
          {GUIDE_CASE_ANALYSIS[question.id] && (
            <details className="guide-detail">
              <summary>
                Bandingkan alasan setiap pilihan<span aria-hidden="true">+</span>
              </summary>
              <ol className="space-y-4 pb-5">
                {question.options.map((option) => (
                  <li key={option.label} className="leading-7">
                    <strong>
                      Opsi {option.label}
                      {option.label === question.answer ? " (kunci)" : ""}:
                    </strong>{" "}
                    {GUIDE_CASE_ANALYSIS[question.id]![option.label]}
                  </li>
                ))}
              </ol>
            </details>
          )}
          <div className="guide-actions">
            <button className="guide-btn guide-btn-amber" onClick={() => onSave(question)}>
              Catat di jurnal kesalahan
            </button>
            <button
              className="guide-btn guide-btn-neutral"
              onClick={() => {
                setAnswer(undefined);
                setChecked(false);
              }}
            >
              Kerjakan ulang
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function TopicReader({
  topic,
  questions,
  onSave,
  onDone,
}: {
  topic: GuideTopic;
  questions: Question[];
  onSave: (q: Question) => void;
  onDone: () => void;
}) {
  const lesson = SUBJECT_LESSONS[topic.subject];
  return (
    <section
      className="guide-panel guide-reader"
      id="materi-terpilih"
      aria-labelledby="guide-reader-title"
    >
      <p className="guide-eyebrow">Materi terbuka · {topic.subject}</p>
      <h3 id="guide-reader-title" className="guide-subtitle" tabIndex={-1}>
        {topic.title}
      </h3>
      <p className="guide-muted mt-2">{topic.description}</p>
      <div className="guide-lesson-grid">
        <div>
          <h4 className="font-bold">Konsep yang perlu dipahami</h4>
          <p className="mt-3 leading-7">{lesson.principle}</p>
          <h4 className="mt-6 font-bold">Langkah pengerjaan</h4>
          <ol className="guide-step-list">
            {lesson.steps.map((step, i) => (
              <li key={step}>
                <span>{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <aside className="guide-note">
          <h4 className="font-bold">Kesalahan yang sering mengecoh</h4>
          <ul className="mt-3 list-disc space-y-3 pl-5 leading-7">
            {lesson.traps.map((trap) => (
              <li key={trap}>{trap}</li>
            ))}
          </ul>
          <p className="mt-5 border-t border-current/20 pt-4 text-sm leading-6">{lesson.review}</p>
        </aside>
      </div>
      <div className="mt-6 border-t border-border pt-6" id="guide-topic-practice">
        <h4 className="font-bold" tabIndex={-1} id="guide-topic-practice-heading">
          Latihan topik · {questions.length} soal dengan pembahasan
        </h4>
        <p className="guide-muted mt-2 text-sm">
          Jawab sebelum membuka penjelasan. Catat soal yang perlu dipelajari kembali.
        </p>
        {questions.map((q, i) => (
          <details className="guide-detail" key={q.id}>
            <summary>
              Soal {i + 1} · {q.difficulty}
              <span aria-hidden="true">+</span>
            </summary>
            <WorkedQuestion question={q} onSave={onSave} />
          </details>
        ))}
      </div>
      <button className="guide-btn guide-btn-green mt-6" onClick={onDone}>
        Tandai topik sudah dipelajari
      </button>
      <p className="guide-muted mt-2 text-xs">
        Status ini adalah catatan pribadi, bukan sertifikasi penguasaan materi.
      </p>
      <a className="guide-text-link mt-3" href="#peta-materi">
        Kembali ke peta materi
      </a>
    </section>
  );
}

export function DiagnosticTest({
  track,
  latest,
  onFinish,
  onRunning,
  onUseFocus,
}: {
  track: GuideTrack;
  latest: Diagnostic | undefined;
  onFinish: (result: Diagnostic) => void;
  onRunning: (running: boolean) => void;
  onUseFocus: (focus: ReturnType<typeof recommendedFocus>) => void;
}) {
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState(0);
  const questions = diagnosticQuestions(track);
  const q = questions[index]!;
  function start() {
    setAnswers({});
    setIndex(0);
    setStartedAt(Date.now());
    setRunning(true);
    onRunning(true);
  }
  function finish() {
    const endedAt = Date.now();
    onFinish({
      id: `diagnostic-${endedAt}`,
      track,
      endedAt,
      seconds: Math.max(1, Math.round((endedAt - startedAt) / 1000)),
      questionIds: questions.map((q) => q.id),
      answers,
    });
    setRunning(false);
    onRunning(false);
  }
  return (
    <section className="guide-panel" id="tes-awal" aria-labelledby="guide-test-title">
      <div className="guide-section-heading">
        <div>
          <p className="guide-eyebrow">Kenali titik awal</p>
          <h2 className="guide-title" id="guide-test-title">
            Tes pemetaan singkat
          </h2>
        </div>
        <span className="guide-tag">9 soal · tanpa batas waktu</span>
      </div>
      <p className="guide-muted mt-3">
        Tiga soal per kategori untuk memilih fokus awal. Hasil sampel singkat ini bukan ukuran
        kelulusan; lanjutkan evaluasi lewat latihan yang lebih panjang.
      </p>
      {!running && (
        <div className="guide-actions mt-5">
          <button className="guide-btn guide-btn-blue" onClick={start}>
            {latest ? "Ulangi tes pemetaan" : `Mulai tes ${track.toUpperCase()}`}
          </button>
          <span className="guide-muted text-sm">Waktu pengerjaan dicatat setelah tes dimulai.</span>
        </div>
      )}
      {running && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-bold" role="status">
              Soal {index + 1} / {questions.length} · {q.subject}
            </span>
            <span className="guide-muted text-sm">{Object.keys(answers).length} sudah dijawab</span>
          </div>
          <progress
            className="guide-progress mt-3"
            value={Object.keys(answers).length}
            max={questions.length}
            aria-label="Progres jawaban tes pemetaan"
          />
          <h3 className="mt-5 text-lg font-bold leading-8" tabIndex={-1}>
            {q.prompt}
          </h3>
          <QuestionChoices
            question={q}
            answer={answers[q.id]}
            onAnswer={(answer) => setAnswers({ ...answers, [q.id]: answer })}
          />
          <div className="guide-actions">
            <button
              className="guide-btn guide-btn-neutral"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              Sebelumnya
            </button>
            {index < questions.length - 1 ? (
              <button className="guide-btn guide-btn-blue" onClick={() => setIndex(index + 1)}>
                Soal berikutnya
              </button>
            ) : (
              <button
                className="guide-btn guide-btn-green"
                disabled={Object.keys(answers).length !== questions.length}
                onClick={finish}
              >
                Selesaikan dan lihat rekomendasi
              </button>
            )}
          </div>
          <p className="guide-muted mt-3 text-sm">
            Jawab seluruh soal untuk menyelesaikan tes. Pilihan jawaban dapat diubah sebelum
            selesai. Tes yang belum selesai belum disimpan.
          </p>
        </div>
      )}
      {!running && latest && (
        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-bold">Hasil pemetaan terakhir</h3>
          <p className="guide-muted mt-1 text-sm">
            {new Date(latest.endedAt).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB ·{" "}
            {Math.floor(latest.seconds / 60)} menit {latest.seconds % 60} detik
          </p>
          <div className="guide-diagnostic-results">
            {diagnosticBreakdown(latest).map((row) => (
              <div key={row.subject}>
                <div className="flex items-center justify-between gap-3">
                  <strong>{row.subject}</strong>
                  <span>
                    {row.correct}/{row.total} benar
                  </span>
                </div>
                <progress
                  className="guide-progress mt-3"
                  value={row.correct}
                  max={row.total}
                  aria-label={`Ketepatan ${row.subject}`}
                />
              </div>
            ))}
          </div>
          <p className="leading-7">
            <strong>
              Fokus berikutnya:{" "}
              {recommendedFocus(latest) === "balanced"
                ? "latihan seimbang"
                : recommendedFocus(latest)}
              .
            </strong>{" "}
            Perdalam alasan setiap jawaban, lalu cek apakah kesalahan yang sama muncul pada paket
            lain.
          </p>
          <button
            className="guide-btn guide-btn-green mt-4"
            onClick={() => onUseFocus(recommendedFocus(latest))}
          >
            Gunakan rekomendasi di rencana belajar
          </button>
          <details className="guide-detail mt-5">
            <summary>
              Tinjau jawaban dan alasan<span aria-hidden="true">+</span>
            </summary>
            <div className="space-y-5 p-4">
              {questions.map((question, i) => (
                <div key={question.id} className="border-b border-border pb-5 last:border-0">
                  <h4 className="font-bold leading-7">
                    {i + 1}. {question.prompt}
                  </h4>
                  <p className="my-2 text-sm">
                    Jawaban Anda: {latest.answers[question.id] ?? "Belum dijawab"} · Kunci:{" "}
                    {question.answer}
                  </p>
                  <p className="leading-7">{question.explanation}</p>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </section>
  );
}
