import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ShieldCheck, ArrowUpRight, Clock3, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canonicalUrl, SITE_ORIGIN, OPERATOR_NAME, CONTACT_EMAIL } from "@/lib/site-config";
import { CONTENT_PAGES, type ContentPageData } from "@/lib/content-pages";
import {
  DEMO_RULES,
  QUESTION_BANK,
  questionsForTrack,
  scoreExam,
  TRACKS,
  type Question,
  type Track,
} from "@/lib/exam";
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-3" aria-label="Daftar CPNS, beranda">
          <span className="relative size-11 shrink-0 overflow-hidden" aria-hidden="true">
            <img src="/brand/daftar-cpns-mark.svg" alt="" width={44} height={44} />
          </span>
          <span className="leading-tight">
            <span className="block font-extrabold text-foreground">Daftar CPNS</span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Belajar, berlatih, persiapkan ASN
            </span>
          </span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 xl:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:block">
          <Button asChild className="min-h-11">
            <Link to="/simulasi-cat-cpns">Mulai latihan</Link>
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="min-h-11 min-w-11 xl:hidden"
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
              className="flex min-h-11 items-center rounded-md px-3 font-medium hover:bg-secondary"
            >
              {label}
            </Link>
          ))}
          <Button asChild className="mt-2 min-h-11">
            <Link to="/simulasi-cat-cpns" onClick={() => setOpen(false)}>
              Mulai latihan
            </Link>
          </Button>
        </nav>
      )}
    </header>
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
      {children}
      <SiteFooter />
    </>
  );
}

export function ContentPage({ page }: { page: ContentPageData }) {
  const isSimulator = page === CONTENT_PAGES["simulasi-cat-cpns"];
  const slug = Object.keys(CONTENT_PAGES).find((key) => CONTENT_PAGES[key] === page) ?? "";
  const canonicalPath = canonicalUrl(`/${slug}`);
  const structuredData = {
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalPath}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: canonicalUrl("/") },
          { "@type": "ListItem", position: 2, name: page.title, item: canonicalPath },
        ],
      },
    ],
  };
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
  const [session, setSession] = useState<ExamSession | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(DEMO_RULES.durationSeconds);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    try {
      const storage = window.localStorage;
      const savedSession = loadExamSession(storage);
      if (savedSession) setSession(savedSession);
      else saveExamSession(storage, null);
      setResult(loadExamResult(storage));
    } catch {
      setStorageError(true);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (!saveExamSession(window.localStorage, session)) setStorageError(true);
    } catch {
      setStorageError(true);
    }
  }, [hydrated, session]);

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

  function finishExam(finalSession: ExamSession) {
    const endedAt = Math.min(Date.now(), finalSession.deadline);
    const currentQuestion = questionsForTrack(finalSession.track)[finalSession.currentIndex];
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
        DEMO_RULES.durationSeconds,
        Math.floor((endedAt - finalSession.startedAt) / 1000),
      ),
      endedAt,
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

  function startExam(track: Track) {
    const now = Date.now();
    setResult(null);
    setSession({
      track,
      answers: {},
      currentIndex: 0,
      flagged: [],
      deadline: now + DEMO_RULES.durationSeconds * 1000,
      startedAt: now,
      questionStartedAt: now,
      questionTimes: {},
    });
  }

  function moveToQuestion(nextIndex: number) {
    if (!session) return;
    const questions = questionsForTrack(session.track);
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
    const questions = questionsForTrack(result.track);
    const score = scoreExam(result.track, result.answers);
    const lines = [
      `Hasil latihan demo: ${TRACKS.find((track) => track.id === result.track)?.name ?? result.track}`,
      `Skor latihan: ${score.correct} dari ${score.total} jawaban benar`,
      `Durasi: ${formatDuration(result.elapsedSeconds)}`,
      "Catatan: hasil ini hanya untuk latihan, bukan nilai atau passing grade resmi.",
      "",
      ...questions.flatMap((question, index) => [
        `${index + 1}. ${question.prompt}`,
        `Jawaban Anda: ${result.answers[question.id] ?? "Belum dijawab"}`,
        `Kunci latihan: ${question.answer}`,
        `Pembahasan: ${question.explanation}`,
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

  const storageNotice = storageError ? (
    <p role="alert" className="mb-4 border-l-4 border-destructive bg-card p-3 text-sm leading-6">
      Penyimpanan browser tidak tersedia. Latihan dapat diteruskan selama halaman terbuka, tetapi
      progres mungkin tidak tersimpan setelah halaman ditutup.
    </p>
  ) : null;

  if (session) {
    const questions = questionsForTrack(session.track);
    const question = questions[session.currentIndex];
    if (!question)
      return (
        <section role="alert" className="border-l-4 border-destructive bg-card p-5">
          <h2 className="font-bold">Sesi latihan tidak dapat dibaca</h2>
          <p className="mt-2 text-muted-foreground">Mulai ulang sesi ini untuk melanjutkan.</p>
          <Button className="mt-4 min-h-11" onClick={() => startExam(session.track)}>
            Mulai ulang sesi
          </Button>
        </section>
      );
    const answered = Object.keys(session.answers).length;
    const selected = session.answers[question.id];
    const isLast = session.currentIndex === questions.length - 1;
    const displayTime = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;
    return (
      <section
        aria-labelledby="exam-heading"
        className="rounded-xl border border-border border-t-4 border-t-primary bg-card p-4 sm:p-6"
      >
        {storageNotice}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-sm font-bold text-primary">
              {TRACKS.find((track) => track.id === session.track)?.name}
            </p>
            <h2 id="exam-heading" className="mt-1 text-xl font-extrabold">
              Soal {session.currentIndex + 1} dari {questions.length}
            </h2>
          </div>
          <p
            role="timer"
            aria-label={`Sisa waktu ${displayTime}`}
            className="flex min-h-11 items-center gap-2 border border-border px-3 font-bold tabular-nums"
          >
            <Clock3 size={17} aria-hidden="true" />
            {displayTime}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
          <span>
            {answered} terjawab · {questions.length - answered} belum dijawab
          </span>
          <span>{session.flagged.length} ditandai ragu</span>
        </div>
        <progress
          aria-label="Progres jawaban"
          value={answered}
          max={questions.length}
          className="mt-2 h-2 w-full accent-primary"
        />
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Navigasi soal">
          {questions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => moveToQuestion(index)}
              aria-label={`Soal ${index + 1}${session.answers[item.id] ? ", sudah dijawab" : ", belum dijawab"}${session.flagged.includes(item.id) ? ", ditandai ragu" : ""}`}
              aria-current={index === session.currentIndex ? "step" : undefined}
              className={`min-h-11 min-w-11 border px-3 text-sm font-bold ${index === session.currentIndex ? "border-primary bg-primary text-primary-foreground" : session.answers[item.id] ? "border-positive bg-accent text-accent-foreground" : "border-border bg-background text-foreground"} focus-visible:outline-offset-2`}
            >
              {index + 1}
              {session.flagged.includes(item.id) && (
                <span aria-hidden="true" className="ml-1">
                  *
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-5 text-sm font-bold text-primary">{question.subject}</p>
        <p className="mt-2 text-lg leading-8">{question.prompt}</p>
        <fieldset className="mt-4 grid gap-2">
          <legend className="sr-only">Pilih jawaban</legend>
          {question.options.map((option) => (
            <label
              key={option.label}
              className={`flex min-h-12 cursor-pointer items-start gap-3 border p-3 leading-6 ${selected === option.label ? "border-primary bg-secondary" : "border-border hover:bg-secondary/60"}`}
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
                className="mt-1 size-4 accent-primary"
              />
              <span>
                <strong className="mr-2">{option.label}.</strong>
                {option.text}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => toggleFlag(question.id)}
            aria-pressed={session.flagged.includes(question.id)}
            className="min-h-11 px-2 text-left font-semibold text-primary underline-offset-4 hover:underline"
          >
            {session.flagged.includes(question.id) ? "Hapus tanda ragu" : "Tandai untuk ditinjau"}
          </button>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="min-h-11"
              disabled={session.currentIndex === 0}
              onClick={() => moveToQuestion(session.currentIndex - 1)}
            >
              Sebelumnya
            </Button>
            {isLast ? (
              <Button className="min-h-11" onClick={() => finishExam(session)}>
                Selesaikan latihan
              </Button>
            ) : (
              <Button className="min-h-11" onClick={() => moveToQuestion(session.currentIndex + 1)}>
                Soal berikutnya
              </Button>
            )}
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {answered} dari {questions.length} soal sudah dijawab. Progres tersimpan di browser ini.
        </p>
      </section>
    );
  }

  if (result) {
    const questions = questionsForTrack(result.track);
    const score = scoreExam(result.track, result.answers);
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
          <Button variant="outline" className="min-h-11" onClick={() => startExam(result.track)}>
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

  return (
    <section
      aria-labelledby="simulator-heading"
      className="border-t-2 border-primary bg-card p-4 sm:p-6"
    >
      {storageNotice}
      <p className="text-sm font-bold text-primary">Latihan lokal tanpa akun</p>
      <h2 id="simulator-heading" className="mt-1 text-2xl font-extrabold">
        Pilih sesi latihan
      </h2>
      <p className="mt-2 leading-6 text-muted-foreground">
        Pilih jenis demo untuk memulai. Sesi berisi {DEMO_RULES.questionsPerTrack} pertanyaan dan
        batas waktu {formatDuration(DEMO_RULES.durationSeconds)}. Jawaban hanya disimpan di browser
        perangkat ini.
      </p>
      <div className="mt-5 grid gap-3">
        {TRACKS.map((track) => (
          <div
            key={track.id}
            className="flex flex-col justify-between gap-4 border border-border p-4 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="font-bold">{track.name}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{track.description}</p>
            </div>
            <Button className="min-h-11 shrink-0" onClick={() => startExam(track.id)}>
              Mulai {track.name}
            </Button>
          </div>
        ))}
      </div>
      {result && (
        <p className="mt-4 text-sm text-muted-foreground">
          Hasil latihan terakhir tersimpan lokal pada perangkat ini.
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
      { property: "og:title", content: page.metaTitle },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: canonicalUrl("/brand/daftar-cpns-mark.svg") },
      { property: "og:image:alt", content: "Monogram DC Daftar CPNS yang menyatukan huruf putih dan hijau" },
      { name: "twitter:image", content: canonicalUrl("/brand/daftar-cpns-mark.svg") },
      { property: "og:url", content: canonicalUrl(canonical) },
      { property: "og:locale", content: "id_ID" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(page.noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: canonicalUrl(canonical) }],
  };
}
