import { ListTree } from "lucide-react";
import { PageHero, heroGhostLink, heroPrimaryLink } from "@/components/page-hero";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site";
import { CPNS_SUBJECT_CATALOG, questionsForSubchapter } from "@/lib/exam-catalog";
import type { Question } from "@/lib/exam";

export const Route = createFileRoute("/kisi-kisi-skd")({
  head: () => ({
    meta: [
      { title: "Kisi-kisi SKD TWK, TIU, TKP & Latihan Topik | Daftar CPNS" },
      {
        name: "description",
        content:
          "Pelajari ruang lingkup materi SKD dan kerjakan latihan per submateri dengan pembahasan.",
      },
    ],
    links: [{ rel: "canonical", href: "/kisi-kisi-skd" }],
  }),
  component: Syllabus,
});
const scope: Record<string, string[]> = {
  TWK: ["Nasionalisme", "Integritas", "Bela Negara", "Pilar Negara", "Bahasa Indonesia"],
  TIU: [
    "Verbal: analogi, silogisme, analitis",
    "Numerik: berhitung, deret, perbandingan, soal cerita",
    "Figural: analogi, ketidaksamaan, serial",
  ],
  TKP: [
    "Pelayanan Publik",
    "Jejaring Kerja",
    "Sosial Budaya",
    "TIK",
    "Profesionalisme",
    "Anti Radikalisme",
  ],
};
function Syllabus() {
  const [selected, setSelected] = useState<{ title: string; questions: Question[] } | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  return (
    <SiteShell>
      <PageHero
        eyebrow="Peta belajar SKD"
        icon={ListTree}
        title="Kisi-kisi dan latihan per submateri"
        description="Ruang lingkup acuan seleksi 2024. Latihan disusun untuk belajar mandiri dan bukan bocoran soal BKN. Bank soal belum mencakup seluruh rincian, termasuk figural bergambar."
      >
        {CPNS_SUBJECT_CATALOG.map((subject) => (
          <a key={subject.subject} href={`#materi-${subject.subject}`} className={heroGhostLink}>
            {subject.subject}
          </a>
        ))}
        <a
          className={heroPrimaryLink}
          href="https://apps-denpasar.bkn.go.id/kms/law%3Apermenpanrb_6_tahun_2024"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rujukan pengadaan ASN dari BKN
        </a>
      </PageHero>
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6">
        {CPNS_SUBJECT_CATALOG.map((subject) => (
          <section className="study-panel scroll-mt-28" id={`materi-${subject.subject}`} key={subject.subject}>
            <h2 className="text-2xl font-bold">{subject.subject}</h2>
            <ul className="my-4 list-disc space-y-1 pl-5 text-muted-foreground">
              {(scope[subject.subject] ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mb-3 font-bold">Topik latihan yang tersedia</h3>
            <div className="divide-y divide-border">
              {subject.chapters.map((chapter) => (
                <details key={chapter.id} className="py-3">
                  <summary className="flex min-h-11 cursor-pointer items-center rounded-lg px-2 py-2 font-semibold transition-colors hover:bg-secondary">{chapter.title}</summary>
                  {chapter.subchapters.map((sub) => {
                    const questions = questionsForSubchapter(sub.id).slice(0, 10);
                    return (
                      <div key={sub.id} className="mt-3 border-l-2 border-primary/30 pl-4">
                        <h4 className="font-semibold">{sub.title}</h4>
                        <p className="my-2 text-sm leading-6 text-muted-foreground">
                          {sub.description}
                        </p>
                        <button
                          type="button"
                          className="study-control"
                          disabled={!questions.length}
                          onClick={() => {
                            setSelected({ title: sub.title, questions });
                            setAnswers({});
                            setSubmitted(false);
                            requestAnimationFrame(() =>
                              document
                                .getElementById("topic-practice")
                                ?.scrollIntoView({ block: "start" }),
                            );
                          }}
                        >
                          Latihan {questions.length} Soal Topik Ini
                        </button>
                      </div>
                    );
                  })}
                </details>
              ))}
            </div>
          </section>
        ))}
        {selected && (
          <section id="topic-practice" className="study-panel scroll-mt-24">
            <h2 className="text-xl font-bold">{selected.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {selected.questions.length} soal · Pilih jawaban lalu periksa pembahasan.
            </p>
            {submitted && (
              <p role="status" className="study-output mt-4">
                {selected.questions.filter((q) => q.answer === answers[q.id]).length} /{" "}
                {selected.questions.length} sesuai kunci latihan.
              </p>
            )}
            <ol className="mt-5 space-y-6">
              {selected.questions.map((q, index) => (
                <li key={q.id}>
                  <fieldset disabled={submitted}>
                    <legend className="mb-3 font-semibold">
                      {index + 1}. {q.prompt}
                    </legend>
                    <div className="grid gap-2">
                      {q.options.map((o) => (
                        <label
                          className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3"
                          key={o.label}
                        >
                          <input
                            className="mt-1"
                            type="radio"
                            name={q.id}
                            checked={answers[q.id] === o.label}
                            onChange={() => setAnswers({ ...answers, [q.id]: o.label })}
                          />
                          <span>
                            {o.label}. {o.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {submitted && (
                    <p className="mt-3 leading-7 text-muted-foreground">
                      <strong>Kunci {q.answer}.</strong> {q.explanation}
                    </p>
                  )}
                </li>
              ))}
            </ol>
            <button
              className="study-control mt-5"
              type="button"
              disabled={submitted}
              onClick={() => setSubmitted(true)}
            >
              Periksa jawaban dan pembahasan
            </button>
            <button
              className="study-control ml-2 mt-5"
              type="button"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
            >
              Ulangi topik
            </button>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
