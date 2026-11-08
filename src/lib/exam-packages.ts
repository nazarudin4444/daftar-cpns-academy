import {
  QUESTION_BANK,
  questionsForTrack,
  scoreExam,
  type Track,
  type Question,
  type Subject,
} from "@/lib/exam";

export type PackageTrack = "cpns" | "pppk" | "twk" | "tiu" | "tkp";
export type ExamPackage = {
  id: string;
  track: PackageTrack;
  number: number;
  title: string;
  durationSeconds: number;
  composition: Partial<Record<Subject, number>>;
};

// These are practice configurations, not official selection rules.
export const EXAM_PACKAGES: ExamPackage[] = [
  ...(["cpns", "pppk"] as const).flatMap((track) =>
    Array.from({ length: 20 }, (_, index) => ({
      id: `${track}-paket-${index + 1}`,
      track,
      number: index + 1,
      title: `Paket ${String(index + 1).padStart(2, "0")}`,
      durationSeconds: 100 * 60,
      composition:
        track === "cpns"
          ? { TWK: 30, TIU: 35, TKP: 45 }
          : { Manajerial: 35, "Sosial Kultural": 35, Teknis: 40 },
    })),
  ),
  ...(["twk", "tiu", "tkp"] as const).flatMap((track) =>
    Array.from({ length: 10 }, (_, index) => ({
      id: `${track}-paket-${index + 1}`,
      track,
      number: index + 1,
      title: `Paket ${String(index + 1).padStart(2, "0")}`,
      durationSeconds: 50 * 60,
      composition: { [track.toUpperCase() as "TWK" | "TIU" | "TKP"]: 50 },
    })),
  ),
];

export function getExamPackage(id: string): ExamPackage {
  const item = EXAM_PACKAGES.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Paket tidak dikenal: ${id}`);
  return item;
}

function rank(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return hash >>> 0;
}

export function questionsForPackage(
  id: string,
  bank: readonly Question[] = QUESTION_BANK,
): Question[] {
  const examPackage = getExamPackage(id);
  const questions = Object.entries(examPackage.composition).flatMap(([subject, count]) => {
    const focusedTrack = ["twk", "tiu", "tkp"].includes(examPackage.track);
    const candidates = bank.filter(
      (question) =>
        question.subject === subject && (!focusedTrack || question.difficulty === "HOTS"),
    );
    if (candidates.length < count) {
      throw new Error(
        `${id}: ${subject} membutuhkan ${count} soal, tersedia ${candidates.length}.`,
      );
    }
    return candidates
      .sort(
        (left, right) =>
          rank(`${id}:${left.id}`) - rank(`${id}:${right.id}`) || left.id.localeCompare(right.id),
      )
      .slice(0, count);
  });
  const expectedCount = Object.values(examPackage.composition).reduce(
    (sum, count) => sum + count,
    0,
  );
  if (
    questions.length !== expectedCount ||
    new Set(questions.map((question) => question.id)).size !== expectedCount
  ) {
    throw new Error(`${id}: paket harus berisi ${expectedCount} soal berbeda.`);
  }
  return questions;
}

type AttemptIdentity = { track: Track; packageId?: string | undefined; startedAt?: number };

export function questionsForAttempt(attempt: AttemptIdentity): Question[] {
  if (!attempt.packageId) return questionsForTrack(attempt.track, attempt.startedAt);
  const item = getExamPackage(attempt.packageId);
  if (item.track !== attempt.track) throw new Error("Paket tidak sesuai dengan jalur ujian.");
  return questionsForPackage(item.id);
}

export function scoreAttempt(attempt: AttemptIdentity, answers: Record<string, string>) {
  if (!attempt.packageId) return scoreExam(attempt.track, answers, attempt.startedAt);
  const questions = questionsForAttempt(attempt);
  const subjects = [...new Set(questions.map((question) => question.subject))];
  const breakdown = subjects.map((subject) => {
    const items = questions.filter((question) => question.subject === subject);
    return {
      subject,
      total: items.length,
      correct: items.filter((question) => answers[question.id] === question.answer).length,
    };
  });
  const correct = breakdown.reduce((total, item) => total + item.correct, 0);
  return { correct, total: questions.length, points: correct, breakdown };
}
