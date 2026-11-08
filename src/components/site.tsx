import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  loadExamSession,
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
            <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-positive">
              <span className="size-1.5 rounded-full bg-positive" aria-hidden="true" />
              Latihan mandiri · 100% Gratis
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
        <Link to="/" activeOptions={{ exact: true }} className={side} activeProps={{ className: "!text-primary" }}>
          <Home className="size-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Beranda</span>
        </Link>
        <div className="flex justify-center">
          <Link
            to="/simulasi-cat-cpns"
            className="relative -mt-7 flex flex-col items-center gap-0.5 rounded-full border-4 border-card bg-primary px-5 py-2.5 text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95"
          >
            <span className="absolute -top-2.5 rounded-full border-2 border-card bg-positive px-2 py-px text-[10px] font-extrabold tracking-wider text-primary-foreground">
              GRATIS
            </span>
            <PlayCircle className="size-6" aria-hidden="true" />
            <span className="whitespace-nowrap text-[11px] font-bold">Simulasi CAT</span>
          </Link>
        </div>
        <Link to="/latihan-soal-cpns" className={side} activeProps={{ className: "!text-primary" }}>
          <BookOpen className="size-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Bank Soal</span>
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
        <div className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="min-h-11 inline-flex items-center hover:text-primary">
                    Beranda
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-foreground">
                  {page.title}
                </li>
              </ol>
            </nav>
            <p className="text-sm font-bold text-primary">
              Platform Edukasi &amp; Simulasi CAT Independen
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{page.intro}</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_250px] lg:px-8">
          <article className="min-w-0 space-y-9">
            {isSimulator && <CATSimulator />}
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
              <section aria-label="Bank soal dan pembahasan" className="space-y-5">
                <h2 className="text-xl font-bold">Latihan mandiri dengan pembahasan</h2>
                <p className="text-sm text-muted-foreground">
                  Tentukan jawaban Anda sebelum membuka pembahasan. Semua soal merupakan latihan
                  orisinal.
                </p>
                {QUESTION_BANK.filter(
                  (q) => q.subject.toLowerCase() === slug.replace("soal-", ""),
                ).map((question, index) => (
                  <article
                    key={question.id}
                    className="rounded-lg border border-border bg-card p-5"
                  >
                    <h3 className="font-semibold leading-7">
                      {index + 1}. {question.prompt}
                    </h3>
                    <ol className="mt-3 space-y-2 text-sm leading-6">
                      {question.options.map((option) => (
                        <li key={option.label}>
                          <strong>{option.label}.</strong> {option.text}
                        </li>
                      ))}
                    </ol>
                    <details className="mt-4 border-t border-border pt-2">
                      <summary className="min-h-11 py-3 font-semibold text-primary">
                        Lihat kunci dan pembahasan
                      </summary>
                      <p className="leading-7">
                        <strong>Jawaban {question.answer}.</strong> {question.explanation}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        <strong className="text-foreground">Tips &amp; trik:</strong> {question.tip}
                      </p>
                    </details>
                  </article>
                ))}
              </section>
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
          <aside className="h-fit border-t-2 border-primary pt-4 md:border-t-0 md:border-l-2 md:border-primary md:pl-5">
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
                      className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {source.label}
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

function CATSimulator() {
  const examDialogRef = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState<ExamSession | null>(null);
  const [pendingResume, setPendingResume] = useState<ExamSession | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>("cpns");
  const [readyToStart, setReadyToStart] = useState(false);
  const [selectedPackageNumber, setSelectedPackageNumber] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(DEMO_RULES.durationSeconds);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showFinishReview, setShowFinishReview] = useState(false);
  const isExamActive = session !== null;
  const navigationBlocker = useBlocker({
    shouldBlockFn: () => isExamActive,
    enableBeforeUnload: () => isExamActive,
    withResolver: true,
  });

  useEffect(() => {
    try {
      const storage = window.localStorage;
      const savedSession = loadExamSession(storage);
      if (savedSession) setPendingResume(savedSession);
      else saveExamSession(storage, null);
      setResult(loadExamResult(storage));
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
    const dialog = examDialogRef.current;
    if (session && dialog && !dialog.open) dialog.showModal();
  }, [session]);

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
    try {
      const storage = window.localStorage;
      if (!saveExamResult(storage, completed) || !saveExamSession(storage, null))
        setStorageError(true);
    } catch {
      setStorageError(true);
    }
  }

  function startExam(track: Track, packageId?: string) {
    const selected = packageId ? getExamPackage(packageId) : undefined;
    if (selected && selected.track !== track) return;
    questionsForAttempt({ track, packageId });
    const now = Date.now();
    setResult(null);
    setSelectedTrack(null);
    setShowFinishReview(false);
    setSession({
      track,
      packageId,
      answers: {},
      currentIndex: 0,
      flagged: [],
      deadline: now + (selected?.durationSeconds ?? rulesForTrack(track).durationSeconds) * 1000,
      startedAt: now,
      questionStartedAt: now,
      questionTimes: {},
    });
  }

  function moveToQuestion(nextIndex: number) {
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
  }

  function toggleFlag(questionId: string) {
    if (!session) return;
    const flagged = session.flagged.includes(questionId)
      ? session.flagged.filter((id) => id !== questionId)
      : [...session.flagged, questionId];
    setSession({ ...session, flagged });
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
    const selected = session.answers[question.id];
    const isLast = session.currentIndex === questions.length - 1;
    const displayTime = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;
    return createPortal(
      <dialog
        ref={examDialogRef}
        aria-labelledby="exam-dialog-title"
        onCancel={(event) => event.preventDefault()}
        className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0 text-slate-950 backdrop:bg-slate-950/45 dark:text-foreground"
      >
        <div className="flex h-full flex-col overflow-y-auto bg-slate-50 dark:bg-background">
          <header className="sticky top-0 z-20 shrink-0 bg-primary text-primary-foreground shadow-md">
            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src="/brand/daftar-cpns-mark.svg"
                  alt=""
                  width={42}
                  height={42}
                  className="size-10 shrink-0"
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
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-primary-foreground/80">Soal</p>
                  <p className="text-sm font-bold tabular-nums">
                    {session.currentIndex + 1} / {questions.length}
                  </p>
                </div>
                <div
                  role="timer"
                  aria-label={`Waktu tersisa ${displayTime}${remainingSeconds <= 60 ? ", waktu hampir habis" : ""}`}
                  aria-live="off"
                  className={`flex min-h-12 items-center gap-2 rounded-md border px-3 font-bold tabular-nums ${remainingSeconds <= 60 ? "border-white/70 bg-white text-destructive" : "border-white/25 bg-white/15 text-white"}`}
                >
                  <Clock3 size={17} aria-hidden="true" />
                  <span>{displayTime}</span>
                  {remainingSeconds <= 60 && (
                    <span className="text-xs font-semibold">Hampir habis</span>
                  )}
                </div>
              </div>
            </div>
            <progress
              aria-label={`Progres: ${answered} dari ${questions.length} soal sudah dijawab`}
              value={answered}
              max={questions.length}
              className="block h-1.5 w-full accent-white"
            />
          </header>

          <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-4 px-3 py-4 pb-6 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <aside className="order-2 h-fit rounded-lg border border-slate-200 bg-white p-4 dark:border-border dark:bg-card lg:sticky lg:top-5 lg:order-1">
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
              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
                {questions.map((item, index) => {
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
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7 dark:border-border dark:bg-card">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-border">
                  <div>
                    <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {question.subject}
                    </p>
                    <h1 id="exam-heading" className="mt-1 text-xl font-extrabold sm:text-2xl">
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
                <h2 className="mt-5 text-base font-semibold leading-7 sm:text-lg sm:leading-8">
                  {question.prompt}
                </h2>
                <fieldset className="mt-5 grid gap-3">
                  <legend className="sr-only">Pilih jawaban</legend>
                  {question.options.map((option) => (
                    <label
                      key={option.label}
                      className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-md border p-3.5 leading-6 transition-colors sm:p-4 ${selected === option.label ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-slate-200 hover:border-primary/40 hover:bg-slate-50 dark:border-border dark:hover:bg-secondary/50"}`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.label}
                        checked={selected === option.label}
                        onChange={() =>
                          setSession({
                            ...session,
                            answers: { ...session.answers, [question.id]: option.label },
                          })
                        }
                        className="mt-1 size-4 shrink-0 accent-primary"
                      />
                      <span className="min-w-0 text-sm sm:text-base">
                        <strong className="mr-2">{option.label}.</strong>
                        {option.text}
                      </span>
                    </label>
                  ))}
                </fieldset>

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
                  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
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
    const average = score.total ? Math.round(result.elapsedSeconds / score.total) : 0;
    return (
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
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="border border-border p-4">
            <p className="text-sm text-muted-foreground">Jawaban benar</p>
            <p className="mt-1 text-2xl font-extrabold">
              {score.correct}
              <span className="text-base font-medium text-muted-foreground"> / {score.total}</span>
            </p>
          </div>
          <div className="border border-border p-4">
            <p className="text-sm text-muted-foreground">Waktu pengerjaan</p>
            <p className="mt-1 text-2xl font-extrabold">{formatDuration(result.elapsedSeconds)}</p>
          </div>
          <div className="border border-border p-4">
            <p className="text-sm text-muted-foreground">Rata-rata per soal</p>
            <p className="mt-1 text-2xl font-extrabold">{formatDuration(average)}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold">Indikator per materi</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Persentase jawaban benar pada kelompok soal yang dikerjakan.
          </p>
          <div className="mt-4 grid gap-4">
            {score.breakdown.map((item) => {
              const percent = item.total ? Math.round((item.correct / item.total) * 100) : 0;
              return (
                <div key={item.subject}>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="font-semibold">{item.subject}</span>
                    <span>
                      {item.correct} dari {item.total} benar, {percent}%
                    </span>
                  </div>
                  <div
                    role="img"
                    aria-label={`${item.subject}: ${item.correct} dari ${item.total} benar, ${percent} persen`}
                    className="mt-2 h-3 bg-secondary"
                  >
                    <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex flex-col flex-wrap gap-2 sm:flex-row">
          <Button className="min-h-11" onClick={() => setShowReview(!showReview)}>
            {showReview ? "Tutup pembahasan" : "Tinjau pembahasan"}
          </Button>
          <Button variant="outline" className="min-h-11" onClick={downloadResult}>
            <Download size={17} aria-hidden="true" />
            Unduh hasil dan pembahasan
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
            {questions.map((item, index) => (
              <ReviewQuestion
                key={item.id}
                question={item}
                index={index}
                answer={result.answers[item.id]}
              />
            ))}
          </div>
        )}
      </section>
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
    <section
      aria-labelledby="simulator-heading"
      className="rounded-lg border border-border bg-card p-4 sm:p-6"
    >
      {storageNotice}
      <p className="text-sm font-bold text-primary">Simulasi independen · Gratis · Tanpa akun</p>
      <h2 id="simulator-heading" className="mt-1 text-2xl font-extrabold">
        Pilih paket CAT Anda
      </h2>
      <p className="mt-2 leading-6 text-muted-foreground">
        Pilih materi untuk melihat ringkasan sesi sebelum memulai. Semua soal merupakan latihan
        orisinal dan jawaban tersimpan di browser perangkat ini.
      </p>
      <div className="mt-5 grid gap-3">
        {TRACKS.map((track) => (
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
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {EXAM_PACKAGES.filter((item) => item.track === selectedTrack).map((item) => (
              <label
                key={item.id}
                className={`flex min-h-28 cursor-pointer items-start gap-3 rounded-lg border p-4 text-sm ${selectedPackageNumber === item.number ? "border-primary bg-primary/5 text-primary" : "border-border bg-background hover:border-primary/50"}`}
              >
                <input
                  type="radio"
                  name="exam-package"
                  value={item.id}
                  checked={selectedPackageNumber === item.number}
                  onChange={() => {
                    setSelectedPackageNumber(item.number);
                    setReadyToStart(false);
                  }}
                  className="size-4 accent-primary"
                />
                <span className="min-w-0">
                  <span className="block text-base font-bold">{item.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {Object.values(item.composition).reduce((sum, count) => sum + count, 0)} soal
                    {(["twk", "tiu", "tkp"] as string[]).includes(item.track) ? " HOTS" : ""} ·{" "}
                    {formatDuration(item.durationSeconds)}
                  </span>
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {Object.entries(item.composition)
                      .map(([subject, count]) => `${subject} ${count}`)
                      .join(" · ")}
                  </span>
                  <span className="mt-2 block text-xs font-semibold">
                    {packageReady ? "Pembahasan dan tips tersedia" : "Soal sedang dilengkapi"}
                  </span>
                </span>
              </label>
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
            <div className="space-y-3">
              <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={readyToStart}
                  onChange={(event) => setReadyToStart(event.target.checked)}
                  className="size-5 accent-primary"
                />
                Saya memahami panduan dan siap mulai.
              </label>
              <Button
                disabled={!readyToStart || !packageReady}
                className="min-h-12 w-full"
                onClick={() => startExam(selectedTrack, activePackage?.id)}
              >
                Mulai simulasi · {questionCount} soal
              </Button>
            </div>
          </div>
        </section>
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
}: {
  question: Question;
  index: number;
  answer: string | undefined;
}) {
  const correct = answer === question.answer;
  return (
    <article className="border-l-2 border-border pl-4">
      <h4 className="font-semibold">
        {index + 1}. {question.prompt}
      </h4>
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
