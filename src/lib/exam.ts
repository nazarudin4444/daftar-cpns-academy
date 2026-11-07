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
  questionsPerTrack: 15,
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
];

export function questionsForTrack(track: Track): Question[] {
  const config = TRACKS.find((item) => item.id === track);
  if (!config) return [];
  const bySubject = config.subjects.map((subject) =>
    QUESTION_BANK.filter((question) => question.subject === subject),
  );
  return Array.from(
    { length: DEMO_RULES.questionsPerTrack },
    (_, index) => bySubject[index % bySubject.length]?.[Math.floor(index / bySubject.length)],
  ).filter((question): question is Question => Boolean(question));
}

export function scoreExam(track: Track, answers: Record<string, string>) {
  const questions = questionsForTrack(track);
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
