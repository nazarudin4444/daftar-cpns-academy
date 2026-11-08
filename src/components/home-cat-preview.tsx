import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QUESTION_BANK } from "@/lib/exam";

const previewQuestion = QUESTION_BANK.find((question) => question.id === "tiu-10")!;

export function HomeCatPreview() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const isCorrect = selectedAnswer === previewQuestion.answer;

  return (
    <article className="border border-border bg-background p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <p className="text-sm font-bold text-primary">Contoh soal TIU</p>
          <p className="mt-1 text-xs text-muted-foreground">Pratinjau satu soal</p>
        </div>
        <span className="border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
          Latihan demo
        </span>
      </div>
      <fieldset className="mt-4">
        <legend className="font-semibold leading-7 text-foreground">
          {previewQuestion.prompt}
        </legend>
        <div className="mt-3 space-y-2">
          {previewQuestion.options.map((option) => (
            <label
              key={option.label}
              className={`flex min-h-11 cursor-pointer items-start gap-3 border p-3 text-sm leading-6 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary ${selectedAnswer === option.label ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
            >
              <input
                type="radio"
                name="home-cat-preview"
                value={option.label}
                checked={selectedAnswer === option.label}
                onChange={() => {
                  setSelectedAnswer(option.label);
                  setShowExplanation(false);
                }}
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <span>
                <strong>{option.label}.</strong> {option.text}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <Button
        type="button"
        className="mt-4 min-h-11"
        disabled={!selectedAnswer}
        onClick={() => setShowExplanation((visible) => !visible)}
      >
        {showExplanation ? "Tutup pembahasan" : "Periksa jawaban"}
      </Button>
      {showExplanation && selectedAnswer && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 border-l-2 border-primary bg-secondary p-4 text-sm leading-6"
        >
          <p className="font-bold text-foreground">
            {isCorrect ? "Jawaban Anda tepat." : `Jawaban yang tepat ${previewQuestion.answer}.`}
          </p>
          <p className="mt-2 text-muted-foreground">{previewQuestion.explanation}</p>
          <p className="mt-2 text-muted-foreground">
            <strong className="text-foreground">Tips:</strong> {previewQuestion.tip}
          </p>
        </div>
      )}
    </article>
  );
}
