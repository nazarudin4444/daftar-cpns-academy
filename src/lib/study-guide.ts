import { QUESTION_BANK, type Question, type Subject } from "@/lib/exam";
import { CPNS_SUBJECT_CATALOG } from "@/lib/exam-catalog";
import { questionsForAttempt } from "@/lib/exam-packages";
import type { ExamResult } from "@/lib/exam-storage";

export type GuideTrack = "cpns" | "pppk";
export type TopicStatus = "new" | "learning" | "review" | "done";
export type MistakeCause = "Konsep" | "Hitungan" | "Salah baca" | "Waktu" | "Pengambilan keputusan";
export const MISTAKE_CAUSES: MistakeCause[] = [
  "Konsep",
  "Hitungan",
  "Salah baca",
  "Waktu",
  "Pengambilan keputusan",
];
export const GUIDE_KEY = "daftar-cpns:study-guide:v1";
export const SUBJECTS: Record<GuideTrack, Subject[]> = {
  cpns: ["TWK", "TIU", "TKP"],
  pppk: ["Manajerial", "Sosial Kultural", "Teknis"],
};

export type GuideTopic = {
  id: string;
  title: string;
  chapter: string;
  subject: Subject;
  description: string;
  questionIds: string[];
};
export const GUIDE_TOPICS: Record<GuideTrack, GuideTopic[]> = {
  cpns: CPNS_SUBJECT_CATALOG.flatMap((category) =>
    category.chapters.flatMap((chapter) =>
      chapter.subchapters.map((topic) => ({
        ...topic,
        subject: category.subject,
        chapter: chapter.title,
      })),
    ),
  ),
  pppk: (
    [
      [
        "Manajerial",
        "Kolaborasi dan prioritas",
        "Menimbang kapasitas tim, tenggat, dan pembagian tanggung jawab.",
      ],
      [
        "Manajerial",
        "Evaluasi dan perubahan",
        "Menilai bukti hasil kerja sebelum memutuskan perbaikan proses.",
      ],
      [
        "Sosial Kultural",
        "Komunikasi lintas latar",
        "Memahami kebutuhan tanpa mengandalkan asumsi tentang identitas.",
      ],
      [
        "Sosial Kultural",
        "Akses dan penyelesaian perbedaan",
        "Mencari pilihan yang memberi ruang partisipasi dan menyelesaikan akar masalah.",
      ],
      [
        "Teknis",
        "Ketelitian proses dan data",
        "Memeriksa sumber, alur pemeriksaan, dan risiko kesalahan administrasi.",
      ],
      [
        "Teknis",
        "Layanan dan pengendalian mutu",
        "Menilai mutu keluaran, keamanan informasi, dan tindak lanjut layanan.",
      ],
    ] as [Subject, string, string][]
  ).map(([subject, title, description], index) => ({
    id: `guide-pppk-${index + 1}`,
    title,
    description,
    subject,
    chapter: `${subject}: latihan dasar`,
    questionIds: QUESTION_BANK.filter((q) => q.subject === subject)
      .filter((_, i) => i % 2 === index % 2)
      .map((q) => q.id),
  })),
};

export const SUBJECT_LESSONS: Record<
  Subject,
  { principle: string; steps: string[]; traps: string[]; review: string }
> = {
  TWK: {
    principle:
      "Nilai kebangsaan diuji melalui akibat suatu keputusan. Hubungkan prinsip yang relevan dengan siapa yang memperoleh akses, siapa yang menanggung dampak, dan bagaimana keputusan dapat dipertanggungjawabkan.",
    steps: [
      "Pisahkan fakta kasus, tujuan bersama, dan kepentingan masing-masing pihak.",
      "Tentukan prinsip yang relevan: kesetaraan, musyawarah, persatuan, atau akuntabilitas.",
      "Bandingkan dampak setiap pilihan, termasuk bagi kelompok yang kurang terwakili.",
      "Pilih tindakan proporsional yang menjaga prinsip sekaligus menyelesaikan masalah.",
    ],
    traps: [
      "Menganggap suara terbanyak selalu cukup untuk membenarkan keputusan.",
      "Menyamakan perlakuan identik dengan akses yang adil.",
      "Memilih slogan persatuan tanpa memeriksa dampak kebijakannya.",
    ],
    review:
      "Tuliskan satu alasan mengapa pilihan terdekat masih kurang tepat. Jika alasannya hanya terdengar baik, baca ulang kendala pada kasus.",
  },
  TIU: {
    principle:
      "Penalaran dimulai dengan menerjemahkan informasi menjadi hubungan yang dapat diuji. Pada hitungan, periksa besaran dan satuan; pada premis, batasi kesimpulan pada apa yang benar-benar dinyatakan.",
    steps: [
      "Tuliskan yang diketahui dan yang ditanyakan sebelum menghitung.",
      "Buat persamaan, tabel kecil, diagram urutan, atau hubungan premis yang diperlukan.",
      "Selesaikan bertahap; jaga satuan, bobot kelompok, dan perubahan kondisi.",
      "Uji hasil pada informasi awal dan periksa apakah jawabannya masuk akal.",
    ],
    traps: [
      "Merata-ratakan dua kelompok tanpa memperhatikan jumlah anggotanya.",
      "Menghitung target kumulatif seolah hasil satu periode.",
      "Membalik hubungan jika-maka atau mengubah sebagian menjadi semua.",
    ],
    review:
      "Kerjakan ulang tanpa melihat pembahasan. Jelaskan mengapa model yang dipilih sesuai dengan informasi, lalu cek hitungan terakhir.",
  },
  TKP: {
    principle:
      "Pilihan respons perlu dinilai dari mutu tindakan, bukan kesopanan kalimatnya saja. Respons yang kuat memperjelas masalah, menjaga kewenangan, dan memberi tindak lanjut yang dapat dijalankan.",
    steps: [
      "Identifikasi masalah utama, pihak terdampak, tenggat, dan risiko.",
      "Bedakan tindakan yang dapat Anda lakukan dari yang memerlukan persetujuan.",
      "Cari respons yang menjaga pelayanan, integritas, dan koordinasi secara bersamaan.",
      "Periksa apakah pilihan memberi langkah konkret dan cara mengevaluasi hasilnya.",
    ],
    traps: [
      "Menjanjikan hasil sebelum memeriksa kapasitas atau data.",
      "Melempar seluruh masalah kepada atasan tanpa upaya awal.",
      "Mengutamakan kecepatan dengan melewati pemeriksaan penting.",
    ],
    review:
      "Bandingkan dua pilihan paling masuk akal. Temukan perbedaan pada kewenangan, risiko, atau tindak lanjut. Skor latihan memakai kecocokan kunci, bukan bobot resmi TKP.",
  },
  Manajerial: {
    principle:
      "Keputusan manajerial menghubungkan tujuan, kapasitas, pembagian peran, serta pengendalian risiko. Hasil tim perlu dinilai dari mutu dan penyelesaian, bukan kesibukan anggota.",
    steps: [
      "Tentukan hasil yang dibutuhkan dan batas waktu.",
      "Petakan kapasitas, ketergantungan tugas, dan titik risiko.",
      "Bandingkan alternatif pembagian kerja berdasarkan dampak.",
      "Tetapkan penanggung jawab dan titik pemeriksaan progres.",
    ],
    traps: [
      "Mengambil alih semua tugas sehingga ketergantungan tim bertambah.",
      "Menetapkan target tanpa kapasitas pendukung.",
      "Menerapkan perubahan tanpa evaluasi mutu hasil.",
    ],
    review: "Jelaskan ukuran keberhasilan pilihan Anda dan kapan tindakan perlu disesuaikan.",
  },
  "Sosial Kultural": {
    principle:
      "Informasi tentang kebutuhan seseorang harus diperoleh lewat komunikasi dan konteks. Identitas kelompok tidak cukup menjadi dasar menyimpulkan kemampuan, sikap, atau kebutuhan individu.",
    steps: [
      "Pisahkan fakta dari asumsi tentang latar seseorang.",
      "Klarifikasi kebutuhan dengan bahasa yang dapat dipahami.",
      "Cari alternatif yang menjaga kesempatan berpartisipasi.",
      "Periksa pemahaman dan dampak penyelesaian bagi seluruh pihak.",
    ],
    traps: [
      "Menggeneralisasi satu pengalaman menjadi sifat kelompok.",
      "Menyelesaikan perbedaan dengan memisahkan pihak secara permanen.",
      "Menganggap diam berarti setuju atau sudah memahami.",
    ],
    review:
      "Tanyakan: apakah respons tetap adil jika identitas pihak pada kasus ditukar? Tinjau alasan yang tidak relevan dengan kebutuhan nyata.",
  },
  Teknis: {
    principle:
      "Latihan teknis di sini berfokus pada proses administrasi dan layanan umum. Untuk persiapan jabatan tertentu, tetap gunakan kompetensi dan referensi yang sesuai pengumuman jabatan Anda.",
    steps: [
      "Tentukan keluaran, sumber data, dan prosedur yang relevan.",
      "Telusuri tahap yang berisiko salah atau menghasilkan duplikasi.",
      "Pilih kontrol yang mencegah kesalahan tanpa menghilangkan layanan.",
      "Catat temuan dan tentukan verifikasi serta tindak lanjut.",
    ],
    traps: [
      "Menggunakan angka tanpa memeriksa sumber atau definisinya.",
      "Membuka data produksi untuk mempercepat demonstrasi.",
      "Menganggap dokumen selesai berarti hasilnya sudah valid.",
    ],
    review:
      "Gambarkan alur input, pemeriksaan, keluaran, dan penanggung jawab. Tandai bagian yang masih memerlukan bukti.",
  },
};

export type StudyPlan = {
  track: GuideTrack;
  days: number;
  minutes: number;
  start: string;
  focus: Subject | "balanced";
};
export type Diagnostic = {
  id: string;
  track: GuideTrack;
  endedAt: number;
  seconds: number;
  answers: Record<string, string>;
  questionIds: string[];
};
export type JournalEntry = {
  id: string;
  subject: Subject;
  questionId?: string;
  title: string;
  cause: MistakeCause;
  correction: string;
  resolved: boolean;
  createdAt: number;
};
export type GuideState = {
  plan: StudyPlan | null;
  plans: Partial<Record<GuideTrack, StudyPlan>>;
  completed: Record<string, number>;
  statuses: Record<string, TopicStatus>;
  journal: JournalEntry[];
  diagnostics: Diagnostic[];
};
export const emptyGuide = (): GuideState => ({
  plan: null,
  plans: {},
  completed: {},
  statuses: {},
  journal: [],
  diagnostics: [],
});

export function jakartaDate(time = Date.now()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(time);
}
export function addDays(date: string, offset: number): string {
  return new Date(Date.parse(`${date}T00:00:00Z`) + offset * 86400000).toISOString().slice(0, 10);
}
export function validDate(date: unknown): date is string {
  return (
    typeof date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(Date.parse(`${date}T00:00:00Z`)) &&
    addDays(date, 0) === date
  );
}
export function formatGuideDate(date: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function topicQuestions(topic: GuideTopic, count = 5): Question[] {
  const ids = new Set(topic.questionIds);
  return QUESTION_BANK.filter((q) => ids.has(q.id)).slice(0, count);
}
export function diagnosticQuestions(track: GuideTrack): Question[] {
  return SUBJECTS[track].flatMap((subject) =>
    QUESTION_BANK.filter((q) => q.subject === subject && q.difficulty === "HOTS").slice(-3),
  );
}
export function diagnosticBreakdown(result: Diagnostic) {
  return SUBJECTS[result.track].map((subject) => {
    const questions = result.questionIds.flatMap(
      (id) => QUESTION_BANK.find((q) => q.id === id && q.subject === subject) ?? [],
    );
    const correct = questions.filter((q) => result.answers[q.id] === q.answer).length;
    return {
      subject,
      total: questions.length,
      correct,
      percent: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    };
  });
}
export function recommendedFocus(result: Diagnostic): Subject | "balanced" {
  const rows = diagnosticBreakdown(result);
  if (!rows.length || rows.every((row) => row.percent === rows[0]!.percent)) return "balanced";
  return [...rows].sort((a, b) => a.percent - b.percent)[0]!.subject;
}

export function planAgenda(plan: StudyPlan) {
  const groups = SUBJECTS[plan.track].map((subject) =>
    GUIDE_TOPICS[plan.track].filter((topic) => topic.subject === subject),
  );
  const topics = Array.from({ length: Math.max(...groups.map((group) => group.length)) }, (_, i) =>
    groups.flatMap((group) => group[i] ?? []),
  ).flat();
  const focusTopics = topics.filter((topic) => topic.subject === plan.focus);
  let generalIndex = 0;
  let focusIndex = 0;
  return Array.from({ length: plan.days }, (_, i) => {
    const topic =
      focusTopics.length && i % 2 === 0
        ? focusTopics[focusIndex++ % focusTopics.length]!
        : topics[generalIndex++ % topics.length]!;
    const date = addDays(plan.start, i);
    const review = Math.max(3, Math.floor(plan.minutes * 0.2));
    const learn = Math.floor((plan.minutes - review) / 2);
    return {
      day: i + 1,
      date,
      topic,
      tasks: [
        {
          id: `${date}:${topic.id}:learn`,
          kind: "learn" as const,
          title: `Pelajari: ${topic.title}`,
          minutes: learn,
        },
        {
          id: `${date}:${topic.id}:practice`,
          kind: "practice" as const,
          title: `Kerjakan 5 soal ${topic.subject}`,
          minutes: plan.minutes - review - learn,
        },
        {
          id: `${date}:${topic.id}:review`,
          kind: "review" as const,
          title:
            (i + 1) % 7 === 0
              ? "Evaluasi pekan ini dan perbarui prioritas"
              : "Tinjau pembahasan dan catat kesalahan",
          minutes: review,
        },
      ],
    };
  });
}

function readPlan(value: unknown): StudyPlan | null {
  if (!value || typeof value !== "object") return null;
  const plan = value as Partial<StudyPlan>;
  return (plan.track === "cpns" || plan.track === "pppk") &&
    [14, 30, 60, 90].includes(plan.days ?? 0) &&
    [15, 30, 60, 90].includes(plan.minutes ?? 0) &&
    validDate(plan.start) &&
    (plan.focus === "balanced" || SUBJECTS[plan.track].includes(plan.focus as Subject))
    ? (plan as StudyPlan)
    : null;
}

function validTime(value: unknown): value is number {
  return typeof value === "number" && value > 0 && Number.isFinite(new Date(value).getTime());
}

export function readGuide(raw: string | null): GuideState {
  if (!raw) return emptyGuide();
  try {
    const v: unknown = JSON.parse(raw);
    if (!v || typeof v !== "object" || Array.isArray(v)) return emptyGuide();
    const data = v as Record<string, unknown>;
    const state = emptyGuide();
    state.plan = readPlan(data["plan"]);
    const plans = data["plans"];
    if (plans && typeof plans === "object") {
      for (const track of ["cpns", "pppk"] as const) {
        const plan = readPlan((plans as Record<string, unknown>)[track]);
        if (plan?.track === track) state.plans[track] = plan;
      }
    }
    if (state.plan && !state.plans[state.plan.track]) state.plans[state.plan.track] = state.plan;
    if (data["completed"] && typeof data["completed"] === "object")
      state.completed = Object.fromEntries(
        Object.entries(data["completed"]).filter(
          ([key, time]) => key.length < 200 && validTime(time),
        ),
      );
    if (data["statuses"] && typeof data["statuses"] === "object")
      state.statuses = Object.fromEntries(
        Object.entries(data["statuses"]).filter(
          ([key, status]) =>
            key.length < 150 && ["new", "learning", "review", "done"].includes(status as string),
        ),
      ) as GuideState["statuses"];
    if (Array.isArray(data["journal"]))
      state.journal = data["journal"]
        .filter(
          (item): item is JournalEntry =>
            item &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            Object.values(SUBJECTS).flat().includes(item.subject) &&
            typeof item.title === "string" &&
            typeof item.correction === "string" &&
            MISTAKE_CAUSES.includes(item.cause) &&
            typeof item.resolved === "boolean" &&
            validTime(item.createdAt) &&
            (item.questionId === undefined || typeof item.questionId === "string"),
        )
        .slice(-300);
    if (Array.isArray(data["diagnostics"]))
      state.diagnostics = data["diagnostics"]
        .filter(
          (item): item is Diagnostic =>
            item &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            (item.track === "cpns" || item.track === "pppk") &&
            validTime(item.endedAt) &&
            item.seconds >= 0 &&
            Number.isFinite(item.seconds) &&
            Array.isArray(item.questionIds) &&
            item.questionIds.length === 9 &&
            new Set(item.questionIds).size === 9 &&
            item.questionIds.every(
              (id: unknown) =>
                typeof id === "string" &&
                QUESTION_BANK.some(
                  (q) => q.id === id && SUBJECTS[item.track as GuideTrack].includes(q.subject),
                ),
            ) &&
            item.answers &&
            typeof item.answers === "object" &&
            !Array.isArray(item.answers) &&
            Object.entries(item.answers).length === 9 &&
            Object.entries(item.answers).every(
              ([id, a]) =>
                item.questionIds.includes(id) && typeof a === "string" && /^[A-E]$/.test(a),
            ),
        )
        .slice(-30);
    return state;
  } catch {
    return emptyGuide();
  }
}

export function journalFromExam(
  history: ExamResult[],
  existing: JournalEntry[],
  track: GuideTrack,
): JournalEntry[] {
  const ids = new Set(existing.map((entry) => entry.id));
  const result: JournalEntry[] = [];
  for (const exam of history.filter((exam) => exam.track === track && validTime(exam.endedAt))) {
    for (const q of questionsForAttempt(exam)) {
      const id = `exam:${exam.endedAt}:${q.id}`;
      if (!exam.answers[q.id] || exam.answers[q.id] === q.answer || ids.has(id)) continue;
      ids.add(id);
      result.push({
        id,
        questionId: q.id,
        subject: q.subject,
        title: q.prompt,
        cause: "Konsep",
        correction: "",
        resolved: false,
        createdAt: exam.endedAt,
      });
    }
  }
  return result;
}

export function weeklyStats(
  state: GuideState,
  history: ExamResult[],
  track: GuideTrack,
  today: string,
) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  return days.map((date) => {
    const diagnostics = state.diagnostics.filter(
      (r) => r.track === track && validTime(r.endedAt) && jakartaDate(r.endedAt) === date,
    );
    const exams = history.filter(
      (r) => r.track === track && validTime(r.endedAt) && jakartaDate(r.endedAt) === date,
    );
    let correct = 0,
      answered = 0,
      seconds = 0;
    for (const r of diagnostics) {
      for (const row of diagnosticBreakdown(r)) correct += row.correct;
      answered += Object.keys(r.answers).length;
      seconds += r.seconds;
    }
    for (const r of exams) {
      const questions = questionsForAttempt(r);
      correct += questions.filter((q) => r.answers[q.id] === q.answer).length;
      answered += questions.filter((q) => r.answers[q.id]).length;
      seconds += r.elapsedSeconds;
    }
    const completed = Object.entries(state.completed).filter(
      ([id, time]) =>
        jakartaDate(time) === date && GUIDE_TOPICS[track].some((t) => id.includes(`:${t.id}:`)),
    ).length;
    return {
      date,
      completed,
      sessions: diagnostics.length + exams.length,
      correct,
      answered,
      seconds,
    };
  });
}

export function exportPlan(plan: StudyPlan): string {
  return [
    `Rencana belajar ${plan.track.toUpperCase()} | ${plan.days} hari | ${plan.minutes} menit/hari`,
    "Rencana latihan pribadi, bukan jadwal seleksi resmi. Progres disimpan di browser.",
    ...planAgenda(plan).map(
      (day) =>
        `\nHari ${day.day} | ${day.date}\n${day.tasks.map((task) => `[ ] ${task.title} (${task.minutes} menit)`).join("\n")}`,
    ),
  ].join("\n");
}
