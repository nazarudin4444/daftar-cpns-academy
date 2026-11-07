import { describe, expect, it } from "vitest";
import { DEMO_RULES, QUESTION_BANK, TRACKS, questionsForTrack, scoreExam } from "@/lib/exam";
import {
  EXAM_SESSION_KEY,
  loadExamSession,
  saveExamSession,
  type ExamSession,
} from "@/lib/exam-storage";

describe("Bank soal dan penilaian", () => {
  it("memuat 15 soal orisinal di setiap kategori SKD", () => {
    expect(QUESTION_BANK.filter((question) => question.subject === "TWK")).toHaveLength(15);
    expect(QUESTION_BANK.filter((question) => question.subject === "TIU")).toHaveLength(15);
    expect(QUESTION_BANK.filter((question) => question.subject === "TKP")).toHaveLength(15);
  });
  it("memiliki ID unik dan kunci yang tersedia pada opsi", () => {
    expect(new Set(QUESTION_BANK.map((q) => q.id)).size).toBe(QUESTION_BANK.length);
    for (const question of QUESTION_BANK) {
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((o) => o.label)).size).toBe(5);
      expect(question.options.some((o) => o.label === question.answer)).toBe(true);
      expect(question.explanation.length).toBeGreaterThan(30);
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
    expect(scoreExam("cpns", answers, 1710000000000).correct).toBe(15);
    for (const subject of ["TWK", "TIU", "TKP"] as const)
      expect(firstAttempt.filter((question) => question.subject === subject)).toHaveLength(5);
  });
  for (const track of TRACKS) {
    it(`${track.id}: membagi materi dan menilai jawaban dengan benar`, () => {
      const questions = questionsForTrack(track.id);
      expect(questions).toHaveLength(DEMO_RULES.questionsPerTrack);
      for (const subject of track.subjects)
        expect(questions.filter((q) => q.subject === subject)).toHaveLength(5);
      expect(scoreExam(track.id, {}).correct).toBe(0);
      const answers = Object.fromEntries(questions.map((q) => [q.id, q.answer]));
      expect(scoreExam(track.id, answers).correct).toBe(15);
      delete answers[questions[0]!.id];
      answers["unknown-question"] = "A";
      expect(scoreExam(track.id, answers).correct).toBe(14);
    });
  }
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
