import { Link } from "@tanstack/react-router";
import { FIGURAL_TOPIC_LINKS } from "@/lib/figural-pages";
import { TIU_FIGURAL_HOTS_QUESTIONS } from "@/lib/exam-tiu-figural-hots";
import { BankQuestionCard } from "@/components/bank-question-card";

export function FiguralLinks({ currentSlug }: { currentSlug: string }) {
  return (
    <nav
      aria-label="Panduan TIU figural"
      className="rounded-xl border border-border bg-secondary/40 p-5"
    >
      <h2 className="text-lg font-bold">Pelajari soal TIU bergambar</h2>
      <ul className="mt-3 divide-y divide-border">
        {FIGURAL_TOPIC_LINKS.filter((item) => item.slug !== currentSlug).map((item) => (
          <li key={item.slug}>
            <Link
              to={`/${item.slug}`}
              className="flex min-h-11 items-center py-3 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function FiguralExamples({ slug }: { slug: string }) {
  const family = slug.includes("analogi")
    ? "analogi"
    : slug.includes("matriks")
      ? "matriks"
      : slug.includes("deret")
        ? "deret"
        : null;
  const questions = family
    ? TIU_FIGURAL_HOTS_QUESTIONS.filter((q) => q.id.includes(`-${family}-`)).slice(0, 2)
    : ["analogi", "matriks", "deret"].map((group) =>
        TIU_FIGURAL_HOTS_QUESTIONS.find((q) => q.id.includes(`-${group}-`))!,
      );
  return (
    <section className="space-y-5" aria-labelledby="figural-examples-title">
      <h2 id="figural-examples-title" className="text-xl font-bold">
        Contoh soal dan pembahasan
      </h2>
      <p className="leading-7 text-muted-foreground">
        Pilih jawaban berdasarkan gambar, lalu periksa pembahasannya. Semua contoh berikut merupakan
        latihan orisinal, bukan soal resmi seleksi.
      </p>
      {questions.map((question, index) => (
        <BankQuestionCard key={question.id} question={question} number={index + 1} />
      ))}
      <Link
        to="/soal-tiu"
        className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
      >
        Lanjutkan latihan TIU per subtopik
      </Link>
    </section>
  );
}
