import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, ChartNoAxesCombined, ClipboardList, Target } from "lucide-react";
import { QUESTION_BANK, type Question, type Subject } from "@/lib/exam";
import { loadExamHistory, type ExamResult } from "@/lib/exam-storage";
import {
  GUIDE_KEY,
  GUIDE_TOPICS,
  MISTAKE_CAUSES,
  SUBJECTS,
  addDays,
  diagnosticQuestions,
  emptyGuide,
  exportPlan,
  formatGuideDate,
  jakartaDate,
  journalFromExam,
  planAgenda,
  readGuide,
  topicQuestions,
  weeklyStats,
  type Diagnostic,
  type GuideState,
  type GuideTrack,
  type JournalEntry,
  type MistakeCause,
  type StudyPlan,
  type TopicStatus,
} from "@/lib/study-guide";
import { DiagnosticTest, TopicReader, WorkedQuestion } from "@/components/guide-practice";
import { GUIDE_CASE_ANALYSIS } from "@/lib/guide-case-analysis";
import "@/components/study-guide.css";

const statuses: Record<TopicStatus, string> = {
  new: "Belum dipelajari",
  learning: "Sedang dipelajari",
  review: "Perlu diulang",
  done: "Sudah dipelajari",
};
const sections = [
  ["agenda", "Agenda", CalendarDays],
  ["rencana", "Rencana belajar", ClipboardList],
  ["tes-awal", "Tes awal", Target],
  ["peta-materi", "Materi", BookOpen],
  ["bedah-hots", "Bedah HOTS", BookOpen],
  ["jurnal", "Jurnal", ClipboardList],
  ["evaluasi", "Evaluasi", ChartNoAxesCombined],
] as const;

function downloadText(name: string, content: string, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function PlanBuilder({
  track,
  initial,
  suggestedFocus,
  onSave,
  onExport,
}: {
  track: GuideTrack;
  initial: StudyPlan | null;
  suggestedFocus: Subject | "balanced";
  onSave: (plan: StudyPlan) => void;
  onExport: (plan: StudyPlan) => void;
}) {
  const [days, setDays] = useState(initial?.days ?? 30);
  const [minutes, setMinutes] = useState(initial?.minutes ?? 30);
  const [start, setStart] = useState(initial?.start ?? jakartaDate());
  const [focus, setFocus] = useState<Subject | "balanced">(initial?.focus ?? suggestedFocus);
  useEffect(() => {
    setFocus(suggestedFocus);
  }, [suggestedFocus]);
  return (
    <section className="guide-panel" id="rencana" aria-labelledby="guide-plan-title">
      <div className="guide-section-heading">
        <div>
          <p className="guide-eyebrow">Sesuai waktu yang Anda punya</p>
          <h2 className="guide-title" id="guide-plan-title">
            Susun rencana belajar
          </h2>
        </div>
        <CalendarDays className="guide-section-icon" aria-hidden="true" />
      </div>
      <p className="guide-muted mt-3">
        Pilih ritme yang bisa dijalankan. Setiap hari dibagi untuk memahami konsep, mengerjakan
        soal, dan meninjau kesalahan. Minggu terakhir tetap fleksibel untuk topik yang perlu
        diulang.
      </p>
      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          onSave({ track, days, minutes, start, focus });
        }}
      >
        <div className="guide-form-grid">
          <label className="guide-field">
            Durasi persiapan
            <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
              {[14, 30, 60, 90].map((value) => (
                <option value={value} key={value}>
                  {value} hari
                </option>
              ))}
            </select>
          </label>
          <label className="guide-field">
            Waktu per hari
            <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
              {[15, 30, 60, 90].map((value) => (
                <option value={value} key={value}>
                  {value} menit
                </option>
              ))}
            </select>
          </label>
          <label className="guide-field">
            Tanggal mulai
            <input
              required
              type="date"
              value={start}
              min="2020-01-01"
              max="2100-12-31"
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label className="guide-field">
            Fokus materi
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value as Subject | "balanced")}
            >
              <option value="balanced">Seimbang semua kategori</option>
              {SUBJECTS[track].map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="guide-plan-preview">
          <strong>
            {days} hari · {minutes} menit/hari
          </strong>
          <p className="mt-1 text-sm leading-6">
            {focus === "balanced"
              ? "Topik diputar secara berurutan di semua kategori."
              : `Sekitar separuh hari difokuskan ke ${focus}, sisanya merotasi seluruh kategori.`}{" "}
            Sesuaikan lagi setelah mengevaluasi latihan.
          </p>
        </div>
        <div className="guide-actions">
          <button className="guide-btn guide-btn-green" type="submit">
            {initial ? "Simpan perubahan rencana" : "Buat rencana belajar saya"}
          </button>
          {initial && (
            <button
              className="guide-btn guide-btn-neutral"
              type="button"
              onClick={() => onExport(initial)}
            >
              Unduh rencana tersimpan (.txt)
            </button>
          )}
        </div>
        <p className="guide-muted mt-3 text-xs leading-6">
          Mengubah rencana akan menyusun ulang agenda. Catatan topik dan jurnal tetap tersimpan;
          centang agenda yang tanggal dan topiknya masih sama tetap dipertahankan. Ini rencana
          latihan pribadi, bukan jadwal seleksi resmi.
        </p>
      </form>
    </section>
  );
}

function GuideJournal({
  entries,
  onAdd,
  onUpdate,
  onDelete,
  onImport,
  onExport,
}: {
  entries: JournalEntry[];
  onAdd: (entry: {
    subject: Subject;
    title: string;
    cause: MistakeCause;
    correction: string;
  }) => void;
  onUpdate: (
    id: string,
    patch: Partial<Pick<JournalEntry, "cause" | "correction" | "resolved">>,
  ) => void;
  onDelete: (id: string) => void;
  onImport: () => void;
  onExport: () => void;
}) {
  const [subject, setSubject] = useState<Subject>("TWK");
  const [title, setTitle] = useState("");
  const [cause, setCause] = useState<MistakeCause>("Konsep");
  const [correction, setCorrection] = useState("");
  const [filter, setFilter] = useState("open");
  const [limit, setLimit] = useState(10);
  const filtered = entries.filter(
    (entry) => filter === "all" || (filter === "resolved" ? entry.resolved : !entry.resolved),
  );
  return (
    <section className="guide-panel" id="jurnal" aria-labelledby="guide-journal-title">
      <div className="guide-section-heading">
        <div>
          <p className="guide-eyebrow">Ubah kesalahan menjadi bahan belajar</p>
          <h2 className="guide-title" id="guide-journal-title">
            Jurnal kesalahan
          </h2>
        </div>
        <span className="guide-tag">
          {entries.filter((entry) => !entry.resolved).length} perlu ditinjau
        </span>
      </div>
      <p className="guide-muted mt-3">
        Catat penyebab dan langkah koreksi, kemudian coba ulang. Kesalahan dari tes pemetaan masuk
        otomatis; hasil simulasi dapat diimpor lewat tombol di bawah.
      </p>
      <div className="guide-actions mt-5">
        <button className="guide-btn guide-btn-amber" onClick={onImport}>
          Impor kesalahan simulasi jalur ini
        </button>
        <button
          className="guide-btn guide-btn-neutral"
          disabled={!entries.length}
          onClick={onExport}
        >
          Unduh jurnal (.txt)
        </button>
      </div>
      <details className="guide-detail mt-5">
        <summary>
          Tambah catatan sendiri<span aria-hidden="true">+</span>
        </summary>
        <form
          className="space-y-4 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            onAdd({ subject, title: title.trim(), cause, correction: correction.trim() });
            setTitle("");
            setCorrection("");
          }}
        >
          <div className="guide-form-grid">
            <label className="guide-field">
              Kategori
              <select value={subject} onChange={(e) => setSubject(e.target.value as Subject)}>
                {Object.values(SUBJECTS)
                  .flat()
                  .map((s) => (
                    <option key={s}>{s}</option>
                  ))}
              </select>
            </label>
            <label className="guide-field">
              Penyebab
              <select value={cause} onChange={(e) => setCause(e.target.value as MistakeCause)}>
                {MISTAKE_CAUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="guide-field">
            Soal atau bagian yang keliru
            <textarea
              required
              maxLength={2000}
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: salah memakai rata-rata tanpa bobot jumlah berkas."
            />
          </label>
          <label className="guide-field">
            Langkah koreksi
            <textarea
              maxLength={2000}
              rows={2}
              value={correction}
              onChange={(e) => setCorrection(e.target.value)}
              placeholder="Contoh: hitung total waktu setiap kelompok sebelum membagi jumlah berkas."
            />
          </label>
          <button className="guide-btn guide-btn-green" type="submit">
            Simpan catatan
          </button>
        </form>
      </details>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <label className="guide-field">
          Tampilkan catatan
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setLimit(10);
            }}
          >
            <option value="open">Perlu ditinjau</option>
            <option value="resolved">Sudah ditinjau</option>
            <option value="all">Semua catatan</option>
          </select>
        </label>
        <p className="guide-muted text-sm">
          {filtered.length} catatan pada filter ini · semua jalur
        </p>
      </div>
      {!filtered.length && (
        <div className="guide-empty mt-4">
          <ClipboardList size={24} aria-hidden="true" />
          <h3 className="mt-3 font-bold">
            {entries.length ? "Tidak ada catatan pada filter ini" : "Jurnal Anda siap diisi"}
          </h3>
          <p className="guide-muted mt-2">
            {entries.length
              ? "Ganti filter untuk melihat catatan lainnya."
              : "Mulai tes pemetaan, impor hasil simulasi, atau tambahkan satu kesalahan yang ingin diperbaiki."}
          </p>
        </div>
      )}
      <div className="mt-4 space-y-4">
        {filtered.slice(0, limit).map((entry) => {
          const q = QUESTION_BANK.find((q) => q.id === entry.questionId);
          return (
            <article className="guide-journal-entry" key={entry.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="guide-tag">
                  {entry.subject} · {entry.resolved ? "Sudah ditinjau" : "Perlu ditinjau"}
                </span>
                <span className="guide-muted text-xs">
                  {formatGuideDate(jakartaDate(entry.createdAt))}
                </span>
              </div>
              <h3 className="mt-3 font-bold leading-7">{entry.title}</h3>
              {q && (
                <details className="guide-detail">
                  <summary>
                    Lihat kunci dan pembahasan<span aria-hidden="true">+</span>
                  </summary>
                  <div className="p-4 leading-7">
                    <p className="mb-2 font-bold">
                      Kunci {q.answer}: {q.options.find((o) => o.label === q.answer)?.text}
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                </details>
              )}
              <label className="guide-field mt-4">
                Penyebab kesalahan
                <select
                  value={entry.cause}
                  onChange={(e) => onUpdate(entry.id, { cause: e.target.value as MistakeCause })}
                >
                  {MISTAKE_CAUSES.map((cause) => (
                    <option key={cause}>{cause}</option>
                  ))}
                </select>
              </label>
              <label className="guide-field mt-4">
                Apa yang akan diperbaiki?
                <textarea
                  maxLength={2000}
                  rows={2}
                  value={entry.correction}
                  onChange={(e) => onUpdate(entry.id, { correction: e.target.value })}
                  placeholder="Tulis langkah koreksi sebelum menandai sudah ditinjau."
                />
              </label>
              <div className="guide-actions mt-4">
                <button
                  className={`guide-btn ${entry.resolved ? "guide-btn-neutral" : "guide-btn-green"}`}
                  disabled={!entry.resolved && !entry.correction.trim()}
                  onClick={() => onUpdate(entry.id, { resolved: !entry.resolved })}
                >
                  {entry.resolved ? "Buka kembali catatan" : "Tandai sudah ditinjau"}
                </button>
                <button className="guide-btn guide-btn-danger" onClick={() => onDelete(entry.id)}>
                  Hapus catatan
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {filtered.length > limit && (
        <button className="guide-btn guide-btn-neutral mt-5" onClick={() => setLimit(limit + 10)}>
          Tampilkan 10 catatan berikutnya
        </button>
      )}
    </section>
  );
}

export function StudyGuide() {
  const [state, setState] = useState<GuideState>(emptyGuide);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [notice, setNotice] = useState("");
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [track, setTrack] = useState<GuideTrack>("cpns");
  const [runningTest, setRunningTest] = useState(false);
  const [suggestedFocus, setSuggestedFocus] = useState<Subject | "balanced">("balanced");
  const [selectedDate, setSelectedDate] = useState("");
  const [topicId, setTopicId] = useState("");
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hotsSubject, setHotsSubject] = useState<Subject>("TWK");
  const [hotsIndex, setHotsIndex] = useState(0);
  const [deletedEntry, setDeletedEntry] = useState<JournalEntry>();
  const [today, setToday] = useState(jakartaDate);
  useEffect(() => {
    try {
      const saved = readGuide(localStorage.getItem(GUIDE_KEY));
      setState(saved);
      setTrack(saved.plan?.track ?? "cpns");
      setHotsSubject(SUBJECTS[saved.plan?.track ?? "cpns"][0]!);
      setSuggestedFocus(saved.plan?.focus ?? "balanced");
      setHistory(loadExamHistory(localStorage));
    } catch {
      setStorageError(
        "Penyimpanan browser tidak tersedia. Anda tetap bisa belajar, tetapi progres sesi ini belum dapat dipulihkan setelah halaman ditutup.",
      );
    }
    setLoaded(true);
    const refresh = () => {
      setToday(jakartaDate());
      try {
        setHistory(loadExamHistory(localStorage));
      } catch {
        /* Keep the visible history. */
      }
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  function commit(next: GuideState, message?: string) {
    setState(next);
    try {
      localStorage.setItem(GUIDE_KEY, JSON.stringify(next));
      setStorageError("");
    } catch {
      setStorageError(
        "Perubahan hanya tersimpan untuk sesi ini. Browser menolak penyimpanan; unduh rencana atau jurnal untuk menyimpan salinan.",
      );
    }
    if (message) setNotice(message);
  }
  function switchTrack(value: GuideTrack) {
    setTrack(value);
    setSubjectFilter("all");
    setStatusFilter("all");
    setQuery("");
    setTopicId("");
    setHotsSubject(SUBJECTS[value][0]!);
    setHotsIndex(0);
    setSelectedDate("");
    setSuggestedFocus(
      state.plans[value]?.focus ?? (state.plan?.track === value ? state.plan.focus : "balanced"),
    );
  }
  function saveQuestion(q: Question) {
    const id = `question:${q.id}`;
    if (state.journal.some((entry) => entry.questionId === q.id && !entry.resolved)) {
      setNotice("Soal ini sudah ada di jurnal dan masih perlu ditinjau.");
      return;
    }
    commit(
      {
        ...state,
        journal: [
          ...state.journal,
          {
            id: `${id}:${Date.now()}`,
            questionId: q.id,
            subject: q.subject,
            title: q.prompt,
            cause: "Konsep" as const,
            correction: "",
            resolved: false,
            createdAt: Date.now(),
          },
        ].slice(-300),
      },
      "Soal masuk ke jurnal. Pilih penyebab dan tulis langkah koreksinya.",
    );
  }
  function finishDiagnostic(result: Diagnostic) {
    const wrong = diagnosticQuestions(track).filter((q) => result.answers[q.id] !== q.answer);
    const entries: JournalEntry[] = wrong.map((q) => ({
      id: `${result.id}:${q.id}`,
      questionId: q.id,
      subject: q.subject,
      title: q.prompt,
      cause: "Konsep",
      correction: "",
      resolved: false,
      createdAt: result.endedAt,
    }));
    commit(
      {
        ...state,
        diagnostics: [...state.diagnostics, result].slice(-30),
        journal: [...state.journal, ...entries].slice(-300),
      },
      `Tes selesai. ${wrong.length} soal yang perlu ditinjau ditambahkan ke jurnal.`,
    );
  }
  function openTopic(id: string, practice = false) {
    setTopicId(id);
    setNotice("");
    requestAnimationFrame(() => {
      document
        .getElementById(practice ? "guide-topic-practice" : "materi-terpilih")
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      document
        .getElementById(practice ? "guide-topic-practice-heading" : "guide-reader-title")
        ?.focus({ preventScroll: true });
    });
  }
  const topics = GUIDE_TOPICS[track];
  const plan = state.plans[track] ?? (state.plan?.track === track ? state.plan : null);
  const agenda = plan ? planAgenda(plan) : [];
  const day =
    agenda.find((d) => d.date === selectedDate) ??
    agenda.find((d) => d.date === today) ??
    agenda[0];
  const topic = topics.find((t) => t.id === topicId);
  const visibleTopics = topics.filter(
    (t) =>
      (subjectFilter === "all" || t.subject === subjectFilter) &&
      (statusFilter === "all" || (state.statuses[t.id] ?? "new") === statusFilter) &&
      `${t.title} ${t.chapter} ${t.description}`
        .toLocaleLowerCase("id")
        .includes(query.toLocaleLowerCase("id")),
  );
  const completedTasks = agenda.flatMap((d) => d.tasks).filter((t) => state.completed[t.id]).length;
  const allTasks = agenda.length * 3;
  const learned = topics.filter((t) => state.statuses[t.id] === "done").length;
  const latest = state.diagnostics.filter((r) => r.track === track).at(-1);
  const hotsQuestions = QUESTION_BANK.filter(
    (q) => q.subject === hotsSubject && q.difficulty === "HOTS",
  ).sort(
    (a, b) =>
      Number(Boolean(GUIDE_CASE_ANALYSIS[b.id])) - Number(Boolean(GUIDE_CASE_ANALYSIS[a.id])),
  );
  const hotsQuestion = hotsQuestions[hotsIndex % hotsQuestions.length];
  const weekly = weeklyStats(state, history, track, today);
  const weeklyTotals = weekly.reduce(
    (sum, row) => ({
      sessions: sum.sessions + row.sessions,
      answered: sum.answered + row.answered,
      correct: sum.correct + row.correct,
      seconds: sum.seconds + row.seconds,
      completed: sum.completed + row.completed,
    }),
    { sessions: 0, answered: 0, correct: 0, seconds: 0, completed: 0 },
  );

  return (
    <main className="guide-page" aria-busy={!loaded}>
      <header className="guide-hero">
        <div className="guide-container guide-hero-grid">
          <div>
            <nav aria-label="Breadcrumb" className="guide-breadcrumb">
              <Link to="/">Beranda</Link>
              <span aria-hidden="true">/</span>
              <span>Panduan belajar</span>
            </nav>
            <p className="guide-eyebrow mt-7">RUANG BELAJAR · CPNS & PPPK</p>
            <h1>
              Belajar terarah.
              <br />
              <span>Selangkah setiap hari.</span>
            </h1>
            <p className="guide-hero-description">
              Dari mengenali kemampuan awal hingga meninjau kesalahan. Susun ritme belajar, pahami
              cara menalar, dan lanjutkan dari progres terakhir Anda.
            </p>
            <div className="guide-actions">
              <a className="guide-btn guide-btn-blue" href={plan ? "#agenda" : "#rencana"}>
                <CalendarDays size={18} aria-hidden="true" />
                {plan ? "Lanjutkan agenda saya" : "Susun rencana belajar"}
              </a>
              <a className="guide-btn guide-btn-neutral" href="#tes-awal">
                <Target size={18} aria-hidden="true" />
                Kenali kemampuan awal
              </a>
            </div>
            <p className="guide-muted mt-5 text-sm">
              Gratis tanpa akun · Progres di browser ini · Materi latihan independen
            </p>
          </div>
          <aside className="guide-hero-summary" aria-label="Ringkasan belajar Anda">
            <div className="flex items-center justify-between gap-4">
              <span className="guide-eyebrow">RENCANA ANDA</span>
              <BookOpen size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">
              {plan ? `${plan.days} hari, satu tujuan.` : "Mulai dari ritme Anda."}
            </h2>
            <p className="guide-muted mt-3 leading-7">
              {plan
                ? `${formatGuideDate(plan.start)} sampai ${formatGuideDate(addDays(plan.start, plan.days - 1))}. ${plan.minutes} menit per hari untuk memahami, berlatih, dan mengevaluasi.`
                : "Belum ada rencana pada jalur ini. Pilih waktu yang realistis, lalu biarkan agenda membantu menentukan langkah berikutnya."}
            </p>
            <div className="guide-summary-progress">
              <div className="flex justify-between gap-3 text-sm">
                <span>Agenda selesai</span>
                <strong>
                  {completedTasks}/{allTasks}
                </strong>
              </div>
              <progress
                className="guide-progress mt-3"
                value={completedTasks}
                max={allTasks || 1}
                aria-label="Progres seluruh agenda"
              />
            </div>
            <div className="guide-summary-footer">
              <span>
                <strong>{learned}</strong> topik dipelajari
              </span>
              <span>
                <strong>
                  {
                    state.journal.filter((e) => SUBJECTS[track].includes(e.subject) && !e.resolved)
                      .length
                  }
                </strong>{" "}
                catatan perlu ditinjau
              </span>
            </div>
          </aside>
        </div>
      </header>

      <div className="guide-container guide-body">
        <div className="guide-toolbar">
          <div role="group" aria-label="Pilih jalur panduan" className="guide-track-switch">
            {(["cpns", "pppk"] as const).map((value) => (
              <button
                disabled={runningTest}
                key={value}
                aria-pressed={track === value}
                onClick={() => switchTrack(value)}
              >
                {value === "cpns" ? "Persiapan CPNS" : "Persiapan PPPK"}
              </button>
            ))}
          </div>
          <span className="guide-muted text-xs">
            {runningTest
              ? "Selesaikan tes sebelum mengganti jalur."
              : "Waktu dan agenda mengikuti WIB."}
          </span>
        </div>
        <nav className="guide-section-nav" aria-label="Bagian panduan">
          {sections.map(([id, label, Icon]) => (
            <a href={`#${id}`} key={id}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
        {storageError && (
          <p className="guide-warning" role="alert">
            {storageError}
          </p>
        )}
        <div className="guide-announcement" role="status" aria-live="polite">
          {notice && (
            <div className="guide-notice-content">
              <p>{notice}</p>
              <button type="button" aria-label="Tutup pemberitahuan" onClick={() => setNotice("")}>
                Tutup
              </button>
            </div>
          )}
        </div>
        <section className="guide-agenda" id="agenda" aria-labelledby="guide-agenda-title">
          <div className="guide-section-heading">
            <div>
              <p className="guide-eyebrow">Satu sesi yang bisa diselesaikan</p>
              <h2 className="guide-title" id="guide-agenda-title">
                Langkah belajar Anda
              </h2>
            </div>
            <span className="guide-tag">{formatGuideDate(today)}</span>
          </div>
          {day && plan ? (
            <>
              <div className="guide-agenda-top">
                <div>
                  <p className="font-bold">
                    Hari {day.day} dari {plan.days} · {day.topic.subject}
                  </p>
                  <p className="guide-muted mt-1 text-sm">
                    {day.date === today ? "Agenda hari ini" : `Agenda ${formatGuideDate(day.date)}`}{" "}
                    · {plan.minutes} menit
                  </p>
                </div>
                <label className="guide-field">
                  Lihat hari lain
                  <select value={day.date} onChange={(e) => setSelectedDate(e.target.value)}>
                    {agenda.map((d) => (
                      <option key={d.date} value={d.date}>
                        Hari {d.day} · {d.date}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {today > addDays(plan.start, plan.days - 1) && (
                <p className="guide-warning">
                  Periode rencana ini sudah berakhir. Anda dapat menyelesaikan agenda tersisa atau
                  menyusun tanggal mulai baru.
                </p>
              )}
              {day.tasks.map((task) => (
                <div
                  className={`guide-agenda-task ${state.completed[task.id] ? "is-done" : ""}`}
                  key={task.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={Boolean(state.completed[task.id])}
                      onChange={(e) => {
                        const completed = { ...state.completed };
                        if (e.target.checked) completed[task.id] = Date.now();
                        else delete completed[task.id];
                        commit({ ...state, completed });
                      }}
                    />
                    <span>
                      <strong>{task.title}</strong>
                      <small>
                        {task.minutes} menit ·{" "}
                        {state.completed[task.id] ? "Selesai, bisa dibuka lagi" : "Belum selesai"}
                      </small>
                    </span>
                  </label>
                  {task.kind === "review" ? (
                    <a
                      className="guide-btn guide-btn-amber"
                      href={day.day % 7 === 0 ? "#evaluasi" : "#jurnal"}
                    >
                      Tinjau catatan
                    </a>
                  ) : (
                    <button
                      className="guide-btn guide-btn-blue"
                      onClick={() => openTopic(day.topic.id, task.kind === "practice")}
                    >
                      {task.kind === "learn" ? "Buka materi" : "Buka latihan"}
                    </button>
                  )}
                </div>
              ))}
              <details className="guide-detail">
                <summary>
                  Lihat gambaran rencana {plan.days} hari<span aria-hidden="true">+</span>
                </summary>
                <div className="guide-schedule-list">
                  {agenda.map((d) => (
                    <button
                      key={d.date}
                      aria-pressed={day.date === d.date}
                      onClick={() => {
                        setSelectedDate(d.date);
                        document.getElementById("agenda")?.scrollIntoView({ block: "start" });
                      }}
                    >
                      <span>
                        Hari {d.day}
                        <small>{d.date}</small>
                      </span>
                      <span>{d.topic.title}</span>
                      <span>{d.tasks.filter((t) => state.completed[t.id]).length}/3 selesai</span>
                    </button>
                  ))}
                </div>
              </details>
            </>
          ) : (
            <div className="guide-start-state">
              <div>
                <h3 className="text-xl font-bold">Belum tahu harus belajar apa hari ini?</h3>
                <p className="guide-muted mt-3 max-w-2xl leading-7">
                  Mulai dari tes pemetaan atau langsung susun rencana. Setelah itu, bagian ini
                  menampilkan materi, latihan, dan sesi tinjauan yang bisa dicentang.
                </p>
              </div>
              <a href="#rencana" className="guide-btn guide-btn-green">
                Buat agenda pertama
              </a>
            </div>
          )}
        </section>

        <PlanBuilder
          key={`${track}:${plan?.start ?? "new"}`}
          track={track}
          initial={plan}
          suggestedFocus={suggestedFocus}
          onExport={(p) => downloadText(`rencana-${p.track}-${p.start}.txt`, exportPlan(p))}
          onSave={(p) => {
            commit(
              { ...state, plan: p, plans: { ...state.plans, [track]: p } },
              "Rencana tersimpan. Agenda Anda siap dijalankan.",
            );
            setSuggestedFocus(p.focus);
            setSelectedDate(p.start);
          }}
        />
        <DiagnosticTest
          key={track}
          track={track}
          latest={latest}
          onFinish={finishDiagnostic}
          onRunning={setRunningTest}
          onUseFocus={(focus) => {
            setSuggestedFocus(focus);
            setNotice(
              "Rekomendasi sudah dipilih pada formulir. Simpan rencana untuk menerapkannya.",
            );
            document.getElementById("rencana")?.scrollIntoView({ block: "start" });
          }}
        />

        <section className="guide-panel" id="peta-materi" aria-labelledby="guide-map-title">
          <div className="guide-section-heading">
            <div>
              <p className="guide-eyebrow">Pahami sebelum mengejar kecepatan</p>
              <h2 className="guide-title" id="guide-map-title">
                Peta materi & progres
              </h2>
            </div>
            <span className="guide-tag">
              {learned} / {topics.length} topik dipelajari
            </span>
          </div>
          <p className="guide-muted mt-3">
            Buka konsep, langkah penalaran, dan latihan setiap topik. Ubah status sesuai kebutuhan
            belajar Anda.
          </p>
          {track === "pppk" && (
            <p className="guide-warning mt-4">
              Materi teknis di sini merupakan latihan administrasi dan layanan umum. Belum mencakup
              seluruh kompetensi teknis untuk setiap jabatan PPPK.
            </p>
          )}
          <div className="guide-filter-grid mt-6">
            <label className="guide-field">
              Cari topik
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: persentase, komunikasi…"
              />
            </label>
            <label className="guide-field">
              Kategori
              <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
                <option value="all">Semua kategori</option>
                {SUBJECTS[track].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="guide-field">
              Status
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Semua status</option>
                {Object.entries(statuses).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p role="status" className="guide-muted mt-4 text-sm">
            {visibleTopics.length} topik ditemukan
          </p>
          {!visibleTopics.length && (
            <div className="guide-empty mt-4">
              <h3 className="font-bold">Topik belum ditemukan</h3>
              <p className="guide-muted mt-2">
                Coba kata kunci lain atau tampilkan semua kategori dan status.
              </p>
              <button
                className="guide-btn guide-btn-neutral mt-4"
                onClick={() => {
                  setQuery("");
                  setSubjectFilter("all");
                  setStatusFilter("all");
                }}
              >
                Hapus filter
              </button>
            </div>
          )}
          <div className="guide-topic-list">
            {visibleTopics.map((t) => (
              <article key={t.id} className="guide-topic-row">
                <div>
                  <p className="guide-eyebrow">
                    {t.subject} · {t.chapter}
                  </p>
                  <h3 className="mt-2 font-bold leading-6">{t.title}</h3>
                  <p className="guide-muted mt-2 text-sm leading-6">{t.description}</p>
                  <span className="guide-muted mt-2 block text-xs">
                    {t.questionIds.length} soal tersedia
                  </span>
                </div>
                <div className="guide-topic-controls">
                  <label className="guide-field">
                    <span className="sr-only">Status {t.title}</span>
                    <select
                      aria-label={`Status ${t.title}`}
                      value={state.statuses[t.id] ?? "new"}
                      onChange={(e) =>
                        commit({
                          ...state,
                          statuses: { ...state.statuses, [t.id]: e.target.value as TopicStatus },
                        })
                      }
                    >
                      {Object.entries(statuses).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button className="guide-btn guide-btn-blue" onClick={() => openTopic(t.id)}>
                    Pelajari topik
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        {topic && (
          <TopicReader
            key={topic.id}
            topic={topic}
            questions={topicQuestions(topic)}
            onSave={saveQuestion}
            onDone={() =>
              commit(
                { ...state, statuses: { ...state.statuses, [topic.id]: "done" } },
                "Topik ditandai sudah dipelajari. Anda tetap bisa membuka latihan atau mengubah statusnya.",
              )
            }
          />
        )}

        <section className="guide-panel" id="bedah-hots" aria-labelledby="guide-hots-title">
          <div className="guide-section-heading">
            <div>
              <p className="guide-eyebrow">Bukan hanya menghafal kunci</p>
              <h2 className="guide-title" id="guide-hots-title">
                Bedah cara berpikir HOTS
              </h2>
            </div>
            <span className="guide-tag">Analisis · evaluasi · keputusan</span>
          </div>
          <p className="guide-muted mt-3">
            Baca kendala kasus, bandingkan pilihan, lalu jelaskan alasan Anda. Setelah diperiksa,
            gunakan pembahasan untuk menemukan langkah penalaran yang terlewat.
          </p>
          <div className="guide-hots-method">
            <div>
              <strong>01 / Petakan fakta</strong>
              <p>Apa tujuan, batasan, data, dan pihak yang terdampak?</p>
            </div>
            <div>
              <strong>02 / Uji pilihan</strong>
              <p>Mana yang menyelesaikan masalah sekaligus menjaga kendala?</p>
            </div>
            <div>
              <strong>03 / Periksa alasan</strong>
              <p>Mengapa pilihan terdekat masih kurang tepat?</p>
            </div>
          </div>
          <div className="guide-hots-toolbar">
            <label className="guide-field">
              Kategori contoh
              <select
                value={hotsSubject}
                onChange={(e) => {
                  setHotsSubject(e.target.value as Subject);
                  setHotsIndex(0);
                }}
              >
                {SUBJECTS[track].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="guide-field">
              Pilih contoh
              <select value={hotsIndex} onChange={(e) => setHotsIndex(Number(e.target.value))}>
                {hotsQuestions.map((q, i) => (
                  <option value={i} key={q.id}>
                    Contoh {i + 1}
                  </option>
                ))}
              </select>
            </label>
            <span className="guide-muted text-sm">{hotsQuestions.length} contoh tersedia</span>
          </div>
          {hotsQuestion && (
            <WorkedQuestion key={hotsQuestion.id} question={hotsQuestion} onSave={saveQuestion} />
          )}
          <div className="guide-actions mt-5">
            <button
              className="guide-btn guide-btn-neutral"
              disabled={hotsIndex === 0}
              onClick={() => setHotsIndex(hotsIndex - 1)}
            >
              Contoh sebelumnya
            </button>
            <button
              className="guide-btn guide-btn-blue"
              disabled={hotsIndex >= hotsQuestions.length - 1}
              onClick={() => setHotsIndex(hotsIndex + 1)}
            >
              Contoh berikutnya
            </button>
            <Link className="guide-btn guide-btn-neutral" to="/simulasi-cat-cpns">
              Buka paket simulasi
            </Link>
          </div>
        </section>

        <GuideJournal
          entries={state.journal}
          onAdd={(entry) =>
            commit(
              {
                ...state,
                journal: [
                  ...state.journal,
                  { ...entry, id: `manual:${Date.now()}`, resolved: false, createdAt: Date.now() },
                ].slice(-300),
              },
              "Catatan ditambahkan ke jurnal.",
            )
          }
          onUpdate={(id, patch) =>
            commit({
              ...state,
              journal: state.journal.map((entry) =>
                entry.id === id ? { ...entry, ...patch } : entry,
              ),
            })
          }
          onDelete={(id) => {
            setDeletedEntry(state.journal.find((e) => e.id === id));
            commit(
              { ...state, journal: state.journal.filter((e) => e.id !== id) },
              "Catatan dihapus. Gunakan Pulihkan catatan terakhir bila diperlukan.",
            );
          }}
          onImport={() => {
            const imported = journalFromExam(history, state.journal, track);
            commit(
              { ...state, journal: [...state.journal, ...imported].slice(-300) },
              imported.length
                ? `${imported.length} kesalahan diimpor. Penyebab awal diisi Konsep; sesuaikan setelah meninjau.`
                : "Tidak ada kesalahan baru untuk diimpor. Selesaikan simulasi pada jalur ini di browser yang sama terlebih dahulu.",
            );
          }}
          onExport={() =>
            downloadText(
              "jurnal-kesalahan.txt",
              state.journal
                .map(
                  (e) =>
                    `${e.subject} | ${e.resolved ? "Sudah ditinjau" : "Perlu ditinjau"}\n${e.title}\nPenyebab: ${e.cause}\nKoreksi: ${e.correction || "Belum dicatat"}`,
                )
                .join("\n\n"),
            )
          }
        />
        {deletedEntry && (
          <div className="guide-undo">
            <p>Catatan terakhir yang dihapus masih dapat dipulihkan selama halaman ini terbuka.</p>
            <button
              className="guide-btn guide-btn-neutral"
              onClick={() => {
                commit(
                  { ...state, journal: [...state.journal, deletedEntry].slice(-300) },
                  "Catatan dipulihkan.",
                );
                setDeletedEntry(undefined);
              }}
            >
              Pulihkan catatan terakhir
            </button>
          </div>
        )}

        <section className="guide-panel" id="evaluasi" aria-labelledby="guide-eval-title">
          <div className="guide-section-heading">
            <div>
              <p className="guide-eyebrow">Lihat proses, tentukan langkah berikutnya</p>
              <h2 className="guide-title" id="guide-eval-title">
                Evaluasi tujuh hari terakhir
              </h2>
            </div>
            <ChartNoAxesCombined className="guide-section-icon" aria-hidden="true" />
          </div>
          <p className="guide-muted mt-3">
            {formatGuideDate(addDays(today, -6))} sampai {formatGuideDate(today)}. Menggabungkan tes
            pemetaan dan hasil simulasi {track.toUpperCase()} yang tersimpan di perangkat ini.
            Latihan contoh pada materi tidak dihitung sebagai sesi tes.
          </p>
          <div className="guide-week-summary">
            <div>
              <strong>{weeklyTotals.completed}</strong>
              <span>tugas dicentang</span>
            </div>
            <div>
              <strong>{weeklyTotals.sessions}</strong>
              <span>sesi tes selesai</span>
            </div>
            <div>
              <strong>
                {weeklyTotals.answered
                  ? `${Math.round((weeklyTotals.correct / weeklyTotals.answered) * 100)}%`
                  : "Belum ada"}
              </strong>
              <span>ketepatan soal dijawab</span>
            </div>
            <div>
              <strong>{Math.round(weeklyTotals.seconds / 60)} menit</strong>
              <span>waktu sesi tes</span>
            </div>
          </div>
          <div className="guide-week-bars" aria-label="Tugas selesai per hari">
            {weekly.map((row) => (
              <div key={row.date}>
                <span>{row.completed}</span>
                <div className="guide-bar-track">
                  <div
                    style={{
                      height: `${Math.max(0, (row.completed / Math.max(3, ...weekly.map((r) => r.completed))) * 100)}%`,
                    }}
                  />
                </div>
                <time dateTime={row.date}>
                  {row.date.slice(8)}/{row.date.slice(5, 7)}
                </time>
              </div>
            ))}
          </div>
          {!weeklyTotals.sessions && (
            <p className="guide-empty mt-5">
              Belum ada hasil tes dalam tujuh hari terakhir. Mulai tes pemetaan atau selesaikan
              simulasi untuk melihat ketepatan dan waktu pengerjaan.
            </p>
          )}
          <details className="guide-detail mt-5">
            <summary>
              Lihat rincian harian<span aria-hidden="true">+</span>
            </summary>
            <div
              className="guide-table-scroll"
              role="region"
              aria-label="Rincian aktivitas tujuh hari, dapat digulir horizontal"
              tabIndex={0}
            >
              <table>
                <caption className="sr-only">
                  Aktivitas berdasarkan tanggal penyelesaian WIB
                </caption>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Tugas</th>
                    <th>Sesi</th>
                    <th>Benar / dijawab</th>
                    <th>Waktu tes</th>
                  </tr>
                </thead>
                <tbody>
                  {weekly.map((r) => (
                    <tr key={r.date}>
                      <th scope="row">{r.date}</th>
                      <td>{r.completed}</td>
                      <td>{r.sessions}</td>
                      <td>
                        {r.correct}/{r.answered}
                      </td>
                      <td>{Math.round(r.seconds / 60)} menit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <div className="guide-note mt-5">
            <h3 className="font-bold">Gunakan hasil untuk menyesuaikan rencana</h3>
            <p className="mt-2 leading-7">
              {weeklyTotals.sessions
                ? "Tinjau kategori dengan kesalahan berulang di jurnal. Jika jawaban benar tetapi waktunya lama, ulangi model penalarannya sebelum menaikkan kecepatan. Jika tugas sering tertunda, turunkan durasi harian ke ritme yang dapat dijalankan."
                : "Mulai dengan sesi yang realistis. Setelah ada beberapa latihan, bandingkan pola kesalahan dan waktu, bukan hanya satu nilai."}
            </p>
            <p className="mt-2 text-sm leading-6">
              Ketepatan dihitung dari soal yang dijawab, bukan seluruh soal paket. Jenis dan
              kesulitan sesi bisa berbeda; angka ini bukan prediksi kelulusan.
            </p>
          </div>
          <div className="guide-actions mt-5">
            <a href="#rencana" className="guide-btn guide-btn-green">
              Sesuaikan rencana
            </a>
            <Link to="/dashboard" className="guide-btn guide-btn-neutral">
              Lihat riwayat latihan
            </Link>
          </div>
        </section>

        <section className="guide-panel" id="administrasi" aria-labelledby="guide-admin-title">
          <p className="guide-eyebrow">Belajar dan berkas berjalan bersama</p>
          <h2 className="guide-title" id="guide-admin-title">
            Persiapan administrasi
          </h2>
          <p className="guide-muted mt-3">
            Checklist pribadi ini membantu mengatur persiapan. Daftar dokumen, format, jadwal, dan
            ketentuan akhir selalu mengikuti pengumuman resmi instansi yang dipilih.
          </p>
          <div className="guide-admin-grid">
            {[
              [
                "source",
                "Saya sudah memeriksa kanal resmi dan mencatat instansi tujuan.",
                "/formasi-cpns",
                "Cari pengumuman instansi",
              ],
              [
                "requirements",
                "Saya sudah mencocokkan persyaratan dengan pengumuman instansi.",
                "/syarat-cpns",
                "Baca panduan persyaratan",
              ],
              [
                "documents",
                "Saya sudah memeriksa keterbacaan, format, dan ukuran berkas.",
                "/persiapan-dokumen",
                "Buka alat persiapan dokumen",
              ],
              [
                "schedule",
                "Saya sudah mencatat tanggal penting dari sumber resmi.",
                "/jadwal-cpns",
                "Periksa sumber jadwal",
              ],
            ].map(([id, label, url, action]) => (
              <div className="guide-admin-item" key={id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(state.completed[`admin:${id}`])}
                    onChange={(e) => {
                      const completed = { ...state.completed };
                      if (e.target.checked) completed[`admin:${id}`] = Date.now();
                      else delete completed[`admin:${id}`];
                      commit({ ...state, completed });
                    }}
                  />
                  <span>{label}</span>
                </label>
                <Link to={url!} className="guide-text-link">
                  {action}
                </Link>
              </div>
            ))}
          </div>
          <div className="guide-actions mt-5">
            <Link to="/alat-belajar" className="guide-btn guide-btn-neutral">
              Kalkulator dan kamus CASN
            </Link>
            <Link to="/situs" className="guide-btn guide-btn-neutral">
              Direktori sumber resmi
            </Link>
          </div>
        </section>

        <section className="guide-faq" aria-labelledby="guide-faq-title">
          <div>
            <p className="guide-eyebrow">Sebelum melanjutkan</p>
            <h2 className="guide-title" id="guide-faq-title">
              Belajar dengan cara yang tepat
            </h2>
            <p className="guide-muted mt-3 leading-7">
              Panduan ini membantu membangun kebiasaan dan menalar soal. Ukur kemajuan dari bukti
              latihan Anda sendiri.
            </p>
          </div>
          <div>
            {[
              [
                "Harus mulai dari tes awal atau rencana belajar?",
                "Keduanya bisa. Pilih tes awal bila belum tahu prioritas materi. Jika sudah mengenali kelemahan, langsung buat rencana dan pilih fokus. Anda bisa mengganti rencana setelah evaluasi mingguan.",
              ],
              [
                "Bagaimana jika hanya punya 15 menit sehari?",
                "Pilih 15 menit di rencana. Selesaikan sesi konsep, beberapa soal, dan tinjauan singkat sesuai agenda. Alokasi waktu adalah panduan fleksibel; lanjutkan soal yang belum selesai pada sesi berikutnya.",
              ],
              [
                "Apakah hasil tes menentukan kesiapan atau kelulusan?",
                "Tidak. Tes pemetaan hanya sembilan soal dan dipakai untuk menentukan fokus awal. Nilai latihan menunjukkan kecocokan terhadap kunci soal, bukan skor atau hasil seleksi resmi.",
              ],
              [
                "Apakah topik sudah dipelajari berarti sudah dikuasai?",
                "Status topik Anda atur sendiri. Gunakan Perlu diulang bila masih kesulitan menjelaskan alasan jawaban atau kesalahan yang sama berulang. Cek pemahaman pada soal yang belum pernah dikerjakan.",
              ],
              [
                "Apakah progres tersimpan di perangkat lain?",
                "Belum. Rencana, status, tes pemetaan, dan jurnal disimpan di browser ini tanpa akun. Data bisa hilang jika penyimpanan browser dihapus. Unduh rencana dan jurnal sebagai salinan; berkas unduhan belum bisa diimpor kembali.",
              ],
              [
                "Bagaimana memakai panduan untuk PPPK?",
                "Pilih jalur PPPK untuk agenda dan contoh manajerial, sosial kultural, serta teknis umum. Tambahkan pembelajaran kompetensi jabatan dari referensi yang sesuai pengumuman instansi; bank ini belum mewakili seluruh jabatan.",
              ],
            ].map(([q, a]) => (
              <details className="guide-detail" key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p className="p-4 leading-7">{a}</p>
              </details>
            ))}
          </div>
        </section>
        <footer className="guide-closing">
          <div>
            <h2 className="text-xl font-bold">Siap menguji ritme belajar?</h2>
            <p className="guide-muted mt-2 leading-7">
              Coba paket simulasi, lalu kembali ke panduan untuk meninjau kesalahan.
            </p>
          </div>
          <Link to="/simulasi-cat-cpns" className="guide-btn guide-btn-blue">
            Pilih paket simulasi CAT
          </Link>
        </footer>
        <p className="guide-muted text-xs leading-6">
          Materi dan skenario latihan disusun untuk pembelajaran independen, bukan naskah soal
          resmi. Halaman ini tidak menerima berkas atau data pendaftaran ASN. Jurnal menyimpan
          hingga 300 catatan terbaru dan tes pemetaan hingga 30 hasil terbaru.
        </p>
      </div>
    </main>
  );
}
