import { DEMO_RULES, TRACKS, type Track } from "@/lib/exam";

export type ExamSession = {
  track: Track;
  answers: Record<string, string>;
  currentIndex: number;
  flagged: string[];
  deadline: number;
  startedAt: number;
  questionStartedAt: number;
  questionTimes: Record<string, number>;
};

export type ExamResult = {
  track: Track;
  answers: Record<string, string>;
  questionTimes: Record<string, number>;
  elapsedSeconds: number;
  endedAt: number;
  startedAt?: number;
};

export const EXAM_SESSION_KEY = "daftar-cpns:exam-session:v1";
export const EXAM_RESULT_KEY = "daftar-cpns:exam-result:v1";

type BrowserStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function readObject(raw: string): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(raw);
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function validAnswers(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((answer) => typeof answer === "string" && /^[A-E]$/.test(answer))
  );
}

function validTimes(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every(
      (time) => typeof time === "number" && Number.isFinite(time) && time >= 0,
    )
  );
}

function isTrack(value: unknown): value is Track {
  return typeof value === "string" && TRACKS.some((track) => track.id === value);
}

export function loadExamSession(storage: BrowserStorage): ExamSession | null {
  const raw = storage.getItem(EXAM_SESSION_KEY);
  if (!raw) return null;
  const value = readObject(raw) as Partial<ExamSession>;
  if (
    !isTrack(value.track) ||
    !validAnswers(value.answers) ||
    !validTimes(value.questionTimes) ||
    !Number.isInteger(value.currentIndex) ||
    (value.currentIndex ?? -1) < 0 ||
    (value.currentIndex ?? DEMO_RULES.questionsPerTrack) >= DEMO_RULES.questionsPerTrack ||
    !Array.isArray(value.flagged) ||
    !value.flagged.every((id) => typeof id === "string") ||
    typeof value.answers !== "object" ||
    value.answers === null ||
    typeof value.questionTimes !== "object" ||
    value.questionTimes === null ||
    !Number.isFinite(value.deadline) ||
    !Number.isFinite(value.startedAt) ||
    !Number.isFinite(value.questionStartedAt)
  )
    return null;
  return value as ExamSession;
}

export function saveExamSession(storage: BrowserStorage, session: ExamSession | null): boolean {
  try {
    if (session) storage.setItem(EXAM_SESSION_KEY, JSON.stringify(session));
    else storage.removeItem(EXAM_SESSION_KEY);
    return true;
  } catch {
    return false;
  }
}

export function loadExamResult(storage: BrowserStorage): ExamResult | null {
  const raw = storage.getItem(EXAM_RESULT_KEY);
  if (!raw) return null;
  const value = readObject(raw) as Partial<ExamResult>;
  if (
    !isTrack(value.track) ||
    !validAnswers(value.answers) ||
    !validTimes(value.questionTimes) ||
    (value.elapsedSeconds ?? -1) < 0 ||
    (value.elapsedSeconds ?? Infinity) > DEMO_RULES.durationSeconds ||
    typeof value.answers !== "object" ||
    value.answers === null ||
    typeof value.questionTimes !== "object" ||
    value.questionTimes === null ||
    !Number.isFinite(value.elapsedSeconds) ||
    !Number.isFinite(value.endedAt) ||
    (value.startedAt !== undefined && !Number.isFinite(value.startedAt))
  )
    return null;
  return value as ExamResult;
}

export function saveExamResult(storage: BrowserStorage, result: ExamResult): boolean {
  try {
    storage.setItem(EXAM_RESULT_KEY, JSON.stringify(result));
    return true;
  } catch {
    return false;
  }
}
