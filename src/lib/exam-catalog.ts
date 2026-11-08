import { QUESTION_BANK, type Question, type Subject } from "@/lib/exam";

export type CPNSSubject = Extract<Subject, "TWK" | "TIU" | "TKP">;

export type QuestionSubchapter = {
  id: string;
  title: string;
  description: string;
  questionIds: string[];
};

export type QuestionChapter = {
  id: string;
  title: string;
  subchapters: QuestionSubchapter[];
};

export type QuestionSeries = {
  id: string;
  title: string;
  questions: Question[];
};

const QUESTIONS_PER_SERIES = 5;

export const CPNS_SUBJECT_CATALOG: {
  subject: CPNSSubject;
  description: string;
  chapters: QuestionChapter[];
}[] = [
  {
    subject: "TWK",
    description: "Latihan nilai kebangsaan, demokrasi, dan kehidupan bersama.",
    chapters: [
      {
        id: "twk-rights-integrity",
        title: "Hak Warga dan Keadilan",
        subchapters: [
          {
            id: "twk-fairness",
            title: "Keadilan dan integritas dalam layanan",
            description:
              "Menerapkan perlakuan setara, aturan yang adil, dan tanggung jawab publik.",
            questionIds: [
              "twk-04",
              "twk-10",
              "twk-12",
              "twk-15",
              "twk-hots-04",
              "twk-hots-08",
              "twk-hots-10",
              "twk-16",
              "twk-17",
              "twk-18",
            ],
          },
        ],
      },
      {
        id: "twk-diversity",
        title: "Persatuan dan Keberagaman",
        subchapters: [
          {
            id: "twk-inclusion",
            title: "Bhinneka dan sikap inklusif",
            description: "Menjaga kebersamaan sambil menghormati perbedaan dan kebutuhan warga.",
            questionIds: [
              "twk-02",
              "twk-06",
              "twk-08",
              "twk-14",
              "twk-hots-01",
              "twk-hots-06",
              "twk-19",
              "twk-20",
              "twk-21",
              "twk-22",
              "twk-hots-26",
            ],
          },
          {
            id: "twk-regional-access",
            title: "Pemerataan akses antardaerah",
            description: "Menimbang kebutuhan daerah yang berbeda dalam kebijakan bersama.",
            questionIds: [
              "twk-09",
              "twk-hots-03",
              "twk-hots-09",
              "twk-23",
              "twk-24",
              "twk-25",
              "twk-26",
              "twk-27",
              "twk-28",
              "twk-29",
              "twk-hots-27",
            ],
          },
        ],
      },
      {
        id: "twk-democracy",
        title: "Demokrasi dan Partisipasi",
        subchapters: [
          {
            id: "twk-deliberation",
            title: "Musyawarah dan partisipasi warga",
            description:
              "Mengambil keputusan terbuka dan bertanggung jawab untuk kepentingan bersama.",
            questionIds: [
              "twk-01",
              "twk-05",
              "twk-07",
              "twk-11",
              "twk-hots-05",
              "twk-30",
              "twk-31",
              "twk-32",
              "twk-33",
              "twk-34",
              "twk-hots-28",
              "twk-hots-29",
            ],
          },
          {
            id: "twk-information",
            title: "Literasi informasi dan persatuan",
            description: "Memeriksa kabar sebelum menanggapi atau menyebarkannya.",
            questionIds: [
              "twk-03",
              "twk-13",
              "twk-hots-02",
              "twk-hots-07",
              "twk-35",
              "twk-36",
              "twk-37",
              "twk-38",
              "twk-39",
              "twk-40",
              "twk-hots-30",
            ],
          },
        ],
      },
      {
        id: "twk-foundations",
        title: "Pancasila dan Konstitusi",
        subchapters: [
          {
            id: "twk-values",
            title: "Nilai Pancasila dalam kehidupan bernegara",
            description:
              "Menerapkan nilai dasar negara saat menimbang kebijakan dan kepentingan warga.",
            questionIds: [
              "twk-41",
              "twk-42",
              "twk-43",
              "twk-44",
              "twk-45",
              "twk-hots-11",
              "twk-hots-12",
              "twk-hots-13",
              "twk-hots-14",
              "twk-hots-15",
            ],
          },
        ],
      },
      {
        id: "twk-national-resilience",
        title: "Wawasan Kebangsaan dan Bela Negara",
        subchapters: [
          {
            id: "twk-unity",
            title: "NKRI dan wawasan Nusantara",
            description:
              "Menimbang persatuan wilayah, kepentingan bersama, dan perbedaan kondisi daerah.",
            questionIds: [
              "twk-46",
              "twk-47",
              "twk-48",
              "twk-49",
              "twk-50",
              "twk-hots-16",
              "twk-hots-17",
              "twk-hots-18",
              "twk-hots-19",
              "twk-hots-20",
            ],
          },
          {
            id: "twk-defense",
            title: "Bela negara dan ketahanan masyarakat",
            description:
              "Memilih tindakan warga yang menjaga ketahanan bersama secara bertanggung jawab.",
            questionIds: [
              "twk-51",
              "twk-52",
              "twk-53",
              "twk-54",
              "twk-55",
              "twk-hots-21",
              "twk-hots-22",
              "twk-hots-23",
              "twk-hots-24",
              "twk-hots-25",
            ],
          },
        ],
      },
    ],
  },
  {
    subject: "TIU",
    description: "Latihan hitungan, pola, penalaran logis, dan analisis.",
    chapters: [
      {
        id: "tiu-numerical",
        title: "Penalaran Numerik",
        subchapters: [
          {
            id: "tiu-arithmetic",
            title: "Aritmetika, rata-rata, dan laju kerja",
            description: "Menyelesaikan persoalan hitung dan membandingkan kecepatan kerja.",
            questionIds: [
              "tiu-02",
              "tiu-08",
              "tiu-10",
              "tiu-12",
              "tiu-hots-02",
              "tiu-hots-06",
              "tiu-hots-08",
              "tiu-16",
              "tiu-17",
              "tiu-18",
            ],
          },
          {
            id: "tiu-ratios",
            title: "Persentase dan perbandingan",
            description: "Mengolah perubahan nilai, rasio, diskon, dan pembagian proporsional.",
            questionIds: [
              "tiu-05",
              "tiu-13",
              "tiu-15",
              "tiu-hots-01",
              "tiu-hots-04",
              "tiu-hots-09",
              "tiu-19",
              "tiu-20",
              "tiu-21",
              "tiu-22",
            ],
          },
        ],
      },
      {
        id: "tiu-patterns",
        title: "Pola dan Deret",
        subchapters: [
          {
            id: "tiu-number-patterns",
            title: "Pola bilangan dan selisih",
            description: "Menemukan aturan perubahan untuk menentukan suku berikutnya.",
            questionIds: [
              "tiu-03",
              "tiu-06",
              "tiu-11",
              "tiu-hots-07",
              "tiu-23",
              "tiu-24",
              "tiu-25",
              "tiu-26",
              "tiu-27",
              "tiu-28",
              "tiu-hots-26",
              "tiu-hots-27",
            ],
          },
          {
            id: "tiu-pattern-operations",
            title: "Operasi berurutan dan pola campuran",
            description:
              "Menganalisis pola dengan operasi bergantian dan beberapa aturan yang saling terkait.",
            questionIds: [
              "tiu-41",
              "tiu-42",
              "tiu-43",
              "tiu-44",
              "tiu-45",
              "tiu-hots-11",
              "tiu-hots-12",
              "tiu-hots-13",
              "tiu-hots-14",
              "tiu-hots-15",
            ],
          },
        ],
      },
      {
        id: "tiu-logic",
        title: "Penalaran Logis dan Analitis",
        subchapters: [
          {
            id: "tiu-statements",
            title: "Pernyataan dan kesimpulan",
            description: "Membedakan kesimpulan yang pasti dari dugaan yang tidak didukung premis.",
            questionIds: [
              "tiu-01",
              "tiu-04",
              "tiu-07",
              "tiu-14",
              "tiu-hots-05",
              "tiu-hots-10",
              "tiu-29",
              "tiu-30",
              "tiu-31",
              "tiu-32",
              "tiu-hots-28",
            ],
          },
          {
            id: "tiu-relations",
            title: "Analogi dan urutan kerja",
            description: "Mengenali hubungan antarkonsep dan menyusun urutan berdasarkan syarat.",
            questionIds: [
              "tiu-09",
              "tiu-hots-03",
              "tiu-33",
              "tiu-34",
              "tiu-35",
              "tiu-36",
              "tiu-37",
              "tiu-38",
              "tiu-39",
              "tiu-40",
              "tiu-hots-29",
              "tiu-hots-30",
            ],
          },
        ],
      },
      {
        id: "tiu-verbal",
        title: "Penalaran Verbal",
        subchapters: [
          {
            id: "tiu-reading",
            title: "Pemahaman informasi dan bacaan",
            description: "Menemukan gagasan, bukti, dan simpulan yang didukung oleh sebuah teks.",
            questionIds: [
              "tiu-46",
              "tiu-47",
              "tiu-48",
              "tiu-49",
              "tiu-50",
              "tiu-hots-16",
              "tiu-hots-17",
              "tiu-hots-18",
              "tiu-hots-19",
              "tiu-hots-20",
            ],
          },
          {
            id: "tiu-word-relations",
            title: "Makna kata dan hubungan konsep",
            description: "Menganalisis makna kata dan hubungan antarkonsep dalam konteks.",
            questionIds: [
              "tiu-51",
              "tiu-52",
              "tiu-53",
              "tiu-54",
              "tiu-55",
              "tiu-hots-21",
              "tiu-hots-22",
              "tiu-hots-23",
              "tiu-hots-24",
              "tiu-hots-25",
            ],
          },
        ],
      },
    ],
  },
  {
    subject: "TKP",
    description: "Latihan mengambil keputusan dalam pelayanan dan lingkungan kerja.",
    chapters: [
      {
        id: "tkp-service",
        title: "Pelayanan Publik dan Inklusi",
        subchapters: [
          {
            id: "tkp-service-communication",
            title: "Komunikasi dan penanganan kebutuhan",
            description:
              "Mendengar keluhan, memberi arahan jelas, dan menuntaskan kendala layanan.",
            questionIds: [
              "tkp-03",
              "tkp-07",
              "tkp-10",
              "tkp-hots-03",
              "tkp-hots-09",
              "tkp-16",
              "tkp-17",
              "tkp-18",
              "tkp-19",
              "tkp-20",
              "tkp-hots-21",
            ],
          },
          {
            id: "tkp-accessibility",
            title: "Aksesibilitas dan perlakuan setara",
            description: "Memberi akses yang layak dengan tetap menghormati pilihan dan privasi.",
            questionIds: [
              "tkp-05",
              "tkp-hots-01",
              "tkp-hots-07",
              "tkp-21",
              "tkp-22",
              "tkp-23",
              "tkp-24",
              "tkp-25",
              "tkp-26",
              "tkp-27",
              "tkp-hots-22",
            ],
          },
        ],
      },
      {
        id: "tkp-integrity",
        title: "Integritas dan Akuntabilitas",
        subchapters: [
          {
            id: "tkp-accuracy",
            title: "Ketelitian dan pelaporan",
            description: "Memeriksa data dan menyampaikan hasil secara transparan.",
            questionIds: [
              "tkp-02",
              "tkp-06",
              "tkp-hots-02",
              "tkp-hots-06",
              "tkp-hots-08",
              "tkp-28",
              "tkp-29",
              "tkp-30",
              "tkp-31",
              "tkp-32",
            ],
          },
          {
            id: "tkp-ethics",
            title: "Etika, prosedur, dan keamanan data",
            description: "Menjaga batas akses informasi dan bekerja sesuai prosedur.",
            questionIds: [
              "tkp-04",
              "tkp-09",
              "tkp-11",
              "tkp-12",
              "tkp-15",
              "tkp-hots-04",
              "tkp-33",
              "tkp-34",
              "tkp-35",
              "tkp-36",
              "tkp-hots-23",
              "tkp-hots-24",
            ],
          },
        ],
      },
      {
        id: "tkp-teamwork",
        title: "Kolaborasi dan Adaptasi Kerja",
        subchapters: [
          {
            id: "tkp-collaboration",
            title: "Kerja sama dan pengembangan tim",
            description: "Membagi tanggung jawab dan membantu tim mencapai hasil bersama.",
            questionIds: [
              "tkp-01",
              "tkp-13",
              "tkp-hots-05",
              "tkp-hots-10",
              "tkp-37",
              "tkp-38",
              "tkp-39",
              "tkp-40",
              "tkp-41",
              "tkp-42",
              "tkp-hots-25",
            ],
          },
          {
            id: "tkp-priorities",
            title: "Prioritas dan penyesuaian kerja",
            description: "Menata prioritas dan menyesuaikan cara kerja ketika kondisi berubah.",
            questionIds: [
              "tkp-08",
              "tkp-14",
              "tkp-43",
              "tkp-44",
              "tkp-45",
              "tkp-46",
              "tkp-47",
              "tkp-48",
              "tkp-49",
              "tkp-50",
              "tkp-hots-26",
              "tkp-hots-27",
              "tkp-hots-28",
            ],
          },
        ],
      },
      {
        id: "tkp-professionalism",
        title: "Profesionalisme dan Pengembangan Diri",
        subchapters: [
          {
            id: "tkp-professionalism-practice",
            title: "Disiplin dan mutu kerja",
            description: "Menjaga standar hasil, tanggung jawab, dan konsistensi dalam pekerjaan.",
            questionIds: [
              "tkp-51",
              "tkp-52",
              "tkp-53",
              "tkp-54",
              "tkp-55",
              "tkp-hots-11",
              "tkp-hots-12",
              "tkp-hots-13",
              "tkp-hots-14",
              "tkp-hots-15",
            ],
          },
          {
            id: "tkp-learning",
            title: "Belajar dan beradaptasi",
            description:
              "Mengembangkan kemampuan dan menyesuaikan cara kerja ketika kebutuhan berubah.",
            questionIds: [
              "tkp-56",
              "tkp-57",
              "tkp-58",
              "tkp-59",
              "tkp-60",
              "tkp-hots-16",
              "tkp-hots-17",
              "tkp-hots-18",
              "tkp-hots-19",
              "tkp-hots-20",
            ],
          },
        ],
      },
    ],
  },
];

export function questionsForSubchapter(subchapterId: string) {
  const subchapter = CPNS_SUBJECT_CATALOG.flatMap((category) => category.chapters)
    .flatMap((chapter) => chapter.subchapters)
    .find((item) => item.id === subchapterId);

  if (!subchapter) return [];
  const questionsById = new Map(QUESTION_BANK.map((question) => [question.id, question]));
  return subchapter.questionIds
    .map((questionId) => questionsById.get(questionId))
    .filter((question): question is Question => Boolean(question));
}

export function seriesForSubchapter(subchapterId: string, hotsOnly = false): QuestionSeries[] {
  const questions = questionsForSubchapter(subchapterId).filter(
    (question) => !hotsOnly || question.difficulty === "HOTS",
  );
  return Array.from({ length: Math.ceil(questions.length / QUESTIONS_PER_SERIES) }, (_, index) => {
    const number = index + 1;
    return {
      id: `${subchapterId}-series-${number}`,
      title: `Seri ${number}`,
      questions: questions.slice(index * QUESTIONS_PER_SERIES, number * QUESTIONS_PER_SERIES),
    };
  });
}
