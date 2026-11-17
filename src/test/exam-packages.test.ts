import { describe, expect, it } from "vitest";
import {
  EXAM_PACKAGES,
  questionsForAttempt,
  questionsForPackage,
  scoreAttempt,
} from "@/lib/exam-packages";
import { LEGACY_QUESTION_BANK, QUESTION_BANK } from "@/lib/exam";
import { CPNS_HOTS_QUESTIONS } from "@/lib/exam-cpns-hots";

describe("Identitas paket CAT", () => {
  it("menyediakan 100 paket CPNS dan mempertahankan 20 paket PPPK", () => {
    for (const track of ["cpns", "pppk"]) {
      const packages = EXAM_PACKAGES.filter((item) => item.track === track);
      const count = track === "cpns" ? 100 : 20;
      expect(packages).toHaveLength(count);
      expect(new Set(packages.map((item) => item.id)).size).toBe(count);
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
      expect(questions.every((question) => question.difficulty === "HOTS")).toBe(true);
      for (const [subject, count] of Object.entries({ TWK: 30, TIU: 35, TKP: 45 }))
        expect(questions.filter((question) => question.subject === subject)).toHaveLength(count);
      selections.add(
        questions
          .map((question) => question.id)
          .sort()
          .join(","),
      );
      const attempt = {
        track: item.track,
        packageId: item.id,
        startedAt: 100,
        questionSet: "hots-v1" as const,
      };
      expect(questionsForAttempt(attempt)).toEqual(questions);
      expect(questionsForAttempt({ ...attempt, startedAt: 200 })).toEqual(
        questionsForAttempt(attempt),
      );
      const answers = Object.fromEntries(
        questions.map((question) => [question.id, question.answer]),
      );
      expect(scoreAttempt(attempt, answers).correct).toBe(110);
      expect(scoreAttempt(attempt, {}).correct).toBe(0);
    }
    expect(selections.size).toBe(100);
  });

  it("menambah 100 soal HOTS dengan opsi berbeda dan pembahasan", () => {
    expect(CPNS_HOTS_QUESTIONS).toHaveLength(100);
    expect(new Set(CPNS_HOTS_QUESTIONS.map((question) => question.prompt)).size).toBe(100);
    for (const question of CPNS_HOTS_QUESTIONS) {
      expect(question.difficulty).toBe("HOTS");
      expect(new Set(question.options.map((option) => option.text)).size, question.id).toBe(5);
      expect(question.options.some((option) => option.label === question.answer)).toBe(true);
      expect(question.explanation.length).toBeGreaterThan(60);
      expect(question.tip.length).toBeGreaterThan(30);
    }
  });

  it("memakai kunci hitungan yang benar pada enam jenis kasus TIU", () => {
    const numerical = CPNS_HOTS_QUESTIONS.filter((q) => q.subject === "TIU");
    const correctText = (q: (typeof numerical)[number]) =>
      q.options.find((option) => option.label === q.answer)?.text;
    expect(numerical.slice(0, 6).map(correctText)).toEqual([
      "160 permohonan",
      "309 berkas",
      "17,5 menit",
      "4 hari",
      "80 peserta",
      "4 laporan",
    ]);
    expect(numerical.slice(-6).map(correctText)).toEqual([
      "340 permohonan",
      "1236 berkas",
      "15,5 menit",
      "5 hari",
      "152 peserta",
      "13 laporan",
    ]);
  });

  it("mempertahankan susunan dan skor paket lama tanpa memakai bank baru", () => {
    const id = "cpns-paket-1";
    const rank = (value: string) => {
      let hash = 2166136261;
      for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
      return hash >>> 0;
    };
    const previous = Object.entries({ TWK: 30, TIU: 35, TKP: 45 }).flatMap(([subject, count]) =>
      LEGACY_QUESTION_BANK.filter((q) => q.subject === subject)
        .sort((a, b) => rank(`${id}:${a.id}`) - rank(`${id}:${b.id}`) || a.id.localeCompare(b.id))
        .slice(0, count),
    );
    const attempt = { track: "cpns" as const, packageId: id, startedAt: 100 };
    expect(questionsForAttempt(attempt)).toEqual(previous);
    const answers = Object.fromEntries(previous.map((q) => [q.id, q.answer]));
    expect(scoreAttempt(attempt, answers).correct).toBe(110);
    const result = { track: "cpns" as const, packageId: id, answers };
    expect(questionsForAttempt(result)).toEqual(previous);
  });

  it("menolak salah jalur dan bank yang belum cukup, tanpa menggandakan soal", () => {
    expect(() => questionsForAttempt({ track: "pppk", packageId: "cpns-paket-1" })).toThrow();
    expect(() => questionsForPackage("cpns-paket-1", [])).toThrow();
    expect(() => questionsForPackage("paket-tidak-ada")).toThrow();
  });

  it("menyediakan sepuluh konfigurasi paket fokus 50 HOTS untuk TWK, TIU, dan TKP", () => {
    for (const subject of ["twk", "tiu", "tkp"] as const) {
      const packages = EXAM_PACKAGES.filter((item) => item.track === subject);
      expect(packages).toHaveLength(10);
      for (const item of packages) {
        const available = QUESTION_BANK.filter(
          (question) =>
            question.subject === subject.toUpperCase() && question.difficulty === "HOTS",
        ).length;
        if (available < 50) {
          expect(() => questionsForPackage(item.id)).toThrow();
          continue;
        }
        const questions = questionsForPackage(item.id);
        expect(questions).toHaveLength(50);
        expect(new Set(questions.map((question) => question.id)).size).toBe(50);
        expect(
          questions.every(
            (question) =>
              question.subject === subject.toUpperCase() && question.difficulty === "HOTS",
          ),
        ).toBe(true);
      }
    }
  });
});
