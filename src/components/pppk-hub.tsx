import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { CATSimulator } from "@/components/site";
import { Button } from "@/components/ui/button";
import { QUESTION_BANK, type Subject } from "@/lib/exam";
import { SUBJECT_LESSONS } from "@/lib/study-guide";

const subjects = [
  {
    name: "Manajerial",
    icon: Users,
    description: "Prioritas kerja, kolaborasi tim, dan evaluasi keputusan.",
    color: "border-blue-700 bg-blue-700 text-white",
  },
  {
    name: "Sosial Kultural",
    icon: BookOpen,
    description: "Komunikasi, keberagaman, dan layanan yang inklusif.",
    color: "border-violet-700 bg-violet-700 text-white",
  },
  {
    name: "Teknis",
    icon: ShieldCheck,
    description: "Ketelitian data dan proses administrasi umum.",
    color: "border-emerald-700 bg-emerald-700 text-white",
  },
] as const;
const bank = QUESTION_BANK.filter((q) => subjects.some((s) => s.name === q.subject));

export function PPPKHub() {
  const [simulator, setSimulator] = useState(false);
  const [subject, setSubject] = useState<Subject>("Manajerial");
  const [hots, setHots] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const questions = bank.filter((q) => q.subject === subject && (!hots || q.difficulty === "HOTS"));
  const question = questions[index];
  const completed = bank.filter((q) => checked[q.id]);
  const correct = completed.filter((q) => answers[q.id] === q.answer).length;
  const lesson = SUBJECT_LESSONS[subject];
  return (
    <main className="w-full space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {simulator ? (
        <>
          <Button variant="outline" className="min-h-11" onClick={() => setSimulator(false)}>
            Kembali ke materi PPPK
          </Button>
          <CATSimulator initialTrack="pppk" />
        </>
      ) : (
        <>
          <header className="grid gap-6 rounded-xl border border-border bg-card p-5 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold text-primary">Ruang belajar PPPK · Tanpa akun</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Pahami kasus. Latih keputusan Anda.
              </h1>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                Pelajari tiga kelompok kompetensi, coba soal dengan pembahasan langsung, lalu
                lanjutkan ke simulasi bertimer.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button className="min-h-12" onClick={() => setSimulator(true)}>
                  Buka 20 paket simulasi <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button asChild variant="outline" className="min-h-12">
                  <a href="#latihan-pppk">Mulai latihan singkat</a>
                </Button>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 rounded-xl bg-secondary p-5 text-center">
              {[
                [bank.length, "soal latihan"],
                [bank.filter((q) => q.difficulty === "HOTS").length, "soal HOTS"],
                [3, "kompetensi"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-2 text-2xl font-bold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </header>
          <div
            className="grid gap-3 sm:grid-cols-3"
            role="group"
            aria-label="Pilih kompetensi PPPK"
          >
            {subjects.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={subject === item.name}
                onClick={() => {
                  setSubject(item.name);
                  setIndex(0);
                }}
                className={`rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${subject === item.name ? item.color : "border-border bg-card hover:bg-secondary"}`}
              >
                <item.icon size={24} aria-hidden="true" />
                <span className="mt-3 block text-lg font-bold">
                  {item.name}
                  {subject === item.name ? " · Dipilih" : ""}
                </span>
                <span className="mt-2 block text-sm leading-6">{item.description}</span>
                <span className="mt-3 block text-xs font-semibold">
                  {bank.filter((q) => q.subject === item.name).length} soal tersedia
                </span>
              </button>
            ))}
          </div>
          <div
            id="latihan-pppk"
            className="grid scroll-mt-24 items-start gap-6 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]"
          >
            <aside className="space-y-4">
              <section className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-bold">Cara menalar {subject}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{lesson.principle}</p>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6">
                  {lesson.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
              <section className="rounded-xl border border-border bg-card p-5" aria-live="polite">
                <h2 className="font-bold">Progres latihan singkat</h2>
                <p className="mt-3 text-2xl font-bold tabular-nums">
                  {correct} / {completed.length} benar
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Dari soal yang sudah diperiksa. Progres ini berlaku selama halaman terbuka; hasil
                  simulasi disimpan di browser.
                </p>
              </section>
              <Button asChild variant="outline" className="min-h-12 w-full">
                <Link to="/panduan">Susun rencana belajar</Link>
              </Button>
            </aside>
            <section
              className="min-w-0 rounded-xl border border-border bg-card p-5 sm:p-7"
              aria-labelledby="pppk-practice-title"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="pppk-practice-title" className="text-xl font-bold">
                  Latihan {subject}
                </h2>
                <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={hots}
                    onChange={(event) => {
                      setHots(event.target.checked);
                      setIndex(0);
                    }}
                    className="size-4"
                  />
                  HOTS saja
                </label>
              </div>
              {question ? (
                <div key={question.id}>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    Soal {index + 1} dari {questions.length} · {question.difficulty}
                  </p>
                  <fieldset disabled={checked[question.id]} className="mt-4">
                    <legend className="mb-5 max-w-4xl text-lg font-semibold leading-8">
                      {question.prompt}
                    </legend>
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option.label}
                          className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border p-4 leading-7 focus-within:ring-2 focus-within:ring-ring ${answers[question.id] === option.label ? "border-primary bg-secondary" : "border-border"}`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.label}
                            checked={answers[question.id] === option.label}
                            onChange={() =>
                              setAnswers((value) => ({ ...value, [question.id]: option.label }))
                            }
                            className="mt-1.5 shrink-0"
                          />
                          <span>
                            <strong>{option.label}.</strong> {option.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {checked[question.id] ? (
                    <div
                      className="mt-5 rounded-lg border border-border bg-secondary p-4"
                      role="status"
                    >
                      <strong>
                        {answers[question.id] === question.answer
                          ? "Jawaban sesuai kunci."
                          : `Perlu ditinjau. Kunci jawaban: ${question.answer}.`}
                      </strong>
                      <p className="mt-2 leading-7">{question.explanation}</p>
                      <p className="mt-3 text-sm leading-6">
                        <strong>Tips:</strong> {question.tip}
                      </p>
                    </div>
                  ) : (
                    <Button
                      className="mt-5 min-h-12 bg-emerald-700 text-white hover:bg-emerald-800"
                      disabled={!answers[question.id]}
                      onClick={() => setChecked((value) => ({ ...value, [question.id]: true }))}
                    >
                      Periksa jawaban
                    </Button>
                  )}
                  <nav
                    aria-label="Navigasi latihan PPPK"
                    className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5"
                  >
                    <Button
                      variant="outline"
                      className="min-h-11"
                      disabled={index === 0}
                      onClick={() => setIndex((value) => value - 1)}
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      className="min-h-11"
                      disabled={index === questions.length - 1}
                      onClick={() => setIndex((value) => value + 1)}
                    >
                      Soal berikutnya
                    </Button>
                  </nav>
                </div>
              ) : (
                <p className="mt-5" role="status">
                  Belum ada soal pada filter ini. Matikan filter HOTS untuk melihat semua soal.
                </p>
              )}
            </section>
          </div>
          <section className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:p-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold">Siapkan latihan yang sesuai jabatan</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Materi teknis di sini mencakup administrasi umum. Untuk kompetensi khusus jabatan,
                cocokkan materi dengan pengumuman instansi. Paket latihan memakai 110 soal dan 100
                menit sebagai konfigurasi latihan independen.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold">Langkah belajar berikutnya</h2>
              <ul className="mt-3 space-y-3 text-sm leading-6">
                <li>Tinjau alasan jawaban yang belum sesuai.</li>
                <li>Aktifkan filter HOTS untuk latihan analisis kasus.</li>
                <li>Coba simulasi bertimer setelah mengenali pola materi.</li>
              </ul>
              <a
                href="https://sscasn.bkn.go.id/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline"
              >
                Buka portal resmi SSCASN
              </a>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
