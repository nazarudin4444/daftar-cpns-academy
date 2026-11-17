import { describe, expect, it } from "vitest";
import { questionsForPackage } from "@/lib/exam-packages";
import { QUESTION_BANK } from "@/lib/exam";
import { GUIDE_CASE_ANALYSIS } from "@/lib/guide-case-analysis";
import {
  GUIDE_TOPICS,
  SUBJECTS,
  addDays,
  diagnosticBreakdown,
  diagnosticQuestions,
  emptyGuide,
  exportPlan,
  jakartaDate,
  journalFromExam,
  planAgenda,
  readGuide,
  recommendedFocus,
  topicQuestions,
  validDate,
  weeklyStats,
  type Diagnostic,
  type StudyPlan,
} from "@/lib/study-guide";

const plan: StudyPlan = { track: "cpns", days: 30, minutes: 30, start: "2026-12-20", focus: "TIU" };
const makeDiagnostic = (): Diagnostic => {
  const questions = diagnosticQuestions("cpns");
  return {
    id: "diagnostic-fixture",
    track: "cpns",
    endedAt: Date.parse("2026-11-17T16:59:00Z"),
    seconds: 180,
    questionIds: questions.map((q) => q.id),
    answers: Object.fromEntries(
      questions.map((q) => [q.id, q.subject === "TIU" ? (q.answer === "A" ? "B" : "A") : q.answer]),
    ),
  };
};

describe("Rencana belajar dan tanggal WIB", () => {
  it("memisahkan tanggal WIB dari UTC dan melewati pergantian tahun", () => {
    expect(jakartaDate(Date.parse("2026-11-17T16:59:00Z"))).toBe("2026-11-17");
    expect(jakartaDate(Date.parse("2026-11-17T17:00:00Z"))).toBe("2026-11-18");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(validDate("2026-02-30")).toBe(false);
    expect(validDate("2028-02-29")).toBe(true);
  });
  it("membuat 14 sampai 90 agenda tanpa menambah alokasi waktu harian", () => {
    for (const days of [14, 30, 60, 90])
      for (const minutes of [15, 30, 60, 90]) {
        const agenda = planAgenda({ ...plan, days, minutes });
        expect(agenda).toHaveLength(days);
        expect(new Set(agenda.flatMap((d) => d.tasks.map((t) => t.id))).size).toBe(days * 3);
        expect(
          agenda.every((d) => d.tasks.reduce((sum, t) => sum + t.minutes, 0) === minutes),
        ).toBe(true);
        expect(agenda.at(-1)?.date).toBe(addDays(plan.start, days - 1));
      }
  });
  it("mengutamakan fokus tanpa meninggalkan kategori lain dan memisahkan jalur", () => {
    const cpns = planAgenda(plan);
    expect(cpns.filter((d) => d.topic.subject === "TIU").length).toBeGreaterThanOrEqual(15);
    expect(new Set(cpns.map((d) => d.topic.subject))).toEqual(new Set(SUBJECTS.cpns));
    const pppk = planAgenda({ ...plan, track: "pppk", focus: "balanced" });
    expect(new Set(pppk.map((d) => d.topic.subject))).toEqual(new Set(SUBJECTS.pppk));
    expect(exportPlan({ ...plan, days: 14 })).toContain("Hari 14");
  });
});

describe("Materi, pemetaan, dan penyimpanan", () => {
  it("menyediakan bedah alasan kelima pilihan untuk enam kategori", () => {
    const subjects = new Set<string>();
    for (const [id, analysis] of Object.entries(GUIDE_CASE_ANALYSIS)) {
      const question = QUESTION_BANK.find((q) => q.id === id)!;
      expect(question.difficulty).toBe("HOTS");
      subjects.add(question.subject);
      expect(Object.keys(analysis)).toEqual(question.options.map((o) => o.label));
      expect(Object.values(analysis).every((reason) => reason.length > 40)).toBe(true);
    }
    expect(subjects.size).toBe(6);
  });
  it("memberi latihan nyata pada seluruh topik serta sembilan soal per jalur", () => {
    for (const track of ["cpns", "pppk"] as const) {
      const questions = diagnosticQuestions(track);
      expect(questions).toHaveLength(9);
      expect(new Set(questions.map((q) => q.id)).size).toBe(9);
      for (const subject of SUBJECTS[track])
        expect(questions.filter((q) => q.subject === subject)).toHaveLength(3);
      for (const topic of GUIDE_TOPICS[track]) expect(topicQuestions(topic)).toHaveLength(5);
    }
  });
  it("merekomendasikan kategori dengan kesalahan terbanyak", () => {
    const diagnostic = makeDiagnostic();
    expect(recommendedFocus(diagnostic)).toBe("TIU");
    expect(diagnosticBreakdown(diagnostic).find((r) => r.subject === "TIU")?.percent).toBe(0);
    const perfect = {
      ...diagnostic,
      answers: Object.fromEntries(diagnosticQuestions("cpns").map((q) => [q.id, q.answer])),
    };
    expect(recommendedFocus(perfect)).toBe("balanced");
  });
  it("memulihkan progres, mengabaikan data rusak, dan menolak fokus salah jalur", () => {
    const saved = {
      ...emptyGuide(),
      plan,
      plans: { cpns: plan },
      diagnostics: [makeDiagnostic()],
      completed: { valid: 123 },
      statuses: { "tiu-ratios": "review" as const },
    };
    expect(readGuide(JSON.stringify(saved))).toEqual(saved);
    for (const raw of [null, "invalid", "[]", "null", '{"plan":{"track":"wrong"}}'])
      expect(readGuide(raw).plan).toBeNull();
    expect(
      readGuide(JSON.stringify({ ...saved, plan: { ...plan, focus: "Manajerial" } })).plan,
    ).toBeNull();
    expect(
      readGuide(
        JSON.stringify({
          ...saved,
          diagnostics: [null, { ...makeDiagnostic(), questionIds: ["missing"] }],
        }),
      ).diagnostics,
    ).toEqual([]);
  });
});

describe("Jurnal dan evaluasi berdasarkan aktivitas nyata", () => {
  it("mengimpor hanya jawaban salah dan tidak menggandakan impor", () => {
    const [correct, wrong] = questionsForPackage("cpns-paket-100");
    const exam = {
      track: "cpns" as const,
      questionSet: "hots-v1" as const,
      packageId: "cpns-paket-100",
      endedAt: Date.parse("2026-11-17T10:00:00Z"),
      elapsedSeconds: 120,
      questionTimes: {},
      answers: { [correct!.id]: correct!.answer, [wrong!.id]: wrong!.answer === "A" ? "B" : "A" },
    };
    const entries = journalFromExam([exam], [], "cpns");
    expect(entries).toHaveLength(1);
    expect(entries[0]?.questionId).toBe(wrong!.id);
    expect(journalFromExam([exam], entries, "cpns")).toEqual([]);
    expect(journalFromExam([exam], [], "pppk")).toEqual([]);
  });
  it("mengelompokkan tugas menurut waktu dicentang, bukan tanggal rencana", () => {
    const task = planAgenda(plan)[0]!.tasks[0]!;
    const state = {
      ...emptyGuide(),
      completed: { [task.id]: Date.parse("2026-11-17T17:10:00Z") },
      diagnostics: [makeDiagnostic()],
    };
    const rows = weeklyStats(state, [], "cpns", "2026-11-18");
    expect(rows.find((r) => r.date === "2026-11-17")).toMatchObject({
      sessions: 1,
      correct: 6,
      answered: 9,
      seconds: 180,
      completed: 0,
    });
    expect(rows.find((r) => r.date === "2026-11-18")?.completed).toBe(1);
    expect(
      weeklyStats(state, [], "pppk", "2026-11-18").every(
        (r) => r.sessions === 0 && r.completed === 0,
      ),
    ).toBe(true);
    expect(weeklyStats(emptyGuide(), [], "cpns", "2026-11-18").every((r) => r.answered === 0)).toBe(
      true,
    );
  });
});
