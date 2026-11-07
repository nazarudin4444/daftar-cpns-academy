export type Track = "cpns" | "pppk" | "kedinasan";
export type Subject = "TWK" | "TIU" | "TKP" | "Manajerial" | "Sosial Kultural" | "Teknis";

export type Question = {
  id: string;
  subject: Subject;
  prompt: string;
  options: { label: string; text: string }[];
  answer: string;
  explanation: string;
};

export const DEMO_RULES = {
  durationSeconds: 12 * 60,
  questionsPerTrack: 12,
  pointsPerCorrectAnswer: 1,
} as const;

export const TRACKS: { id: Track; name: string; description: string; subjects: Subject[] }[] = [
  {
    id: "cpns",
    name: "SKD CPNS",
    description: "Wawasan kebangsaan, kemampuan numerik, dan situasi kerja.",
    subjects: ["TWK", "TIU", "TKP"],
  },
  {
    id: "pppk",
    name: "Latihan PPPK",
    description: "Contoh kompetensi manajerial, sosial kultural, dan teknis.",
    subjects: ["Manajerial", "Sosial Kultural", "Teknis"],
  },
  {
    id: "kedinasan",
    name: "Sekolah kedinasan",
    description: "Latihan dasar penalaran, wawasan, dan situasi kerja.",
    subjects: ["TWK", "TIU", "TKP"],
  },
];

export const QUESTION_BANK: Question[] = [
  {
    id: "twk-01",
    subject: "TWK",
    prompt: "Dalam kerja kelompok, anggota berbeda pendapat tentang cara mencapai tujuan bersama. Sikap yang paling mencerminkan musyawarah adalah ...",
    options: [
      { label: "A", text: "Meminta pendapat semua anggota sebelum menyepakati langkah." },
      { label: "B", text: "Mengikuti pendapat anggota yang berbicara paling keras." },
      { label: "C", text: "Menunda keputusan sampai semua orang setuju pada usulan yang sama." },
      { label: "D", text: "Memilih usulan sendiri agar pekerjaan segera dimulai." },
      { label: "E", text: "Menyerahkan keputusan kepada anggota yang paling senior." },
    ],
    answer: "A",
    explanation: "Musyawarah memberi ruang bagi setiap pihak untuk menyampaikan alasan sebelum keputusan bersama diambil.",
  },
  {
    id: "twk-02",
    subject: "TWK",
    prompt: "Sebuah kegiatan warga diikuti peserta dari latar budaya yang beragam. Tindakan yang paling tepat untuk menjaga kebersamaan adalah ...",
    options: [
      { label: "A", text: "Meminta semua peserta menggunakan kebiasaan kelompok terbanyak." },
      { label: "B", text: "Mengatur kegiatan dengan menghormati perbedaan kebiasaan peserta." },
      { label: "C", text: "Membatasi percakapan pada kelompok yang sudah saling mengenal." },
      { label: "D", text: "Menghindari peserta yang memiliki pandangan berbeda." },
      { label: "E", text: "Membiarkan setiap kelompok membuat aturan sendiri tanpa koordinasi." },
    ],
    answer: "B",
    explanation: "Menghormati perbedaan sambil menjaga tujuan bersama membantu merawat persatuan.",
  },
  {
    id: "twk-03",
    subject: "TWK",
    prompt: "Anda menemukan informasi yang menyudutkan kelompok tertentu, tetapi sumbernya tidak jelas. Langkah yang paling bertanggung jawab adalah ...",
    options: [
      { label: "A", text: "Meneruskannya dengan catatan bahwa informasi belum pasti." },
      { label: "B", text: "Membagikannya hanya kepada teman dekat." },
      { label: "C", text: "Memeriksa sumber tepercaya dan tidak menyebarkannya sebelum terverifikasi." },
      { label: "D", text: "Menambahkan pendapat pribadi agar pesannya lebih lengkap." },
      { label: "E", text: "Menghapus nama pengirim lalu membagikannya." },
    ],
    answer: "C",
    explanation: "Memeriksa sumber dan menahan informasi yang belum terverifikasi mengurangi risiko penyebaran kabar yang merugikan.",
  },
  {
    id: "twk-04",
    subject: "TWK",
    prompt: "Di lingkungan kerja, hak rekan untuk menyampaikan pendapat berbeda perlu disikapi dengan ...",
    options: [
      { label: "A", text: "Mendengarkan alasan dan menanggapi dengan tertib." },
      { label: "B", text: "Mengakhiri diskusi karena perbedaan menghambat pekerjaan." },
      { label: "C", text: "Mencatat pendapat hanya jika sama dengan pendapat atasan." },
      { label: "D", text: "Meminta rekan menyampaikan pendapat secara pribadi saja." },
      { label: "E", text: "Mengganti topik agar perbedaan tidak terlihat." },
    ],
    answer: "A",
    explanation: "Menghormati hak berpendapat berarti memberi kesempatan berbicara dan merespons secara tertib.",
  },
  {
    id: "tiu-01",
    subject: "TIU",
    prompt: "Semua arsip digital dicadangkan setiap Jumat. Berkas laporan Rani adalah arsip digital. Kesimpulan yang tepat adalah ...",
    options: [
      { label: "A", text: "Berkas laporan Rani dicadangkan setiap Jumat." },
      { label: "B", text: "Berkas laporan Rani hanya disimpan pada hari Jumat." },
      { label: "C", text: "Semua berkas Rani merupakan arsip digital." },
      { label: "D", text: "Arsip digital hanya dimiliki oleh Rani." },
      { label: "E", text: "Berkas Rani tidak dapat dicadangkan." },
    ],
    answer: "A",
    explanation: "Karena laporan Rani termasuk arsip digital, aturan pencadangan Jumat berlaku untuk berkas tersebut.",
  },
  {
    id: "tiu-02",
    subject: "TIU",
    prompt: "Sebuah tim menyelesaikan 18 berkas dalam 3 jam dengan kecepatan kerja tetap. Berapa berkas yang selesai dalam 5 jam?",
    options: [
      { label: "A", text: "24 berkas" },
      { label: "B", text: "27 berkas" },
      { label: "C", text: "30 berkas" },
      { label: "D", text: "33 berkas" },
      { label: "E", text: "36 berkas" },
    ],
    answer: "C",
    explanation: "Kecepatannya 18 dibagi 3, yaitu 6 berkas per jam. Dalam 5 jam: 6 dikali 5 = 30 berkas.",
  },
  {
    id: "tiu-03",
    subject: "TIU",
    prompt: "Pola bilangan berikut adalah 3, 7, 15, 31, ... Bilangan berikutnya adalah ...",
    options: [
      { label: "A", text: "47" },
      { label: "B", text: "55" },
      { label: "C", text: "59" },
      { label: "D", text: "63" },
      { label: "E", text: "65" },
    ],
    answer: "D",
    explanation: "Setiap bilangan dikali dua lalu ditambah satu: 31 dikali 2 ditambah 1 menghasilkan 63.",
  },
  {
    id: "tiu-04",
    subject: "TIU",
    prompt: "Semua peserta yang mengumpulkan formulir menerima tanda terima. Dito menerima tanda terima. Kesimpulan yang pasti adalah ...",
    options: [
      { label: "A", text: "Dito mengumpulkan formulir." },
      { label: "B", text: "Dito adalah peserta paling awal." },
      { label: "C", text: "Belum dapat dipastikan apakah Dito mengumpulkan formulir." },
      { label: "D", text: "Tidak ada peserta lain yang menerima tanda terima." },
      { label: "E", text: "Formulir Dito belum diperiksa." },
    ],
    answer: "C",
    explanation: "Pernyataan hanya menyebut pengumpul formulir menerima tanda terima. Tidak disebut bahwa hanya mereka yang bisa menerimanya.",
  },
  {
    id: "tkp-01",
    subject: "TKP",
    prompt: "Menjelang batas waktu, rekan satu tim meminta bantuan. Tugas Anda sendiri masih perlu diselesaikan. Apa yang sebaiknya Anda lakukan?",
    options: [
      { label: "A", text: "Mengabaikan permintaan agar fokus pada tugas sendiri." },
      { label: "B", text: "Membatalkan semua tugas sendiri dan mengambil alih pekerjaannya." },
      { label: "C", text: "Menilai prioritas, menyampaikan kapasitas, lalu menyepakati bantuan yang realistis." },
      { label: "D", text: "Meminta rekan menghubungi pimpinan tanpa membahas masalahnya." },
      { label: "E", text: "Menyelesaikan tugas seadanya tanpa memberi kabar." },
    ],
    answer: "C",
    explanation: "Komunikasi terbuka dan penentuan prioritas membantu tim tanpa mengabaikan tanggung jawab yang sedang dipegang.",
  },
  {
    id: "tkp-02",
    subject: "TKP",
    prompt: "Anda menyadari ada kesalahan pada data yang baru saja Anda kirim. Tindakan pertama yang tepat adalah ...",
    options: [
      { label: "A", text: "Menunggu sampai ada orang lain yang menyadarinya." },
      { label: "B", text: "Segera memberi tahu pihak terkait dan mengirim koreksi yang sudah diperiksa." },
      { label: "C", text: "Menghapus pesan lama tanpa memberi penjelasan." },
      { label: "D", text: "Menyalahkan sumber data yang digunakan." },
      { label: "E", text: "Membuat data baru tanpa menyebut koreksi." },
    ],
    answer: "B",
    explanation: "Keterbukaan, koreksi yang terverifikasi, dan pemberitahuan membantu mencegah keputusan berdasarkan data keliru.",
  },
  {
    id: "tkp-03",
    subject: "TKP",
    prompt: "Seorang pengguna layanan kesulitan memahami petunjuk tertulis. Respons yang paling membantu adalah ...",
    options: [
      { label: "A", text: "Mengulang petunjuk dengan nada lebih keras." },
      { label: "B", text: "Meminta pengguna mencari informasi sendiri." },
      { label: "C", text: "Menanyakan bagian yang membingungkan lalu menjelaskan dengan bahasa yang mudah." },
      { label: "D", text: "Menyuruh pengguna datang kembali di lain waktu." },
      { label: "E", text: "Meminta orang lain mengambil alih tanpa penjelasan." },
    ],
    answer: "C",
    explanation: "Mendengarkan kebutuhan terlebih dahulu membuat penjelasan lebih relevan dan tetap menghargai pengguna layanan.",
  },
  {
    id: "tkp-04",
    subject: "TKP",
    prompt: "Anda menerima permintaan data pribadi melalui kanal yang belum dapat dipastikan keamanannya. Langkah yang tepat adalah ...",
    options: [
      { label: "A", text: "Mengirim data agar pekerjaan tidak tertunda." },
      { label: "B", text: "Meminta pengirim memverifikasi kanal resmi dan tujuan permintaan sebelum berbagi data." },
      { label: "C", text: "Mengirim sebagian data sebagai uji coba." },
      { label: "D", text: "Meneruskan permintaan ke grup umum untuk meminta pendapat." },
      { label: "E", text: "Mengunggah data ke penyimpanan pribadi sementara." },
    ],
    answer: "B",
    explanation: "Verifikasi identitas, tujuan, dan kanal lebih dulu untuk mengurangi paparan data yang tidak perlu.",
  },
  {
    id: "manajerial-01",
    subject: "Manajerial",
    prompt: "Tim menerima beberapa tugas dengan tenggat berdekatan. Sebagai koordinator, langkah awal yang tepat adalah ...",
    options: [
      { label: "A", text: "Menyusun prioritas bersama berdasarkan dampak dan tenggat." },
      { label: "B", text: "Membagi tugas secara acak agar adil." },
      { label: "C", text: "Mengerjakan semua tugas sendiri." },
      { label: "D", text: "Menunda semua pekerjaan sampai arahan baru." },
      { label: "E", text: "Menyerahkan tugas terberat kepada anggota baru." },
    ],
    answer: "A",
    explanation: "Prioritas yang disepakati membantu membagi kapasitas berdasarkan urgensi dan dampak pekerjaan.",
  },
  {
    id: "manajerial-02",
    subject: "Manajerial",
    prompt: "Hasil pekerjaan tim tidak memenuhi kriteria yang disepakati. Respons yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Menentukan pihak yang salah sebelum memeriksa proses." },
      { label: "B", text: "Membandingkan hasil dengan kriteria lalu menyusun perbaikan bersama." },
      { label: "C", text: "Mengabaikan hasil karena pekerjaan sudah selesai." },
      { label: "D", text: "Mengubah kriteria agar hasil tampak sesuai." },
      { label: "E", text: "Mengulang pekerjaan tanpa membahas penyebabnya." },
    ],
    answer: "B",
    explanation: "Membandingkan hasil terhadap kriteria dan menyepakati perbaikan menjaga akuntabilitas serta mencegah pengulangan masalah.",
  },
  {
    id: "manajerial-03",
    subject: "Manajerial",
    prompt: "Rekan menyampaikan kritik terhadap cara kerja Anda. Tanggapan yang paling konstruktif adalah ...",
    options: [
      { label: "A", text: "Meminta contoh, mendengarkan, lalu menilai bagian yang dapat diperbaiki." },
      { label: "B", text: "Menolak kritik karena pekerjaan telah selesai." },
      { label: "C", text: "Membalas dengan daftar kesalahan rekan." },
      { label: "D", text: "Menghindari rekan tersebut." },
      { label: "E", text: "Menyetujui semua kritik tanpa memeriksa konteks." },
    ],
    answer: "A",
    explanation: "Meminta contoh dan menilai konteks menjadikan umpan balik dasar perbaikan yang spesifik.",
  },
  {
    id: "manajerial-04",
    subject: "Manajerial",
    prompt: "Sebuah perubahan prosedur memengaruhi pekerjaan beberapa unit. Agar penerapannya lebih tertata, Anda sebaiknya ...",
    options: [
      { label: "A", text: "Menerapkan perubahan segera tanpa memberi kabar." },
      { label: "B", text: "Mengidentifikasi pihak terdampak dan menyepakati komunikasi serta langkah transisi." },
      { label: "C", text: "Meminta satu unit menanggung seluruh penyesuaian." },
      { label: "D", text: "Membiarkan setiap unit menafsirkan perubahan sendiri." },
      { label: "E", text: "Menunda perubahan tanpa menilai dampaknya." },
    ],
    answer: "B",
    explanation: "Pemetaan pihak terdampak dan komunikasi transisi membantu koordinasi saat perubahan lintas unit.",
  },
  {
    id: "sosial-01",
    subject: "Sosial Kultural",
    prompt: "Dalam rapat, kebiasaan komunikasi salah satu rekan berbeda dari kebiasaan Anda. Sikap yang tepat adalah ...",
    options: [
      { label: "A", text: "Menganggap kebiasaan sendiri sebagai ukuran yang harus diikuti." },
      { label: "B", text: "Mencari cara berkomunikasi yang saling menghormati dan jelas." },
      { label: "C", text: "Tidak melibatkan rekan tersebut dalam pembahasan." },
      { label: "D", text: "Membicarakan kebiasaan rekan dengan peserta lain." },
      { label: "E", text: "Mengakhiri rapat setiap kali ada perbedaan." },
    ],
    answer: "B",
    explanation: "Penyesuaian komunikasi yang tetap menghormati semua pihak mendukung kerja sama di lingkungan beragam.",
  },
  {
    id: "sosial-02",
    subject: "Sosial Kultural",
    prompt: "Seorang warga menyampaikan keluhan dengan cara yang kurang tertata. Anda sebaiknya ...",
    options: [
      { label: "A", text: "Menghentikan pembicaraan karena penyampaiannya tidak rapi." },
      { label: "B", text: "Mendengarkan pokok keluhan dan menanyakan hal yang perlu diperjelas." },
      { label: "C", text: "Menyimpulkan sendiri tanpa mengonfirmasi kebutuhan." },
      { label: "D", text: "Meminta warga kembali dengan pendamping." },
      { label: "E", text: "Mengalihkan keluhan kepada orang lain tanpa penjelasan." },
    ],
    answer: "B",
    explanation: "Mendengarkan dan meminta klarifikasi membantu memahami kebutuhan tanpa merendahkan cara seseorang berbicara.",
  },
  {
    id: "sosial-03",
    subject: "Sosial Kultural",
    prompt: "Dalam kegiatan bersama, usulan kelompok kecil tidak terdengar karena diskusi didominasi peserta lain. Apa yang Anda lakukan?",
    options: [
      { label: "A", text: "Membuka giliran bicara agar kelompok kecil dapat menyampaikan usulannya." },
      { label: "B", text: "Meneruskan diskusi dengan suara terbanyak saja." },
      { label: "C", text: "Meminta kelompok kecil menyampaikan keberatan setelah kegiatan." },
      { label: "D", text: "Menghapus usulan yang tidak disampaikan lebih awal." },
      { label: "E", text: "Menutup sesi agar perbedaan tidak berlanjut." },
    ],
    answer: "A",
    explanation: "Membuka kesempatan bicara membantu memastikan usulan dipertimbangkan tanpa memandang besar-kecilnya kelompok.",
  },
  {
    id: "sosial-04",
    subject: "Sosial Kultural",
    prompt: "Anda bekerja dengan rekan yang membutuhkan penyesuaian cara menerima informasi. Langkah yang tepat adalah ...",
    options: [
      { label: "A", text: "Menanyakan format komunikasi yang membantu, lalu menyesuaikan bila memungkinkan." },
      { label: "B", text: "Mengirim informasi hanya seperti biasanya." },
      { label: "C", text: "Mengurangi tugas rekan tanpa berdiskusi." },
      { label: "D", text: "Mengumumkan kebutuhan rekan kepada semua orang." },
      { label: "E", text: "Menunggu rekan mengatasi sendiri kendalanya." },
    ],
    answer: "A",
    explanation: "Menanyakan kebutuhan secara langsung dan menjaga privasi memungkinkan penyesuaian yang relevan dan menghormati rekan.",
  },
  {
    id: "teknis-01",
    subject: "Teknis",
    prompt: "Saat memeriksa formulir digital, satu kolom wajib belum terisi. Tindakan sistem yang paling membantu pengguna adalah ...",
    options: [
      { label: "A", text: "Menolak seluruh data tanpa penjelasan." },
      { label: "B", text: "Menjelaskan kolom yang perlu dilengkapi sebelum formulir dikirim." },
      { label: "C", text: "Mengisi kolom tersebut dengan nilai perkiraan." },
      { label: "D", text: "Menghapus semua kolom lain." },
      { label: "E", text: "Mengirim formulir dalam keadaan tidak lengkap." },
    ],
    answer: "B",
    explanation: "Pesan yang menunjukkan kolom wajib membantu pengguna memperbaiki input tanpa menebak nilai.",
  },
  {
    id: "teknis-02",
    subject: "Teknis",
    prompt: "Dua salinan berkas memiliki nama sama, tetapi tanggal pembaruan berbeda. Sebelum memakai salah satunya, Anda sebaiknya ...",
    options: [
      { label: "A", text: "Memilih berkas dengan nama yang lebih pendek." },
      { label: "B", text: "Memeriksa sumber, tanggal, dan isi berkas sebelum menentukan salinan yang sesuai." },
      { label: "C", text: "Menggabungkan isi keduanya tanpa pemeriksaan." },
      { label: "D", text: "Menghapus salinan yang lebih baru." },
      { label: "E", text: "Menggunakan berkas yang kebetulan terbuka." },
    ],
    answer: "B",
    explanation: "Memeriksa sumber, tanggal, dan isi menghindari penggunaan dokumen yang tidak tepat atau sudah berubah.",
  },
  {
    id: "teknis-03",
    subject: "Teknis",
    prompt: "Sebuah rekap berisi total 120 entri. Anda menemukan 12 entri tidak lengkap. Berapa persentase entri yang belum lengkap?",
    options: [
      { label: "A", text: "5%" },
      { label: "B", text: "8%" },
      { label: "C", text: "10%" },
      { label: "D", text: "12%" },
      { label: "E", text: "20%" },
    ],
    answer: "C",
    explanation: "12 dibagi 120 lalu dikalikan 100 persen menghasilkan 10 persen.",
  },
  {
    id: "teknis-04",
    subject: "Teknis",
    prompt: "Sebelum mengirim rekap kepada pihak lain, pemeriksaan yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Memastikan angka sesuai sumber dan hanya data yang diperlukan ikut dibagikan." },
      { label: "B", text: "Mengirim semua kolom agar penerima dapat memilih sendiri." },
      { label: "C", text: "Menghapus catatan sumber agar berkas ringkas." },
      { label: "D", text: "Mengubah nilai yang tidak sesuai tanpa mencatat perubahan." },
      { label: "E", text: "Meneruskan berkas tanpa membuka ulang." },
    ],
    answer: "A",
    explanation: "Memeriksa kecocokan angka dan membatasi data pada kebutuhan penerima mendukung ketelitian dan minimisasi data.",
  },
];

export function questionsForTrack(track: Track): Question[] {
  const config = TRACKS.find((item) => item.id === track);
  if (!config) return [];
  return QUESTION_BANK.filter((question) => config.subjects.includes(question.subject)).slice(
    0,
    DEMO_RULES.questionsPerTrack,
  );
}

export function scoreExam(track: Track, answers: Record<string, string>) {
  const questions = questionsForTrack(track);
  const breakdown = TRACKS.find((item) => item.id === track)?.subjects.map((subject) => {
    const subjectQuestions = questions.filter((question) => question.subject === subject);
    const correct = subjectQuestions.filter((question) => answers[question.id] === question.answer).length;
    return { subject, correct, total: subjectQuestions.length };
  }) ?? [];
  const correct = breakdown.reduce((total, item) => total + item.correct, 0);

  return {
    correct,
    total: questions.length,
    points: correct * DEMO_RULES.pointsPerCorrectAnswer,
    breakdown,
  };
}