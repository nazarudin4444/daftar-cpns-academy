import { describe, expect, it } from "vitest";
import {
  EXAM_PACKAGES,
  questionsForAttempt,
  questionsForPackage,
  scoreAttempt,
} from "@/lib/exam-packages";

describe("Identitas paket CAT", () => {
  it("menyediakan dua puluh identitas paket pada masing-masing jalur", () => {
    for (const track of ["cpns", "pppk"]) {
      const packages = EXAM_PACKAGES.filter((item) => item.track === track);
      expect(packages).toHaveLength(20);
      expect(new Set(packages.map((item) => item.id)).size).toBe(20);
      expect(
        packages.every(
          (item) => Object.values(item.composition).reduce((sum, count) => sum + count, 0) === 110,
        ),
      ).toBe(true);
    }
  });

  it("mempertahankan soal paket CPNS setelah waktu mulai berubah", () => {
    const selections = new Set<string>();
    for (const item of EXAM_PACKAGES.filter((item) => item.track === "cpns")) {
      const questions = questionsForPackage(item.id);
      expect(questions).toHaveLength(110);
      expect(new Set(questions.map((question) => question.id)).size).toBe(110);
      selections.add(
        questions
          .map((question) => question.id)
          .sort()
          .join(","),
      );
      const attempt = { track: item.track, packageId: item.id, startedAt: 100 };
      expect(questionsForAttempt({ ...attempt, startedAt: 200 })).toEqual(
        questionsForAttempt(attempt),
      );
      const answers = Object.fromEntries(
        questions.map((question) => [question.id, question.answer]),
      );
      expect(scoreAttempt(attempt, answers).correct).toBe(110);
      expect(scoreAttempt(attempt, {}).correct).toBe(0);
    }
    expect(selections.size).toBe(20);
  });

  it("menolak salah jalur dan bank yang belum cukup, tanpa menggandakan soal", () => {
    expect(() => questionsForAttempt({ track: "pppk", packageId: "cpns-paket-1" })).toThrow();
    expect(() => questionsForPackage("cpns-paket-1", [])).toThrow();
    expect(() => questionsForPackage("paket-tidak-ada")).toThrow();
  });
});
