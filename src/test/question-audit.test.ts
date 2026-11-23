import { expect, it } from "vitest";
import { QUESTION_BANK } from "@/lib/exam";
import { EXAM_PACKAGES, questionsForPackage } from "@/lib/exam-packages";

it("memuat 1000 soal Kedinasan yang dapat dipakai pada 20 paket", () => {
  const bank = QUESTION_BANK.filter((q) => q.subject === "Kedinasan");
  expect(bank).toHaveLength(1000);
  expect(new Set(bank.map((q) => q.id)).size).toBe(1000);
  for (const q of bank) {
    expect(q.explanation?.length).toBeGreaterThan(20);
    expect(q.tip?.length).toBeGreaterThan(15);
    expect(new Set(q.options.map((o) => o.text)).size).toBe(5);
    expect(q.options.some((o) => o.label === q.answer)).toBe(true);
  }
  const packs = EXAM_PACKAGES.filter((p) => p.track === "kedinasan");
  expect(packs).toHaveLength(20);
  for (const p of packs) expect(new Set(questionsForPackage(p.id).map((q) => q.id)).size).toBe(30);
});

const questions = QUESTION_BANK.filter((q) => q.subject === "TIU");
it.each(Array.from({ length: Math.ceil(questions.length / 100) }, (_, index) => index))(
  "mengaudit struktur TIU dan SVG kelompok %i",
  (batch) => {
    for (const q of questions.slice(batch * 100, (batch + 1) * 100)) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.text)).size, q.id).toBe(5);
      expect(q.options.filter((o) => o.label === q.answer)).toHaveLength(1);
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(JSON.stringify(q)).not.toMatch(/NaN|undefined|Infinity/);
      if (q.diagram) {
        expect(
          new DOMParser()
            .parseFromString(q.diagram.svg, "image/svg+xml")
            .querySelector("parsererror"),
        ).toBeNull();
        expect(q.diagram.alt.length).toBeGreaterThan(15);
      }
    }
  },
);

it("memuat 1200 gambar TIU berbeda", () => {
  const diagrams = questions.flatMap((q) => (q.diagram ? [q.diagram.svg] : []));
  expect(diagrams).toHaveLength(1200);
  expect(new Set(diagrams).size).toBe(1200);
});
