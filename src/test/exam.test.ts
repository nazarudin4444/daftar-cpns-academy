import { describe, expect, it } from "vitest";
import { rulesForTrack, QUESTION_BANK, TRACKS, questionsForTrack, scoreExam } from "@/lib/exam";
import {
  CPNS_SUBJECT_CATALOG,
  questionsForSubchapter,
  seriesForSubchapter,
} from "@/lib/exam-catalog";
import {
  EXAM_SESSION_KEY,
  loadExamSession,
  saveExamSession,
  type ExamSession,
} from "@/lib/exam-storage";

describe("Bank soal dan penilaian", () => {
  it("memuat sedikitnya 80 soal untuk tiap materi CPNS", () => {
    expect(QUESTION_BANK.filter((question) => question.subject === "TWK")).toHaveLength(85);
    expect(QUESTION_BANK.filter((question) => question.subject === "TIU")).toHaveLength(85);
    expect(QUESTION_BANK.filter((question) => question.subject === "TKP")).toHaveLength(88);
  });
  it("memiliki ID unik dan kunci yang tersedia pada opsi", () => {
    expect(new Set(QUESTION_BANK.map((q) => q.id)).size).toBe(QUESTION_BANK.length);
    for (const question of QUESTION_BANK) {
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((o) => o.label)).size).toBe(5);
      expect(question.options.some((o) => o.label === question.answer)).toBe(true);
      expect(question.explanation.length).toBeGreaterThan(30);
      expect(question.tip.length).toBeGreaterThan(20);
      expect(["Latihan", "HOTS"]).toContain(question.difficulty);
    }
  });
  it("memilih soal yang konsisten dalam satu sesi dan bervariasi antar sesi", () => {
    const firstAttempt = questionsForTrack("cpns", 1710000000000);
    const resumedAttempt = questionsForTrack("cpns", 1710000000000);
    const nextAttempt = questionsForTrack("cpns", 1710000000001);
    expect(resumedAttempt.map((question) => question.id)).toEqual(
      firstAttempt.map((question) => question.id),
    );
    expect(nextAttempt.map((question) => question.id)).not.toEqual(
      firstAttempt.map((question) => question.id),
    );
    const answers = Object.fromEntries(
      firstAttempt.map((question) => [question.id, question.answer]),
    );
    expect(scoreExam("cpns", answers, 1710000000000).correct).toBe(110);
    for (const subject of ["TWK", "TIU", "TKP"] as const)
      expect(firstAttempt.filter((question) => question.subject === subject)).toHaveLength(
        { TWK: 30, TIU: 35, TKP: 45 }[subject],
      );
  });
  for (const track of TRACKS) {
    it(`${track.id}: membagi materi dan menilai jawaban dengan benar`, () => {
      const questions = questionsForTrack(track.id);
      expect(questions).toHaveLength(rulesForTrack(track.id).questionsPerTrack);
      for (const subject of track.subjects)
        expect(questions.filter((q) => q.subject === subject)).toHaveLength(
          track.id === "cpns"
            ? ({ TWK: 30, TIU: 35, TKP: 45 } as Record<string, number>)[subject]!
            : 5,
        );
      expect(scoreExam(track.id, {}).correct).toBe(0);
      const answers = Object.fromEntries(questions.map((q) => [q.id, q.answer]));
      expect(scoreExam(track.id, answers).correct).toBe(questions.length);
      delete answers[questions[0]!.id];
      answers["unknown-question"] = "A";
      expect(scoreExam(track.id, answers).correct).toBe(questions.length - 1);
    });
  }
});

describe("Katalog kelompok soal CPNS", () => {
  it("mengelompokkan setiap soal TWK, TIU, dan TKP tepat satu kali", () => {
    const categorizedIds = CPNS_SUBJECT_CATALOG.flatMap((category) =>
      category.chapters.flatMap((chapter) =>
        chapter.subchapters.flatMap((subchapter) => subchapter.questionIds),
      ),
    );
    const cpnsQuestionIds = QUESTION_BANK.filter((question) =>
      ["TWK", "TIU", "TKP"].includes(question.subject),
    ).map((question) => question.id);

    expect(categorizedIds).toHaveLength(258);
    expect(new Set(categorizedIds).size).toBe(categorizedIds.length);
    expect([...categorizedIds].sort()).toEqual(cpnsQuestionIds.sort());
  });

  it("mengembalikan soal yang sesuai dengan subbab terpilih", () => {
    const questions = questionsForSubchapter("tiu-ratios");
    expect(questions.length).toBeGreaterThan(0);
    expect(questions.every((question) => question.subject === "TIU")).toBe(true);
    expect(questions).toHaveLength(10);
  });

  it("membagi setiap subbab menjadi seri tanpa melewatkan soal", () => {
    for (const category of CPNS_SUBJECT_CATALOG) {
      for (const chapter of category.chapters) {
        for (const subchapter of chapter.subchapters) {
          expect(subchapter.questionIds.length).toBeGreaterThanOrEqual(10);
          const series = seriesForSubchapter(subchapter.id);
          const seriesQuestions = series.flatMap((item) => item.questions);
          expect(series.length).toBeGreaterThan(0);
          expect(series.every((item) => item.questions.length <= 5)).toBe(true);
          expect(seriesQuestions.map((question) => question.id)).toEqual(subchapter.questionIds);
        }
      }
    }
  });

  it("menyediakan sedikitnya tiga soal HOTS pada setiap subbab", () => {
    for (const category of CPNS_SUBJECT_CATALOG) {
      for (const chapter of category.chapters) {
        for (const subchapter of chapter.subchapters) {
          const hotQuestions = questionsForSubchapter(subchapter.id).filter(
            (question) => question.difficulty === "HOTS",
          );
          expect(
            hotQuestions.length,
            `${category.subject} / ${chapter.title} / ${subchapter.title}`,
          ).toBeGreaterThanOrEqual(3);
        }
      }
    }
  });
});

describe("Pemulihan sesi", () => {
  it.each(["null", "[]", "invalid", '{"track":"unknown"}'])("menolak data rusak: %s", (raw) => {
    localStorage.setItem(EXAM_SESSION_KEY, raw);
    expect(loadExamSession(localStorage)).toBeNull();
  });
  it("memulihkan jawaban, waktu, dan penanda ragu", () => {
    const session: ExamSession = {
      track: "cpns",
      answers: { "twk-01": "A" },
      currentIndex: 2,
      flagged: ["twk-01"],
      startedAt: 1000,
      deadline: 721000,
      questionStartedAt: 2000,
      questionTimes: { "twk-01": 1 },
    };
    expect(saveExamSession(localStorage, session)).toBe(true);
    expect(loadExamSession(localStorage)).toEqual(session);
    expect(saveExamSession(localStorage, null)).toBe(true);
    expect(loadExamSession(localStorage)).toBeNull();
  });
  it("melaporkan storage yang menolak penulisan", () => {
    expect(
      saveExamSession(
        {
          getItem: () => null,
          setItem: () => {
            throw new Error("quota");
          },
          removeItem: () => {
            throw new Error("denied");
          },
        },
        null,
      ),
    ).toBe(false);
  });
});
