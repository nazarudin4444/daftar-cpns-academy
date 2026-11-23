import { useState } from "react";
import { Check, BookOpen } from "lucide-react";
import type { Question } from "@/lib/exam";
import { QuestionIllustration } from "@/components/question-illustration";

export function BankQuestionCard({ question, number }: { question: Question; number: number }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState(false);
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-base font-bold tabular-nums text-primary-foreground">
            {String(number).padStart(2, "0")}
          </span>
          <div>
            <p className="font-semibold text-foreground">Latihan {question.subject}</p>
            <p className="text-xs text-muted-foreground">
              {question.diagram ? "Penalaran bergambar" : "Latihan pemahaman"}
            </p>
          </div>
        </div>
        <span className="rounded-md border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
            {question.difficulty === "HOTS" ? "HOTS · Penalaran" : "Latihan"}
        </span>
      </header>
      <div className="p-5 sm:p-7">
        <h4 className="max-w-4xl text-base font-medium leading-8 text-foreground sm:text-lg">
          {question.prompt}
        </h4>
        <div
          className={
            question.diagram
              ? "mt-3 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(260px,1fr)] xl:gap-8"
              : "mt-5"
          }
        >
          {question.diagram && (
            <div className="min-w-0">
              <QuestionIllustration question={question} />
            </div>
          )}
          <div className="min-w-0 py-4">
            <fieldset>
              <legend className="text-sm font-semibold text-foreground">Pilih jawaban Anda</legend>
              <p className="mb-4 mt-1 text-xs leading-5 text-muted-foreground">
                Coba jawab sebelum membuka pembahasan.
              </p>
              <div className="space-y-2.5">
                {question.options.map((option) => {
                  const active = selected === option.label;
                  return (
                    <label
                      key={option.label}
                      className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors motion-reduce:transition-none ${active ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/60 hover:bg-secondary/60"}`}
                    >
                      <input
                        type="radio"
                        name={`answer-${question.id}`}
                        value={option.label}
                        checked={active}
                        onChange={() => {
                          setSelected(option.label);
                          setReviewed(false);
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg border text-sm font-bold peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
                      >
                        {option.label}
                      </span>
                      <span className="flex-1 text-sm font-medium leading-6 text-foreground">
                        {option.text}
                      </span>
                      {active && (
                        <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <button
              type="button"
              disabled={!selected}
              onClick={() => setReviewed(true)}
              className="mt-5 min-h-12 w-full cursor-pointer rounded-xl bg-primary px-4 font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Periksa jawaban
            </button>
            {reviewed && (
              <p
                role="status"
                className="mt-3 rounded-lg border border-border bg-secondary p-3 text-sm leading-6 text-foreground"
              >
                {selected === question.answer
                  ? "Jawaban Anda benar."
                  : `Jawaban Anda ${selected}. Jawaban yang benar adalah ${question.answer}.`}{" "}
                Baca pembahasan untuk memahami alasannya.
              </p>
            )}
          </div>
        </div>
        <details
          className="group mt-4 rounded-xl border border-border bg-secondary/40"
          open={reviewed || undefined}
        >
          <summary className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <BookOpen aria-hidden="true" className="size-4 text-primary" />
            Lihat kunci dan pembahasan
            <span aria-hidden="true" className="ml-auto text-primary group-open:hidden">
              +
            </span>
          </summary>
          <div className="space-y-4 border-t border-border p-4 sm:p-5">
            <p className="leading-7 text-foreground">
              <strong>Jawaban {question.answer}.</strong> {question.explanation}
            </p>
            <p className="border-l-2 border-primary pl-4 text-sm leading-7 text-muted-foreground">
              <strong className="text-foreground">Cara mengerjakan</strong>
              <br />
              {question.tip}
            </p>
          </div>
        </details>
      </div>
    </article>
  );
}
