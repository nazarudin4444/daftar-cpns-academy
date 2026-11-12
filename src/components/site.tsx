import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useBlocker } from "@tanstack/react-router";
import {
  Menu,
  X,
  ShieldCheck,
  ArrowUpRight,
  Clock3,
  Download,
  RotateCcw,
  Search,
  ArrowLeft,
  PlayCircle,
  Home,
  BookOpen,
  Bookmark,
  Flag,
  Printer,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ExamControls, ReadingMode, VisualScorecard } from "@/components/study-tools";
import { canonicalUrl, SITE_ORIGIN, OPERATOR_NAME, CONTACT_EMAIL } from "@/lib/site-config";
import { CONTENT_PAGES, type ContentPageData } from "@/lib/content-pages";
import {
  EXAM_PACKAGES,
  getExamPackage,
  questionsForAttempt,
  scoreAttempt,
} from "@/lib/exam-packages";
import {
  DEMO_RULES,
  QUESTION_BANK,
  questionsForTrack,
  rulesForTrack,
  TRACKS,
  type Question,
  type Subject,
  type Track,
} from "@/lib/exam";
import {
  CPNS_SUBJECT_CATALOG,
  questionsForSubchapter,
  seriesForSubchapter,
} from "@/lib/exam-catalog";
import {
  loadExamResult,
  loadExamHistory,
  loadExamSession,
  saveExamHistory,
  saveExamResult,
  saveExamSession,
  type ExamResult,
  type ExamSession,
} from "@/lib/exam-storage";

const nav = [
  ["Beranda", "/"],
  ["Simulasi CAT", "/simulasi-cat-cpns"],
  ["Bank Soal", "/latihan-soal-cpns"],
  ["Info CPNS", "/jadwal-cpns"],
  ["PPPK", "/pppk"],
  ["Panduan", "/panduan"],
  ["Alat belajar", "/alat-belajar"],
  ["Direktori Situs", "/situs"],
  ["Dashboard", "/dashboard"],
] as const;

const SUBJECT_NAMES: Record<Subject, string> = {
  TWK: "Tes Wawasan Kebangsaan",
  TIU: "Tes Intelegensi Umum",
  TKP: "Tes Karakteristik Pribadi",
  Manajerial: "Kompetensi Manajerial",
  "Sosial Kultural": "Kompetensi Sosial Kultural",
  Teknis: "Kompetensi Teknis",
};

const BOOKMARKS_KEY = "daftar-cpns:bookmarked-questions:v1";
function readBookmarkedIds(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(BOOKMARKS_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}
function setQuestionBookmark(questionId: string, saved: boolean) {
  const ids = readBookmarkedIds().filter((id) => id !== questionId);
  if (saved) ids.push(questionId);
  try {
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {
    // The control remains usable for the current view when browser storage is unavailable.
  }
  return ids;
}

function QuestionBookmark({ questionId }: { questionId: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(readBookmarkedIds().includes(questionId));
  }, [questionId]);
  return (
    <button
      type="button"
      className="study-control mb-3"
      aria-pressed={saved}
      onClick={() => {
        setQuestionBookmark(questionId, !saved);
        setSaved(!saved);
      }}
    >
      <Bookmark size={16} aria-hidden="true" />
      {saved ? "Tersimpan untuk diulang" : "Simpan soal"}
    </button>
  );
}

function jakartaDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-3" aria-label="Daftar CPNS, beranda">
          <span className="relative size-10 shrink-0 overflow-hidden" aria-hidden="true">
            <img src="/brand/daftar-cpns-mark.svg" alt="" width={40} height={40} />
          </span>
          <span className="leading-tight">
            <span className="block font-extrabold tracking-tight text-foreground">Daftar CPNS</span>
            <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-positive">
              <span className="size-1.5 rounded-full bg-positive" aria-hidden="true" />
              Belajar dan Latihan CAT CPNS Gratis
            </span>
          </span>
        </Link>
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-0.5 rounded-full border border-border bg-card/70 p-1 xl:flex"
        >
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              activeOptions={{ exact: href === "/" }}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{ className: "bg-primary !text-primary-foreground hover:bg-primary" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:block">
          <Button asChild className="min-h-11 rounded-full px-5 shadow-sm">
            <Link to="/simulasi-cat-cpns">
              <PlayCircle /> Mulai Simulasi Gratis
            </Link>
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="min-h-11 min-w-11 rounded-full xl:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          aria-label="Navigasi seluler"
          className="grid gap-1 border-t border-border bg-background px-4 py-3 xl:hidden"
        >
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: href === "/" }}
              className="flex min-h-11 items-center rounded-lg px-3 font-medium hover:bg-secondary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function MobileBottomNav() {
  const side =
    "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-muted-foreground transition-colors hover:text-foreground";
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md xl:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 items-end px-4 pt-1.5 pb-1.5">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className={side}
          activeProps={{ className: "!text-primary" }}
        >
          <Home className="size-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Beranda</span>
        </Link>
        <div className="flex justify-center">
          <Link
            to="/simulasi-cat-cpns"
            className="relative -mt-7 flex flex-col items-center gap-0.5 rounded-full border-4 border-card bg-primary px-5 py-2.5 text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95"
          >
            <span className="absolute -top-2.5 rounded-full border-2 border-card bg-positive px-2 py-px text-xs font-extrabold tracking-wider text-primary-foreground">
              GRATIS
            </span>
            <PlayCircle className="size-6" aria-hidden="true" />
            <span className="whitespace-nowrap text-xs font-bold">Simulasi CAT</span>
          </Link>
        </div>
        <Link to="/latihan-soal-cpns" className={side} activeProps={{ className: "!text-primary" }}>
          <BookOpen className="size-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Bank Soal</span>
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="text-lg font-extrabold text-foreground">
            Daftar CPNS
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Platform Edukasi &amp; Simulasi CAT Independen. Bukan BKN, SSCASN, atau portal
            pemerintah.
          </p>
          <a
            href="https://sscasn.bkn.go.id/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            Pendaftaran resmi di SSCASN <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <h2 className="font-bold">Pusat belajar</h2>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link to="/simulasi-cat-cpns" className="min-h-8 hover:text-primary">
              Simulasi CAT
            </Link>
            <Link to="/soal-twk" className="min-h-8 hover:text-primary">
              Latihan TWK
            </Link>
            <Link to="/soal-tiu" className="min-h-8 hover:text-primary">
              Latihan TIU
            </Link>
            <Link to="/soal-tkp" className="min-h-8 hover:text-primary">
              Latihan TKP
            </Link>
            <Link to="/pppk" className="min-h-8 hover:text-primary">
              Panduan PPPK
            </Link>
            <Link to="/situs" className="min-h-8 hover:text-primary">
              Direktori rujukan
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Informasi</h2>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link to="/tentang-kami" className="min-h-8 hover:text-primary">
              Tentang kami
            </Link>
            <Link to="/kontak" className="min-h-8 hover:text-primary">
              Kontak
            </Link>
            <Link to="/kebijakan-privasi" className="min-h-8 hover:text-primary">
              Kebijakan privasi
            </Link>
            <Link to="/syarat-ketentuan" className="min-h-8 hover:text-primary">
              Syarat dan ketentuan
            </Link>
            <Link to="/disclaimer" className="min-h-8 hover:text-primary">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs leading-5 text-muted-foreground sm:px-6 lg:px-8">
          Latihan pada situs ini adalah materi demo orisinal, bukan soal resmi. Periksa jadwal,
          formasi, syarat, dan aturan seleksi melalui kanal pemerintah.
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-7xl justify-end px-4 py-2 print:hidden">
        <ReadingMode />
      </div>
      <div className="pb-24 xl:pb-0">
        {children}
        <SiteFooter />
      </div>
      <MobileBottomNav />
    </>
  );
}

function CPNSQuestionBank() {
  const [subject, setSubject] = useState<(typeof CPNS_SUBJECT_CATALOG)[number]["subject"]>("TWK");
  const [selectedSubchapter, setSelectedSubchapter] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [hotsOnly, setHotsOnly] = useState(false);
  const category = CPNS_SUBJECT_CATALOG.find((item) => item.subject === subject)!;
  const totalQuestionCount = CPNS_SUBJECT_CATALOG.reduce(
    (total, item) =>
      total +
      item.chapters.reduce(
        (chapterTotal, chapter) =>
          chapterTotal +
          chapter.subchapters.reduce(
            (subchapterTotal, subchapter) => subchapterTotal + subchapter.questionIds.length,
            0,
          ),
        0,
      ),
    0,
  );
  const subchapters = category.chapters.flatMap((chapter) =>
    chapter.subchapters.map((subchapter) => ({ ...subchapter, chapter: chapter.title })),
  );
  const activeSubchapter = subchapters.find((item) => item.id === selectedSubchapter);
  const series = selectedSubchapter ? seriesForSubchapter(selectedSubchapter, hotsOnly) : [];
  const activeSeries = series.find((item) => item.id === selectedSeries);
  const selectedSeriesOffset = activeSeries
    ? series.findIndex((item) => item.id === activeSeries.id) * 5
    : 0;
  const searchedQuestions = questionsForSubchapter(selectedSubchapter ?? "").filter(
    (question) => question.subject === subject,
  );
  const searchableQuestions = activeSubchapter
    ? searchedQuestions
    : category.chapters.flatMap((chapter) =>
        chapter.subchapters.flatMap((subchapter) => questionsForSubchapter(subchapter.id)),
      );
  const filteredQuestions = searchableQuestions.filter(
    (question) => !hotsOnly || question.difficulty === "HOTS",
  );
  const query = search.trim().toLocaleLowerCase("id-ID");
  const visibleQuestions = query
    ? filteredQuestions.filter((question) =>
        [question.prompt, ...question.options.map((option) => option.text)]
          .join(" ")
          .toLocaleLowerCase("id-ID")
          .includes(query),
      )
    : activeSubchapter
      ? (activeSeries?.questions ?? [])
      : [];

  function selectSubject(nextSubject: typeof subject) {
    setSubject(nextSubject);
    setSelectedSubchapter(null);
    setSelectedSeries(null);
    setSearch("");
  }

  function selectDifficulty(nextHotsOnly: boolean) {
    setHotsOnly(nextHotsOnly);
    setSelectedSeries(null);
    setSearch("");
  }

  function selectSubchapter(id: string) {
    setSelectedSubchapter(id);
    setSelectedSeries(null);
    setSearch("");
  }

  return (
    <section aria-labelledby="question-bank-heading" className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Kelompok Soal</p>
            <h2 id="question-bank-heading" className="mt-1 text-2xl font-extrabold text-foreground">
              CPNS / CASN
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Pilih materi, buka bab, lalu tentukan subbab untuk mulai berlatih dan membaca
              pembahasan.
            </p>
          </div>
          <div className="rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-foreground">
            {totalQuestionCount} soal · {CPNS_SUBJECT_CATALOG.length} materi
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3" role="group" aria-label="Pilih materi CPNS">
          {CPNS_SUBJECT_CATALOG.map((item) => {
            const count = item.chapters.reduce(
              (total, chapter) =>
                total +
                chapter.subchapters.reduce(
                  (subtotal, subchapter) => subtotal + subchapter.questionIds.length,
                  0,
                ),
              0,
            );
            const active = item.subject === subject;
            return (
              <button
                key={item.subject}
                type="button"
                aria-pressed={active}
                onClick={() => selectSubject(item.subject)}
                className={`min-h-16 rounded-lg border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-bold">{item.subject}</span>
                  <span
                    className={`text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {count} soal
                  </span>
                </span>
                <span
                  className={`mt-1 block text-xs leading-5 ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}
                >
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>
        <div
          className="mt-4 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter tingkat soal"
        >
          <span className="mr-1 text-sm font-semibold text-foreground">Tingkat soal</span>
          {([false, true] as const).map((hots) => (
            <button
              key={String(hots)}
              type="button"
              aria-pressed={hotsOnly === hots}
              onClick={() => selectDifficulty(hots)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                hotsOnly === hots
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              }`}
            >
              {hots ? "HOTS saja" : "Semua soal"}
            </button>
          ))}
          <span className="text-sm text-muted-foreground">
            {category.chapters
              .flatMap((chapter) => chapter.subchapters)
              .reduce(
                (count, subchapter) =>
                  count +
                  questionsForSubchapter(subchapter.id).filter(
                    (question) => question.difficulty === "HOTS",
                  ).length,
                0,
              )}{" "}
            soal HOTS di {subject}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-border bg-background px-4 focus-within:ring-2 focus-within:ring-ring">
          <Search aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <span className="sr-only">Cari soal dalam materi {subject}</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Cari soal ${subject}...`}
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="min-h-11 px-2 text-sm font-semibold text-primary"
            >
              Hapus
            </button>
          )}
        </label>

        {activeSubchapter ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary/60 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {activeSubchapter.chapter}
              </p>
              <h3 className="mt-1 font-bold text-foreground">{activeSubchapter.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {activeSubchapter.description} {hotsOnly ? "· Menampilkan soal HOTS" : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedSubchapter(null);
                setSelectedSeries(null);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-primary hover:bg-background"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Semua subbab
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {category.chapters.map((chapter, chapterIndex) => (
              <section
                key={chapter.id}
                className="rounded-xl border border-border bg-card p-4 sm:p-5"
              >
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-bold text-foreground">
                    <span className="mr-2 text-sm font-semibold text-primary">
                      Bab {chapterIndex + 1}
                    </span>
                    {chapter.title}
                  </h3>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {chapter.subchapters.reduce(
                      (total, item) => total + item.questionIds.length,
                      0,
                    )}{" "}
                    soal
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {chapter.subchapters.map((subchapter) => (
                    <button
                      key={subchapter.id}
                      type="button"
                      onClick={() => selectSubchapter(subchapter.id)}
                      className="group flex min-h-20 items-start justify-between gap-3 rounded-lg border border-border bg-background p-4 text-left transition-colors hover:border-primary/50 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>
                        <span className="block font-semibold text-foreground">
                          {subchapter.title}
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                          {subchapter.description}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-foreground">
                        {hotsOnly
                          ? `${questionsForSubchapter(subchapter.id).filter((question) => question.difficulty === "HOTS").length} HOTS`
                          : `${subchapter.questionIds.length} soal`}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeSubchapter && !query && (
          <section aria-labelledby="question-series-heading" className="space-y-3">
            <div>
              <h4 id="question-series-heading" className="font-bold text-foreground">
                Pilih seri latihan
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Tiap seri berisi hingga 5 soal dengan kunci, pembahasan, serta tips.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {series.map((item, index) => {
                const firstQuestion = index * 5 + 1;
                const lastQuestion = firstQuestion + item.questions.length - 1;
                const active = item.id === selectedSeries;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedSeries(item.id)}
                    className={`min-h-20 rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "border-primary bg-secondary"
                        : "border-border bg-card hover:border-primary/50 hover:bg-secondary/60"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-foreground">{item.title}</span>
                      <span className="text-xs font-semibold text-primary">
                        {item.questions.length} soal
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Soal {firstQuestion}–{lastQuestion}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {visibleQuestions.length > 0 ? (
          <div className="space-y-4" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              {visibleQuestions.length} soal {query ? "ditemukan" : "dalam subbab ini"}
            </p>
            {visibleQuestions.map((question, index) => (
              <article
                key={question.id}
                className="rounded-xl border border-border bg-card p-5 sm:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {query ? `Hasil ${index + 1}` : `Soal ${selectedSeriesOffset + index + 1}`} ·{" "}
                  {subject}
                  {question.difficulty === "HOTS" ? " · HOTS" : ""}
                </p>
                <h4 className="mt-2 font-semibold leading-7 text-foreground">{question.prompt}</h4>
                <ol className="mt-4 space-y-2 text-sm leading-6 text-foreground">
                  {question.options.map((option) => (
                    <li key={option.label} className="flex gap-2">
                      <strong className="shrink-0">{option.label}.</strong>
                      <span>{option.text}</span>
                    </li>
                  ))}
                </ol>
                <details className="mt-4 border-t border-border pt-2">
                  <summary className="min-h-11 cursor-pointer py-3 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    Lihat kunci dan pembahasan
                  </summary>
                  <p className="pb-2 leading-7 text-muted-foreground">
                    <strong className="text-foreground">Jawaban {question.answer}.</strong>{" "}
                    {question.explanation}
                  </p>
                  <p className="pb-3 text-sm leading-6 text-muted-foreground">
                    <strong className="text-foreground">Tips &amp; trik:</strong> {question.tip}
                  </p>
                </details>
              </article>
            ))}
          </div>
        ) : query ? (
          <p
            className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground"
            role="status"
          >
            Tidak ada soal {subject} yang cocok dengan “{search}”. Coba kata kunci lain.
          </p>
        ) : activeSubchapter ? (
          <p className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
            Belum ada soal di subbab ini.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Pilih subbab untuk melihat soal dan pembahasannya.
          </p>
        )}
      </div>
    </section>
  );
}

export function contentStructuredData(page: ContentPageData) {
  const isSimulator = page === CONTENT_PAGES["simulasi-cat-cpns"];
  const slug = Object.keys(CONTENT_PAGES).find((key) => CONTENT_PAGES[key] === page) ?? "";
  const canonicalPath = canonicalUrl(`/${slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: "Daftar CPNS",
        url: canonicalUrl("/"),
        image: canonicalUrl("/brand/daftar-cpns-mark.svg"),
        publisher: { "@id": `${SITE_ORIGIN}/#operator` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#operator`,
        name: OPERATOR_NAME,
        email: CONTACT_EMAIL,
        url: canonicalUrl("/tentang-kami"),
        logo: canonicalUrl("/brand/daftar-cpns-mark.svg"),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT_EMAIL,
          availableLanguage: "Indonesian",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalPath}#webpage`,
        url: canonicalPath,
        name: page.title,
        description: page.description,
        inLanguage: "id",
        publisher: { "@id": `${SITE_ORIGIN}/#operator` },
        breadcrumb: { "@id": `${canonicalPath}#breadcrumb` },
        ...(isSimulator ? { mainEntity: { "@id": `${canonicalPath}#application` } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalPath}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: canonicalUrl("/") },
          { "@type": "ListItem", position: 2, name: page.title, item: canonicalPath },
        ],
      },
      ...(isSimulator
        ? [
            {
              "@type": "WebApplication",
              "@id": `${canonicalPath}#application`,
              name: "Simulasi CAT CPNS Daftar CPNS",
              url: canonicalPath,
              description: page.description,
              applicationCategory: "EducationalApplication",
              operatingSystem: "Any",
              inLanguage: "id",
              isAccessibleForFree: true,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IDR",
              },
              featureList: [
                "20 paket demo SKD CPNS, masing-masing 110 soal",
                "Timer 100 menit dan navigasi nomor soal",
                "Penanda soal ragu dan pemulihan progres di browser",
                "Hasil per kategori dan pembahasan jawaban",
              ],
              publisher: { "@id": `${SITE_ORIGIN}/#operator` },
            },
          ]
        : []),
    ],
  };
}

export function ContentPage({ page }: { page: ContentPageData }) {
  const slug = Object.keys(CONTENT_PAGES).find((key) => CONTENT_PAGES[key] === page) ?? "";
  const isSimulator = page === CONTENT_PAGES["simulasi-cat-cpns"];
  const isPassingGrade = page === CONTENT_PAGES["passing-grade-cpns"];
  const isDashboard = slug === "dashboard";
  const isQuestionBank = slug === "latihan-soal-cpns";
  const structuredData = contentStructuredData(page);
  return (
    <SiteShell>
      <main className="min-h-[65vh]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <div className="bg-hero relative overflow-hidden text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-primary-foreground/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    to="/"
                    className="inline-flex min-h-11 items-center hover:text-primary-foreground"
                  >
                    Beranda
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-primary-foreground">
                  {page.title}
                </li>
              </ol>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-sm font-semibold text-primary-foreground backdrop-blur-md">
              <ShieldCheck size={16} aria-hidden="true" />
              Platform Edukasi &amp; Simulasi CAT Independen
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-primary-foreground/80">
              {page.intro}
            </p>
          </div>
        </div>
        <div
          className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10 ${isSimulator ? "" : "grid gap-6 md:grid-cols-[minmax(0,1fr)_250px] md:gap-8"}`}
        >
          <article
            className={`min-w-0 ${isSimulator ? "" : "space-y-9 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8"}`}
          >
            {isSimulator && <CATSimulator />}
            {isPassingGrade && <PassingGradeCalculator />}
            {isDashboard && <LearningDashboard />}
            {isQuestionBank && <CPNSQuestionBank />}
            {[
              "kontak",
              "kebijakan-privasi",
              "syarat-ketentuan",
              "tentang-kami",
              "disclaimer",
            ].includes(slug) && (
              <p className="leading-7">
                Dikelola oleh <strong>{OPERATOR_NAME}</strong>. Hubungi{" "}
                <a
                  className="font-semibold text-primary underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                untuk dukungan dan pertanyaan privasi.
              </p>
            )}
            {["soal-twk", "soal-tiu", "soal-tkp"].includes(slug) && (
              <QuickPractice
                subject={slug.replace("soal-", "").toUpperCase() as "TWK" | "TIU" | "TKP"}
              />
            )}
            {page.sourceNote && (
              <aside
                aria-label="Pembaruan informasi resmi"
                className="rounded-xl border border-primary/20 bg-secondary/60 p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-card text-primary">
                    <ShieldCheck size={19} aria-hidden="true" />
                  </span>
                  <div>
                    {page.verifiedAt && (
                      <p className="text-xs font-bold uppercase tracking-wide text-primary">
                        Diperiksa {page.verifiedAt}
                      </p>
                    )}
                    <h2 className="mt-1 font-bold text-foreground">{page.sourceNote.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {page.sourceNote.body}
                    </p>
                  </div>
                </div>
              </aside>
            )}
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-foreground">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-7 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-6 text-muted-foreground">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="border-t border-border pt-6">
              <h2 className="text-lg font-bold">Lanjutkan belajar</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild className="min-h-11">
                  <Link to="/simulasi-cat-cpns">Buka simulasi demo</Link>
                </Button>
                <Button asChild variant="outline" className="min-h-11">
                  <Link to="/panduan">Panduan belajar</Link>
                </Button>
              </div>
            </section>
          </article>
          <aside
            className={`h-fit rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 ${isSimulator ? "hidden" : ""}`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={20} />
              <div>
                <h2 className="font-bold">Rujukan &amp; batas informasi</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Informasi seleksi dapat berubah. Periksa sumber pemerintah sebelum mengambil
                  keputusan.
                </p>
              </div>
            </div>
            {page.sourceLinks && (
              <ul className="mt-4 grid gap-3">
                {page.sourceLinks.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {source.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}

const PASSING_GRADE_CATEGORIES = [
  {
    id: "umum",
    name: "Formasi umum",
    year: "2024",
    kind: "subtest",
    thresholds: { TWK: 65, TIU: 80, TKP: 166 },
  },
  {
    id: "cumlaude",
    name: "Lulusan terbaik (cumlaude)",
    year: "2024",
    kind: "total",
    thresholds: { total: 311, TIU: 85 },
  },
  {
    id: "diaspora",
    name: "Diaspora",
    year: "2024",
    kind: "total",
    thresholds: { total: 311, TIU: 85 },
  },
  {
    id: "disabilitas",
    name: "Penyandang disabilitas",
    year: "2024",
    kind: "total",
    thresholds: { total: 286, TIU: 60 },
  },
  {
    id: "papua",
    name: "Putra/Putri Papua",
    year: "2024",
    kind: "total",
    thresholds: { total: 286, TIU: 60 },
  },
  {
    id: "dokter",
    name: "Dokter/Spesialis",
    year: "2021",
    kind: "total",
    thresholds: { total: 311, TIU: 80 },
  },
] as const;

function DailyChallenge() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const today = jakartaDateKey();
  const pool = QUESTION_BANK.filter((item) => ["TWK", "TIU", "TKP"].includes(item.subject));
  let seed = [...today].reduce((total, char) => total * 31 + char.charCodeAt(0), 7) >>> 0;
  const rankedPool = [...pool]
    .sort((left, right) => {
      const rank = (id: string) =>
        [...id].reduce((total, char) => (total * 33 + char.charCodeAt(0)) >>> 0, seed);
      return rank(left.id) - rank(right.id);
    })
    .slice(0);
  const dailyQuestions = (["TWK", "TIU", "TKP"] as const).flatMap((subject) =>
    rankedPool.filter((item) => item.subject === subject).slice(0, subject === "TKP" ? 1 : 2),
  );

  useEffect(() => {
    try {
      const value: unknown = JSON.parse(
        window.localStorage.getItem("daftar-cpns:daily-streak:v1") ?? "[]",
      );
      if (Array.isArray(value))
        setCompletedDates(value.filter((date): date is string => typeof date === "string"));
    } catch {
      // Challenge works without persistence.
    } finally {
      setLoaded(true);
    }
  }, []);

  const done = dailyQuestions.length > 0 && dailyQuestions.every((item) => answers[item.id]);
  useEffect(() => {
    if (!loaded || !done || completedDates.includes(today)) return;
    const next = [...completedDates, today].slice(-400);
    setCompletedDates(next);
    try {
      window.localStorage.setItem("daftar-cpns:daily-streak:v1", JSON.stringify(next));
    } catch {
      // Completion is still shown for this visit.
    }
  }, [completedDates, done, loaded, today]);

  const completed = new Set(completedDates);
  let streak = 0;
  const cursor = new Date(`${today}T12:00:00+07:00`);
  if (!completed.has(today)) cursor.setDate(cursor.getDate() - 1);
  while (completed.has(jakartaDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return (
    <section
      aria-labelledby="daily-challenge-heading"
      className="rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Tantangan harian · 5 soal
          </p>
          <h3 id="daily-challenge-heading" className="mt-1 text-lg font-bold">
            Latihan singkat hari ini
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Target 5 menit: 2 TWK, 2 TIU, 1 TKP. Soal berganti setiap hari; streak disimpan di
            browser ini.
          </p>
        </div>
        <p
          className="rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-foreground"
          aria-live="polite"
        >
          🔥 {streak} hari beruntun
        </p>
      </div>
      {done ? (
        <div className="mt-4" role="status">
          <p className="rounded-md border border-positive/40 bg-positive/5 p-3 font-semibold">
            Selesai: {dailyQuestions.filter((q) => answers[q.id] === q.answer).length} / 5 sesuai
            kunci latihan.
          </p>
          <div className="mt-4 space-y-4">
            {dailyQuestions.map((question, index) => (
              <ReviewQuestion
                key={question.id}
                question={question}
                index={index}
                answer={answers[question.id]}
              />
            ))}
          </div>
        </div>
      ) : (
        <ol className="mt-4 space-y-4">
          {dailyQuestions.map((question, index) => (
            <li key={question.id} className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground">
                {question.subject} · Soal {index + 1}
              </p>
              <p className="mt-1 text-sm font-semibold leading-6">{question.prompt}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    disabled={Boolean(answers[question.id])}
                    aria-pressed={answers[question.id] === option.label}
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [question.id]: option.label }))
                    }
                    className="min-h-11 rounded-md border border-border px-3 py-2 text-left text-sm leading-5 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default"
                  >
                    <strong>{option.label}.</strong> {option.text}
                  </button>
                ))}
              </div>
              {answers[question.id] && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground" aria-live="polite">
                  {answers[question.id] === question.answer
                    ? "Tepat."
                    : `Kunci latihan: ${question.answer}.`}{" "}
                  {question.explanation}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function StudyFlashcards() {
  const cards = [
    {
      subject: "TWK · UUD 1945",
      title: "Persamaan di hadapan hukum",
      description:
        "Pasal 27 ayat (1) memuat prinsip kesamaan kedudukan warga negara di dalam hukum dan pemerintahan. Kata kunci belajar: persamaan hak dan kewajiban.",
    },
    {
      subject: "TWK · UUD 1945",
      title: "Hak atas pekerjaan",
      description:
        "Pasal 27 ayat (2) menyatakan hak warga negara atas pekerjaan dan penghidupan yang layak bagi kemanusiaan.",
    },
    {
      subject: "TWK · UUD 1945",
      title: "Kepastian hukum yang adil",
      description:
        "Pasal 28D ayat (1) menjamin pengakuan, perlindungan, dan kepastian hukum yang adil serta perlakuan yang sama di hadapan hukum.",
    },
    {
      subject: "TWK · UUD 1945",
      title: "Hak memperoleh pendidikan",
      description:
        "Pasal 31 ayat (1) menyatakan setiap warga negara berhak mendapat pendidikan. Bedakan hak warga dengan kewajiban mengikuti pendidikan dasar pada ayat berikutnya.",
    },
    {
      subject: "TWK · Lembaga negara",
      title: "Majelis Permusyawaratan Rakyat",
      description:
        "Pasal 3 memberi MPR wewenang mengubah dan menetapkan UUD, melantik Presiden/Wakil Presiden, serta memutus usul pemberhentian sesuai UUD.",
    },
    {
      subject: "TWK · Lembaga negara",
      title: "Dewan Perwakilan Rakyat",
      description:
        "Pasal 20A menjelaskan fungsi legislasi, anggaran, dan pengawasan DPR. Ingat tiga fungsi ini sebagai kata kunci.",
    },
    {
      subject: "TIU · Aritmetika",
      title: "Jarak, kecepatan, waktu",
      description:
        "Rumus dasar: jarak = kecepatan × waktu; kecepatan = jarak ÷ waktu; waktu = jarak ÷ kecepatan. Samakan satuan sebelum menghitung.",
    },
    {
      subject: "TIU · Perbandingan",
      title: "Senilai dan berbalik nilai",
      description:
        "Senilai: jika satu besaran dikali faktor k, besaran lain juga dikali k. Berbalik nilai: hasil kali kedua besaran tetap, sehingga satu naik k kali dan lainnya turun menjadi 1/k.",
    },
  ];
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const card = cards[index];
  if (!card) return null;
  return (
    <section
      aria-labelledby="study-cards-heading"
      className="rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Kartu belajar</p>
          <h3 id="study-cards-heading" className="mt-1 text-lg font-bold">
            Ringkasan materi SKD
          </h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {index + 1} / {cards.length}
        </span>
      </div>
      <div className="mt-4 min-h-36 rounded-lg border border-border bg-background p-4">
        <p className="text-xs font-bold text-primary">{card.subject}</p>
        <h4 className="mt-2 font-semibold">{card.title}</h4>
        {showBack && (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          onClick={() => setShowBack((value) => !value)}
        >
          {showBack ? "Tutup ringkasan" : "Lihat ringkasan"}
        </Button>
        <Button
          type="button"
          className="min-h-11"
          onClick={() => {
            setIndex((value) => (value + 1) % cards.length);
            setShowBack(false);
          }}
        >
          Kartu berikutnya
        </Button>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Ringkasan ini untuk mengingat kata kunci; cek bunyi pasal dan perubahan resmi sebelum
        menghafal detail.
      </p>
      <a
        href="https://jdih.dpr.go.id/setjen/index/id/UUD-1945-BAGIAN-PERTIMBANGAN-DAN-DOKUMENTASI-INFORMASI-HUKUM"
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex min-h-10 items-center text-sm font-semibold text-primary underline"
      >
        Baca naskah UUD di JDIH DPR <ArrowUpRight size={14} className="ml-1" />
      </a>
    </section>
  );
}

function LearningDashboard() {
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [unfinishedSession, setUnfinishedSession] = useState<ExamSession | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      setHistory(loadExamHistory(window.localStorage));
      setUnfinishedSession(loadExamSession(window.localStorage));
      const savedIds = readBookmarkedIds();
      setBookmarkedQuestions(QUESTION_BANK.filter((question) => savedIds.includes(question.id)));
    } catch {
      setStorageUnavailable(true);
    } finally {
      setLoaded(true);
    }
  }, []);

  const attempts = history.map((result, index) => {
    const score = scoreAttempt(result, result.answers);
    return {
      result,
      score,
      accuracy: score.total ? Math.round((score.correct / score.total) * 100) : 0,
      sequence: index + 1,
      packageName: result.packageId ? getExamPackage(result.packageId).title : "Latihan umum",
      trackName: TRACKS.find((track) => track.id === result.track)?.name ?? result.track,
      date: new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(
        result.endedAt,
      ),
    };
  });
  const newestAttempts = [...attempts].reverse();
  const trend = attempts.map((attempt) => ({
    sesi: `Sesi ${attempt.sequence}`,
    akurasi: attempt.accuracy,
  }));
  const unanswered = unfinishedSession
    ? questionsForAttempt(unfinishedSession).length - Object.keys(unfinishedSession.answers).length
    : 0;
  const remaining = unfinishedSession
    ? Math.max(0, Math.ceil((unfinishedSession.deadline - Date.now()) / 1000))
    : 0;

  return (
    <section aria-labelledby="learning-dashboard-heading" className="space-y-7">
      <div>
        <h2 id="learning-dashboard-heading" className="text-2xl font-extrabold">
          Pusat belajar Anda
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Riwayat dan progres tersimpan di browser perangkat ini. Tidak perlu akun.
        </p>
      </div>
      {storageUnavailable && (
        <p role="alert" className="border-l-4 border-destructive bg-card p-3 text-sm leading-6">
          Penyimpanan browser tidak dapat dibaca. Coba buka halaman ini di browser yang menyimpan
          sesi latihan.
        </p>
      )}
      {!loaded ? (
        <p role="status" className="rounded-lg border border-border bg-card p-4">
          Membaca riwayat dari browser...
        </p>
      ) : (
        <section
          aria-labelledby="latest-session-heading"
          className="rounded-lg border border-border bg-card p-4 sm:p-5"
        >
          <h3 id="latest-session-heading" className="font-bold">
            Sesi yang belum selesai
          </h3>
          {unfinishedSession ? (
            <>
              <p className="mt-2 text-lg font-bold">
                {TRACKS.find((track) => track.id === unfinishedSession.track)?.name}
                {unfinishedSession.packageId
                  ? ` · ${getExamPackage(unfinishedSession.packageId).title}`
                  : ""}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Soal {unfinishedSession.currentIndex + 1} ·{" "}
                {Object.keys(unfinishedSession.answers).length} sudah dijawab · {unanswered} belum
                dijawab · sisa {formatDuration(remaining)}.
              </p>
              <Button asChild className="mt-4 min-h-11">
                <Link to="/simulasi-cat-cpns">Lanjutkan simulasi</Link>
              </Button>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Simulasi akan meminta konfirmasi untuk melanjutkan sesi tersimpan. Waktu tetap
                berjalan.
              </p>
            </>
          ) : (
            <div className="mt-2">
              <p className="text-sm leading-6 text-muted-foreground">
                Tidak ada sesi yang sedang berlangsung di browser ini.
              </p>
              <Button asChild variant="outline" className="mt-3 min-h-11">
                <Link to="/simulasi-cat-cpns">Pilih paket latihan</Link>
              </Button>
            </div>
          )}
        </section>
      )}

      <DailyChallenge />
      <StudyFlashcards />

      <section
        aria-labelledby="bookmarks-heading"
        className="rounded-lg border border-border bg-card p-4 sm:p-5"
      >
        <h3 id="bookmarks-heading" className="font-bold">
          Soal yang perlu diulang
        </h3>
        {bookmarkedQuestions.length ? (
          <ol className="mt-3 space-y-4">
            {bookmarkedQuestions.map((question, index) => (
              <li key={question.id} className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-primary">{question.subject}</p>
                <p className="mt-1 text-sm font-semibold leading-6">{question.prompt}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Kunci latihan: {question.answer}. {question.explanation}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 min-h-10"
                  onClick={() => {
                    setQuestionBookmark(question.id, false);
                    setBookmarkedQuestions((items) =>
                      items.filter((item) => item.id !== question.id),
                    );
                  }}
                >
                  Hapus dari tersimpan
                </Button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Belum ada soal tersimpan. Tandai soal dari pembahasan hasil simulasi untuk mengulanginya
            di sini.
          </p>
        )}
      </section>

      <section
        aria-labelledby="progress-trend-heading"
        className="rounded-lg border border-border bg-card p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 id="progress-trend-heading" className="font-bold">
            Tren akurasi latihan
          </h3>
          {attempts.length > 0 && (
            <span className="text-sm text-muted-foreground">{attempts.length} sesi tersimpan</span>
          )}
        </div>
        {attempts.length ? (
          <div
            role="img"
            aria-label={attempts
              .map((attempt) => `Sesi ${attempt.sequence}: akurasi ${attempt.accuracy} persen`)
              .join(". ")}
            className="mt-3 h-60 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="sesi" tickLine={false} axisLine={false} />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip formatter={(value) => [`${value}%`, "Jawaban benar"]} />
                <Line
                  type="monotone"
                  dataKey="akurasi"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--primary)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-3 rounded-md border border-dashed border-border p-4 text-sm leading-6 text-muted-foreground">
            Tren akan muncul setelah Anda menyelesaikan simulasi pertama di browser ini.
          </p>
        )}
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Akurasi adalah persentase kunci latihan yang cocok, bukan nilai resmi SKD.
        </p>
      </section>

      <section aria-labelledby="history-heading" className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 id="history-heading" className="font-bold">
            Riwayat tryout
          </h3>
          <span className="text-sm text-muted-foreground">Maksimal 50 sesi tersimpan</span>
        </div>
        {newestAttempts.length ? (
          <>
            <div className="hidden overflow-hidden rounded-lg border border-border md:block">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  Riwayat hasil latihan tersimpan pada browser ini
                </caption>
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th scope="col" className="p-3">
                      Tanggal
                    </th>
                    <th scope="col" className="p-3">
                      Paket
                    </th>
                    <th scope="col" className="p-3">
                      Skor latihan
                    </th>
                    <th scope="col" className="p-3">
                      Akurasi
                    </th>
                    <th scope="col" className="p-3">
                      Durasi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newestAttempts.map((attempt) => (
                    <tr
                      key={`${attempt.result.endedAt}-${attempt.result.track}`}
                      className="border-t border-border"
                    >
                      <td className="p-3">{attempt.date}</td>
                      <td className="p-3">
                        <span className="font-semibold">{attempt.packageName}</span>
                        <span className="block text-xs text-muted-foreground">
                          {attempt.trackName}
                        </span>
                      </td>
                      <td className="p-3 tabular-nums">
                        {attempt.score.correct} / {attempt.score.total}
                      </td>
                      <td className="p-3 tabular-nums">{attempt.accuracy}%</td>
                      <td className="p-3">{formatDuration(attempt.result.elapsedSeconds)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ol className="grid gap-3 md:hidden">
              {newestAttempts.map((attempt) => (
                <li
                  key={`${attempt.result.endedAt}-${attempt.result.track}`}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="text-xs text-muted-foreground">{attempt.date}</p>
                  <p className="mt-1 font-bold">{attempt.packageName}</p>
                  <p className="text-sm text-muted-foreground">{attempt.trackName}</p>
                  <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <dt className="text-xs text-muted-foreground">Skor</dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {attempt.score.correct}/{attempt.score.total}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Akurasi</dt>
                      <dd className="mt-1 font-semibold tabular-nums">{attempt.accuracy}%</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Durasi</dt>
                      <dd className="mt-1 font-semibold">
                        {formatDuration(attempt.result.elapsedSeconds)}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="rounded-md border border-dashed border-border p-4 text-sm leading-6 text-muted-foreground">
            Belum ada hasil latihan tersimpan. Riwayat pertama akan muncul setelah simulasi selesai.
          </p>
        )}
      </section>
      <p className="border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
        Data riwayat dan sesi hanya disimpan di localStorage browser ini. Menghapus data situs dari
        browser akan menghapus riwayat dan sesi tersimpan.
      </p>
    </section>
  );
}

function PassingGradeCalculator() {
  const [formasi, setFormasi] = useState<(typeof PASSING_GRADE_CATEGORIES)[number]["id"]>("umum");
  const [scores, setScores] = useState({ TWK: 0, TIU: 0, TKP: 45 });
  const [quota, setQuota] = useState(5);
  const [currentRank, setCurrentRank] = useState(10);
  const total = scores.TWK + scores.TIU + scores.TKP;
  const category = PASSING_GRADE_CATEGORIES.find((item) => item.id === formasi)!;
  const meetsThreshold =
    category.kind === "subtest"
      ? scores.TWK >= category.thresholds.TWK &&
        scores.TIU >= category.thresholds.TIU &&
        scores.TKP >= category.thresholds.TKP
      : total >= category.thresholds.total && scores.TIU >= category.thresholds.TIU;
  const remainingGap =
    category.kind === "subtest"
      ? `TWK ${Math.max(0, category.thresholds.TWK - scores.TWK)} · TIU ${Math.max(0, category.thresholds.TIU - scores.TIU)} · TKP ${Math.max(0, category.thresholds.TKP - scores.TKP)} poin.`
      : `Jumlah nilai ${Math.max(0, category.thresholds.total - total)} poin · TIU ${Math.max(0, category.thresholds.TIU - scores.TIU)} poin.`;

  return (
    <section
      aria-labelledby="passing-calculator-heading"
      className="rounded-lg border border-border bg-card p-4 sm:p-6"
    >
      <h2 id="passing-calculator-heading" className="text-xl font-bold">
        Kalkulator target nilai SKD
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Pilih kategori dan masukkan nilai untuk memeriksa ambang pada aturan rujukan yang tersedia.
        Status ini memeriksa ambang nilai, bukan peluang masuk perangkingan.
      </p>
      <label htmlFor="skd-formasi" className="mt-5 block text-sm font-semibold">
        Jenis kebutuhan
      </label>
      <select
        id="skd-formasi"
        value={formasi}
        onChange={(event) => setFormasi(event.target.value as typeof formasi)}
        className="mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 text-foreground sm:max-w-md"
      >
        {PASSING_GRADE_CATEGORIES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} · {item.year}
          </option>
        ))}
      </select>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {(["TWK", "TIU", "TKP"] as const).map((subject) => {
          const min = subject === "TKP" ? 45 : 0;
          const max = subject === "TWK" ? 150 : subject === "TIU" ? 175 : 225;
          return (
            <label key={subject} className="block">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>{subject}</span>
                <output htmlFor={`score-${subject}`} className="tabular-nums">
                  {scores[subject]} / {max}
                </output>
              </span>
              <input
                id={`score-${subject}`}
                aria-label={`Nilai ${subject}`}
                type="range"
                min={min}
                max={max}
                value={scores[subject]}
                onChange={(event) =>
                  setScores({ ...scores, [subject]: Number(event.target.value) })
                }
                className="mt-3 w-full accent-primary"
              />
              <span className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{min}</span>
                <span>{max}</span>
              </span>
            </label>
          );
        })}
      </div>
      <div
        aria-live="polite"
        className={`mt-6 border p-4 ${meetsThreshold ? "border-positive/40 bg-positive/5" : "border-amber-400/50 bg-amber-50 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100"}`}
      >
        <p className="font-bold">
          {meetsThreshold
            ? "Nilai memenuhi ambang pada aturan rujukan"
            : "Nilai belum memenuhi semua patokan"}
        </p>
        <p className="mt-1 text-sm leading-6">
          {category.kind === "subtest"
            ? `TWK ${scores.TWK}/${category.thresholds.TWK} · TIU ${scores.TIU}/${category.thresholds.TIU} · TKP ${scores.TKP}/${category.thresholds.TKP}.`
            : `Jumlah nilai ${total}/${category.thresholds.total} · TIU ${scores.TIU}/${category.thresholds.TIU}.`}
          {` Kategori: ${category.name}. Rujukan tahun ${category.year}.`}
        </p>
        {!meetsThreshold && (
          <p className="mt-1 text-sm font-semibold">Kekurangan terhadap ambang: {remainingGap}</p>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Ketentuan ambang dapat berubah menurut periode dan instansi. Untuk rujukan 2024:{" "}
        <a
          className="font-semibold text-primary underline"
          href="https://jdih.menpan.go.id/dokumen-hukum/keputusan-menteri-pendayagunaan-aparatur-negara-dan-reformasi-birokrasi-nomor-321-tahun-2024-tentang-1851"
          target="_blank"
          rel="noreferrer"
        >
          KepmenPANRB Nomor 321 Tahun 2024
        </a>
        .{" "}
        {formasi === "dokter" && (
          <>
            Rujukan dokter/spesialis 2021:{" "}
            <a
              className="font-semibold text-primary underline"
              href="https://www.bkn.go.id/wp-content/uploads/2021/11/KEPUTUSAN-MENTERI-PANRB-NOMOR-1023-TENTANG-NILAI-AMBANG-BATAS-SKD-CPNS-2021.pdf"
              target="_blank"
              rel="noreferrer"
            >
              KepmenPANRB 1023/2021
            </a>
            .
          </>
        )}
        <span className="mt-2 block">
          Memenuhi ambang tidak menjamin masuk tiga kali jumlah formasi. Perangkingan bergantung
          pada nilai peserta lain dan jumlah formasi.
        </span>
      </p>
      <div className="mt-6 rounded-lg border border-border bg-background p-4">
        <h3 className="font-bold">Simulasi batas peringkat 3× kuota</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Sebagai ilustrasi aturan seleksi CPNS pada PermenPANRB 6/2024, peserta yang memenuhi
          ambang dapat diikutkan ke SKB paling banyak tiga kali jumlah kebutuhan jabatan. Hasil
          akhir tetap mengikuti pengumuman instansi dan ketentuan periode berjalan.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Jumlah formasi
            <input
              type="number"
              min={1}
              max={100000}
              value={quota}
              onChange={(event) => setQuota(Math.max(1, Number(event.target.value) || 1))}
              className="mt-1.5 min-h-11 w-full rounded-md border border-input bg-card px-3"
            />
          </label>
          <label className="text-sm font-semibold">
            Peringkat simulasi Anda
            <input
              type="number"
              min={1}
              max={10000000}
              value={currentRank}
              onChange={(event) => setCurrentRank(Math.max(1, Number(event.target.value) || 1))}
              className="mt-1.5 min-h-11 w-full rounded-md border border-input bg-card px-3"
            />
          </label>
        </div>
        <p
          className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-sm leading-6"
          aria-live="polite"
        >
          Batas ilustrasi: peringkat {Math.min(quota * 3, 300000).toLocaleString("id-ID")}.
          Peringkat {currentRank.toLocaleString("id-ID")}{" "}
          {currentRank <= quota * 3
            ? "berada dalam rentang ilustrasi"
            : "di luar rentang ilustrasi"}
          . Ini bukan jaminan lolos: peserta tetap harus memenuhi ambang dan pemeringkatan resmi.
        </p>
        <a
          href="https://jdih.menpan.go.id/common/dokumen/2024permenpanrb006.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex min-h-10 items-center font-semibold text-primary underline"
        >
          Buka PermenPANRB 6/2024 <ArrowUpRight size={15} className="ml-1" />
        </a>
      </div>
      <div className="mt-6">
        <h3 className="font-bold">Perbandingan patokan dari beberapa periode</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Angka berikut berasal dari tahun rujukan yang tercantum; ini bukan satu tabel ketentuan
          aktif lintas jalur.
        </p>
        <div className="mt-3 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3">Kategori</th>
                <th className="p-3">Tahun</th>
                <th className="p-3">Patokan</th>
              </tr>
            </thead>
            <tbody>
              {PASSING_GRADE_CATEGORIES.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <th scope="row" className="p-3 font-semibold">
                    {item.name}
                  </th>
                  <td className="p-3">{item.year}</td>
                  <td className="p-3">
                    {item.kind === "subtest"
                      ? `TWK ${item.thresholds.TWK} · TIU ${item.thresholds.TIU} · TKP ${item.thresholds.TKP}`
                      : `Total ${item.thresholds.total} · TIU ${item.thresholds.TIU}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function QuickPractice({ subject }: { subject: "TWK" | "TIU" | "TKP" }) {
  const subjectCatalog = CPNS_SUBJECT_CATALOG.find((item) => item.subject === subject);
  const subchapters = subjectCatalog?.chapters.flatMap((chapter) => chapter.subchapters) ?? [];
  const [subchapterId, setSubchapterId] = useState(subchapters[0]?.id ?? "");
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const series = seriesForSubchapter(subchapterId);
  const currentSeries = series[seriesIndex];
  const questions = currentSeries?.questions ?? [];
  const question = questions[questionIndex];
  const finished = questions.length > 0 && questionIndex >= questions.length;
  const chosenSubchapter = subchapters.find((item) => item.id === subchapterId);

  function changeSubchapter(value: string) {
    setSubchapterId(value);
    setSeriesIndex(0);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
  }

  function advance() {
    setSelectedAnswer(null);
    setQuestionIndex((current) => current + 1);
  }

  return (
    <section aria-labelledby="quick-practice-heading" className="space-y-5">
      <div>
        <h2 id="quick-practice-heading" className="text-xl font-bold">
          Latihan kilat {subject}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pilih subtopik dan kerjakan lima soal. Pembahasan terbuka setelah Anda memilih jawaban.
        </p>
      </div>
      <label className="block text-sm font-semibold">
        Subtopik
        <select
          value={subchapterId}
          onChange={(event) => changeSubchapter(event.target.value)}
          className="mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 text-foreground"
        >
          {subjectCatalog?.chapters.map((chapter) => (
            <optgroup key={chapter.id} label={chapter.title}>
              {chapter.subchapters.map((subchapter) => (
                <option key={subchapter.id} value={subchapter.id}>
                  {subchapter.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      {series.length > 1 && (
        <label className="block text-sm font-semibold">
          Set soal
          <select
            value={seriesIndex}
            onChange={(event) => {
              setSeriesIndex(Number(event.target.value));
              setQuestionIndex(0);
              setSelectedAnswer(null);
              setCorrectCount(0);
            }}
            className="mt-2 min-h-11 w-full rounded-md border border-input bg-background px-3 text-foreground"
          >
            {series.map((item, index) => (
              <option key={item.id} value={index}>
                {item.title} · {item.questions.length} soal
              </option>
            ))}
          </select>
        </label>
      )}
      {chosenSubchapter && (
        <p className="text-sm leading-6 text-muted-foreground">{chosenSubchapter.description}</p>
      )}
      {finished ? (
        <div className="rounded-lg border border-positive/40 bg-positive/5 p-5" aria-live="polite">
          <p className="text-sm font-semibold text-positive">Set latihan selesai</p>
          <p className="mt-1 text-xl font-bold">
            {correctCount} dari {questions.length} jawaban sesuai kunci
          </p>
          <Button
            className="mt-4 min-h-11"
            onClick={() => {
              setQuestionIndex(0);
              setSelectedAnswer(null);
              setCorrectCount(0);
            }}
          >
            Ulangi set soal
          </Button>
        </div>
      ) : question ? (
        <article className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <p className="text-sm font-semibold text-primary">
            Soal {questionIndex + 1} dari {questions.length} · {question.difficulty}
          </p>
          <h3 className="mt-2 font-semibold leading-7">{question.prompt}</h3>
          <fieldset className="mt-4 grid gap-2">
            <legend className="sr-only">Pilih jawaban</legend>
            {question.options.map((option) => (
              <button
                key={option.label}
                type="button"
                disabled={selectedAnswer !== null}
                aria-pressed={selectedAnswer === option.label}
                onClick={() => {
                  setSelectedAnswer(option.label);
                  if (option.label === question.answer) setCorrectCount((count) => count + 1);
                }}
                className={`min-h-12 rounded-md border px-3 py-2 text-left text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedAnswer === option.label ? (option.label === question.answer ? "border-positive bg-positive/5" : "border-destructive bg-destructive/5") : selectedAnswer !== null && option.label === question.answer ? "border-positive bg-positive/5" : "border-border hover:border-primary/50"}`}
              >
                <strong className="mr-2">{option.label}.</strong>
                {option.text}
              </button>
            ))}
          </fieldset>
          {selectedAnswer !== null && (
            <div className="mt-4 border-t border-border pt-4" aria-live="polite">
              <p className="font-semibold">
                {selectedAnswer === question.answer
                  ? "Jawaban sesuai kunci latihan."
                  : `Kunci latihan: ${question.answer}.`}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{question.explanation}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                <strong className="text-foreground">Tips:</strong> {question.tip}
              </p>
              <Button className="mt-4 min-h-11" onClick={advance}>
                {questionIndex + 1 === questions.length ? "Lihat hasil" : "Soal berikutnya"}
              </Button>
            </div>
          )}
        </article>
      ) : (
        <p role="status" className="rounded-md border border-border p-4 text-sm">
          Soal untuk subtopik ini belum tersedia.
        </p>
      )}
    </section>
  );
}

function CATSimulator() {
  const [resultAlias, setResultAlias] = useState("");
  const examDialogRef = useRef<HTMLDialogElement>(null);
  const packageConfirmRef = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [pendingResume, setPendingResume] = useState<ExamSession | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>("cpns");
  const [trackTab, setTrackTab] = useState<"cpns" | "pppk" | "kedinasan" | "drill">("cpns");
  const [packageFilter, setPackageFilter] = useState<"all" | "new" | "done">("all");
  const [showPackageConfirm, setShowPackageConfirm] = useState(false);
  const [questionFilter, setQuestionFilter] = useState<"all" | "unanswered" | "flagged">("all");
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, string[]>>({});
  const [readyToStart, setReadyToStart] = useState(false);
  const [selectedPackageNumber, setSelectedPackageNumber] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(DEMO_RULES.durationSeconds);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect" | "flagged">("all");
  const [questionTextScale, setQuestionTextScale] = useState<0 | 1 | 2>(1);
  const [showFinishReview, setShowFinishReview] = useState(false);
  const [showMobileQuestionNav, setShowMobileQuestionNav] = useState(false);
  const [classicDisplay, setClassicDisplay] = useState(false);
  const [packageHistory, setPackageHistory] = useState<Record<string, number>>({});
  const isExamActive = session !== null;
  const navigationBlocker = useBlocker({
    shouldBlockFn: () => isExamActive,
    enableBeforeUnload: () => isExamActive,
    withResolver: true,
  });

  const moveToQuestion = useCallback(
    (nextIndex: number) => {
      if (!session) return;
      const questions = questionsForAttempt(session);
      if (nextIndex < 0 || nextIndex >= questions.length) return;
      const currentQuestion = questions[session.currentIndex];
      if (!currentQuestion) return;
      const elapsed = Math.max(0, Math.floor((Date.now() - session.questionStartedAt) / 1000));
      setSession({
        ...session,
        currentIndex: nextIndex,
        questionStartedAt: Date.now(),
        questionTimes: {
          ...session.questionTimes,
          [currentQuestion.id]: (session.questionTimes[currentQuestion.id] ?? 0) + elapsed,
        },
      });
      setShowFinishReview(false);
      setShowMobileQuestionNav(false);
      window.requestAnimationFrame(() => {
        document.getElementById("exam-heading")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    },
    [session],
  );

  useEffect(() => {
    try {
      const storage = window.localStorage;
      const savedSession = loadExamSession(storage);
      if (savedSession) setPendingResume(savedSession);
      else saveExamSession(storage, null);
      setResult(loadExamResult(storage));
      setClassicDisplay(storage.getItem("daftar-cpns:cat-display:v1") === "classic");
      const latest: Record<string, number> = {};
      for (const attempt of loadExamHistory(storage)) {
        if (!attempt.packageId || attempt.packageId in latest) continue;
        const attemptScore = scoreAttempt(attempt, attempt.answers);
        latest[attempt.packageId] = attemptScore.total
          ? Math.round((attemptScore.correct / attemptScore.total) * 100)
          : 0;
      }
      setPackageHistory(latest);
    } catch {
      setStorageError(true);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated || pendingResume) return;
    try {
      if (!saveExamSession(window.localStorage, session)) setStorageError(true);
    } catch {
      setStorageError(true);
    }
  }, [hydrated, pendingResume, session]);

  useEffect(() => {
    if (!session) return;
    if (session.mode === "study") return;
    const updateClock = () => {
      const next = Math.max(0, Math.ceil((session.deadline - Date.now()) / 1000));
      setRemainingSeconds(next);
      if (next === 0) finishExam(session);
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, [session]);

  useEffect(() => {
    if (!session) return;
    const activeSession = session;
    function onExamKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, button, [role='button'], [contenteditable='true']")
      )
        return;
      const currentQuestion = questionsForAttempt(activeSession)[activeSession.currentIndex];
      if (!currentQuestion) return;
      if (/^[a-e]$/i.test(event.key)) {
        event.preventDefault();
        const answer = event.key.toUpperCase();
        if (!currentQuestion.options.some((option) => option.label === answer)) return;
        if ((eliminatedOptions[currentQuestion.id] ?? []).includes(answer)) return;
        setSession((current) =>
          current
            ? { ...current, answers: { ...current.answers, [currentQuestion.id]: answer } }
            : current,
        );
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        moveToQuestion(activeSession.currentIndex + (event.key === "ArrowRight" ? 1 : -1));
      }
    }
    document.addEventListener("keydown", onExamKeyDown);
    return () => document.removeEventListener("keydown", onExamKeyDown);
  }, [eliminatedOptions, moveToQuestion, session]);

  useEffect(() => {
    const dialog = examDialogRef.current;
    if (session && dialog && !dialog.open) dialog.showModal();
  }, [session]);

  useEffect(() => {
    const dialog = packageConfirmRef.current;
    if (showPackageConfirm && dialog && !dialog.open) dialog.showModal();
    if (!showPackageConfirm && dialog?.open) dialog.close();
  }, [showPackageConfirm]);

  useEffect(() => {
    if (!isExamActive) return;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousOverflow;
    };
  }, [isExamActive]);

  function finishExam(finalSession: ExamSession) {
    const endedAt = Math.min(Date.now(), finalSession.deadline);
    const currentQuestion = questionsForAttempt(finalSession)[finalSession.currentIndex];
    const questionTimes = { ...finalSession.questionTimes };
    if (currentQuestion) {
      questionTimes[currentQuestion.id] =
        (questionTimes[currentQuestion.id] ?? 0) +
        Math.max(0, Math.floor((endedAt - finalSession.questionStartedAt) / 1000));
    }
    const completed: ExamResult = {
      track: finalSession.track,
      answers: finalSession.answers,
      flagged: finalSession.flagged,
      questionTimes,
      elapsedSeconds: Math.min(
        finalSession.packageId
          ? getExamPackage(finalSession.packageId).durationSeconds
          : rulesForTrack(finalSession.track).durationSeconds,
        Math.floor((endedAt - finalSession.startedAt) / 1000),
      ),
      endedAt,
      startedAt: finalSession.startedAt,
      packageId: finalSession.packageId,
    };
    setResult(completed);
    setSession(null);
    setShowReview(false);
    setReviewFilter("all");
    try {
      const storage = window.localStorage;
      const resultSaved = saveExamResult(storage, completed);
      const historySaved = saveExamHistory(storage, completed);
      const sessionCleared = saveExamSession(storage, null);
      if (!resultSaved || !historySaved || !sessionCleared) setStorageError(true);
    } catch {
      setStorageError(true);
    }
  }

  function startExam(track: Track, packageId?: string, mode: "exam" | "study" = "exam") {
    const selected = packageId ? getExamPackage(packageId) : undefined;
    if (selected && selected.track !== track) return;
    questionsForAttempt({ track, packageId });
    const now = Date.now();
    setResult(null);
    setSelectedTrack(null);
    setShowFinishReview(false);
    setShowMobileQuestionNav(false);
    setQuestionFilter("all");
    setShowPackageConfirm(false);
    setEliminatedOptions({});
    setSession({
      track,
      packageId,
      mode,
      answers: {},
      currentIndex: 0,
      flagged: [],
      deadline: now + (selected?.durationSeconds ?? rulesForTrack(track).durationSeconds) * 1000,
      startedAt: now,
      questionStartedAt: now,
      questionTimes: {},
    });
  }

  function toggleFlag(questionId: string) {
    if (!session) return;
    const flagged = session.flagged.includes(questionId)
      ? session.flagged.filter((id) => id !== questionId)
      : [...session.flagged, questionId];
    setSession({ ...session, flagged });
  }

  function toggleElimination(questionId: string, label: string) {
    if (session?.answers[questionId] === label) {
      setSession((current) => {
        if (!current || current.answers[questionId] !== label) return current;
        const answers = { ...current.answers };
        delete answers[questionId];
        return { ...current, answers };
      });
    }
    setEliminatedOptions((current) => {
      const existing = current[questionId] ?? [];
      const next = existing.includes(label)
        ? existing.filter((item) => item !== label)
        : [...existing, label];
      return { ...current, [questionId]: next };
    });
  }

  function downloadResult() {
    if (!result) return;
    const questions = questionsForAttempt(result);
    const score = scoreAttempt(result, result.answers);
    const lines = [
      `Hasil latihan demo: ${TRACKS.find((track) => track.id === result.track)?.name ?? result.track}`,
      `Paket: ${result.packageId ? getExamPackage(result.packageId).title : "Latihan umum"}`,
      `Skor latihan: ${score.correct} dari ${score.total} jawaban benar`,
      `Durasi: ${formatDuration(result.elapsedSeconds)}`,
      "Catatan: hasil ini hanya untuk latihan, bukan nilai atau passing grade resmi.",
      "",
      ...questions.flatMap((question, index) => [
        `${index + 1}. ${question.prompt}`,
        `Jawaban Anda: ${result.answers[question.id] ?? "Belum dijawab"}`,
        `Kunci latihan: ${question.answer}`,
        `Pembahasan: ${question.explanation}`,
        `Tips & trik: ${question.tip}`,
        "",
      ]),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hasil-latihan-cat-demo.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!hydrated)
    return (
      <section aria-live="polite" className="border-t-2 border-primary bg-card p-5">
        <p className="font-bold">Memulihkan sesi latihan...</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Data dibaca dari penyimpanan browser perangkat ini.
        </p>
      </section>
    );

  if (pendingResume) {
    const resumeTrack = TRACKS.find((track) => track.id === pendingResume.track);
    const resumeQuestions = questionsForAttempt(pendingResume);
    return (
      <section
        aria-labelledby="resume-session-heading"
        className="rounded-xl border border-border bg-card p-5 sm:p-6"
      >
        <p className="text-sm font-bold text-primary">Sesi latihan tersimpan</p>
        <h2 id="resume-session-heading" className="mt-1 text-2xl font-extrabold">
          {resumeTrack?.name}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Ada sesi {pendingResume.currentIndex + 1} dari {resumeQuestions.length} yang belum
          selesai. Lanjutkan sesi ini atau akhiri untuk memilih paket soal lain. Jika dilanjutkan,
          timer tetap berjalan.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            className="min-h-11"
            onClick={() => {
              setSession(pendingResume);
              setPendingResume(null);
            }}
          >
            Lanjutkan {resumeTrack?.name}
          </Button>
          <Button
            variant="outline"
            className="min-h-11"
            onClick={() => {
              setPendingResume(null);
              setSelectedTrack(null);
              try {
                saveExamSession(window.localStorage, null);
              } catch {
                setStorageError(true);
              }
            }}
          >
            Akhiri sesi dan pilih paket lain
          </Button>
        </div>
      </section>
    );
  }

  const storageNotice = storageError ? (
    <p role="alert" className="mb-4 border-l-4 border-destructive bg-card p-3 text-sm leading-6">
      Penyimpanan browser tidak tersedia. Latihan dapat diteruskan selama halaman terbuka, tetapi
      progres mungkin tidak tersimpan setelah halaman ditutup.
    </p>
  ) : null;

  if (session) {
    const questions = questionsForAttempt(session);
    const question = questions[session.currentIndex];
    if (!question)
      return (
        <section role="alert" className="border-l-4 border-destructive bg-card p-5">
          <h2 className="font-bold">Sesi latihan tidak dapat dibaca</h2>
          <p className="mt-2 text-muted-foreground">Mulai ulang sesi ini untuk melanjutkan.</p>
          <Button
            className="mt-4 min-h-11"
            onClick={() => startExam(session.track, session.packageId)}
          >
            Mulai ulang sesi
          </Button>
        </section>
      );
    const answered = Object.keys(session.answers).length;
    const unanswered = questions.length - answered;
    const visibleQuestions = questions
      .map((item, index) => ({ item, index }))
      .filter(
        ({ item }) =>
          questionFilter === "all" ||
          (questionFilter === "unanswered" && !session.answers[item.id]) ||
          (questionFilter === "flagged" && session.flagged.includes(item.id)),
      );
    const selected = session.answers[question.id];
    const isLast = session.currentIndex === questions.length - 1;
    const displayTime = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;
    const timerState =
      remainingSeconds <= 180 ? "urgent" : remainingSeconds <= 600 ? "warning" : "normal";
    return createPortal(
      <dialog
        ref={examDialogRef}
        aria-labelledby="exam-dialog-title"
        onCancel={(event) => event.preventDefault()}
        className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0 text-slate-950 backdrop:bg-slate-950/45 dark:text-foreground"
      >
        <div
          data-exam-display={classicDisplay ? "classic" : "modern"}
          className="exam-room flex h-full flex-col overflow-y-auto bg-slate-50 dark:bg-background"
        >
          <header className="sticky top-0 z-20 shrink-0 bg-primary text-primary-foreground shadow-md">
            <div className="mx-auto max-w-[1440px] px-3 pt-2 sm:px-6">
              <ExamControls target={examDialogRef} />
            </div>
            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/brand/daftar-cpns-mark.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-8 shrink-0 sm:size-10"
                />
                <div className="min-w-0">
                  <h2 id="exam-dialog-title" className="truncate text-sm font-extrabold">
                    Latihan CAT CPNS
                  </h2>
                  <p className="truncate text-xs text-primary-foreground/80">
                    {TRACKS.find((track) => track.id === session.track)?.name} · Simulasi independen
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  aria-pressed={classicDisplay}
                  className="min-h-11 border-white/30 bg-white/10 px-2 text-xs text-white hover:bg-white/20 sm:px-3 sm:text-sm"
                  onClick={() =>
                    setClassicDisplay((current) => {
                      const next = !current;
                      try {
                        window.localStorage.setItem(
                          "daftar-cpns:cat-display:v1",
                          next ? "classic" : "modern",
                        );
                      } catch {
                        /* Display choice lasts for this session. */
                      }
                      return next;
                    })
                  }
                >
                  {classicDisplay ? "Mode klasik" : "Mode modern"}
                </Button>
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-primary-foreground/80">Soal</p>
                  <p className="text-sm font-bold tabular-nums">
                    {session.currentIndex + 1} / {questions.length}
                  </p>
                </div>
                <div
                  role={session.mode === "study" ? "status" : "timer"}
                  aria-label={`Waktu tersisa ${displayTime}${timerState === "urgent" ? ", tiga menit atau kurang" : timerState === "warning" ? ", sepuluh menit atau kurang" : ""}`}
                  aria-live="off"
                  className={`flex min-h-11 items-center gap-1.5 rounded-md border px-2.5 text-sm font-bold tabular-nums sm:min-h-12 sm:gap-2 sm:px-3 sm:text-base ${timerState === "urgent" ? "border-red-200 bg-red-50 text-red-900 motion-safe:animate-pulse dark:border-red-800 dark:bg-red-950 dark:text-red-100" : timerState === "warning" ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100" : "border-white/25 bg-white/15 text-white"}`}
                >
                  <Clock3 size={17} aria-hidden="true" />
                  {session.mode !== "study" ? (
                    <span>{displayTime}</span>
                  ) : (
                    <span>Mode Belajar</span>
                  )}
                  {timerState !== "normal" && (
                    <span className="hidden text-xs font-semibold sm:inline">
                      {timerState === "urgent" ? "Waktu hampir habis" : "Waktu menipis"}
                    </span>
                  )}
                </div>
                <span className="sr-only" aria-live="polite">
                  {remainingSeconds === 600
                    ? "Sisa waktu 10 menit."
                    : remainingSeconds === 180
                      ? "Sisa waktu 3 menit."
                      : ""}
                </span>
              </div>
            </div>
            <progress
              aria-label={`Progres: ${answered} dari ${questions.length} soal sudah dijawab`}
              value={answered}
              max={questions.length}
              className="block h-1.5 w-full accent-white"
            />
            <div className="h-1 w-full bg-black/20" aria-hidden="true">
              <div
                className="h-full bg-amber-300 transition-[width] duration-1000"
                style={{
                  width: `${Math.max(0, Math.min(100, (remainingSeconds / Math.max(1, (session.deadline - session.startedAt) / 1000)) * 100))}%`,
                }}
              />
            </div>
          </header>

          <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-4 px-3 py-4 pb-6 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <aside className="order-2 hidden h-fit rounded-lg border border-slate-200 bg-white p-4 dark:border-border dark:bg-card lg:sticky lg:top-5 lg:order-1 lg:block">
              {storageNotice}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold">Navigasi soal</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Pilih nomor untuk berpindah.</p>
                </div>
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold tabular-nums dark:bg-secondary">
                  {answered}/{questions.length}
                </span>
              </div>
              <div
                className="mt-3 grid grid-cols-3 gap-1"
                role="group"
                aria-label="Filter nomor soal"
              >
                {(
                  [
                    ["all", `Semua ${questions.length}`],
                    ["unanswered", `Belum ${unanswered}`],
                    ["flagged", `Ragu ${session.flagged.length}`],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={questionFilter === value}
                    onClick={() => setQuestionFilter(value)}
                    className={`min-h-10 rounded-md border px-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${questionFilter === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
                {visibleQuestions.map(({ item, index }) => {
                  const isCurrent = index === session.currentIndex;
                  const isAnswered = Boolean(session.answers[item.id]);
                  const isFlagged = session.flagged.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => moveToQuestion(index)}
                      aria-label={`Soal ${index + 1}, ${isAnswered ? "sudah dijawab" : "belum dijawab"}${isFlagged ? ", ditandai ragu" : ""}${isCurrent ? ", sedang dibuka" : ""}`}
                      aria-current={isCurrent ? "step" : undefined}
                      className={`relative min-h-11 min-w-11 rounded-md border text-sm font-bold tabular-nums transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isCurrent ? "border-primary bg-primary text-primary-foreground" : isAnswered ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15" : "border-slate-200 bg-white text-slate-700 hover:border-primary/50 dark:border-border dark:bg-background dark:text-foreground"}`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-amber-500 dark:border-card"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <ul className="mt-4 grid gap-2 border-t border-slate-200 pt-4 text-xs text-muted-foreground dark:border-border">
                <li className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-sm border border-primary/40 bg-primary/10"
                    aria-hidden="true"
                  />
                  Sudah dijawab
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-sm border border-slate-300 bg-white dark:border-border dark:bg-background"
                    aria-hidden="true"
                  />
                  Belum dijawab
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-amber-500" aria-hidden="true" />
                  Ditandai untuk ditinjau
                </li>
              </ul>
              <p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-5 text-muted-foreground dark:border-border">
                Jawaban tersimpan di browser perangkat ini.
              </p>
            </aside>

            <section aria-labelledby="exam-heading" className="order-1 min-w-0 lg:order-2">
              <div
                key={question.id}
                className="question-transition rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7 dark:border-border dark:bg-card"
              >
                <QuestionBookmark questionId={question.id} />
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-border">
                  <div>
                    <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {question.subject}
                    </p>
                    <h1
                      id="exam-heading"
                      className="mt-1 scroll-mt-24 text-xl font-extrabold sm:text-2xl"
                    >
                      Soal {session.currentIndex + 1}
                      <span className="font-medium text-muted-foreground">
                        {" "}
                        dari {questions.length}
                      </span>
                    </h1>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {selected ? "Jawaban tersimpan" : "Belum dijawab"}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 dark:border-border">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Ukuran teks soal
                  </span>
                  <div
                    role="group"
                    aria-label="Ukuran teks soal"
                    className="inline-flex rounded-md border border-border"
                  >
                    {([0, 1, 2] as const).map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        aria-pressed={questionTextScale === scale}
                        onClick={() => setQuestionTextScale(scale)}
                        className={`min-h-11 min-w-11 px-3 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${questionTextScale === scale ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                      >
                        {scale === 0 ? "A−" : scale === 1 ? "A" : "A+"}
                      </button>
                    ))}
                  </div>
                </div>
                <h2
                  className={`mt-5 font-semibold leading-8 ${questionTextScale === 0 ? "text-sm sm:text-base" : questionTextScale === 2 ? "text-lg leading-8 sm:text-xl" : "text-base sm:text-lg"}`}
                >
                  {question.prompt}
                </h2>
                <fieldset className="mt-5 grid gap-3">
                  <legend className="sr-only">Pilih jawaban</legend>
                  {question.options.map((option) => {
                    const crossed = (eliminatedOptions[question.id] ?? []).includes(option.label);
                    return (
                      <div
                        key={option.label}
                        className={`flex min-w-0 items-stretch rounded-md border transition-colors ${session.mode === "study" && selected && option.label === question.answer ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600/30 dark:bg-emerald-950/30" : session.mode === "study" && selected === option.label && selected !== question.answer ? "border-rose-500 bg-rose-50 dark:bg-rose-950/30" : selected === option.label ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-slate-200 dark:border-border"}`}
                      >
                        <label
                          className={`flex min-h-12 min-w-0 flex-1 cursor-pointer items-start gap-3 p-3.5 leading-6 sm:p-4 ${crossed ? "opacity-40" : "hover:bg-slate-50 dark:hover:bg-secondary/50"}`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.label}
                            checked={selected === option.label}
                            disabled={crossed}
                            onChange={() =>
                              setSession({
                                ...session,
                                answers: { ...session.answers, [question.id]: option.label },
                              })
                            }
                            className="mt-1 size-4 shrink-0 accent-primary"
                          />
                          <span
                            className={`min-w-0 text-sm sm:text-base ${crossed ? "line-through" : ""}`}
                          >
                            <strong className="mr-2 rounded border border-border px-1.5 py-0.5 text-xs">
                              {option.label}
                            </strong>
                            {option.text}
                            {session.mode === "study" &&
                              selected &&
                              option.label === question.answer && (
                                <span className="ml-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                                  ✓ Kunci
                                </span>
                              )}
                          </span>
                        </label>
                        <button
                          type="button"
                          aria-pressed={crossed}
                          aria-label={`${crossed ? "Batalkan coret" : "Coret"} opsi ${option.label}`}
                          onClick={() => toggleElimination(question.id, option.label)}
                          className="min-h-11 min-w-12 self-center border-l border-border px-2 text-xs font-semibold text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {crossed ? "Pulihkan" : "Coret"}
                        </button>
                      </div>
                    );
                  })}
                </fieldset>
                {session.mode === "study" && selected && (
                  <div className="mt-5 rounded-xl border border-border bg-card p-4 sm:p-5">
                    <p
                      className={`rounded-lg px-3 py-2 text-sm font-bold ${selected === question.answer ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200" : "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"}`}
                    >
                      {selected === question.answer
                        ? "✓ Jawaban Anda tepat!"
                        : `Belum tepat · Kunci jawaban ${question.answer}`}
                    </p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Dasar teori & pembahasan
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      {question.explanation}
                    </p>
                    <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50/70 p-3 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
                      <strong>⚡ Trik cepat:</strong> {question.tip}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-border">
                  <button
                    type="button"
                    onClick={() => toggleFlag(question.id)}
                    aria-pressed={session.flagged.includes(question.id)}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {session.flagged.includes(question.id)
                      ? "Hapus tanda tinjau"
                      : "Tandai untuk ditinjau"}
                  </button>
                  <div className="hidden w-full flex-wrap gap-2 lg:flex lg:w-auto">
                    <Button
                      variant="outline"
                      className="min-h-11 flex-1 sm:flex-none"
                      disabled={session.currentIndex === 0}
                      onClick={() => moveToQuestion(session.currentIndex - 1)}
                    >
                      Sebelumnya
                    </Button>
                    {isLast ? (
                      <Button
                        className="min-h-11 flex-1 sm:flex-none"
                        onClick={() => setShowFinishReview(true)}
                      >
                        Periksa &amp; akhiri
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="min-h-11 flex-1 sm:flex-none"
                          onClick={() => moveToQuestion(session.currentIndex + 1)}
                        >
                          Simpan dan lanjutkan
                        </Button>
                        {!selected && (
                          <Button
                            variant="outline"
                            className="min-h-11 flex-1 border-primary/40 text-primary hover:bg-primary/5 sm:flex-none"
                            onClick={() => moveToQuestion(session.currentIndex + 1)}
                          >
                            Lewatkan
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="mt-3 hidden text-xs text-muted-foreground sm:block">
                  Pintasan keyboard: A–E untuk memilih jawaban, ← dan → untuk berpindah soal.
                </p>
              </div>

              {showFinishReview && (
                <section
                  aria-labelledby="finish-review-heading"
                  className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4 sm:p-5"
                >
                  <h2 id="finish-review-heading" className="font-bold">
                    Periksa sebelum mengakhiri
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {unanswered
                      ? `Masih ada ${unanswered} soal yang belum dijawab.`
                      : "Semua soal sudah dijawab."}{" "}
                    {session.flagged.length
                      ? `${session.flagged.length} soal ditandai untuk ditinjau.`
                      : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="min-h-11"
                      onClick={() => setShowFinishReview(false)}
                    >
                      Kembali ke soal
                    </Button>
                    <Button className="min-h-11" onClick={() => finishExam(session)}>
                      Akhiri simulasi
                    </Button>
                  </div>
                </section>
              )}
            </section>
          </div>
          <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-border dark:bg-card/95 lg:hidden">
            <section
              id="mobile-question-navigation"
              aria-label="Daftar nomor soal"
              hidden={!showMobileQuestionNav}
              className="mb-2 max-h-[44dvh] overflow-y-auto rounded-lg border border-border bg-background p-3"
            >
              <div className="sticky top-0 z-10 mb-3 flex items-center justify-between gap-3 bg-background pb-2">
                <p className="text-sm font-bold">Navigasi soal</p>
                <p className="text-xs text-muted-foreground">
                  {answered} dijawab · {unanswered} belum
                </p>
              </div>
              <div
                className="mb-3 grid grid-cols-3 gap-1"
                role="group"
                aria-label="Filter nomor soal"
              >
                {(
                  [
                    ["all", `Semua ${questions.length}`],
                    ["unanswered", `Belum ${unanswered}`],
                    ["flagged", `Ragu ${session.flagged.length}`],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={questionFilter === value}
                    onClick={() => setQuestionFilter(value)}
                    className={`min-h-10 rounded-md border px-1 text-xs font-semibold ${questionFilter === value ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-2 sm:grid-cols-8">
                {visibleQuestions.map(({ item, index }) => {
                  const isCurrent = index === session.currentIndex;
                  const isAnswered = Boolean(session.answers[item.id]);
                  const isFlagged = session.flagged.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => moveToQuestion(index)}
                      aria-label={`Soal ${index + 1}, ${isAnswered ? "sudah dijawab" : "belum dijawab"}${isFlagged ? ", ditandai ragu" : ""}${isCurrent ? ", sedang dibuka" : ""}`}
                      aria-current={isCurrent ? "step" : undefined}
                      className={`relative min-h-11 rounded-md border text-sm font-bold tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isCurrent ? "border-primary bg-primary text-primary-foreground" : isAnswered ? "border-primary/40 bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-700 dark:border-border dark:bg-card dark:text-foreground"}`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-amber-500 dark:border-card"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Nomor berwarna menandakan soal sudah dijawab. Titik kuning menandakan soal yang
                ditandai untuk ditinjau.
              </p>
            </section>
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2">
              <Button
                type="button"
                variant="outline"
                className="min-h-11 px-2 text-xs sm:text-sm"
                disabled={session.currentIndex === 0}
                onClick={() => moveToQuestion(session.currentIndex - 1)}
              >
                Sebelumnya
              </Button>
              <Button
                type="button"
                variant="outline"
                className="min-h-11 px-3 text-xs font-bold tabular-nums sm:text-sm"
                aria-label={showMobileQuestionNav ? "Tutup navigasi soal" : "Buka navigasi soal"}
                aria-expanded={showMobileQuestionNav}
                aria-controls="mobile-question-navigation"
                onClick={() => setShowMobileQuestionNav((open) => !open)}
              >
                {session.currentIndex + 1}/{questions.length}
              </Button>
              {isLast ? (
                <Button
                  type="button"
                  className="min-h-11 px-2 text-xs sm:text-sm"
                  onClick={() => {
                    setShowMobileQuestionNav(false);
                    setShowFinishReview(true);
                  }}
                >
                  Periksa
                </Button>
              ) : (
                <Button
                  type="button"
                  className="min-h-11 px-2 text-xs sm:text-sm"
                  onClick={() => moveToQuestion(session.currentIndex + 1)}
                >
                  Berikutnya
                </Button>
              )}
            </div>
          </div>
          {navigationBlocker.status === "blocked" && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4">
              <section
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="leave-exam-heading"
                aria-describedby="leave-exam-description"
                className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-xl sm:p-6"
              >
                <h2 id="leave-exam-heading" className="text-lg font-extrabold">
                  Ujian masih berlangsung
                </h2>
                <p
                  id="leave-exam-description"
                  className="mt-2 text-sm leading-6 text-muted-foreground"
                >
                  Jawaban Anda tersimpan otomatis. Jika keluar, waktu ujian tetap berjalan.
                </p>
                <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline" className="min-h-11" onClick={navigationBlocker.reset}>
                    Lanjutkan ujian
                  </Button>
                  <Button className="min-h-11" onClick={navigationBlocker.proceed}>
                    Keluar dari ujian
                  </Button>
                </div>
              </section>
            </div>
          )}
        </div>
      </dialog>,
      document.body,
    );
  }

  if (result) {
    const questions = questionsForAttempt(result);
    const score = scoreAttempt(result, result.answers);
    const timedQuestions = Object.values(result.questionTimes);
    const average = timedQuestions.length
      ? Math.round(
          timedQuestions.reduce((sum, seconds) => sum + seconds, 0) / timedQuestions.length,
        )
      : 0;
    const reviewQuestions = questions
      .map((item, index) => ({ item, index }))
      .filter(
        ({ item }) =>
          reviewFilter === "all" ||
          (reviewFilter === "incorrect" &&
            result.answers[item.id] !== undefined &&
            result.answers[item.id] !== item.answer) ||
          (reviewFilter === "flagged" && result.flagged?.includes(item.id)),
      );
    const chartData = score.breakdown.map((item) => ({
      subject: item.subject,
      benar: item.total ? Math.round((item.correct / item.total) * 100) : 0,
    }));
    const rankedBreakdown = score.breakdown
      .filter((item) => item.total > 0)
      .map((item) => ({ ...item, pct: Math.round((item.correct / item.total) * 100) }))
      .sort((left, right) => left.pct - right.pct);
    const weakestSubject = rankedBreakdown[0];
    const strongestSubject = rankedBreakdown[rankedBreakdown.length - 1];
    const studyRecommendation = weakestSubject
      ? !strongestSubject || weakestSubject.pct === strongestSubject.pct
        ? `Hasil tiap materi masih berdekatan. Tinjau pembahasan soal yang salah pada ${weakestSubject.subject}, lalu coba paket latihan lain.`
        : `Hasil terbaik Anda di ${strongestSubject.subject} (${strongestSubject.pct}% benar). Prioritaskan ${weakestSubject.subject} (${weakestSubject.pct}% benar): baca pembahasannya, lalu coba latihan kilat ${weakestSubject.subject}.`
      : "Tinjau pembahasan soal yang dikerjakan, lalu pilih latihan berikutnya.";
    const thresholdRows = score.breakdown.map((item) => {
      const threshold = item.subject === "TWK" ? 65 : item.subject === "TIU" ? 80 : 166;
      const comparable = item.subject === "TWK" || item.subject === "TIU";
      const practiceScore = comparable ? item.correct * 5 : null;
      return {
        subject: item.subject,
        score: practiceScore,
        threshold,
        met: practiceScore !== null && practiceScore >= threshold,
      };
    });
    const comparableThresholds = thresholdRows.filter((item) => item.score !== null);
    const allComparableThresholdsMet =
      comparableThresholds.length > 0 && comparableThresholds.every((item) => item.met);
    const thresholdSummary =
      result.track !== "cpns"
        ? "Ambang SKD tidak dibandingkan untuk jalur latihan ini."
        : `${allComparableThresholdsMet ? "Memenuhi" : "Belum memenuhi"} patokan subtes TWK/TIU yang dapat dihitung. Status keseluruhan SKD tidak disimpulkan karena bobot TKP per pilihan tidak tersimpan.`;
    const thresholdData = score.breakdown
      .filter((item) => item.subject === "TWK" || item.subject === "TIU")
      .map((item) => ({
        subject: item.subject,
        peserta: item.correct * 5,
        ambang: item.subject === "TWK" ? 65 : 80,
        maksimum: item.subject === "TWK" ? 150 : 175,
      }));
    return (
      <>
        <section
          aria-labelledby="result-heading"
          className="border-t-2 border-positive bg-card p-4 sm:p-6"
        >
          {storageNotice}
          <p className="text-sm font-bold text-positive">Latihan selesai</p>
          <h2 id="result-heading" className="mt-1 text-2xl font-extrabold">
            Ringkasan hasil demo
          </h2>
          <p className="mt-2 leading-6 text-muted-foreground">
            {TRACKS.find((track) => track.id === result.track)?.name}. Angka ini hanya menggambarkan
            latihan pada sesi ini, bukan passing grade atau prediksi kelulusan.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="col-span-2 border border-border p-4 sm:col-span-1">
              <p className="text-sm text-muted-foreground">Jawaban benar</p>
              <p className="mt-1 text-2xl font-extrabold">
                {score.correct}
                <span className="text-base font-medium text-muted-foreground">
                  {" "}
                  / {score.total}
                </span>
              </p>
            </div>
            <div className="border border-border p-4">
              <p className="text-sm text-muted-foreground">Waktu pengerjaan</p>
              <p className="mt-1 text-2xl font-extrabold">
                {formatDuration(result.elapsedSeconds)}
              </p>
            </div>
            <div className="border border-border p-4">
              <p className="text-sm text-muted-foreground">Rata-rata waktu per soal yang dibuka</p>
              <p className="mt-1 text-2xl font-extrabold">{average} detik</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-bold">Persentase jawaban benar per materi</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Perbandingan ini memakai jumlah soal latihan yang benar pada setiap kelompok.
            </p>
            <div
              role="img"
              aria-label={chartData
                .map((item) => `${item.subject}: ${item.benar} persen benar`)
                .join(". ")}
              className="mt-3 h-56 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="subject" tickLine={false} axisLine={false} />
                  <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, "Jawaban benar"]} />
                  <Bar
                    dataKey="benar"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={56}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-6">
              <p className="font-bold text-primary">Saran belajar berikutnya</p>
              <p className="mt-1">{studyRecommendation}</p>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
              {score.breakdown.map((item) => (
                <li key={item.subject} className="border border-border p-3">
                  <span className="font-semibold">{item.subject}</span>
                  <span className="mt-1 block text-muted-foreground">
                    {item.correct} dari {item.total} soal benar
                  </span>
                </li>
              ))}
            </ul>
            {result.track === "cpns" && (
              <section
                aria-labelledby="skd-threshold-result-heading"
                className="mt-6 border-t border-border pt-5"
              >
                <VisualScorecard
                  rows={score.breakdown}
                  date={result.endedAt}
                  alias={resultAlias}
                  onAliasChange={setResultAlias}
                />
                <h3 id="skd-threshold-result-heading" className="mt-6 font-bold">
                  Perbandingan dengan ambang SKD umum 2024
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  TWK dan TIU memakai konversi resmi 5 poin per jawaban benar. Soal latihan TKP
                  belum menyimpan bobot nilai untuk tiap pilihan.
                </p>
                <p role="status" className="mt-2 rounded-md bg-secondary p-3 text-sm leading-6">
                  {thresholdSummary}
                </p>
                {thresholdData.length > 0 && (
                  <div
                    role="img"
                    aria-label={thresholdData
                      .map(
                        (item) =>
                          `${item.subject}: skor latihan ${item.peserta} dari ${item.maksimum}, ambang ${item.ambang}`,
                      )
                      .join(". ")}
                    className="mt-3 h-60 w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={thresholdData}
                        margin={{ top: 12, right: 12, left: -18, bottom: 0 }}
                      >
                        <CartesianGrid vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="subject" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 175]} tickLine={false} axisLine={false} />
                        <Tooltip
                          formatter={(value, name) => [
                            `${value}`,
                            name === "peserta" ? "Skor peserta" : "Ambang batas",
                          ]}
                        />
                        <Bar
                          dataKey="peserta"
                          name="Skor peserta"
                          fill="var(--primary)"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={42}
                        />
                        <Bar
                          dataKey="ambang"
                          name="Ambang batas"
                          fill="var(--chart-4)"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={42}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {thresholdRows.map((item) => {
                    return (
                      <li
                        key={item.subject}
                        className={`border p-3 ${item.score === null ? "border-amber-400/50 bg-amber-50 dark:bg-amber-950/20" : item.met ? "border-positive/40 bg-positive/5" : "border-destructive/40 bg-destructive/5"}`}
                      >
                        <p className="font-semibold">{item.subject}</p>
                        <p className="mt-1 text-sm">
                          {item.score === null
                            ? "Skor resmi tidak dapat dihitung"
                            : `${item.score} / ${item.threshold} ambang`}
                        </p>
                        <p
                          className={`mt-1 text-xs font-semibold ${item.score === null ? "text-amber-800 dark:text-amber-200" : item.met ? "text-positive" : "text-destructive"}`}
                        >
                          {item.score === null
                            ? "Bobot pilihan belum tersedia"
                            : item.met
                              ? "Memenuhi ambang"
                              : "Di bawah ambang"}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
          <div className="mt-6 flex flex-col flex-wrap gap-2 sm:flex-row">
            <Button className="min-h-11" onClick={() => setShowReview(!showReview)}>
              {showReview ? "Tutup pembahasan" : "Tinjau pembahasan"}
            </Button>
            <Button variant="outline" className="min-h-11" onClick={downloadResult}>
              <Download size={17} aria-hidden="true" />
              Unduh pembahasan (.txt)
            </Button>
            <Button className="min-h-11" onClick={() => window.print()}>
              <Download size={17} aria-hidden="true" />
              Unduh lembar hasil (PDF)
            </Button>
            <Button
              variant="outline"
              className="min-h-11"
              onClick={() => startExam(result.track, result.packageId)}
            >
              <RotateCcw size={17} aria-hidden="true" />
              Ulangi latihan
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setResult(null)}>
              Pilih jalur lain
            </Button>
          </div>
          {showReview && (
            <div className="mt-6 space-y-4 border-t border-border pt-5">
              <h3 className="font-bold">Jawaban dan pembahasan</h3>
              <div role="group" aria-label="Saring pembahasan" className="flex flex-wrap gap-2">
                {(
                  [
                    ["all", "Semua soal"],
                    ["incorrect", "Jawaban salah"],
                    ["flagged", "Ditandai ragu"],
                  ] as const
                ).map(([filter, label]) => (
                  <Button
                    key={filter}
                    type="button"
                    size="sm"
                    variant={reviewFilter === filter ? "default" : "outline"}
                    aria-pressed={reviewFilter === filter}
                    className="min-h-11"
                    onClick={() => setReviewFilter(filter)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              {reviewQuestions.length ? (
                reviewQuestions.map(({ item, index }) => (
                  <ReviewQuestion
                    key={item.id}
                    question={item}
                    index={index}
                    answer={result.answers[item.id]}
                    flagged={Boolean(result.flagged?.includes(item.id))}
                  />
                ))
              ) : (
                <p
                  role="status"
                  className="rounded-md border border-border p-4 text-sm text-muted-foreground"
                >
                  Tidak ada soal yang cocok dengan filter ini.
                </p>
              )}
            </div>
          )}
        </section>
        {createPortal(
          <section id="exam-result-pdf" className="hidden" aria-label="Lembar hasil simulasi CAT">
            <p className="text-xs font-bold uppercase tracking-wide">
              DAFTAR CPNS · LATIHAN INDEPENDEN
            </p>
            <h1 className="mt-2 text-2xl font-bold">Lembar hasil simulasi CAT</h1>
            <VisualScorecard rows={score.breakdown} date={result.endedAt} alias={resultAlias} />
            <p className="mt-1 text-sm">
              {TRACKS.find((track) => track.id === result.track)?.name} ·{" "}
              {result.packageId ? getExamPackage(result.packageId).title : "Latihan umum"}
            </p>
            <p className="mt-1 text-sm">
              Selesai{" "}
              {new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short" }).format(
                result.endedAt,
              )}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="border p-3">
                <p className="text-xs">Jawaban benar</p>
                <p className="mt-1 text-lg font-bold">
                  {score.correct} / {score.total}
                </p>
              </div>
              <div className="border p-3">
                <p className="text-xs">Waktu pengerjaan</p>
                <p className="mt-1 text-lg font-bold">{formatDuration(result.elapsedSeconds)}</p>
              </div>
              <div className="border p-3">
                <p className="text-xs">Rata-rata per soal</p>
                <p className="mt-1 text-lg font-bold">{average} detik</p>
              </div>
            </div>
            <h2 className="mt-6 text-base font-bold">Nilai per materi</h2>
            <table className="mt-2 w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Materi</th>
                  <th className="border p-2 text-left">Benar</th>
                  <th className="border p-2 text-left">Akurasi</th>
                </tr>
              </thead>
              <tbody>
                {score.breakdown.map((item) => (
                  <tr key={item.subject}>
                    <th className="border p-2 text-left font-semibold">{item.subject}</th>
                    <td className="border p-2">
                      {item.correct} / {item.total}
                    </td>
                    <td className="border p-2">
                      {item.total ? Math.round((item.correct / item.total) * 100) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="mt-6 text-base font-bold">Status ambang nilai</h2>
            <p className="mt-2 text-sm leading-6">{thresholdSummary}</p>
            {result.track === "cpns" && (
              <ul className="mt-2 grid grid-cols-3 gap-2 text-sm">
                {thresholdRows.map((item) => (
                  <li key={item.subject} className="border p-3">
                    <p className="font-bold">{item.subject}</p>
                    <p className="mt-1">
                      {item.score === null ? "Tidak dihitung" : `${item.score} / ${item.threshold}`}
                    </p>
                    <p className="mt-1">
                      {item.score === null
                        ? "Bobot pilihan tidak tersedia"
                        : item.met
                          ? "Memenuhi ambang"
                          : "Di bawah ambang"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <h2 className="mt-6 text-base font-bold">Saran belajar berikutnya</h2>
            <p className="mt-2 text-sm leading-6">{studyRecommendation}</p>
            <p className="mt-6 border-t pt-3 text-xs leading-5">
              Nilai dan persentase di atas berasal dari latihan pada sesi ini. Perbandingan ambang
              SKD CPNS menggunakan patokan umum 2024 untuk TWK/TIU; bobot TKP latihan tidak
              tersimpan sehingga status kelulusan keseluruhan tidak dapat disimpulkan. Periksa
              ketentuan resmi periode berjalan.
            </p>
          </section>,
          document.body,
        )}
        <p className="mt-2 text-xs text-muted-foreground print:hidden">
          Pada dialog cetak, pilih “Simpan sebagai PDF”.
        </p>
      </>
    );
  }

  const activeTrack = TRACKS.find((track) => track.id === selectedTrack);
  const activePackage = EXAM_PACKAGES.find(
    (item) => item.track === selectedTrack && item.number === selectedPackageNumber,
  );
  const packageReady =
    !activePackage ||
    Object.entries(activePackage.composition).every(
      ([subject, count]) =>
        QUESTION_BANK.filter(
          (question) =>
            question.subject === subject &&
            (!["twk", "tiu", "tkp"].includes(activePackage.track) ||
              question.difficulty === "HOTS"),
        ).length >= count,
    );
  const activeQuestions =
    selectedTrack && packageReady
      ? questionsForAttempt({
          track: selectedTrack,
          ...(activePackage ? { packageId: activePackage.id } : {}),
        })
      : [];
  const questionCount = activePackage
    ? Object.values(activePackage.composition).reduce((sum, count) => sum + count, 0)
    : activeQuestions.length;
  const subjectBreakdown =
    activeTrack?.subjects.map((subject) => ({
      subject,
      count:
        activePackage?.composition[subject] ??
        activeQuestions.filter((question) => question.subject === subject).length,
    })) ?? [];

  return (
    <section aria-labelledby="simulator-heading" className="mx-auto max-w-7xl space-y-5">
      {storageNotice}
      <header className="exam-hub-hero rounded-xl bg-primary p-5 text-primary-foreground sm:p-6">
        <p className="text-sm font-semibold text-primary-foreground/80">
          SIMULASI CAT MANDIRI · GRATIS · TANPA AKUN
        </p>
        <h2 id="simulator-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Pusat latihan CAT
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-primary-foreground/85">
          Pilih jalur dan paket. Jawaban tersimpan di browser ini, bahkan saat koneksi terputus
          setelah halaman terbuka.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold">
            Siap digunakan offline setelah dimuat
          </span>
          <span className="rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold">
            Progres tersimpan di browser
          </span>
        </div>
      </header>
      <div
        className="mt-4 flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl bg-muted p-1.5"
        role="tablist"
        aria-label="Jalur seleksi"
      >
        {(
          [
            ["cpns", "SKD CPNS"],
            ["pppk", "PPPK"],
            ["kedinasan", "Kedinasan"],
            ["drill", "Drill Materi"],
          ] as const
        ).map(([tab, label]) => (
          <button
            type="button"
            key={tab}
            role="tab"
            aria-selected={trackTab === tab}
            onClick={() => {
              setTrackTab(tab);
              const track = tab === "drill" ? "twk" : tab;
              setSelectedTrack(track);
              setSelectedPackageNumber(1);
              setReadyToStart(false);
            }}
            className={`min-h-11 shrink-0 rounded-lg px-4 text-sm font-bold transition-colors ${trackTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
            {tab === "cpns"
              ? ` · ${EXAM_PACKAGES.filter((p) => p.track === "cpns").length} paket`
              : tab === "pppk"
                ? ` · ${EXAM_PACKAGES.filter((p) => p.track === "pppk").length} paket`
                : ""}
          </button>
        ))}
      </div>
      {trackTab === "drill" && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Pilih materi drill">
          {(
            [
              ["twk", "TWK"],
              ["tiu", "TIU"],
              ["tkp", "TKP"],
            ] as const
          ).map(([track, label]) => (
            <button
              type="button"
              key={track}
              aria-pressed={selectedTrack === track}
              onClick={() => {
                setSelectedTrack(track);
                setSelectedPackageNumber(1);
              }}
              className={`min-h-10 rounded-md border px-4 font-semibold ${selectedTrack === track ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TRACKS.filter((track) =>
          trackTab === "drill" ? ["twk", "tiu", "tkp"].includes(track.id) : track.id === trackTab,
        ).map((track) => (
          <div
            key={track.id}
            className={`flex flex-col justify-between gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center ${selectedTrack === track.id ? "border-primary bg-primary/5" : "border-border bg-background"}`}
          >
            <div className="min-w-0">
              <h3 className="font-bold text-foreground">{track.name}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{track.description}</p>
              <p className="mt-2 text-xs font-semibold text-foreground">
                {track.id === "kedinasan"
                  ? `${rulesForTrack(track.id).questionsPerTrack} soal latihan`
                  : `${EXAM_PACKAGES.filter((item) => item.track === track.id).length} pilihan paket · ${rulesForTrack(track.id).questionsPerTrack} soal per paket`}{" "}
                ·{" "}
                {formatDuration(
                  track.id === "kedinasan"
                    ? rulesForTrack(track.id).durationSeconds
                    : (activePackage?.durationSeconds ?? rulesForTrack(track.id).durationSeconds),
                )}
              </p>
            </div>
            <Button
              variant={selectedTrack === track.id ? "default" : "outline"}
              className="min-h-11 shrink-0"
              aria-pressed={selectedTrack === track.id}
              onClick={() => {
                setSelectedTrack(track.id);
                setSelectedPackageNumber(1);
                setReadyToStart(false);
              }}
            >
              Pilih paket
            </Button>
          </div>
        ))}
      </div>
      {selectedTrack && selectedTrack !== "kedinasan" && (
        <fieldset className="mt-6">
          <legend className="font-bold">Pilih paket latihan</legend>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {(["twk", "tiu", "tkp"] as string[]).includes(selectedTrack)
              ? "Setiap paket fokus berisi 50 soal HOTS."
              : "Setiap paket berisi 110 soal."}{" "}
            Tanpa pengulangan dalam satu sesi. Beberapa soal dapat muncul di paket lain.
          </p>
          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter paket">
            {(["all", "new", "done"] as const).map((filter) => (
              <button
                type="button"
                key={filter}
                aria-pressed={packageFilter === filter}
                onClick={() => setPackageFilter(filter)}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold ${packageFilter === filter ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}
              >
                {filter === "all"
                  ? "Semua Paket"
                  : filter === "new"
                    ? "Belum Dikerjakan"
                    : "Selesai"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {EXAM_PACKAGES.filter(
              (item) =>
                item.track === selectedTrack &&
                (packageFilter === "all" ||
                  (packageFilter === "done"
                    ? item.id in packageHistory
                    : !(item.id in packageHistory))),
            ).map((item) => (
              <article
                key={item.id}
                className={`relative flex min-h-48 flex-col justify-between overflow-hidden rounded-xl border p-4 text-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${selectedPackageNumber === item.number ? "border-primary bg-primary/5" : "border-border bg-card"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${item.track === "cpns" ? "bg-blue-600" : item.track === "pppk" ? "bg-emerald-600" : ["twk", "tiu", "tkp"].includes(item.track) ? "bg-indigo-500" : "bg-amber-600"}`}
                />
                <div className="min-w-0">
                  <span className="block text-base font-bold text-foreground">{item.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {Object.values(item.composition).reduce((sum, count) => sum + count, 0)} soal
                    {(["twk", "tiu", "tkp"] as string[]).includes(item.track) ? " HOTS" : ""} ·{" "}
                    {formatDuration(item.durationSeconds)}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-1">
                    {Object.entries(item.composition).map(([subject, count]) => (
                      <span
                        key={subject}
                        className="rounded bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                      >
                        {subject} {count}
                      </span>
                    ))}
                  </span>
                  <span
                    className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.id in packageHistory ? "bg-positive/10 text-positive" : "bg-muted text-muted-foreground"}`}
                  >
                    {item.id in packageHistory
                      ? `🏆 Skor: ${packageHistory[item.id]}%`
                      : "Belum dicoba"}
                  </span>
                </div>
                <div className="mt-3 grid gap-2">
                  <Button
                    type="button"
                    className="min-h-11 w-full font-semibold"
                    disabled={!packageReady}
                    onClick={() => {
                      setSelectedPackageNumber(item.number);
                      setReadyToStart(true);
                      setShowPackageConfirm(true);
                    }}
                  >
                    ⚡ Mode Tryout
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11 w-full border-positive bg-positive/10 font-semibold text-positive hover:bg-positive/20 hover:text-positive"
                    disabled={!packageReady}
                    onClick={() => {
                      setSelectedPackageNumber(item.number);
                      startExam(item.track, item.id, "study");
                    }}
                  >
                    📖 Mode Belajar
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {!packageReady && (
            <p role="status" className="mt-3 text-sm text-muted-foreground">
              Bank soal paket ini sedang dilengkapi.
            </p>
          )}
        </fieldset>
      )}
      {selectedTrack && activeTrack && (
        <dialog
          ref={packageConfirmRef}
          aria-labelledby="package-confirm-heading"
          onClose={() => setShowPackageConfirm(false)}
          className="w-[min(92vw,34rem)] rounded-xl border border-border bg-card p-0 text-foreground shadow-xl backdrop:bg-black/55"
        >
          <div className="p-5 sm:p-6">
            <p className="text-sm font-bold text-primary">Ringkasan sebelum mulai</p>
            <h3 id="package-confirm-heading" className="mt-1 text-2xl font-extrabold">
              {activePackage?.title ?? activeTrack.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {activeTrack.name}. Sesi ini dinilai di perangkat dan berakhir saat waktu habis.
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-md border border-border p-3">
                <dt className="text-muted-foreground">Soal</dt>
                <dd className="mt-1 font-bold">{questionCount}</dd>
              </div>
              <div className="rounded-md border border-border p-3">
                <dt className="text-muted-foreground">Durasi</dt>
                <dd className="mt-1 font-bold">
                  {formatDuration(
                    activePackage?.durationSeconds ?? rulesForTrack(activeTrack.id).durationSeconds,
                  )}
                </dd>
              </div>
              <div className="rounded-md border border-border p-3">
                <dt className="text-muted-foreground">Skor</dt>
                <dd className="mt-1 font-bold">1 poin benar</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-6">
              Jawaban tersimpan otomatis di browser ini. Paket berisi soal latihan, bukan ujian
              resmi. Mode tryout memakai timer; mode belajar menampilkan pembahasan setelah memilih
              jawaban.
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                onClick={() => setShowPackageConfirm(false)}
              >
                Kembali ke paket
              </Button>
              <Button
                type="button"
                className="min-h-11"
                disabled={!packageReady}
                onClick={() => startExam(activeTrack.id, activePackage?.id)}
              >
                Mulai ujian
              </Button>
            </div>
          </div>
        </dialog>
      )}
      {selectedTrack && activeTrack && selectedTrack === "kedinasan" && (
        <section
          aria-labelledby="selected-track-heading"
          className="mt-5 overflow-hidden rounded-xl border border-border bg-background"
        >
          <div className="border-b border-border bg-card px-4 py-5 sm:px-6">
            <p className="text-sm font-bold text-primary">Panduan sebelum mulai</p>
            <h3 id="selected-track-heading" className="mt-1 text-xl font-extrabold text-foreground">
              {activeTrack.name}
              {activePackage ? ` · ${activePackage.title}` : ""}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {activeTrack.description} Sesi ini berisi latihan pilihan ganda yang dinilai langsung
              di perangkat Anda.
            </p>
          </div>

          <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:gap-7">
            <div className="space-y-6">
              <section aria-labelledby="session-details-heading">
                <h4 id="session-details-heading" className="font-bold text-foreground">
                  Informasi latihan
                </h4>
                <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-border p-3.5">
                    <dt className="text-xs text-muted-foreground">Durasi latihan</dt>
                    <dd className="mt-1 font-bold text-foreground">
                      {formatDuration(
                        activePackage?.durationSeconds ??
                          rulesForTrack(selectedTrack ?? "cpns").durationSeconds,
                      )}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-border p-3.5">
                    <dt className="text-xs text-muted-foreground">Jumlah soal</dt>
                    <dd className="mt-1 font-bold text-foreground">{questionCount} soal latihan</dd>
                  </div>
                  <div className="rounded-lg border border-border p-3.5">
                    <dt className="text-xs text-muted-foreground">Penilaian demo</dt>
                    <dd className="mt-1 font-bold text-foreground">
                      {DEMO_RULES.pointsPerCorrectAnswer} poin per jawaban benar
                    </dd>
                  </div>
                </dl>
              </section>

              <section aria-labelledby="session-subjects-heading">
                <h4 id="session-subjects-heading" className="font-bold text-foreground">
                  Materi dalam sesi
                </h4>
                <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
                  {subjectBreakdown.map((item) => (
                    <li
                      key={item.subject}
                      className="flex min-h-16 items-center justify-between gap-3 px-4 py-3"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold text-foreground">{item.subject}</span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {SUBJECT_NAMES[item.subject]}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-md bg-secondary px-2.5 py-1.5 text-sm font-bold text-secondary-foreground">
                        {item.count} soal
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside
              aria-labelledby="session-notes-heading"
              className="h-fit rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100"
            >
              <h4 id="session-notes-heading" className="font-bold">
                Perhatian sebelum mulai
              </h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                <li>Pilih satu jawaban A–E, lalu tekan Simpan dan lanjutkan.</li>
                <li>Gunakan Lewatkan jika belum yakin. Kembali ke soal lewat navigasi nomor.</li>
                <li>Tandai soal untuk ditinjau sebelum mengakhiri sesi.</li>
                <li>
                  Timer mulai setelah tombol mulai dipilih. Waktu habis mengakhiri sesi otomatis.
                </li>
                <li>Jawaban tersimpan otomatis di browser perangkat ini.</li>
                <li>Skor hanya untuk evaluasi latihan, tanpa passing grade resmi.</li>
              </ul>
            </aside>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <Button variant="outline" className="min-h-11" onClick={() => setSelectedTrack(null)}>
              <ArrowLeft size={16} aria-hidden="true" />
              Pilih sesi lain
            </Button>
            <p className="text-sm text-muted-foreground">
              Timer berjalan setelah Anda menekan tombol mulai.
            </p>
          </div>
        </section>
      )}
      {selectedTrack && activeTrack && selectedTrack === "kedinasan" && (
        <div className="sticky bottom-24 z-30 mt-5 xl:bottom-4">
          <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-card/95 p-3 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Paket terpilih
              </p>
              <p className="truncate font-bold text-foreground">
                {activeTrack.name}
                {activePackage ? ` · ${activePackage.title}` : ""}
              </p>
              <p className="text-xs tabular-nums text-muted-foreground">
                {questionCount} soal ·{" "}
                {formatDuration(
                  activePackage?.durationSeconds ?? rulesForTrack(selectedTrack).durationSeconds,
                )}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                disabled={!packageReady || !activeQuestions.length}
                className="min-h-11"
                onClick={() => window.print()}
              >
                <Printer size={16} aria-hidden="true" /> Cetak paket / Simpan PDF
              </Button>
              <Button
                size="lg"
                disabled={!packageReady}
                className="min-h-12 shrink-0 text-base font-bold"
                onClick={() => setShowPackageConfirm(true)}
              >
                <PlayCircle aria-hidden="true" />
                Mulai simulasi sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
      {!result &&
        selectedTrack &&
        activeTrack &&
        activeQuestions.length > 0 &&
        createPortal(
          <section
            id="exam-package-pdf"
            className="hidden"
            aria-label="Paket latihan untuk dicetak"
          >
            <p className="text-xs font-bold uppercase tracking-wide">
              DAFTAR CPNS · LATIHAN INDEPENDEN
            </p>
            <h1 className="mt-2 text-2xl font-bold">
              {activePackage?.title ?? `Latihan ${activeTrack.name}`}
            </h1>
            <p className="mt-1 text-sm">
              {activeTrack.name} · {activeQuestions.length} soal. Kunci dan pembahasan tersedia
              setelah setiap soal.
            </p>
            <ol className="mt-5 space-y-5">
              {activeQuestions.map((question, index) => (
                <li key={question.id} className="border-t border-slate-300 pt-3">
                  <p className="text-xs font-bold">
                    {question.subject} · {index + 1}
                  </p>
                  <p className="mt-1 font-semibold">{question.prompt}</p>
                  <ul className="mt-2 space-y-1">
                    {question.options.map((option) => (
                      <li key={option.label}>
                        {option.label}. {option.text}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">
                    <strong>Kunci latihan:</strong> {question.answer}
                  </p>
                  <p className="mt-1">
                    <strong>Pembahasan:</strong> {question.explanation}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t pt-3 text-xs">
              Bank soal latihan independen; bukan naskah resmi BKN. Verifikasi materi dan aturan
              seleksi melalui sumber resmi.
            </p>
          </section>,
          document.body,
        )}
      {result && !selectedTrack && (
        <p className="mt-4 text-sm text-muted-foreground">
          Hasil latihan terakhir tersedia di perangkat ini. Pilih materi untuk memulai sesi baru.
        </p>
      )}
    </section>
  );
}

function ReviewQuestion({
  question,
  index,
  answer,
  flagged = false,
}: {
  question: Question;
  index: number;
  answer: string | undefined;
  flagged?: boolean;
}) {
  const correct = answer === question.answer;
  const [saved, setSaved] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  useEffect(() => {
    setSaved(readBookmarkedIds().includes(question.id));
  }, [question.id]);
  const reportSubject = encodeURIComponent(`Laporan soal ${question.id} — Daftar CPNS`);
  const reportBody = encodeURIComponent(
    `ID soal: ${question.id}\nMateri: ${question.subject}\n\nTemuan / koreksi:\n${reportText}\n\nMohon periksa kembali soal dan kunci latihan ini.`,
  );
  return (
    <article className="border-l-2 border-border pl-4">
      <h4 className="font-semibold">
        {index + 1}. {question.prompt}
      </h4>
      {flagged && (
        <p className="mt-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
          Ditandai untuk ditinjau
        </p>
      )}
      <p className="mt-2 text-sm">
        <span className="font-semibold">Jawaban Anda:</span> {answer ?? "Belum dijawab"}.{" "}
        <span className="font-semibold">Kunci latihan:</span> {question.answer}.
      </p>
      <p className="mt-1 text-sm font-semibold">
        {correct ? "Jawaban sesuai kunci latihan." : "Jawaban berbeda dari kunci latihan."}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{question.explanation}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Tips &amp; trik:</strong> {question.tip}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 print:hidden">
        <Button
          type="button"
          variant="outline"
          className="min-h-10"
          aria-pressed={saved}
          onClick={() => {
            const next = !saved;
            setQuestionBookmark(question.id, next);
            setSaved(next);
          }}
        >
          <Bookmark size={16} aria-hidden="true" /> {saved ? "Tersimpan" : "Simpan untuk diulang"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-10"
          onClick={() => setReportOpen(true)}
        >
          <Flag size={16} aria-hidden="true" /> Laporkan koreksi
        </Button>
      </div>
      {reportOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setReportOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby={`report-title-${question.id}`}
              className="w-full max-w-lg rounded-xl border border-border bg-background p-5 shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 id={`report-title-${question.id}`} className="font-bold">
                    Laporkan soal atau kunci
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Laporan akan disiapkan sebagai draf email untuk ditinjau sebelum dikirim.
                  </p>
                </div>
                <button
                  type="button"
                  className="min-h-11 min-w-11 rounded-md border border-border"
                  aria-label="Tutup laporan"
                  onClick={() => setReportOpen(false)}
                >
                  ×
                </button>
              </div>
              <label className="mt-4 block text-sm font-semibold">
                Jelaskan bagian yang perlu diperiksa
                <textarea
                  autoFocus
                  value={reportText}
                  onChange={(event) => setReportText(event.target.value)}
                  rows={5}
                  maxLength={2000}
                  placeholder="Contoh: ada salah ketik pada opsi B…"
                  className="mt-2 w-full rounded-md border border-input bg-card p-3 font-normal leading-6"
                />
              </label>
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11"
                  onClick={() => setReportOpen(false)}
                >
                  Batal
                </Button>
                <Button asChild className="min-h-11" disabled={!reportText.trim()}>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${reportSubject}&body=${reportBody}`}
                    onClick={() => setReportOpen(false)}
                  >
                    Buat draf email
                  </a>
                </Button>
              </div>
            </section>
          </div>,
          document.body,
        )}
    </article>
  );
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} menit ${String(seconds).padStart(2, "0")} detik`;
}

export function contentHead(page: ContentPageData, canonical: string) {
  return {
    meta: [
      { title: page.metaTitle },
      { name: "description", content: page.description },
      { name: "author", content: OPERATOR_NAME },
      { property: "og:site_name", content: "Daftar CPNS" },
      { property: "og:title", content: page.metaTitle },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: canonicalUrl("/brand/social-card.jpg") },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Daftar CPNS, latihan CAT CPNS dan soal TWK, TIU, serta TKP",
      },
      { name: "twitter:image", content: canonicalUrl("/brand/social-card.jpg") },
      { property: "og:url", content: canonicalUrl(canonical) },
      { property: "og:locale", content: "id_ID" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.metaTitle },
      { name: "twitter:description", content: page.description },
      ...(page.noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: canonicalUrl(canonical) }],
  };
}
