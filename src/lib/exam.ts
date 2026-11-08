import { QUESTION_TIPS } from "@/lib/exam-tips";
import { EXTENSION_QUESTIONS } from "@/lib/exam-extension";
import { CHAPTER_QUESTIONS } from "@/lib/exam-chapter-extension";
import { PPPK_HOTS_QUESTIONS } from "@/lib/exam-pppk-hots";
import { PPPK_SOCIAL_QUESTIONS } from "@/lib/exam-pppk-social";
import { PPPK_TECHNICAL_QUESTIONS } from "@/lib/exam-pppk-technical";

export type Track = "cpns" | "pppk" | "kedinasan" | "twk" | "tiu" | "tkp";
export type Subject = "TWK" | "TIU" | "TKP" | "Manajerial" | "Sosial Kultural" | "Teknis";

export type Question = {
  id: string;
  subject: Subject;
  prompt: string;
  options: { label: string; text: string }[];
  answer: string;
  explanation: string;
  tip: string;
  difficulty: "Latihan" | "HOTS";
};
export type QuestionDraft = Omit<Question, "tip" | "difficulty">;

export const DEMO_RULES = {
  durationSeconds: 12 * 60,
  questionsPerTrack: 15,
  pointsPerCorrectAnswer: 1,
} as const;

export function rulesForTrack(track: Track) {
  return track === "cpns"
    ? { ...DEMO_RULES, durationSeconds: 100 * 60, questionsPerTrack: 110 }
    : ["twk", "tiu", "tkp"].includes(track)
      ? { ...DEMO_RULES, durationSeconds: 30 * 60, questionsPerTrack: 30 }
      : DEMO_RULES;
}

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
  {
    id: "twk",
    name: "Latihan Fokus TWK",
    description: "Paket khusus wawasan kebangsaan dan penalaran kewargaan.",
    subjects: ["TWK"],
  },
  {
    id: "tiu",
    name: "Latihan Fokus TIU",
    description: "Paket khusus verbal, numerik, dan penalaran logis.",
    subjects: ["TIU"],
  },
  {
    id: "tkp",
    name: "Latihan Fokus TKP",
    description: "Paket khusus situasi kerja dan pelayanan publik.",
    subjects: ["TKP"],
  },
];

const QUESTION_DRAFTS: QuestionDraft[] = [
  {
    id: "tiu-10",
    subject: "TIU",
    prompt:
      "Rata-rata waktu layanan lima berkas adalah 12 menit. Empat berkas pertama membutuhkan 8, 10, 14, dan 13 menit. Berapa waktu untuk berkas kelima?",
    options: [
      { label: "A", text: "12 menit" },
      { label: "B", text: "13 menit" },
      { label: "C", text: "14 menit" },
      { label: "D", text: "15 menit" },
      { label: "E", text: "16 menit" },
    ],
    answer: "D",
    explanation:
      "Total waktu lima berkas adalah 5 × 12 = 60 menit. Empat berkas membutuhkan 8 + 10 + 14 + 13 = 45 menit. Berkas kelima membutuhkan 60 − 45 = 15 menit. Rata-rata bukan berarti setiap berkas memerlukan waktu yang sama.",
  },
  {
    id: "twk-10",
    subject: "TWK",
    prompt:
      "Warga menyepakati aturan penggunaan balai bersama. Keluarga seorang pengurus meminta pengecualian tanpa alasan khusus. Sikap yang menjaga keadilan adalah ...",
    options: [
      { label: "A", text: "Memberi pengecualian karena pengurus banyak berjasa." },
      {
        label: "B",
        text: "Menerapkan aturan yang sama dan menjelaskan prosedur pengajuan perubahan untuk semua warga.",
      },
      { label: "C", text: "Membiarkan keluarga itu memakai balai tanpa pencatatan." },
      { label: "D", text: "Menolak semua permintaan penggunaan balai." },
      { label: "E", text: "Meminta warga lain diam agar tidak terjadi konflik." },
    ],
    answer: "B",
    explanation:
      "Keadilan membutuhkan penerapan aturan yang konsisten, termasuk kepada pihak yang dekat dengan pengurus. Jika aturan perlu diubah, perubahan dibahas melalui prosedur bersama dan berlaku terbuka, bukan melalui pengecualian pribadi.",
  },
  {
    id: "tkp-10",
    subject: "TKP",
    prompt:
      "Aplikasi layanan mengalami gangguan saat antrean mulai panjang. Belum ada kepastian waktu perbaikan. Apa respons yang paling tepat?",
    options: [
      { label: "A", text: "Menjanjikan aplikasi pulih dalam sepuluh menit agar warga tenang." },
      { label: "B", text: "Menyuruh semua warga pulang tanpa penjelasan." },
      { label: "C", text: "Mencatat keluhan di akun media sosial pribadi." },
      {
        label: "D",
        text: "Menjelaskan gangguan, menghubungi tim terkait, dan menjalankan prosedur alternatif yang diizinkan.",
      },
      { label: "E", text: "Meminta warga menyerahkan kata sandi agar proses dapat diwakilkan." },
    ],
    answer: "D",
    explanation:
      "Pelayanan saat gangguan memerlukan informasi yang jujur, koordinasi perbaikan, dan alternatif sesuai kewenangan. Jangan menjanjikan waktu pemulihan yang belum diketahui atau meminta kredensial pengguna. Pembaruan diberikan ketika ada informasi yang dapat dipastikan.",
  },
  {
    id: "twk-01",
    subject: "TWK",
    prompt:
      "Dalam kerja kelompok, anggota berbeda pendapat tentang cara mencapai tujuan bersama. Sikap yang paling mencerminkan musyawarah adalah ...",
    options: [
      { label: "A", text: "Meminta pendapat semua anggota sebelum menyepakati langkah." },
      { label: "B", text: "Mengikuti pendapat anggota yang berbicara paling keras." },
      { label: "C", text: "Menunda keputusan sampai semua orang setuju pada usulan yang sama." },
      { label: "D", text: "Memilih usulan sendiri agar pekerjaan segera dimulai." },
      { label: "E", text: "Menyerahkan keputusan kepada anggota yang paling senior." },
    ],
    answer: "A",
    explanation:
      "Musyawarah memberi ruang bagi setiap pihak untuk menyampaikan alasan sebelum keputusan bersama diambil.",
  },
  {
    id: "twk-02",
    subject: "TWK",
    prompt:
      "Sebuah kegiatan warga diikuti peserta dari latar budaya yang beragam. Tindakan yang paling tepat untuk menjaga kebersamaan adalah ...",
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
    prompt:
      "Anda menemukan informasi yang menyudutkan kelompok tertentu, tetapi sumbernya tidak jelas. Langkah yang paling bertanggung jawab adalah ...",
    options: [
      { label: "A", text: "Meneruskannya dengan catatan bahwa informasi belum pasti." },
      { label: "B", text: "Membagikannya hanya kepada teman dekat." },
      {
        label: "C",
        text: "Memeriksa sumber tepercaya dan tidak menyebarkannya sebelum terverifikasi.",
      },
      { label: "D", text: "Menambahkan pendapat pribadi agar pesannya lebih lengkap." },
      { label: "E", text: "Menghapus nama pengirim lalu membagikannya." },
    ],
    answer: "C",
    explanation:
      "Memeriksa sumber dan menahan informasi yang belum terverifikasi mengurangi risiko penyebaran kabar yang merugikan.",
  },
  {
    id: "twk-04",
    subject: "TWK",
    prompt:
      "Di lingkungan kerja, hak rekan untuk menyampaikan pendapat berbeda perlu disikapi dengan ...",
    options: [
      { label: "A", text: "Mendengarkan alasan dan menanggapi dengan tertib." },
      { label: "B", text: "Mengakhiri diskusi karena perbedaan menghambat pekerjaan." },
      { label: "C", text: "Mencatat pendapat hanya jika sama dengan pendapat atasan." },
      { label: "D", text: "Meminta rekan menyampaikan pendapat secara pribadi saja." },
      { label: "E", text: "Mengganti topik agar perbedaan tidak terlihat." },
    ],
    answer: "A",
    explanation:
      "Menghormati hak berpendapat berarti memberi kesempatan berbicara dan merespons secara tertib.",
  },
  {
    id: "tiu-01",
    subject: "TIU",
    prompt:
      "Semua arsip digital dicadangkan setiap Jumat. Berkas laporan Rani adalah arsip digital. Kesimpulan yang tepat adalah ...",
    options: [
      { label: "A", text: "Berkas laporan Rani dicadangkan setiap Jumat." },
      { label: "B", text: "Berkas laporan Rani hanya disimpan pada hari Jumat." },
      { label: "C", text: "Semua berkas Rani merupakan arsip digital." },
      { label: "D", text: "Arsip digital hanya dimiliki oleh Rani." },
      { label: "E", text: "Berkas Rani tidak dapat dicadangkan." },
    ],
    answer: "A",
    explanation:
      "Karena laporan Rani termasuk arsip digital, aturan pencadangan Jumat berlaku untuk berkas tersebut.",
  },
  {
    id: "tiu-02",
    subject: "TIU",
    prompt:
      "Sebuah tim menyelesaikan 18 berkas dalam 3 jam dengan kecepatan kerja tetap. Berapa berkas yang selesai dalam 5 jam?",
    options: [
      { label: "A", text: "24 berkas" },
      { label: "B", text: "27 berkas" },
      { label: "C", text: "30 berkas" },
      { label: "D", text: "33 berkas" },
      { label: "E", text: "36 berkas" },
    ],
    answer: "C",
    explanation:
      "Kecepatannya 18 dibagi 3, yaitu 6 berkas per jam. Dalam 5 jam: 6 dikali 5 = 30 berkas.",
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
    explanation:
      "Setiap bilangan dikali dua lalu ditambah satu: 31 dikali 2 ditambah 1 menghasilkan 63.",
  },
  {
    id: "tiu-04",
    subject: "TIU",
    prompt:
      "Semua peserta yang mengumpulkan formulir menerima tanda terima. Dito menerima tanda terima. Kesimpulan yang pasti adalah ...",
    options: [
      { label: "A", text: "Dito mengumpulkan formulir." },
      { label: "B", text: "Dito adalah peserta paling awal." },
      { label: "C", text: "Belum dapat dipastikan apakah Dito mengumpulkan formulir." },
      { label: "D", text: "Tidak ada peserta lain yang menerima tanda terima." },
      { label: "E", text: "Formulir Dito belum diperiksa." },
    ],
    answer: "C",
    explanation:
      "Pernyataan hanya menyebut pengumpul formulir menerima tanda terima. Tidak disebut bahwa hanya mereka yang bisa menerimanya.",
  },
  {
    id: "tkp-01",
    subject: "TKP",
    prompt:
      "Menjelang batas waktu, rekan satu tim meminta bantuan. Tugas Anda sendiri masih perlu diselesaikan. Apa yang sebaiknya Anda lakukan?",
    options: [
      { label: "A", text: "Mengabaikan permintaan agar fokus pada tugas sendiri." },
      { label: "B", text: "Membatalkan semua tugas sendiri dan mengambil alih pekerjaannya." },
      {
        label: "C",
        text: "Menilai prioritas, menyampaikan kapasitas, lalu menyepakati bantuan yang realistis.",
      },
      { label: "D", text: "Meminta rekan menghubungi pimpinan tanpa membahas masalahnya." },
      { label: "E", text: "Menyelesaikan tugas seadanya tanpa memberi kabar." },
    ],
    answer: "C",
    explanation:
      "Komunikasi terbuka dan penentuan prioritas membantu tim tanpa mengabaikan tanggung jawab yang sedang dipegang.",
  },
  {
    id: "tkp-02",
    subject: "TKP",
    prompt:
      "Anda menyadari ada kesalahan pada data yang baru saja Anda kirim. Tindakan pertama yang tepat adalah ...",
    options: [
      { label: "A", text: "Menunggu sampai ada orang lain yang menyadarinya." },
      {
        label: "B",
        text: "Segera memberi tahu pihak terkait dan mengirim koreksi yang sudah diperiksa.",
      },
      { label: "C", text: "Menghapus pesan lama tanpa memberi penjelasan." },
      { label: "D", text: "Menyalahkan sumber data yang digunakan." },
      { label: "E", text: "Membuat data baru tanpa menyebut koreksi." },
    ],
    answer: "B",
    explanation:
      "Keterbukaan, koreksi yang terverifikasi, dan pemberitahuan membantu mencegah keputusan berdasarkan data keliru.",
  },
  {
    id: "tkp-03",
    subject: "TKP",
    prompt:
      "Seorang pengguna layanan kesulitan memahami petunjuk tertulis. Respons yang paling membantu adalah ...",
    options: [
      { label: "A", text: "Mengulang petunjuk dengan nada lebih keras." },
      { label: "B", text: "Meminta pengguna mencari informasi sendiri." },
      {
        label: "C",
        text: "Menanyakan bagian yang membingungkan lalu menjelaskan dengan bahasa yang mudah.",
      },
      { label: "D", text: "Menyuruh pengguna datang kembali di lain waktu." },
      { label: "E", text: "Meminta orang lain mengambil alih tanpa penjelasan." },
    ],
    answer: "C",
    explanation:
      "Mendengarkan kebutuhan terlebih dahulu membuat penjelasan lebih relevan dan tetap menghargai pengguna layanan.",
  },
  {
    id: "tkp-04",
    subject: "TKP",
    prompt:
      "Anda menerima permintaan data pribadi melalui kanal yang belum dapat dipastikan keamanannya. Langkah yang tepat adalah ...",
    options: [
      { label: "A", text: "Mengirim data agar pekerjaan tidak tertunda." },
      {
        label: "B",
        text: "Meminta pengirim memverifikasi kanal resmi dan tujuan permintaan sebelum berbagi data.",
      },
      { label: "C", text: "Mengirim sebagian data sebagai uji coba." },
      { label: "D", text: "Meneruskan permintaan ke grup umum untuk meminta pendapat." },
      { label: "E", text: "Mengunggah data ke penyimpanan pribadi sementara." },
    ],
    answer: "B",
    explanation:
      "Verifikasi identitas, tujuan, dan kanal lebih dulu untuk mengurangi paparan data yang tidak perlu.",
  },
  {
    id: "twk-05",
    subject: "TWK",
    prompt:
      "Panitia lingkungan akan menentukan penggunaan dana bersama. Agar keputusan dapat dipertanggungjawabkan, langkah yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Membagi dana sama rata tanpa membahas kebutuhan." },
      { label: "B", text: "Meminta pengurus memutuskan sendiri agar cepat." },
      {
        label: "C",
        text: "Menyampaikan pilihan dan alasannya, mendengar warga, lalu mencatat kesepakatan.",
      },
      { label: "D", text: "Mengikuti usulan penyumbang dana terbesar." },
      { label: "E", text: "Menunda penggunaan dana sampai tidak ada perbedaan pendapat." },
    ],
    answer: "C",
    explanation:
      "Musyawarah yang terbuka mempertimbangkan kebutuhan bersama dan mendokumentasikan keputusan. Besar kontribusi seseorang tidak dengan sendirinya memberinya hak menentukan penggunaan dana bersama.",
  },
  {
    id: "twk-06",
    subject: "TWK",
    prompt:
      "Anda diminta membantu acara yang melibatkan kelompok dengan keyakinan dan kebiasaan berbeda. Rancangan kegiatan yang paling inklusif adalah ...",
    options: [
      { label: "A", text: "Menetapkan satu kebiasaan kelompok sebagai aturan semua peserta." },
      {
        label: "B",
        text: "Menyepakati tujuan dan aturan bersama sambil memberi ruang bagi kebutuhan peserta.",
      },
      { label: "C", text: "Memisahkan peserta berdasarkan latar belakang sejak awal." },
      { label: "D", text: "Menghindari pembahasan kebutuhan agar perlakuannya seragam." },
      { label: "E", text: "Membatalkan acara karena perbedaan sulit dikelola." },
    ],
    answer: "B",
    explanation:
      "Persatuan tidak mensyaratkan semua orang memiliki kebiasaan yang sama. Tujuan bersama dapat dijaga sambil mengakomodasi perbedaan yang relevan secara adil.",
  },
  {
    id: "twk-07",
    subject: "TWK",
    prompt:
      "Dalam rapat, usulan Anda tidak dipilih setelah dibahas bersama. Sikap yang menunjukkan kedewasaan berdemokrasi adalah ...",
    options: [
      { label: "A", text: "Menolak membantu pelaksanaan keputusan." },
      { label: "B", text: "Menyebarkan bahwa proses rapat sudah diatur." },
      {
        label: "C",
        text: "Menerima keputusan yang sah dan tetap menyampaikan masukan melalui cara yang tersedia.",
      },
      { label: "D", text: "Meminta rapat diulang sampai usulan Anda diterima." },
      { label: "E", text: "Mengikuti keputusan tetapi mengabaikan tugas yang diberikan." },
    ],
    answer: "C",
    explanation:
      "Demokrasi memberi ruang untuk mengusulkan dan berbeda pendapat, sekaligus menghormati keputusan yang diambil melalui proses bersama. Masukan lanjutan tetap dapat disampaikan secara tertib.",
  },
  {
    id: "twk-08",
    subject: "TWK",
    prompt:
      "Sebuah percakapan grup mulai menyebarkan kabar yang merendahkan suku tertentu. Respons yang paling menjaga persatuan adalah ...",
    options: [
      { label: "A", text: "Meneruskan kabar itu agar semua orang dapat menilai sendiri." },
      { label: "B", text: "Menanggapi dengan hinaan terhadap kelompok lain." },
      {
        label: "C",
        text: "Menghentikan penyebaran, mengingatkan dampaknya, dan merujuk pemeriksaan fakta.",
      },
      { label: "D", text: "Menyimpan pesan untuk dibagikan saat diskusi berikutnya." },
      { label: "E", text: "Keluar dari grup tanpa menyampaikan alasan." },
    ],
    answer: "C",
    explanation:
      "Menahan konten yang belum terverifikasi dan merendahkan kelompok lain mengurangi risiko prasangka serta konflik. Pemeriksaan fakta sebaiknya dilakukan melalui sumber yang dapat dipertanggungjawabkan.",
  },
  {
    id: "twk-09",
    subject: "TWK",
    prompt:
      "Dua warga berselisih mengenai pemakaian fasilitas umum. Sebelum mengusulkan jalan keluar, Anda sebaiknya ...",
    options: [
      {
        label: "A",
        text: "Mendengar penjelasan kedua pihak dan memeriksa aturan penggunaan fasilitas.",
      },
      { label: "B", text: "Mendukung pihak yang lebih lama tinggal di lingkungan itu." },
      { label: "C", text: "Meminta pihak yang lebih muda mengalah." },
      { label: "D", text: "Menutup fasilitas agar perselisihan berhenti." },
      { label: "E", text: "Menentukan pemenang berdasarkan jumlah pendukung." },
    ],
    answer: "A",
    explanation:
      "Mendengar kedua pihak dan merujuk aturan memberi dasar yang adil untuk penyelesaian. Senioritas maupun jumlah pendukung tidak menggantikan fakta dan ketentuan bersama.",
  },
  {
    id: "tiu-05",
    subject: "TIU",
    prompt:
      "Perpustakaan mencatat 240 peminjaman pada bulan pertama dan 300 pada bulan berikutnya. Berapa persen kenaikannya dibanding bulan pertama?",
    options: [
      { label: "A", text: "20%" },
      { label: "B", text: "25%" },
      { label: "C", text: "30%" },
      { label: "D", text: "40%" },
      { label: "E", text: "60%" },
    ],
    answer: "B",
    explanation:
      "Kenaikannya adalah 300 − 240 = 60. Persentase kenaikan dihitung terhadap nilai awal: 60 ÷ 240 × 100% = 25%.",
  },
  {
    id: "tiu-06",
    subject: "TIU",
    prompt:
      "Pola bilangan 2, 6, 12, 20, 30, ... mengikuti pertambahan berurutan. Bilangan berikutnya adalah ...",
    options: [
      { label: "A", text: "36" },
      { label: "B", text: "40" },
      { label: "C", text: "42" },
      { label: "D", text: "44" },
      { label: "E", text: "48" },
    ],
    answer: "C",
    explanation:
      "Selisih antarbilangan adalah 4, 6, 8, dan 10. Selisih berikutnya 12, sehingga 30 + 12 = 42.",
  },
  {
    id: "tiu-07",
    subject: "TIU",
    prompt:
      "Semua dokumen yang telah diverifikasi diberi tanda. Sebagian dokumen di map biru telah diverifikasi. Kesimpulan yang pasti adalah ...",
    options: [
      { label: "A", text: "Semua dokumen di map biru diberi tanda." },
      { label: "B", text: "Sebagian dokumen di map biru diberi tanda." },
      { label: "C", text: "Semua dokumen bertanda berada di map biru." },
      { label: "D", text: "Tidak ada dokumen di map biru yang belum diverifikasi." },
      { label: "E", text: "Dokumen di map biru tidak diverifikasi." },
    ],
    answer: "B",
    explanation:
      "Dokumen yang diverifikasi pasti diberi tanda. Karena sebagian dokumen map biru telah diverifikasi, sebagian dokumen di map tersebut pasti bertanda. Premis tidak menyatakan semua dokumennya diverifikasi.",
  },
  {
    id: "tiu-08",
    subject: "TIU",
    prompt:
      "Empat petugas memeriksa 96 berkas dalam waktu yang sama. Jika kecepatan setiap petugas setara, berapa berkas yang diperiksa seorang petugas?",
    options: [
      { label: "A", text: "20 berkas" },
      { label: "B", text: "22 berkas" },
      { label: "C", text: "24 berkas" },
      { label: "D", text: "26 berkas" },
      { label: "E", text: "28 berkas" },
    ],
    answer: "C",
    explanation:
      "Karena beban dibagi merata kepada empat petugas, hitung 96 ÷ 4 = 24 berkas per petugas.",
  },
  {
    id: "tiu-09",
    subject: "TIU",
    prompt: "Hubungan kata yang sepadan dengan 'termometer : suhu' adalah ...",
    options: [
      { label: "A", text: "Kompas : arah" },
      { label: "B", text: "Kertas : tulisan" },
      { label: "C", text: "Kursi : duduk" },
      { label: "D", text: "Pintu : rumah" },
      { label: "E", text: "Buku : perpustakaan" },
    ],
    answer: "A",
    explanation:
      "Termometer adalah alat untuk mengukur suhu. Kompas memiliki hubungan sepadan karena merupakan alat untuk menunjukkan arah.",
  },
  {
    id: "tkp-05",
    subject: "TKP",
    prompt:
      "Anda melihat antrean layanan menjadi tidak tertib sementara seorang warga lanjut usia tampak kesulitan berdiri. Tindakan yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Meminta warga itu pulang dan kembali saat lebih sepi." },
      {
        label: "B",
        text: "Membantu sesuai prosedur layanan prioritas dan menjelaskan alurnya kepada antrean.",
      },
      { label: "C", text: "Membiarkan rekan lain menangani tanpa memberi informasi." },
      { label: "D", text: "Menyuruh warga itu langsung menuju meja petugas." },
      { label: "E", text: "Menghentikan layanan sampai antrean tertib sendiri." },
    ],
    answer: "B",
    explanation:
      "Pelayanan yang peka kebutuhan tetap mengikuti prosedur dan transparan kepada pengguna lain. Menjelaskan alur menjaga keadilan sekaligus membantu warga yang membutuhkan.",
  },
  {
    id: "tkp-06",
    subject: "TKP",
    prompt:
      "Atasan meminta Anda mengirim rekap segera, tetapi Anda menemukan beberapa angka berbeda dari sumber aslinya. Apa yang sebaiknya dilakukan?",
    options: [
      { label: "A", text: "Mengirim rekap apa adanya agar tenggat terpenuhi." },
      { label: "B", text: "Mengubah angka berdasarkan perkiraan sendiri." },
      {
        label: "C",
        text: "Memberi tahu atasan, memeriksa selisih, lalu mengirim versi yang sudah dikoreksi.",
      },
      { label: "D", text: "Menghapus baris yang tidak cocok tanpa catatan." },
      { label: "E", text: "Menunggu sampai ada yang bertanya tentang selisih itu." },
    ],
    answer: "C",
    explanation:
      "Ketelitian dan akuntabilitas perlu dijaga walaupun tenggat dekat. Komunikasikan risiko keterlambatan, telusuri sumber perbedaan, dan kirim koreksi dengan catatan yang jelas.",
  },
  {
    id: "tkp-07",
    subject: "TKP",
    prompt:
      "Seorang pengguna layanan marah karena berkasnya belum dapat diproses. Sistem menunjukkan ada satu persyaratan yang belum terpenuhi. Respons terbaik adalah ...",
    options: [
      { label: "A", text: "Menyalahkan pengguna karena tidak membaca pengumuman." },
      {
        label: "B",
        text: "Menjelaskan persyaratan yang belum terpenuhi dan cara melengkapinya dengan tenang.",
      },
      { label: "C", text: "Menjanjikan berkas tetap diproses agar pengguna tenang." },
      { label: "D", text: "Mengakhiri pembicaraan karena pengguna berbicara keras." },
      { label: "E", text: "Meminta pengguna mencari petugas lain." },
    ],
    answer: "B",
    explanation:
      "Penjelasan yang tenang, spesifik, dan disertai langkah berikutnya membantu pengguna menyelesaikan masalah tanpa memberi janji yang melanggar ketentuan.",
  },
  {
    id: "tkp-08",
    subject: "TKP",
    prompt:
      "Anda menerima tugas baru ketika pekerjaan utama hari ini belum selesai. Langkah yang paling bertanggung jawab adalah ...",
    options: [
      { label: "A", text: "Menerima semuanya tanpa menilai waktu yang tersedia." },
      { label: "B", text: "Menolak tugas baru tanpa menjelaskan kendala." },
      {
        label: "C",
        text: "Menjelaskan progres dan kapasitas, lalu menyepakati prioritas atau penyesuaian tenggat.",
      },
      {
        label: "D",
        text: "Mengerjakan tugas yang paling mudah terlebih dahulu tanpa memberi kabar.",
      },
      { label: "E", text: "Meminta rekan mengambil alih seluruh tugas baru." },
    ],
    answer: "C",
    explanation:
      "Menyampaikan kapasitas secara terbuka memberi ruang bagi atasan atau tim untuk menetapkan prioritas. Ini lebih dapat diandalkan daripada menjanjikan semua pekerjaan tanpa perhitungan.",
  },
  {
    id: "tkp-09",
    subject: "TKP",
    prompt:
      "Rekan kerja mengusulkan cara pintas yang melewati langkah pemeriksaan wajib agar pekerjaan selesai lebih cepat. Respons Anda adalah ...",
    options: [
      { label: "A", text: "Mengikuti cara itu karena semua orang sedang sibuk." },
      { label: "B", text: "Menolak dengan keras di depan pengguna layanan." },
      {
        label: "C",
        text: "Menjelaskan risiko melewati pemeriksaan dan mengajak mencari cara yang tetap sesuai prosedur.",
      },
      { label: "D", text: "Membiarkan rekan bertanggung jawab sendiri." },
      { label: "E", text: "Menyelesaikan pemeriksaan setelah hasil telanjur dikirim." },
    ],
    answer: "C",
    explanation:
      "Menjaga integritas prosedur penting untuk mutu dan kepercayaan. Sampaikan alasannya dengan hormat, lalu cari perbaikan alur yang tidak menghilangkan pemeriksaan wajib.",
  },
  {
    id: "manajerial-01",
    subject: "Manajerial",
    prompt:
      "Tim menerima beberapa tugas dengan tenggat berdekatan. Sebagai koordinator, langkah awal yang tepat adalah ...",
    options: [
      { label: "A", text: "Menyusun prioritas bersama berdasarkan dampak dan tenggat." },
      { label: "B", text: "Membagi tugas secara acak agar adil." },
      { label: "C", text: "Mengerjakan semua tugas sendiri." },
      { label: "D", text: "Menunda semua pekerjaan sampai arahan baru." },
      { label: "E", text: "Menyerahkan tugas terberat kepada anggota baru." },
    ],
    answer: "A",
    explanation:
      "Prioritas yang disepakati membantu membagi kapasitas berdasarkan urgensi dan dampak pekerjaan.",
  },
  {
    id: "manajerial-02",
    subject: "Manajerial",
    prompt:
      "Hasil pekerjaan tim tidak memenuhi kriteria yang disepakati. Respons yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Menentukan pihak yang salah sebelum memeriksa proses." },
      { label: "B", text: "Membandingkan hasil dengan kriteria lalu menyusun perbaikan bersama." },
      { label: "C", text: "Mengabaikan hasil karena pekerjaan sudah selesai." },
      { label: "D", text: "Mengubah kriteria agar hasil tampak sesuai." },
      { label: "E", text: "Mengulang pekerjaan tanpa membahas penyebabnya." },
    ],
    answer: "B",
    explanation:
      "Membandingkan hasil terhadap kriteria dan menyepakati perbaikan menjaga akuntabilitas serta mencegah pengulangan masalah.",
  },
  {
    id: "manajerial-03",
    subject: "Manajerial",
    prompt:
      "Rekan menyampaikan kritik terhadap cara kerja Anda. Tanggapan yang paling konstruktif adalah ...",
    options: [
      {
        label: "A",
        text: "Meminta contoh, mendengarkan, lalu menilai bagian yang dapat diperbaiki.",
      },
      { label: "B", text: "Menolak kritik karena pekerjaan telah selesai." },
      { label: "C", text: "Membalas dengan daftar kesalahan rekan." },
      { label: "D", text: "Menghindari rekan tersebut." },
      { label: "E", text: "Menyetujui semua kritik tanpa memeriksa konteks." },
    ],
    answer: "A",
    explanation:
      "Meminta contoh dan menilai konteks menjadikan umpan balik dasar perbaikan yang spesifik.",
  },
  {
    id: "manajerial-04",
    subject: "Manajerial",
    prompt:
      "Sebuah perubahan prosedur memengaruhi pekerjaan beberapa unit. Agar penerapannya lebih tertata, Anda sebaiknya ...",
    options: [
      { label: "A", text: "Menerapkan perubahan segera tanpa memberi kabar." },
      {
        label: "B",
        text: "Mengidentifikasi pihak terdampak dan menyepakati komunikasi serta langkah transisi.",
      },
      { label: "C", text: "Meminta satu unit menanggung seluruh penyesuaian." },
      { label: "D", text: "Membiarkan setiap unit menafsirkan perubahan sendiri." },
      { label: "E", text: "Menunda perubahan tanpa menilai dampaknya." },
    ],
    answer: "B",
    explanation:
      "Pemetaan pihak terdampak dan komunikasi transisi membantu koordinasi saat perubahan lintas unit.",
  },
  {
    id: "sosial-01",
    subject: "Sosial Kultural",
    prompt:
      "Dalam rapat, kebiasaan komunikasi salah satu rekan berbeda dari kebiasaan Anda. Sikap yang tepat adalah ...",
    options: [
      { label: "A", text: "Menganggap kebiasaan sendiri sebagai ukuran yang harus diikuti." },
      { label: "B", text: "Mencari cara berkomunikasi yang saling menghormati dan jelas." },
      { label: "C", text: "Tidak melibatkan rekan tersebut dalam pembahasan." },
      { label: "D", text: "Membicarakan kebiasaan rekan dengan peserta lain." },
      { label: "E", text: "Mengakhiri rapat setiap kali ada perbedaan." },
    ],
    answer: "B",
    explanation:
      "Penyesuaian komunikasi yang tetap menghormati semua pihak mendukung kerja sama di lingkungan beragam.",
  },
  {
    id: "sosial-02",
    subject: "Sosial Kultural",
    prompt:
      "Seorang warga menyampaikan keluhan dengan cara yang kurang tertata. Anda sebaiknya ...",
    options: [
      { label: "A", text: "Menghentikan pembicaraan karena penyampaiannya tidak rapi." },
      { label: "B", text: "Mendengarkan pokok keluhan dan menanyakan hal yang perlu diperjelas." },
      { label: "C", text: "Menyimpulkan sendiri tanpa mengonfirmasi kebutuhan." },
      { label: "D", text: "Meminta warga kembali dengan pendamping." },
      { label: "E", text: "Mengalihkan keluhan kepada orang lain tanpa penjelasan." },
    ],
    answer: "B",
    explanation:
      "Mendengarkan dan meminta klarifikasi membantu memahami kebutuhan tanpa merendahkan cara seseorang berbicara.",
  },
  {
    id: "sosial-03",
    subject: "Sosial Kultural",
    prompt:
      "Dalam kegiatan bersama, usulan kelompok kecil tidak terdengar karena diskusi didominasi peserta lain. Apa yang Anda lakukan?",
    options: [
      {
        label: "A",
        text: "Membuka giliran bicara agar kelompok kecil dapat menyampaikan usulannya.",
      },
      { label: "B", text: "Meneruskan diskusi dengan suara terbanyak saja." },
      { label: "C", text: "Meminta kelompok kecil menyampaikan keberatan setelah kegiatan." },
      { label: "D", text: "Menghapus usulan yang tidak disampaikan lebih awal." },
      { label: "E", text: "Menutup sesi agar perbedaan tidak berlanjut." },
    ],
    answer: "A",
    explanation:
      "Membuka kesempatan bicara membantu memastikan usulan dipertimbangkan tanpa memandang besar-kecilnya kelompok.",
  },
  {
    id: "sosial-04",
    subject: "Sosial Kultural",
    prompt:
      "Anda bekerja dengan rekan yang membutuhkan penyesuaian cara menerima informasi. Langkah yang tepat adalah ...",
    options: [
      {
        label: "A",
        text: "Menanyakan format komunikasi yang membantu, lalu menyesuaikan bila memungkinkan.",
      },
      { label: "B", text: "Mengirim informasi hanya seperti biasanya." },
      { label: "C", text: "Mengurangi tugas rekan tanpa berdiskusi." },
      { label: "D", text: "Mengumumkan kebutuhan rekan kepada semua orang." },
      { label: "E", text: "Menunggu rekan mengatasi sendiri kendalanya." },
    ],
    answer: "A",
    explanation:
      "Menanyakan kebutuhan secara langsung dan menjaga privasi memungkinkan penyesuaian yang relevan dan menghormati rekan.",
  },
  {
    id: "teknis-01",
    subject: "Teknis",
    prompt:
      "Saat memeriksa formulir digital, satu kolom wajib belum terisi. Tindakan sistem yang paling membantu pengguna adalah ...",
    options: [
      { label: "A", text: "Menolak seluruh data tanpa penjelasan." },
      { label: "B", text: "Menjelaskan kolom yang perlu dilengkapi sebelum formulir dikirim." },
      { label: "C", text: "Mengisi kolom tersebut dengan nilai perkiraan." },
      { label: "D", text: "Menghapus semua kolom lain." },
      { label: "E", text: "Mengirim formulir dalam keadaan tidak lengkap." },
    ],
    answer: "B",
    explanation:
      "Pesan yang menunjukkan kolom wajib membantu pengguna memperbaiki input tanpa menebak nilai.",
  },
  {
    id: "teknis-02",
    subject: "Teknis",
    prompt:
      "Dua salinan berkas memiliki nama sama, tetapi tanggal pembaruan berbeda. Sebelum memakai salah satunya, Anda sebaiknya ...",
    options: [
      { label: "A", text: "Memilih berkas dengan nama yang lebih pendek." },
      {
        label: "B",
        text: "Memeriksa sumber, tanggal, dan isi berkas sebelum menentukan salinan yang sesuai.",
      },
      { label: "C", text: "Menggabungkan isi keduanya tanpa pemeriksaan." },
      { label: "D", text: "Menghapus salinan yang lebih baru." },
      { label: "E", text: "Menggunakan berkas yang kebetulan terbuka." },
    ],
    answer: "B",
    explanation:
      "Memeriksa sumber, tanggal, dan isi menghindari penggunaan dokumen yang tidak tepat atau sudah berubah.",
  },
  {
    id: "teknis-03",
    subject: "Teknis",
    prompt:
      "Sebuah rekap berisi total 120 entri. Anda menemukan 12 entri tidak lengkap. Berapa persentase entri yang belum lengkap?",
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
      {
        label: "A",
        text: "Memastikan angka sesuai sumber dan hanya data yang diperlukan ikut dibagikan.",
      },
      { label: "B", text: "Mengirim semua kolom agar penerima dapat memilih sendiri." },
      { label: "C", text: "Menghapus catatan sumber agar berkas ringkas." },
      { label: "D", text: "Mengubah nilai yang tidak sesuai tanpa mencatat perubahan." },
      { label: "E", text: "Meneruskan berkas tanpa membuka ulang." },
    ],
    answer: "A",
    explanation:
      "Memeriksa kecocokan angka dan membatasi data pada kebutuhan penerima mendukung ketelitian dan minimisasi data.",
  },
  {
    id: "manajerial-05",
    subject: "Manajerial",
    prompt:
      "Sebuah pekerjaan lintas unit terlambat karena setiap pihak memakai asumsi tenggat yang berbeda. Langkah koordinator yang tepat adalah ...",
    options: [
      { label: "A", text: "Menetapkan pihak yang bersalah sebelum meminta penjelasan." },
      {
        label: "B",
        text: "Menyamakan kembali keluaran, penanggung jawab, dan tenggat bersama pihak terkait.",
      },
      { label: "C", text: "Mengambil alih seluruh pekerjaan tanpa membahas pembagian tugas." },
      { label: "D", text: "Meminta tiap unit melanjutkan dengan asumsi masing-masing." },
      { label: "E", text: "Menghapus tenggat agar tidak ada pihak yang terlambat." },
    ],
    answer: "B",
    explanation:
      "Koordinasi yang jelas menyelaraskan hasil yang diharapkan, pemilik tugas, dan tenggat. Menetapkan kembali kesepakatan membuat kemajuan dapat dipantau dan mengurangi salah paham berulang.",
  },
  {
    id: "sosial-05",
    subject: "Sosial Kultural",
    prompt:
      "Dalam diskusi warga, seorang peserta kesulitan mengikuti istilah teknis yang digunakan. Cara melibatkan peserta tersebut adalah ...",
    options: [
      { label: "A", text: "Melanjutkan diskusi karena istilah teknis lebih tepat." },
      { label: "B", text: "Mengulang dengan suara lebih keras tanpa mengubah penjelasan." },
      {
        label: "C",
        text: "Menjelaskan istilah dengan bahasa sederhana dan memastikan pemahamannya tanpa mempermalukan.",
      },
      { label: "D", text: "Meminta peserta lain menjawab atas namanya." },
      { label: "E", text: "Mencatat peserta itu sebagai tidak setuju." },
    ],
    answer: "C",
    explanation:
      "Bahasa yang mudah dipahami membuka partisipasi secara setara. Memastikan pemahaman dengan hormat lebih baik daripada menganggap diam sebagai persetujuan atau ketidaksetujuan.",
  },
  {
    id: "teknis-05",
    subject: "Teknis",
    prompt:
      "Sebuah tabel rekap menghitung jumlah entri dengan rumus. Setelah beberapa baris ditambahkan, angka total tidak berubah. Pemeriksaan pertama yang paling relevan adalah ...",
    options: [
      { label: "A", text: "Menghapus rumus dan mengetik angka total dari perkiraan." },
      {
        label: "B",
        text: "Memeriksa rentang sel yang dicakup rumus dan memperbaruinya bila perlu.",
      },
      { label: "C", text: "Mengubah format warna tabel." },
      { label: "D", text: "Mengurutkan data tanpa menyimpan salinan." },
      { label: "E", text: "Menghapus baris tambahan agar angka kembali sama." },
    ],
    answer: "B",
    explanation:
      "Rumus dapat tetap menunjuk rentang lama setelah baris baru ditambahkan. Memeriksa cakupan sel memastikan perhitungan mencakup data terbaru tanpa mengganti hasil dengan perkiraan.",
  },
  {
    id: "twk-11",
    subject: "TWK",
    prompt:
      "Warga menyampaikan kritik terhadap rancangan aturan lingkungan dalam forum terbuka. Sikap yang paling mencerminkan kehidupan demokratis adalah ...",
    options: [
      { label: "A", text: "Menghentikan kritik karena rancangan sudah dibuat pengurus." },
      {
        label: "B",
        text: "Mendengar alasan, membahas dampaknya, lalu mencatat masukan untuk keputusan.",
      },
      {
        label: "C",
        text: "Mengikuti pendapat peserta yang paling banyak pendukungnya tanpa diskusi.",
      },
      { label: "D", text: "Menyebarkan kritik itu tanpa memeriksa isi dan konteksnya." },
      { label: "E", text: "Membatalkan forum agar perbedaan pendapat tidak muncul." },
    ],
    answer: "B",
    explanation:
      "Demokrasi memberi ruang untuk menyampaikan pendapat dan menilainya secara terbuka. Mendengar alasan, membahas akibat, serta mencatat masukan membuat keputusan lebih dapat dipertanggungjawabkan daripada membungkam kritik atau sekadar mengikuti suara terbanyak tanpa proses.",
  },
  {
    id: "twk-12",
    subject: "TWK",
    prompt:
      "Sebuah layanan bersama hanya mudah diakses oleh sebagian warga. Perbaikan yang paling sesuai dengan prinsip keadilan adalah ...",
    options: [
      { label: "A", text: "Mempertahankan layanan karena prosedurnya sama untuk semua orang." },
      { label: "B", text: "Menutup layanan sementara tanpa memberi informasi." },
      {
        label: "C",
        text: "Mengidentifikasi hambatan dan menyediakan akses yang layak tanpa mengurangi ketentuan.",
      },
      { label: "D", text: "Meminta warga yang mengalami hambatan mencari bantuan sendiri." },
      { label: "E", text: "Memberi akses hanya kepada warga yang mengajukan keluhan tertulis." },
    ],
    answer: "C",
    explanation:
      "Perlakuan adil memperhatikan hambatan nyata yang membuat orang sulit mengakses layanan. Menyesuaikan cara akses sambil menjaga ketentuan membantu lebih banyak warga memperoleh kesempatan yang setara.",
  },
  {
    id: "twk-13",
    subject: "TWK",
    prompt:
      "Dalam percakapan grup beredar kabar yang menuduh kelompok tertentu merugikan warga. Sebelum menanggapi, tindakan paling bertanggung jawab adalah ...",
    options: [
      { label: "A", text: "Meneruskan kabar agar warga lain ikut waspada." },
      {
        label: "B",
        text: "Memeriksa sumber tepercaya dan tidak menyebarkan tuduhan yang belum terverifikasi.",
      },
      { label: "C", text: "Membalas dengan tuduhan terhadap kelompok lain." },
      { label: "D", text: "Mengubah isi kabar agar terdengar lebih meyakinkan." },
      { label: "E", text: "Menganggap kabar benar karena banyak orang membagikannya." },
    ],
    answer: "B",
    explanation:
      "Jumlah orang yang membagikan pesan bukan bukti kebenaran. Memeriksa sumber dan menahan penyebaran tuduhan membantu mencegah prasangka serta konflik antarkelompok.",
  },
  {
    id: "twk-14",
    subject: "TWK",
    prompt:
      "Panitia kegiatan meminta semua peserta mengikuti satu kebiasaan tanpa mempertimbangkan perbedaan yang relevan. Langkah yang paling menjaga persatuan adalah ...",
    options: [
      { label: "A", text: "Menghapus semua aturan agar setiap kelompok berjalan sendiri." },
      { label: "B", text: "Mengikuti kebiasaan kelompok terbesar sebagai standar." },
      {
        label: "C",
        text: "Menyepakati tujuan dan aturan bersama sambil mengakomodasi perbedaan secara wajar.",
      },
      { label: "D", text: "Memisahkan peserta berdasarkan latar belakangnya." },
      { label: "E", text: "Membatalkan kegiatan tanpa membahas pilihan lain." },
    ],
    answer: "C",
    explanation:
      "Persatuan dibangun melalui tujuan bersama dan sikap saling menghormati, bukan dengan menghapus semua perbedaan. Aturan yang disepakati dapat tetap memberi ruang bagi kebutuhan yang beragam.",
  },
  {
    id: "twk-15",
    subject: "TWK",
    prompt:
      "Anda mengetahui kerabat panitia meminta didahulukan dalam pembagian bantuan yang terbatas. Sikap yang paling berintegritas adalah ...",
    options: [
      { label: "A", text: "Mendahulukannya karena hubungan keluarga dapat dipercaya." },
      {
        label: "B",
        text: "Menerapkan kriteria yang telah diumumkan dan mencatat proses pembagian secara terbuka.",
      },
      { label: "C", text: "Memberi bantuan diam-diam agar tidak terjadi perdebatan." },
      { label: "D", text: "Mengubah kriteria setelah mengetahui siapa yang meminta." },
      { label: "E", text: "Menunda seluruh bantuan sampai tidak ada yang keberatan." },
    ],
    answer: "B",
    explanation:
      "Kriteria yang konsisten dan proses yang dapat ditelusuri mencegah kepentingan pribadi memengaruhi layanan. Kedekatan dengan panitia bukan alasan untuk mendapat perlakuan khusus.",
  },
  {
    id: "tiu-11",
    subject: "TIU",
    prompt:
      "Perhatikan pola bilangan berikut: 4, 9, 19, 39, 79, ... Bilangan berikutnya adalah ...",
    options: [
      { label: "A", text: "119" },
      { label: "B", text: "149" },
      { label: "C", text: "158" },
      { label: "D", text: "159" },
      { label: "E", text: "160" },
    ],
    answer: "D",
    explanation:
      "Setiap suku dikalikan dua lalu ditambah satu: 4 × 2 + 1 = 9, 9 × 2 + 1 = 19, dan seterusnya. Maka 79 × 2 + 1 = 159.",
  },
  {
    id: "tiu-12",
    subject: "TIU",
    prompt:
      "Sebuah tim menyelesaikan 84 berkas dalam 7 jam dengan kecepatan tetap. Jika kecepatan tetap sama, berapa berkas yang selesai dalam 10 jam?",
    options: [
      { label: "A", text: "100 berkas" },
      { label: "B", text: "110 berkas" },
      { label: "C", text: "120 berkas" },
      { label: "D", text: "126 berkas" },
      { label: "E", text: "140 berkas" },
    ],
    answer: "C",
    explanation:
      "Kecepatan tim adalah 84 ÷ 7 = 12 berkas per jam. Dalam 10 jam, tim menyelesaikan 12 × 10 = 120 berkas dengan asumsi kecepatannya tetap.",
  },
  {
    id: "tiu-13",
    subject: "TIU",
    prompt:
      "Perbandingan jumlah berkas di meja A dan meja B adalah 3 : 5. Jika seluruhnya ada 64 berkas, jumlah berkas di meja A adalah ...",
    options: [
      { label: "A", text: "18 berkas" },
      { label: "B", text: "21 berkas" },
      { label: "C", text: "24 berkas" },
      { label: "D", text: "32 berkas" },
      { label: "E", text: "40 berkas" },
    ],
    answer: "C",
    explanation:
      "Jumlah bagian rasio adalah 3 + 5 = 8. Setiap bagian bernilai 64 ÷ 8 = 8 berkas. Meja A memiliki 3 bagian, yaitu 3 × 8 = 24 berkas.",
  },
  {
    id: "tiu-14",
    subject: "TIU",
    prompt:
      "Semua laporan yang disetujui telah diperiksa. Sebagian berkas di map hijau adalah laporan yang disetujui. Kesimpulan yang pasti benar adalah ...",
    options: [
      { label: "A", text: "Semua berkas di map hijau telah diperiksa." },
      { label: "B", text: "Sebagian berkas di map hijau telah diperiksa." },
      { label: "C", text: "Tidak ada laporan yang belum diperiksa." },
      { label: "D", text: "Semua berkas yang diperiksa berada di map hijau." },
      { label: "E", text: "Sebagian berkas yang diperiksa bukan laporan." },
    ],
    answer: "B",
    explanation:
      "Berkas yang disebut sebagai laporan disetujui termasuk kelompok laporan yang telah diperiksa. Karena sebagian berkas map hijau adalah laporan yang disetujui, sebagian berkas map hijau pasti telah diperiksa. Premis tidak menyatakan semua isi map hijau demikian.",
  },
  {
    id: "tiu-15",
    subject: "TIU",
    prompt:
      "Sebuah barang seharga Rp240.000 mendapat potongan 15%. Harga setelah potongan adalah ...",
    options: [
      { label: "A", text: "Rp196.000" },
      { label: "B", text: "Rp200.000" },
      { label: "C", text: "Rp204.000" },
      { label: "D", text: "Rp210.000" },
      { label: "E", text: "Rp216.000" },
    ],
    answer: "C",
    explanation:
      "Potongannya adalah 15% × Rp240.000 = Rp36.000. Harga akhirnya Rp240.000 − Rp36.000 = Rp204.000. Cara lain: harga akhir adalah 85% dari harga awal.",
  },
  {
    id: "tkp-11",
    subject: "TKP",
    prompt:
      "Seorang pemohon meminta Anda mendahulukan berkasnya karena ia mengenal salah satu petugas. Apa respons paling tepat?",
    options: [
      { label: "A", text: "Menyetujui agar hubungan kerja tetap baik." },
      {
        label: "B",
        text: "Menjelaskan urutan dan kriteria layanan, lalu membantu sesuai prosedur yang berlaku.",
      },
      { label: "C", text: "Meminta pemohon kembali saat petugas yang dikenalnya bertugas." },
      { label: "D", text: "Mengabaikan pemohon tanpa penjelasan." },
      { label: "E", text: "Meminta imbalan sebagai ganti prioritas." },
    ],
    answer: "B",
    explanation:
      "Menjelaskan prosedur secara tenang menjaga perlakuan yang setara dan membantu pemohon memahami langkah berikutnya. Hubungan pribadi tidak menjadi dasar untuk mengubah antrean atau ketentuan layanan.",
  },
  {
    id: "tkp-12",
    subject: "TKP",
    prompt:
      "Anda tidak sengaja mengirim rekap yang berisi data lebih banyak dari yang diminta ke grup kerja. Tindakan pertama yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Membiarkannya karena semua anggota grup adalah rekan kerja." },
      {
        label: "B",
        text: "Menghapus pesan jika memungkinkan, segera memberi tahu penanggung jawab, dan mengikuti prosedur penanganan.",
      },
      {
        label: "C",
        text: "Meminta semua penerima merahasiakannya tanpa memberi tahu penanggung jawab.",
      },
      { label: "D", text: "Mengirim rekap yang lebih lengkap untuk menutupi kesalahan." },
      { label: "E", text: "Menyalahkan aplikasi sebelum memeriksa apa yang terkirim." },
    ],
    answer: "B",
    explanation:
      "Respons cepat dapat membatasi paparan lebih lanjut, sementara pelaporan kepada penanggung jawab memungkinkan langkah penanganan yang sesuai. Jangan menutupi kejadian atau membuat klaim sebelum memeriksa fakta.",
  },
  {
    id: "tkp-13",
    subject: "TKP",
    prompt:
      "Pekerjaan tim berisiko terlambat karena seorang rekan belum menyelesaikan bagiannya. Langkah yang paling konstruktif adalah ...",
    options: [
      { label: "A", text: "Mengambil alih semua tugas tanpa menghubunginya." },
      { label: "B", text: "Menegur rekan di depan pengguna layanan agar ia segera bekerja." },
      {
        label: "C",
        text: "Menanyakan kendala dan progresnya, menawarkan koordinasi, lalu menyepakati tindak lanjut.",
      },
      { label: "D", text: "Membiarkan tenggat lewat agar tanggung jawab terlihat." },
      { label: "E", text: "Mengirim laporan bahwa rekan sengaja menghambat tim." },
    ],
    answer: "C",
    explanation:
      "Memahami kendala lebih dulu membantu tim memilih bantuan atau penyesuaian yang tepat. Kesepakatan tindak lanjut menjaga akuntabilitas tanpa mempermalukan rekan atau membuat tuduhan yang belum terbukti.",
  },
  {
    id: "tkp-14",
    subject: "TKP",
    prompt:
      "Pemohon kesulitan mengisi formulir digital dan meminta Anda memakai akun pribadinya untuk menyelesaikan proses. Respons terbaik adalah ...",
    options: [
      { label: "A", text: "Meminta kata sandi lalu mengisi formulir tanpa menjelaskan prosesnya." },
      { label: "B", text: "Menolak bantuan apa pun karena formulir harus dikerjakan sendiri." },
      {
        label: "C",
        text: "Memandu pemohon melalui cara bantuan yang diizinkan tanpa meminta kredensial.",
      },
      { label: "D", text: "Menggunakan akun pribadi Anda untuk mewakili pemohon." },
      { label: "E", text: "Meminta pemohon mengirim data lengkap ke grup layanan." },
    ],
    answer: "C",
    explanation:
      "Pendampingan yang aman membantu pemohon tetap memahami dan mengendalikan prosesnya sendiri. Kata sandi dan kredensial tidak perlu diminta; gunakan kanal bantuan resmi yang memang tersedia.",
  },
  {
    id: "tkp-15",
    subject: "TKP",
    prompt:
      "Instruksi lisan yang Anda terima tampak berbeda dari prosedur tertulis yang sedang berlaku. Sebaiknya Anda ...",
    options: [
      { label: "A", text: "Mengikuti instruksi lisan tanpa memeriksa perbedaannya." },
      { label: "B", text: "Mengabaikan instruksi dan tidak memberi kabar kepada siapa pun." },
      {
        label: "C",
        text: "Mengklarifikasi perbedaan kepada pemberi instruksi dan memastikan langkah yang sesuai sebelum bertindak.",
      },
      { label: "D", text: "Memilih bagian prosedur yang paling mudah dikerjakan." },
      { label: "E", text: "Menyebarkan instruksi tersebut ke grup umum untuk diputuskan bersama." },
    ],
    answer: "C",
    explanation:
      "Klarifikasi mencegah kesalahan dan memberi kesempatan kepada pihak berwenang menjelaskan apakah ada pembaruan atau konteks khusus. Hindari bertindak berdasarkan asumsi atau menyebarkan informasi yang belum dipastikan.",
  },
  {
    id: "twk-hots-01",
    subject: "TWK",
    prompt:
      "Dua wilayah mengajukan jadwal penggunaan balai warga yang terbatas. Wilayah pertama memiliki warga lebih banyak, sedangkan wilayah kedua memiliki akses transportasi yang jarang dan hanya bisa hadir pada jam tertentu. Data kebutuhan tiap wilayah belum lengkap. Keputusan awal yang paling adil adalah ...",
    options: [
      { label: "A", text: "Memberi seluruh jadwal kepada wilayah dengan warga terbanyak." },
      { label: "B", text: "Mempertahankan jadwal lama tanpa memeriksa dampaknya." },
      {
        label: "C",
        text: "Mengumpulkan data kebutuhan, menyepakati kriteria terbuka, lalu membagi jadwal secara proporsional dan meninjau hasilnya.",
      },
      { label: "D", text: "Meminta kedua ketua wilayah menyelesaikannya secara pribadi." },
      { label: "E", text: "Memberi jadwal kepada pihak yang pertama mengajukan surat." },
    ],
    answer: "C",
    explanation:
      "Jumlah warga penting, tetapi bukan satu-satunya ukuran akses yang setara. Data kebutuhan dan hambatan tiap wilayah perlu dibandingkan dengan kriteria yang diketahui bersama. Pembagian yang dapat ditinjau ulang menjaga keputusan tetap bertanggung jawab ketika kondisi belum sepenuhnya diketahui.",
  },
  {
    id: "twk-hots-02",
    subject: "TWK",
    prompt:
      "Sebuah unggahan yang belum terverifikasi menuduh kelompok tertentu menerima bantuan secara tidak sah. Warga meminta Anda meneruskan unggahan itu agar ada tindakan cepat. Informasi resmi belum tersedia, tetapi layanan pengaduan resmi dapat dihubungi. Langkah yang paling bertanggung jawab adalah ...",
    options: [
      { label: "A", text: "Meneruskan unggahan dengan catatan bahwa kebenarannya belum pasti." },
      { label: "B", text: "Menghapus nama kelompok lalu membagikan isi tuduhan." },
      {
        label: "C",
        text: "Menyimpan bukti untuk dilaporkan melalui kanal resmi, memeriksa klarifikasi, dan tidak menyebarkan tuduhan.",
      },
      { label: "D", text: "Membalas unggahan dengan dugaan lain agar perhatian warga terbagi." },
      { label: "E", text: "Menganggap tuduhan benar karena banyak warga membicarakannya." },
    ],
    answer: "C",
    explanation:
      "Laporan melalui kanal resmi memungkinkan pemeriksaan tanpa memperluas tuduhan yang belum terbukti. Menahan penyebaran juga melindungi warga dari prasangka dan konflik. Kecepatan bertindak tetap penting, tetapi harus disertai pemeriksaan fakta.",
  },
  {
    id: "twk-hots-03",
    subject: "TWK",
    prompt:
      "Dalam rapat, usulan mayoritas akan mengubah jam layanan menjadi daring sepenuhnya. Catatan menunjukkan sebagian warga tidak memiliki akses internet stabil, sementara petugas menilai layanan daring mengurangi antrean. Cara mengambil keputusan yang paling mencerminkan kepentingan bersama adalah ...",
    options: [
      { label: "A", text: "Menerapkan usulan mayoritas segera karena hasil suara sudah jelas." },
      { label: "B", text: "Menolak perubahan agar cara lama tidak menimbulkan keluhan." },
      {
        label: "C",
        text: "Menguji layanan daring dengan pilihan bantuan luring, mengukur hasilnya, lalu membahas penyesuaian bersama.",
      },
      {
        label: "D",
        text: "Meminta warga tanpa internet mengurus kebutuhan melalui kenalan petugas.",
      },
      { label: "E", text: "Menunda keputusan sampai semua warga menyetujui satu cara yang sama." },
    ],
    answer: "C",
    explanation:
      "Keputusan bersama perlu mempertimbangkan manfaat efisiensi sekaligus dampak pada kelompok yang aksesnya terbatas. Uji terbatas dengan alternatif luring menghasilkan bukti dan menjaga layanan tetap dapat dijangkau. Musyawarah memberi ruang untuk menilai hasil sebelum perubahan diperluas.",
  },
  {
    id: "twk-hots-04",
    subject: "TWK",
    prompt:
      "Sebuah formulir digital wajib diisi untuk memperoleh layanan. Seorang warga tunanetra tidak dapat menggunakannya dengan pembaca layar. Data yang diminta tetap diperlukan, tetapi cara pengisiannya dapat disesuaikan. Tindakan yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Meminta warga membawa pendamping yang dapat melihat layar." },
      { label: "B", text: "Mengecualikan warga tersebut dari persyaratan data." },
      {
        label: "C",
        text: "Menyediakan bantuan pengisian yang aksesibel melalui kanal resmi sambil menjaga persyaratan data dan privasi.",
      },
      {
        label: "D",
        text: "Mengisi formulir memakai akun pribadi warga tanpa menjelaskan langkahnya.",
      },
      {
        label: "E",
        text: "Menunda layanan sampai formulir digital dapat digunakan oleh semua orang.",
      },
    ],
    answer: "C",
    explanation:
      "Kesetaraan layanan berarti mengatasi hambatan akses tanpa menghapus persyaratan yang memang diperlukan. Kanal bantuan resmi menjaga warga tetap dapat mengendalikan informasinya dan mengurangi risiko privasi dibanding meminta kredensial atau bantuan informal.",
  },
  {
    id: "twk-hots-05",
    subject: "TWK",
    prompt:
      "Tim akan memakai dana kegiatan untuk dua kebutuhan: perbaikan fasilitas umum dan pelatihan warga. Anggaran tidak cukup untuk memenuhi semua permintaan, dan setiap kelompok mengajukan alasan yang berbeda. Proses penetapan prioritas yang paling dapat dipertanggungjawabkan adalah ...",
    options: [
      { label: "A", text: "Membagi dana sama rata tanpa memeriksa kebutuhan atau biaya." },
      { label: "B", text: "Memilih usulan yang diajukan oleh kelompok dengan anggota terbanyak." },
      {
        label: "C",
        text: "Menilai urgensi, manfaat, jumlah warga terdampak, dan biaya dengan kriteria yang diumumkan sebelum keputusan.",
      },
      { label: "D", text: "Mendahulukan usulan yang paling mudah dilaksanakan oleh panitia." },
      {
        label: "E",
        text: "Menyerahkan seluruh dana kepada kelompok yang paling aktif menghadiri rapat.",
      },
    ],
    answer: "C",
    explanation:
      "Kriteria yang diumumkan sebelum penilaian mengurangi pengaruh kedekatan atau tekanan saat rapat. Menimbang urgensi, manfaat, cakupan warga, dan biaya membuat prioritas lebih transparan ketika dana terbatas, meski tidak semua permintaan dapat dipenuhi.",
  },
  {
    id: "tiu-hots-01",
    subject: "TIU",
    prompt:
      "Tiga unit mengajukan kebutuhan perlengkapan: unit A meminta 50, unit B 70, dan unit C 80. Persediaan yang dapat dibagikan hanya 120 buah. Jika pembagian mengikuti perbandingan jumlah permintaan, berapa buah yang diterima unit C?",
    options: [
      { label: "A", text: "40 buah" },
      { label: "B", text: "42 buah" },
      { label: "C", text: "48 buah" },
      { label: "D", text: "52 buah" },
      { label: "E", text: "60 buah" },
    ],
    answer: "C",
    explanation:
      "Total permintaan adalah 50 + 70 + 80 = 200. Porsi unit C adalah 80/200 atau 40 persen. Maka bagian unit C sebesar 40 persen × 120 = 48 buah. Periksa total kebutuhan terlebih dahulu sebelum menghitung porsi unit.",
  },
  {
    id: "tiu-hots-02",
    subject: "TIU",
    prompt:
      "Tim X memeriksa 12 berkas per jam per petugas, sedangkan tim Y memeriksa 8 berkas per jam per petugas. Selama 4 jam, tiga petugas X dan dua petugas Y bekerja dengan laju tetap. Dari seluruh berkas yang diperiksa, 16 perlu diperiksa ulang karena ditemukan kesalahan. Berapa berkas yang tidak perlu diperiksa ulang?",
    options: [
      { label: "A", text: "176 berkas" },
      { label: "B", text: "192 berkas" },
      { label: "C", text: "208 berkas" },
      { label: "D", text: "224 berkas" },
      { label: "E", text: "240 berkas" },
    ],
    answer: "B",
    explanation:
      "Tim X memeriksa 3 × 12 × 4 = 144 berkas, sedangkan tim Y memeriksa 2 × 8 × 4 = 64. Totalnya 208 berkas. Kurangi 16 berkas yang harus diperiksa ulang: 208 − 16 = 192 berkas tidak perlu diperiksa ulang.",
  },
  {
    id: "tiu-hots-03",
    subject: "TIU",
    prompt:
      "Sebuah daftar pekerjaan memuat tugas P, Q, R, dan S. P harus selesai sebelum Q, R harus langsung dikerjakan setelah Q, dan S harus selesai sebelum P. Urutan yang memenuhi semua ketentuan adalah ...",
    options: [
      { label: "A", text: "P, S, Q, R" },
      { label: "B", text: "S, P, Q, R" },
      { label: "C", text: "S, Q, P, R" },
      { label: "D", text: "P, Q, S, R" },
      { label: "E", text: "Q, R, S, P" },
    ],
    answer: "B",
    explanation:
      "S harus mendahului P, lalu P harus mendahului Q. Karena R langsung setelah Q, urutannya menjadi S, P, Q, R. Pilihan lain melanggar setidaknya satu syarat urutan atau syarat bahwa Q dan R berurutan.",
  },
  {
    id: "tiu-hots-04",
    subject: "TIU",
    prompt:
      "Dari 240 berkas, 25 persen selesai pada tahap pertama. Pada tahap kedua, petugas menyelesaikan 40 persen dari berkas yang tersisa. Berapa berkas yang masih belum selesai setelah kedua tahap?",
    options: [
      { label: "A", text: "72 berkas" },
      { label: "B", text: "96 berkas" },
      { label: "C", text: "108 berkas" },
      { label: "D", text: "120 berkas" },
      { label: "E", text: "132 berkas" },
    ],
    answer: "C",
    explanation:
      "Tahap pertama menyelesaikan 25 persen × 240 = 60, sehingga tersisa 180. Tahap kedua menyelesaikan 40 persen × 180 = 72, sehingga tersisa 180 − 72 = 108 berkas. Persentase tahap kedua dihitung dari sisa, bukan dari jumlah awal.",
  },
  {
    id: "tiu-hots-05",
    subject: "TIU",
    prompt:
      "Semua laporan bertanda merah masuk pemeriksaan ulang. Laporan yang sedang diperiksa ulang ditahan sampai koreksi selesai. Laporan K belum dikoreksi, tetapi sudah dikirim. Dengan asumsi prosedur dipatuhi, kesimpulan yang pasti benar adalah ...",
    options: [
      { label: "A", text: "Laporan K ditandai merah." },
      { label: "B", text: "Laporan K sudah dikoreksi sebelum dikirim." },
      { label: "C", text: "Laporan K tidak ditandai merah." },
      { label: "D", text: "Semua laporan yang dikirim telah dikoreksi." },
      { label: "E", text: "Laporan K pasti dikirim oleh petugas yang sama." },
    ],
    answer: "C",
    explanation:
      "Jika K bertanda merah, K harus masuk pemeriksaan ulang dan ditahan sampai koreksi selesai. Namun K sudah dikirim sebelum dikoreksi. Dengan asumsi prosedur dipatuhi, K tidak mungkin bertanda merah. Kesimpulan ini memakai hubungan dua syarat, bukan membalik satu pernyataan saja.",
  },
  {
    id: "tkp-hots-01",
    subject: "TKP",
    prompt:
      "Antrean layanan cukup panjang ketika seorang pemohon pengguna kursi roda datang. Jalur antrean biasa sempit, tetapi loket samping dapat digunakan dan petugas boleh mengatur antrean sesuai kebutuhan akses. Respons paling tepat adalah ...",
    options: [
      {
        label: "A",
        text: "Meminta pemohon menunggu sampai antrean kosong agar tidak mengganggu alur.",
      },
      { label: "B", text: "Memindahkan semua orang dalam antrean ke urutan paling belakang." },
      {
        label: "C",
        text: "Menawarkan loket samping sesuai prosedur, menjelaskan pengaturan antrean, dan menjaga giliran pemohon lain tetap jelas.",
      },
      { label: "D", text: "Meminta pemohon mencari bantuan dari warga lain." },
      {
        label: "E",
        text: "Membawa pemohon ke ruang petugas tanpa memberi penjelasan kepada antrean.",
      },
    ],
    answer: "C",
    explanation:
      "Akomodasi yang diizinkan mengatasi hambatan akses tanpa mengabaikan keteraturan layanan. Menjelaskan proses kepada pemohon dan antrean menjaga martabat, transparansi, serta kejelasan giliran.",
  },
  {
    id: "tkp-hots-02",
    subject: "TKP",
    prompt:
      "Menjelang tenggat, sebuah angka pada laporan berbeda antara lembar kerja dan sistem sumber. Atasan meminta laporan dikirim segera, tetapi belum menjelaskan apakah angka itu memengaruhi kesimpulan. Tindakan terbaik adalah ...",
    options: [
      { label: "A", text: "Memilih angka yang paling sering muncul agar laporan dapat dikirim." },
      {
        label: "B",
        text: "Mengirim laporan tanpa angka tersebut dan tidak memberi tahu siapa pun.",
      },
      {
        label: "C",
        text: "Memeriksa sumber dan dampak selisih, segera memberi tahu atasan, lalu mengirim versi tervalidasi dengan catatan yang jelas.",
      },
      { label: "D", text: "Menunda laporan sampai atasan menghubungi Anda kembali." },
      { label: "E", text: "Mengubah sistem sumber agar sama dengan lembar kerja." },
    ],
    answer: "C",
    explanation:
      "Pemeriksaan sumber mencegah angka keliru dijadikan dasar keputusan. Memberi tahu atasan sejak awal membantu menentukan apakah laporan dapat dikirim dengan catatan atau perlu menunggu koreksi. Jangan mengubah sumber data atau menyembunyikan ketidakpastian.",
  },
  {
    id: "tkp-hots-03",
    subject: "TKP",
    prompt:
      "Seorang warga mengunggah keluhan layanan ke media sosial dan mencantumkan nomor berkas serta nama petugas. Anda ingin merespons cepat, tetapi belum mengetahui seluruh kronologi. Respons yang paling tepat adalah ...",
    options: [
      {
        label: "A",
        text: "Menjelaskan kronologi lengkap di kolom komentar agar publik memahami masalahnya.",
      },
      { label: "B", text: "Meminta warga menghapus unggahan tanpa menawarkan bantuan." },
      {
        label: "C",
        text: "Mengakui keluhan secara umum, mengarahkan pembahasan kasus ke kanal resmi yang aman, dan memeriksa kronologi sebelum memberi penjelasan.",
      },
      { label: "D", text: "Membela petugas yang disebut karena belum ada bukti kesalahan." },
      {
        label: "E",
        text: "Mengirim pesan pribadi dari akun personal dan meminta semua data berkas.",
      },
    ],
    answer: "C",
    explanation:
      "Respons publik yang mengakui keluhan menunjukkan perhatian tanpa membuka informasi kasus. Kanal resmi menjaga data, sedangkan pemeriksaan kronologi mencegah janji atau pembelaan yang belum didukung fakta.",
  },
  {
    id: "tkp-hots-04",
    subject: "TKP",
    prompt:
      "Rekan meminta Anda mengirim daftar pemohon ke surel pribadinya karena sistem kantor sedang lambat. Daftar tersebut memuat data yang tidak diperlukan untuk tugasnya, dan ada penyimpanan resmi yang masih dapat diakses melalui perangkat kantor. Tindakan terbaik adalah ...",
    options: [
      {
        label: "A",
        text: "Mengirim seluruh daftar agar rekan dapat memilih data yang diperlukan.",
      },
      { label: "B", text: "Menolak membantu dan membiarkan pekerjaan terhenti." },
      {
        label: "C",
        text: "Menggunakan penyimpanan resmi, membagikan hanya data yang diperlukan, dan memberi tahu rekan tentang cara akses yang aman.",
      },
      {
        label: "D",
        text: "Mengirim daftar ke akun pribadi lalu menghapusnya setelah rekan mengunduh.",
      },
      { label: "E", text: "Meminta rekan memakai akun pribadi Anda untuk membuka sistem." },
    ],
    answer: "C",
    explanation:
      "Kebutuhan operasional tetap dapat dipenuhi dengan kanal resmi dan prinsip pembatasan data. Mengirim seluruh daftar atau memakai akun pribadi memperluas paparan dan mengurangi kendali atas informasi.",
  },
  {
    id: "tkp-hots-05",
    subject: "TKP",
    prompt:
      "Sebuah tugas tim terlambat karena cara kerja yang disepakati tidak cocok dengan kemampuan anggota baru. Tenggat masih dapat dicapai jika pembagian tugas diubah, tetapi anggota lain khawatir beban mereka bertambah. Langkah paling konstruktif adalah ...",
    options: [
      {
        label: "A",
        text: "Meminta anggota baru bekerja lebih lama tanpa meninjau pembagian tugas.",
      },
      {
        label: "B",
        text: "Mengambil alih tugas anggota baru dan tidak membahas perubahan dengan tim.",
      },
      {
        label: "C",
        text: "Memetakan pekerjaan tersisa dan kapasitas tim, menyepakati pembagian ulang yang realistis, serta menetapkan titik pemeriksaan progres.",
      },
      {
        label: "D",
        text: "Melaporkan anggota baru sebagai penyebab keterlambatan sebelum memeriksa hambatan lain.",
      },
      { label: "E", text: "Mengurangi pemeriksaan mutu agar tenggat pasti tercapai." },
    ],
    answer: "C",
    explanation:
      "Pemetaan beban dan kapasitas membantu tim memilih perubahan yang bisa dijalankan tanpa mengorbankan mutu. Kesepakatan ulang dan titik pemeriksaan menjaga akuntabilitas serta memberi kesempatan memperbaiki arah lebih awal.",
  },
  {
    id: "twk-hots-06",
    subject: "TWK",
    prompt:
      "Dalam musyawarah penggunaan ruang publik, kelompok warga dengan jumlah peserta lebih sedikit meminta jadwal yang bertepatan dengan hari ibadah mereka. Mayoritas mengusulkan jadwal tetap yang membuat kelompok tersebut tidak dapat hadir. Keputusan yang paling mencerminkan penghormatan terhadap keberagaman sekaligus kepentingan bersama adalah ...",
    options: [
      {
        label: "A",
        text: "Mengikuti pilihan mayoritas karena musyawarah selalu ditentukan oleh jumlah suara.",
      },
      { label: "B", text: "Membatalkan kegiatan agar tidak ada kelompok yang merasa dirugikan." },
      {
        label: "C",
        text: "Mencari jadwal atau sistem giliran yang memberi kesempatan setara, lalu menyepakatinya secara terbuka.",
      },
      { label: "D", text: "Memberi kelompok kecil jadwal khusus tanpa melibatkan kelompok lain." },
      {
        label: "E",
        text: "Meminta kelompok kecil menyesuaikan diri demi efisiensi penggunaan ruang.",
      },
    ],
    answer: "C",
    explanation:
      "Musyawarah bukan sekadar menghitung suara; keputusan perlu mempertimbangkan hak warga dan dampaknya. Jadwal alternatif atau giliran yang dibahas terbuka menjaga akses setara tanpa menghapus kepentingan kelompok lain.",
  },
  {
    id: "twk-hots-07",
    subject: "TWK",
    prompt:
      "Sebuah unggahan viral menuduh kelompok tertentu menerima bantuan secara tidak adil. Data yang menyertai unggahan hanya berupa tangkapan layar tanpa sumber. Sikap warga yang paling sesuai dengan tanggung jawab dalam kehidupan demokratis adalah ...",
    options: [
      { label: "A", text: "Menyebarkan unggahan agar pihak berwenang segera merasa tertekan." },
      {
        label: "B",
        text: "Memeriksa sumber dan kriteria bantuan, lalu menyampaikan keberatan melalui kanal pengaduan yang dapat ditelusuri.",
      },
      { label: "C", text: "Menghapus semua komentar berbeda agar konflik tidak meluas." },
      {
        label: "D",
        text: "Mendatangi penerima bantuan dan meminta mereka membuktikan kelayakannya.",
      },
      { label: "E", text: "Menganggap tuduhan benar karena sudah dibagikan banyak orang." },
    ],
    answer: "B",
    explanation:
      "Partisipasi demokratis memerlukan informasi yang dapat diperiksa dan cara menyampaikan kritik yang bertanggung jawab. Verifikasi mencegah fitnah, sedangkan pengaduan yang tercatat memungkinkan evaluasi yang adil.",
  },
  {
    id: "twk-hots-08",
    subject: "TWK",
    prompt:
      "Petugas pelayanan diminta mempercepat berkas seorang kenalan dengan melewati antrean. Pemohon lain sudah menunggu sesuai urutan, dan belum ada keadaan darurat. Respons yang paling menjaga prinsip keadilan dan integritas adalah ...",
    options: [
      { label: "A", text: "Mendahulukan kenalan karena prosesnya hanya memerlukan waktu singkat." },
      {
        label: "B",
        text: "Meminta kenalan memberi imbalan agar perlakuan khusus dapat dipertanggungjawabkan.",
      },
      {
        label: "C",
        text: "Memproses sesuai urutan dan prosedur, serta menjelaskan bahwa pengecualian hanya berlaku berdasarkan kriteria layanan.",
      },
      {
        label: "D",
        text: "Menolak semua permohonan hari itu untuk menghindari tuduhan pilih kasih.",
      },
      {
        label: "E",
        text: "Meminta rekan lain memproses berkas tersebut tanpa menyebut hubungan pribadi.",
      },
    ],
    answer: "C",
    explanation:
      "Perlakuan yang setara berarti mengikuti urutan dan kriteria yang berlaku, bukan kedekatan pribadi. Penjelasan yang transparan juga menjaga kepercayaan dan memungkinkan pengecualian hanya untuk alasan yang sah.",
  },
  {
    id: "twk-hots-09",
    subject: "TWK",
    prompt:
      "Dalam rapat lintas daerah, perwakilan mengusulkan kebijakan seragam untuk semua wilayah agar mudah diterapkan. Data menunjukkan kondisi akses layanan dan kebiasaan masyarakat berbeda cukup jauh. Pendekatan yang paling tepat untuk menjaga persatuan sekaligus keadilan adalah ...",
    options: [
      {
        label: "A",
        text: "Menerapkan satu cara tanpa penyesuaian karena keseragaman selalu menghasilkan keadilan.",
      },
      {
        label: "B",
        text: "Membiarkan setiap wilayah menetapkan aturan tanpa tujuan dan standar bersama.",
      },
      {
        label: "C",
        text: "Menetapkan tujuan dan standar layanan bersama, lalu merancang cara pelaksanaan yang sesuai kondisi daerah melalui konsultasi.",
      },
      { label: "D", text: "Menunda semua kebijakan sampai kondisi setiap wilayah menjadi sama." },
      {
        label: "E",
        text: "Meminta wilayah dengan akses terbatas mengikuti kebijakan wilayah yang paling maju.",
      },
    ],
    answer: "C",
    explanation:
      "Persatuan dapat dijaga dengan tujuan bersama tanpa mengabaikan perbedaan kondisi. Standar yang jelas memastikan hak layanan tetap sama, sedangkan penyesuaian cara pelaksanaan membuat kebijakan lebih adil dan dapat dijalankan.",
  },
  {
    id: "twk-hots-10",
    subject: "TWK",
    prompt:
      "Warga menemukan rancangan fasilitas umum yang berpotensi menghalangi akses pengguna kursi roda. Keputusan anggaran masih dapat ditinjau sebelum pembangunan dimulai. Langkah yang paling mencerminkan tanggung jawab warga dan penghormatan terhadap hak setara adalah ...",
    options: [
      {
        label: "A",
        text: "Menunggu sampai fasilitas selesai agar kritik didasarkan pada hasil nyata.",
      },
      {
        label: "B",
        text: "Mengunggah nama perancang dan menuduhnya sengaja mengabaikan penyandang disabilitas.",
      },
      {
        label: "C",
        text: "Menyampaikan temuan beserta usulan aksesibilitas melalui forum atau kanal resmi sebelum keputusan anggaran ditetapkan.",
      },
      {
        label: "D",
        text: "Meminta kelompok pengguna kursi roda menyediakan fasilitas tambahan secara mandiri.",
      },
      { label: "E", text: "Menerima rancangan karena penyesuaian dapat menambah biaya." },
    ],
    answer: "C",
    explanation:
      "Masukan sebelum pembangunan memberi kesempatan memperbaiki rancangan dengan biaya dan dampak yang lebih terkendali. Penyampaian berbasis temuan melalui kanal yang tepat mendukung hak akses tanpa menyerang pribadi.",
  },
  {
    id: "tiu-hots-06",
    subject: "TIU",
    prompt:
      "Satu tim memeriksa 240 berkas dalam 4 jam dengan kecepatan tetap. Setelah dua jam, 30 berkas perlu diperiksa ulang sehingga belum dapat dihitung selesai. Berapa berkas yang sudah selesai setelah pemeriksaan ulang tersebut dikeluarkan?",
    options: [
      { label: "A", text: "75 berkas" },
      { label: "B", text: "90 berkas" },
      { label: "C", text: "100 berkas" },
      { label: "D", text: "120 berkas" },
      { label: "E", text: "150 berkas" },
    ],
    answer: "B",
    explanation:
      "Kecepatan tim adalah 240 ÷ 4 = 60 berkas per jam. Dalam dua jam tim menangani 120 berkas. Karena 30 di antaranya perlu diperiksa ulang dan belum dianggap selesai, hasil bersihnya 120 − 30 = 90 berkas.",
  },
  {
    id: "tiu-hots-07",
    subject: "TIU",
    prompt:
      "Pola bilangan berikut dibentuk dengan menambahkan selisih yang selalu bertambah 3: 4, 9, 17, 28, 42, ... Angka berikutnya adalah ...",
    options: [
      { label: "A", text: "57" },
      { label: "B", text: "58" },
      { label: "C", text: "59" },
      { label: "D", text: "60" },
      { label: "E", text: "61" },
    ],
    answer: "C",
    explanation:
      "Selisih antarbilangan adalah 5, 8, 11, dan 14. Selisih itu naik 3 setiap langkah, sehingga selisih berikutnya 17. Maka 42 + 17 = 59.",
  },
  {
    id: "tiu-hots-08",
    subject: "TIU",
    prompt:
      "Empat petugas memverifikasi 360 data dalam 3 jam. Dengan laju kerja yang sama, lima petugas memverifikasi 450 data dalam ...",
    options: [
      { label: "A", text: "2 jam" },
      { label: "B", text: "2 jam 15 menit" },
      { label: "C", text: "2 jam 30 menit" },
      { label: "D", text: "3 jam" },
      { label: "E", text: "3 jam 15 menit" },
    ],
    answer: "D",
    explanation:
      "Empat petugas menyelesaikan 360 ÷ 3 = 120 data per jam, atau 30 data per petugas per jam. Lima petugas bekerja dengan laju 150 data per jam. Waktu untuk 450 data adalah 450 ÷ 150 = 3 jam.",
  },
  {
    id: "tiu-hots-09",
    subject: "TIU",
    prompt:
      "Sebuah unit menerima 500 pengajuan. Sebanyak 12% tidak lengkap. Dari pengajuan yang lengkap, 25% memerlukan pemeriksaan tambahan. Berapa pengajuan yang lengkap dan tidak memerlukan pemeriksaan tambahan?",
    options: [
      { label: "A", text: "300 pengajuan" },
      { label: "B", text: "320 pengajuan" },
      { label: "C", text: "330 pengajuan" },
      { label: "D", text: "350 pengajuan" },
      { label: "E", text: "380 pengajuan" },
    ],
    answer: "C",
    explanation:
      "Yang lengkap adalah 88% × 500 = 440 pengajuan. Sebanyak 25% × 440 = 110 perlu pemeriksaan tambahan. Jadi yang lengkap dan tidak memerlukannya adalah 440 − 110 = 330 pengajuan.",
  },
  {
    id: "tiu-hots-10",
    subject: "TIU",
    prompt:
      "Dalam satu tim, semua analis dapat menggunakan perangkat lunak. Sebagian analis juga bertugas memeriksa laporan. Kesimpulan yang pasti benar adalah ...",
    options: [
      { label: "A", text: "Semua pengguna perangkat lunak memeriksa laporan." },
      { label: "B", text: "Sebagian pemeriksa laporan tidak dapat menggunakan perangkat lunak." },
      { label: "C", text: "Semua pemeriksa laporan adalah analis." },
      { label: "D", text: "Sebagian analis tidak dapat menggunakan perangkat lunak." },
      { label: "E", text: "Tidak ada analis yang memeriksa laporan." },
    ],
    answer: "C",
    explanation:
      "Pernyataan menyebut sebagian analis memeriksa laporan, sehingga setiap pemeriksa dalam kelompok yang disebut itu termasuk analis. Semua analis dapat menggunakan perangkat lunak, tetapi tidak dapat disimpulkan bahwa semua pengguna perangkat lunak memeriksa laporan.",
  },
  {
    id: "tkp-hots-06",
    subject: "TKP",
    prompt:
      "Anda menemukan dua laporan layanan berisi angka berbeda untuk periode yang sama. Laporan harus dikirim hari ini, dan tiap angka memiliki sumber yang tampak masuk akal. Langkah terbaik adalah ...",
    options: [
      { label: "A", text: "Memilih angka yang lebih besar agar capaian unit terlihat baik." },
      {
        label: "B",
        text: "Mengirim salah satu laporan sekarang dan memperbaikinya jika ada yang bertanya.",
      },
      {
        label: "C",
        text: "Membandingkan definisi dan sumber data, meminta konfirmasi pihak terkait, serta memberi atasan pembaruan tentang waktu penyelesaian yang realistis.",
      },
      { label: "D", text: "Menghapus angka yang berbeda dan mengirim laporan tanpa penjelasan." },
      { label: "E", text: "Meminta rekan memilih angka yang menurutnya paling dapat dipercaya." },
    ],
    answer: "C",
    explanation:
      "Memeriksa definisi dan sumber mencegah kesimpulan yang keliru. Koordinasi dengan pemilik data menjaga akurasi, sementara pembaruan kepada atasan mengelola tenggat secara terbuka.",
  },
  {
    id: "tkp-hots-07",
    subject: "TKP",
    prompt:
      "Seorang pemohon kesulitan menggunakan formulir daring karena fitur pembaca layar tidak mengenali beberapa kolom. Antrean cukup panjang dan rekan menyarankan pemohon itu kembali lain hari. Respons terbaik adalah ...",
    options: [
      {
        label: "A",
        text: "Meminta pemohon meminta bantuan keluarga untuk mengisi formulir di rumah.",
      },
      { label: "B", text: "Mencatat kendala tanpa membantu agar antrean tidak bertambah." },
      {
        label: "C",
        text: "Membantu melalui prosedur alternatif yang tersedia, menjaga kerahasiaan data, dan melaporkan masalah aksesibilitas untuk diperbaiki.",
      },
      {
        label: "D",
        text: "Mengisi seluruh formulir atas nama pemohon tanpa menjelaskan isi atau meminta persetujuannya.",
      },
      { label: "E", text: "Menyarankan pemohon menunggu sampai sistem diperbarui." },
    ],
    answer: "C",
    explanation:
      "Layanan yang inklusif mengupayakan akses setara tanpa mengorbankan persetujuan dan kerahasiaan pemohon. Bantuan sesuai prosedur menyelesaikan kebutuhan saat ini, sedangkan pelaporan membantu mencegah kendala berulang.",
  },
  {
    id: "tkp-hots-08",
    subject: "TKP",
    prompt:
      "Atasan meminta ringkasan cepat dari data yang belum sepenuhnya diverifikasi untuk rapat penting. Anda menemukan beberapa baris ganda yang dapat mengubah hasil. Tindakan paling profesional adalah ...",
    options: [
      { label: "A", text: "Mengirim hasil sementara tanpa penanda agar rapat tidak tertunda." },
      { label: "B", text: "Menghapus baris yang tampak ganda tanpa memeriksa sumbernya." },
      {
        label: "C",
        text: "Menjelaskan dampak temuan, memisahkan angka sementara dari angka terverifikasi, dan menyepakati pembaruan setelah pengecekan.",
      },
      { label: "D", text: "Menolak membantu sampai seluruh data sempurna." },
      {
        label: "E",
        text: "Mengirim data mentah kepada semua peserta rapat agar mereka menilai sendiri.",
      },
    ],
    answer: "C",
    explanation:
      "Pemisahan yang jelas antara angka sementara dan terverifikasi memberi bahan rapat tanpa menyamarkan ketidakpastian. Memeriksa sumber duplikasi melindungi akurasi, dan waktu pembaruan menjaga akuntabilitas.",
  },
  {
    id: "tkp-hots-09",
    subject: "TKP",
    prompt:
      "Dalam pelayanan langsung, seorang warga berbicara dengan nada tinggi karena tidak memahami alasan berkasnya belum diproses. Anda melihat antrean mulai terganggu, tetapi penjelasan sebelumnya mungkin kurang jelas. Anda sebaiknya ...",
    options: [
      { label: "A", text: "Menyuruh warga diam dan kembali setelah suasana hatinya membaik." },
      { label: "B", text: "Menjelaskan aturan dengan suara lebih keras agar warga mendengar." },
      {
        label: "C",
        text: "Mendengarkan inti keluhan, menjelaskan kekurangan berkas dan pilihan tindak lanjut dengan tenang, lalu menjaga alur antrean.",
      },
      { label: "D", text: "Melewati berkasnya tanpa penjelasan untuk meredakan situasi." },
      {
        label: "E",
        text: "Meminta petugas keamanan mengeluarkan warga sebelum memahami keluhannya.",
      },
    ],
    answer: "C",
    explanation:
      "Mendengarkan dan memberi penjelasan yang dapat ditindaklanjuti menangani penyebab kebingungan. Sikap tenang menjaga martabat warga, sementara pengelolaan antrean tetap melindungi pemohon lain.",
  },
  {
    id: "tkp-hots-10",
    subject: "TKP",
    prompt:
      "Anda ditugaskan menyusun panduan kerja, tetapi anggota tim memiliki pengalaman dan cara memahami informasi yang berbeda. Tenggat satu minggu lagi. Cara terbaik agar panduan akurat dan mudah dipakai adalah ...",
    options: [
      { label: "A", text: "Menyusun sendiri berdasarkan cara kerja yang paling Anda kuasai." },
      {
        label: "B",
        text: "Mengumpulkan semua pendapat tanpa menentukan kriteria atau penanggung jawab.",
      },
      {
        label: "C",
        text: "Menyepakati tujuan dan struktur, meminta masukan dari pengguna dengan pengalaman beragam, lalu menguji draf pada beberapa tugas nyata.",
      },
      { label: "D", text: "Menyalin panduan lama agar pekerjaan selesai lebih cepat." },
      { label: "E", text: "Menunggu arahan rinci dari atasan sebelum memulai." },
    ],
    answer: "C",
    explanation:
      "Tujuan dan struktur bersama menjaga konsistensi. Masukan dari calon pengguna serta uji pada tugas nyata membantu menemukan istilah atau langkah yang membingungkan sebelum panduan dipakai luas.",
  },
];

export const QUESTION_BANK: Question[] = [
  ...QUESTION_DRAFTS.map((question) => {
    const tip = QUESTION_TIPS[question.id];
    if (!tip) throw new Error(`Tips belajar belum tersedia untuk ${question.id}`);
    return {
      ...question,
      tip,
      difficulty: question.id.includes("-hots-") ? ("HOTS" as const) : ("Latihan" as const),
    };
  }),
  ...EXTENSION_QUESTIONS,
  ...CHAPTER_QUESTIONS,
  ...PPPK_HOTS_QUESTIONS,
  ...PPPK_SOCIAL_QUESTIONS,
  ...PPPK_TECHNICAL_QUESTIONS,
];

function questionHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1)
    hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  return hash >>> 0;
}

export function questionsForTrack(track: Track, seed = 0): Question[] {
  const config = TRACKS.find((item) => item.id === track);
  if (!config) return [];
  const bySubject = config.subjects.map((subject) =>
    QUESTION_BANK.filter((question) => question.subject === subject).sort(
      (left, right) =>
        questionHash(`${seed}:${left.id}`) - questionHash(`${seed}:${right.id}`) ||
        left.id.localeCompare(right.id),
    ),
  );
  if (track === "cpns")
    return bySubject.flatMap((questions, index) => questions.slice(0, [30, 35, 45][index]));
  return Array.from(
    { length: rulesForTrack(track).questionsPerTrack },
    (_, index) => bySubject[index % bySubject.length]?.[Math.floor(index / bySubject.length)],
  ).filter((question): question is Question => Boolean(question));
}

export function scoreExam(track: Track, answers: Record<string, string>, seed = 0) {
  const questions = questionsForTrack(track, seed);
  const breakdown =
    TRACKS.find((item) => item.id === track)?.subjects.map((subject) => {
      const subjectQuestions = questions.filter((question) => question.subject === subject);
      const correct = subjectQuestions.filter(
        (question) => answers[question.id] === question.answer,
      ).length;
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
