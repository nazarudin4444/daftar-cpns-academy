export type ContentPageData = {
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  sourceLinks?: { label: string; href: string }[];
  verifiedAt?: string;
  sourceNote?: { title: string; body: string };
  noIndex?: boolean;
};

const officialSources = [
  { label: "Portal SSCASN BKN", href: "https://sscasn.bkn.go.id/" },
  { label: "Badan Kepegawaian Negara", href: "https://www.bkn.go.id/" },
  { label: "Kementerian PANRB", href: "https://www.menpan.go.id/" },
];

const scheduleSources = [
  { label: "Beranda SSCASN BKN", href: "https://sscasn.bkn.go.id/" },
  {
    label: "Klarifikasi BKN tentang informasi CPNS 2026",
    href: "https://www.bkn.go.id/karo-komlik-bkn-wisudo-putro-nugroho-poster-pembukaan-cpns-2026-yang-beredar-dipastikan-hoaks/",
  },
  { label: "Berita Kementerian PANRB", href: "https://www.menpan.go.id/site/berita-terkini" },
];

const formationSources = [
  { label: "Daftar formasi di SSCASN BKN", href: "https://sscasn.bkn.go.id/daftar-formasi/" },
  {
    label: "PermenPANRB Nomor 6 Tahun 2024 tentang Pengadaan ASN",
    href: "https://jdih.menpan.go.id/dokumen-hukum/peraturan-menteri-pendayagunaan-aparatur-negara-dan-reformasi-birokrasi-nomor-6-tahun-2024-tentang-p-1849",
  },
];

const requirementSources = [
  {
    label: "PermenPANRB Nomor 6 Tahun 2024 tentang Pengadaan ASN",
    href: "https://jdih.menpan.go.id/dokumen-hukum/peraturan-menteri-pendayagunaan-aparatur-negara-dan-reformasi-birokrasi-nomor-6-tahun-2024-tentang-p-1849",
  },
  { label: "Daftar formasi di SSCASN BKN", href: "https://sscasn.bkn.go.id/daftar-formasi/" },
];

const registrationSources = [
  { label: "Portal SSCASN BKN", href: "https://sscasn.bkn.go.id/" },
  { label: "Buku petunjuk pendaftaran SSCASN", href: "https://sscasn.bkn.go.id/buku-petunjuk/" },
  { label: "Helpdesk SSCASN BKN", href: "https://helpdesk-sscasn.bkn.go.id/" },
];

const passingGradeSources = [
  ...officialSources,
  {
    label: "KepmenPANRB 321/2024 tentang ambang SKD",
    href: "https://jdih.menpan.go.id/dokumen-hukum/keputusan-menteri-pendayagunaan-aparatur-negara-dan-reformasi-birokrasi-nomor-321-tahun-2024-tentang-1851",
  },
  {
    label: "KepmenPANRB 1023/2021 tentang ambang SKD",
    href: "https://www.bkn.go.id/wp-content/uploads/2021/11/KEPUTUSAN-MENTERI-PANRB-NOMOR-1023-TENTANG-NILAI-AMBANG-BATAS-SKD-CPNS-2021.pdf",
  },
];

export const CONTENT_PAGES: Record<string, ContentPageData> = {
  "simulasi-cat-cpns": {
    title: "Simulasi CAT CPNS",
    metaTitle: "Simulasi CAT CPNS Gratis 110 Soal | Daftar CPNS",
    description:
      "Kerjakan simulasi CAT CPNS gratis berisi 110 soal dalam 100 menit. Tandai soal ragu, simpan progres di browser, lalu tinjau hasil dan pembahasan.",
    intro:
      "Pilih satu dari 20 paket demo SKD CPNS. Setiap paket memuat 110 soal TWK, TIU, dan TKP dengan batas waktu 100 menit. Soal dan skor merupakan materi latihan independen, bukan soal resmi atau prediksi hasil seleksi.",
    sections: [
      {
        heading: "Cara menggunakan latihan",
        paragraphs: [
          "Pilih paket, baca panduan singkat, lalu mulai sesi. Gunakan daftar nomor untuk berpindah dan tandai soal yang ingin diperiksa kembali. Setiap paket demo SKD CPNS berisi 110 soal dengan batas waktu 100 menit.",
          "Nilai demo dihitung satu poin untuk setiap jawaban benar. Simulasi ini tidak menetapkan ambang lulus atau passing grade seleksi.",
        ],
        bullets: [
          "Tidak perlu masuk akun.",
          "Jawaban sementara disimpan di browser perangkat ini.",
          "Hasil dan pembahasan hanya untuk evaluasi belajar.",
        ],
      },
      {
        heading: "Baca hasil tanpa menyamakannya dengan seleksi",
        paragraphs: [
          "Setelah sesi selesai, lihat jumlah jawaban benar per kategori dan waktu pengerjaan, lalu buka pembahasan untuk meninjau alasan setiap kunci. Gunakan catatan itu untuk memilih topik latihan berikutnya; satu hasil demo tidak cukup untuk menyimpulkan kesiapan atau peluang lulus.",
          "Variasi soal dapat berbeda pada sesi baru. Progres sesi aktif disimpan di browser perangkat agar sesi dapat dipulihkan, sedangkan halaman ini tidak membuat akun atau mengirim jawaban demo ke layanan pendaftaran.",
        ],
      },
      {
        heading: "Bukan layanan pendaftaran resmi",
        paragraphs: [
          "Daftar CPNS merupakan platform edukasi independen. Pendaftaran seleksi ASN resmi hanya melalui kanal pemerintah yang diumumkan, termasuk SSCASN.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "tryout-cpns-gratis": {
    title: "Tryout CPNS Gratis",
    metaTitle: "Tryout CPNS Gratis 110 Soal dan Pembahasan | Daftar CPNS",
    description:
      "Ikuti tryout CPNS gratis berisi 110 soal dalam 100 menit. Lihat hasil per kategori dan baca pembahasan setiap jawaban setelah sesi.",
    intro:
      "Tryout demo membantu Anda membiasakan diri membaca soal pilihan ganda, mengatur waktu, dan meninjau alasan di balik jawaban.",
    sections: [
      {
        heading: "Apa yang tersedia",
        paragraphs: [
          "Paket demo SKD CPNS memuat 110 soal TWK, TIU, dan TKP, penghitung waktu 100 menit, penanda ragu, navigasi nomor, hasil per kategori, dan pembahasan.",
          "Skor demo bukan nilai resmi, bukan passing grade, dan tidak menjamin hasil seleksi.",
        ],
      },
      {
        heading: "Mulai latihan",
        paragraphs: [
          "Pilih SKD CPNS pada halaman simulasi untuk memulai sesi. Progres sementara disimpan di perangkat dan dapat dipulihkan setelah halaman dimuat ulang.",
        ],
      },
      {
        heading: "Cara memakai hasil tryout",
        paragraphs: [
          "Kerjakan sesi tanpa membuka pembahasan lebih dulu. Tandai soal yang membuat ragu, selesaikan sesi, lalu bandingkan jawaban dengan penjelasan. Urutkan kesalahan berdasarkan kategori dan jenis kesulitan—misalnya salah memahami premis atau keliru menghitung—agar latihan ulang punya sasaran yang jelas.",
          "Soal pada sesi berikutnya dapat berbeda. Bandingkan pola kesalahan dan waktu pengerjaan, bukan hanya angka total, karena skor demo bukan ukuran resmi seleksi.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "latihan-soal-cpns": {
    title: "Latihan Soal CPNS Online",
    metaTitle: "Latihan Soal CPNS Online dan Pembahasan | Daftar CPNS",
    description:
      "Latihan soal CPNS orisinal per materi TWK, TIU, TKP, bab, subbab, dan seri, lengkap dengan pembahasan serta tips belajar.",
    intro:
      "Pilih materi, bab, subbab, lalu seri latihan yang ingin dikerjakan. Setiap soal dilengkapi kunci, pembahasan, serta tips dan trik. Semua materi merupakan contoh belajar mandiri, bukan soal resmi.",
    sections: [
      {
        heading: "Pilih materi dan subbab latihan",
        paragraphs: [
          "Bank soal CPNS dibagi menjadi kelompok materi TWK, TIU, dan TKP. Di dalamnya tersedia bab, subbab, dan seri latihan agar Anda dapat fokus pada topik tertentu.",
        ],
        bullets: [
          "TWK: latihan penalaran nilai kebangsaan dalam situasi sehari-hari.",
          "TIU: latihan pola, logika, dan hitungan dasar.",
          "TKP: latihan memilih respons kerja yang bertanggung jawab.",
        ],
      },
      {
        heading: "Gunakan hasil untuk evaluasi",
        paragraphs: [
          "Baca pembahasan dan tips setelah menjawab, lalu ulangi seri pada subbab yang masih terasa sulit. Nilai latihan tidak dipakai untuk menyimpulkan kelulusan.",
        ],
      },
      {
        heading: "Ritme latihan yang bisa diulang",
        paragraphs: [
          "Mulai dengan satu sesi campuran untuk melihat jenis soal yang terasa sulit. Setelah membaca pembahasan, pilih satu kategori untuk latihan fokus, tulis alasan kesalahan dengan kata-kata sendiri, lalu coba sesi campuran lagi di waktu berbeda. Cara ini membantu membedakan kesalahan konsep, ketelitian, dan pengelolaan waktu.",
          "Setiap soal dalam bank dilengkapi kunci, pembahasan, dan tips yang membantu Anda memilih strategi pengerjaan. Semua pertanyaan merupakan contoh latihan mandiri, bukan salinan soal seleksi.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "soal-twk": {
    title: "Latihan Soal TWK",
    metaTitle: "Latihan Soal TWK dan Pembahasan Demo | Daftar CPNS",
    description:
      "Latihan contoh TWK orisinal dengan pembahasan, dibuat untuk belajar dan tidak diklaim sebagai soal resmi.",
    intro:
      "Contoh TWK pada latihan ini mengajak peserta menimbang sikap dalam kebersamaan, perbedaan pendapat, dan pemeriksaan informasi.",
    sections: [
      {
        heading: "Belajar dengan membaca alasan",
        paragraphs: [
          "Pilih jawaban yang paling sesuai dengan situasi, lalu baca penjelasannya. Fokus pada alasan dan prinsip yang digunakan, bukan menghafal pilihan.",
          "Soal dibuat sebagai latihan mandiri. Materi seleksi yang berlaku harus merujuk pada pengumuman resmi.",
        ],
      },
      {
        heading: "Apa yang dilatih di kumpulan ini",
        paragraphs: [
          "Contoh yang tersedia menggunakan situasi seperti musyawarah, penerapan aturan yang adil, kerja bersama di tengah perbedaan, dan pemeriksaan kabar yang belum jelas sumbernya. Untuk tiap soal, jelaskan mengapa pilihan Anda sejalan atau tidak sejalan dengan prinsip yang ditanyakan. Jangan menghafal huruf kunci karena urutan pilihan tidak menunjukkan aturan umum.",
          "Materi ini adalah latihan nilai dan penalaran yang ditulis untuk situs ini. Ia tidak menyatakan cakupan resmi, kisi-kisi, atau bobot penilaian untuk periode seleksi tertentu.",
        ],
      },
      {
        heading: "Coba dalam simulasi",
        paragraphs: [
          "Pilih latihan SKD CPNS atau sekolah kedinasan. Kedua demo tersebut memuat contoh kategori TWK.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "soal-tiu": {
    title: "Latihan Soal TIU",
    metaTitle: "Latihan Soal TIU, Logika dan Numerik | Daftar CPNS",
    description:
      "Latihan contoh TIU tentang pola bilangan, perbandingan, dan penalaran, dilengkapi pembahasan orisinal.",
    intro:
      "Latihan TIU demo mencakup pola sederhana, hitungan dasar, dan kesimpulan logis. Setiap soal dilengkapi penjelasan langkah berpikir.",
    sections: [
      {
        heading: "Biasakan memeriksa premis",
        paragraphs: [
          "Dalam soal penalaran, pisahkan informasi yang diberikan dari dugaan tambahan. Untuk soal hitungan, tulis hubungan antarangka sebelum menghitung.",
          "Kumpulan ini disusun untuk latihan dan tidak mewakili naskah atau kisi-kisi resmi.",
        ],
      },
      {
        heading: "Pilih cara kerja sesuai jenis soal",
        paragraphs: [
          "Untuk pola bilangan, tulis perubahan antarangka atau uji operasi yang berulang sebelum memilih kelanjutan. Untuk rasio dan persentase, tentukan dulu nilai keseluruhan atau nilai satu bagian. Untuk penalaran verbal, pisahkan apa yang dinyatakan dari hal yang hanya mungkin benar.",
          "Contoh latihan pada bank ini mencakup rata-rata, pembagian beban, pola, perbandingan, persentase, analogi, dan kesimpulan logis. Jika jawaban salah, baca kembali langkahnya dan cari titik pertama ketika perhitungan atau kesimpulan menyimpang.",
        ],
      },
      {
        heading: "Buka latihan",
        paragraphs: [
          "Simulasi SKD CPNS dan sekolah kedinasan menyediakan beberapa contoh TIU dalam satu sesi demo.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "soal-tkp": {
    title: "Latihan Soal TKP",
    metaTitle: "Latihan Soal TKP dan Pembahasan Demo | Daftar CPNS",
    description:
      "Pelajari contoh situasi kerja TKP dan alasan memilih respons yang efektif melalui soal latihan orisinal.",
    intro:
      "Soal TKP demo menggunakan situasi kerja untuk melatih pertimbangan, komunikasi, pelayanan, dan tanggung jawab.",
    sections: [
      {
        heading: "Tinjau konteks sebelum memilih",
        paragraphs: [
          "Pertimbangkan kebutuhan pihak terkait, risiko, aturan yang diketahui, dan cara menyampaikan keputusan. Baca penjelasan setelah menjawab untuk membandingkan alasan.",
          "Kunci jawaban pada demo adalah kunci untuk skenario contoh ini. Ini bukan klaim tentang bobot atau kunci penilaian resmi.",
        ],
      },
      {
        heading: "Bandingkan kualitas respons",
        paragraphs: [
          "Dalam skenario latihan, perhatikan kebutuhan pengguna layanan, batas kewenangan, risiko data, dan dampak bagi tim. Respons yang lebih kuat biasanya menjelaskan langkah yang dapat dilakukan, berkomunikasi dengan pihak terkait, dan tetap mengikuti prosedur yang diketahui. Jika informasi belum cukup, klarifikasi sebelum menjanjikan hasil.",
          "Pembahasan menerangkan alasan kunci untuk skenario contoh. Latihan ini memakai satu jawaban terbaik untuk keperluan demo; jangan menganggapnya sebagai rumus skor atau bobot resmi TKP.",
        ],
      },
      {
        heading: "Coba latihan",
        paragraphs: [
          "Pilih SKD CPNS atau sekolah kedinasan pada simulasi. Sesi demo memuat contoh pertanyaan situasional.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  pppk: {
    title: "Panduan Belajar PPPK",
    metaTitle: "Panduan Belajar PPPK dan Sumber Seleksi Resmi | Daftar CPNS",
    description:
      "Pelajari kelompok kompetensi PPPK dan cara memeriksa pengumuman resmi. Paket simulasi PPPK 110 soal di Daftar CPNS masih dilengkapi.",
    intro:
      "Halaman ini mengenalkan kelompok kompetensi PPPK dan sumber pengumuman pemerintah. Paket simulasi 110 soal belum tersedia karena bank demo masih dilengkapi. Ketentuan seleksi, jabatan, dan materi mengikuti pengumuman resmi yang berlaku.",
    sections: [
      {
        heading: "Status simulasi PPPK",
        paragraphs: [
          "Paket simulasi PPPK 110 soal belum dapat dikerjakan. Halaman ini tidak menyajikan sesi ujian PPPK aktif atau skor latihan PPPK.",
          "Sebelum menggunakan materi seleksi, cocokkan persyaratan, jabatan, jadwal, dan kompetensi dengan pengumuman resmi instansi. Kategori pengenalan pada panduan ini bukan kisi-kisi resmi.",
        ],
      },
      {
        heading: "Kenali kelompok kompetensi",
        paragraphs: [
          "Kompetensi manajerial berkaitan dengan koordinasi dan penyelesaian pekerjaan. Kompetensi sosial kultural menekankan komunikasi yang menghormati latar serta kebutuhan yang berbeda. Kompetensi teknis bergantung pada tugas jabatan. Halaman ini memberi pengenalan umum, bukan daftar kompetensi lengkap atau kisi-kisi resmi.",
          "Untuk kompetensi teknis jabatan tertentu, gunakan persyaratan dan referensi yang disebutkan instansi pada pengumuman resmi. Jangan menyimpulkan seluruh materi seleksi PPPK dari panduan umum ini.",
        ],
      },
      {
        heading: "Periksa informasi seleksi",
        paragraphs: [
          "Baca pengumuman dari instansi dan portal pemerintah terkait untuk mengetahui persyaratan, jadwal, formasi, dan tahapan yang berlaku.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "sekolah-kedinasan": {
    title: "Persiapan Sekolah Kedinasan",
    metaTitle: "Latihan dan Panduan Sekolah Kedinasan | Daftar CPNS",
    description:
      "Mulai persiapan sekolah kedinasan dengan latihan demo dan tautan untuk memeriksa pengumuman instansi terkait.",
    intro:
      "Informasi seleksi sekolah kedinasan dapat berbeda menurut instansi dan periode. Gunakan laman resmi instansi terkait untuk memastikan ketentuan terbaru.",
    sections: [
      {
        heading: "Latihan dasar",
        paragraphs: [
          "Simulasi demo menyediakan contoh latihan penalaran, wawasan, dan situasi kerja. Konten tersebut bukan tes resmi, bukan soal bocoran, dan tidak menjanjikan hasil seleksi.",
        ],
      },
      {
        heading: "Siapkan belajar tanpa menganggap semua seleksi sama",
        paragraphs: [
          "Mulai dari menentukan instansi dan program yang ingin dipelajari, kemudian cari pengumuman serta halaman penerimaan di situs resmi instansi tersebut. Catat tahapan yang benar-benar tercantum, kebutuhan dokumen, tenggat, dan kanal pertanyaan. Jangan menggunakan satu panduan umum untuk menyimpulkan syarat semua sekolah kedinasan.",
          "Simulasi Daftar CPNS hanya menyediakan contoh latihan penalaran, wawasan, dan situasi kerja. Gunakan latihan untuk membiasakan diri membaca soal; untuk materi dan jadwal seleksi, ikuti pengumuman instansi tujuan.",
        ],
      },
      {
        heading: "Rujuk pengumuman instansi",
        paragraphs: [
          "Persyaratan dan proses seleksi perlu dicocokkan dengan pengumuman resmi instansi tujuan. Gunakan tautan pemerintah berikut sebagai awal penelusuran.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "jadwal-cpns": {
    title: "Informasi Jadwal CPNS",
    metaTitle: "Informasi Jadwal CPNS dari Sumber Resmi | Daftar CPNS",
    description:
      "Cara memeriksa jadwal CPNS melalui pengumuman resmi. Situs ini tidak menerbitkan tanggal seleksi yang belum terverifikasi.",
    intro:
      "Jadwal hanya kami tampilkan jika terbit di kanal pemerintah. Saat diperiksa pada 9 November 2026, beranda SSCASN menampilkan seleksi Sekolah Kedinasan 2026 dan belum memuat jadwal CPNS umum.",
    verifiedAt: "9 November 2026",
    sourceNote: {
      title: "Belum ada jadwal CPNS umum yang tampil di SSCASN",
      body: "BKN juga mengklarifikasi bahwa poster yang mengklaim pendaftaran CPNS 2026 sudah dibuka adalah hoaks. Periksa kembali SSCASN dan pengumuman instansi untuk pembaruan berikutnya.",
    },
    sections: [
      {
        heading: "Tempat memeriksa jadwal",
        paragraphs: [
          "Buka beranda SSCASN untuk melihat seleksi yang sedang aktif. Periksa juga pengumuman BKN, Kementerian PANRB, dan instansi yang Anda tuju. Jika ada perubahan, ikuti pengumuman terbaru dari instansi penyelenggara.",
          "Jangan memakai jadwal dari seleksi tahun sebelumnya sebagai tanggal untuk periode baru. Tanggal dan tahap seleksi dapat berubah melalui pengumuman atau ralat resmi.",
        ],
      },
      {
        heading: "Catat tanggal dari dokumen sumber",
        paragraphs: [
          "Pastikan nama instansi, periode seleksi, tanggal pengumuman, masa pendaftaran, dan tahapan berikutnya tercantum di sumber pemerintah. Periksa apakah ada ralat atau pengumuman lanjutan sebelum membuat rencana.",
          "Jika tanggal pada unggahan media sosial berbeda dengan dokumen instansi, utamakan dokumen resmi terbaru. Hindari tautan pendaftaran dari poster atau pesan yang tidak mengarah ke domain pemerintah.",
        ],
      },
      {
        heading: "Waspadai tautan pendaftaran palsu",
        paragraphs: [
          "Layanan ini bukan portal pendaftaran. Untuk pendaftaran ASN resmi, buka SSCASN secara langsung dan periksa alamat situs sebelum memasukkan informasi apa pun.",
        ],
      },
    ],
    sourceLinks: scheduleSources,
  },
  "formasi-cpns": {
    title: "Informasi Formasi CPNS",
    metaTitle: "Informasi Formasi CPNS dan Sumber Resmi | Daftar CPNS",
    description:
      "Panduan mencari informasi formasi CPNS dengan memeriksa portal dan pengumuman resmi instansi, tanpa data formasi rekaan.",
    intro:
      "Instansi menetapkan kebutuhan jabatan dan kualifikasi untuk setiap periode. Cari daftar yang sedang aktif melalui menu Formasi SSCASN, lalu cocokkan dengan pengumuman instansi.",
    verifiedAt: "9 November 2026",
    sourceNote: {
      title: "Daftar formasi mengikuti seleksi yang sedang dibuka",
      body: "Halaman Formasi SSCASN adalah rujukan untuk melihat lowongan yang tersedia. Saat diperiksa, beranda SSCASN menampilkan seleksi Sekolah Kedinasan 2026, bukan jadwal CPNS umum.",
    },
    sections: [
      {
        heading: "Cara mencari formasi",
        paragraphs: [
          "Buka menu Formasi di SSCASN ketika pengadaan sudah aktif. Gunakan pilihan instansi, jenjang pendidikan, dan jabatan yang tersedia untuk menyaring daftar.",
          "Untuk rincian lengkap, baca pengumuman dan lampiran dari instansi. Kebutuhan, kualifikasi, lokasi penempatan, dan ketentuan jabatan dapat berbeda antarinstansi.",
        ],
      },
      {
        heading: "Periksa kecocokan sebelum memilih",
        paragraphs: [
          "Cocokkan nama jabatan, unit kerja, lokasi, pendidikan, program studi, dan dokumen pendukung. Baca catatan kaki atau lampiran karena syarat khusus bisa dicantumkan terpisah dari tabel formasi.",
          "Pastikan kode dan nama jabatan di portal sama dengan dokumen instansi. Jangan mengambil keputusan dari daftar salinan yang tidak memuat sumber dan tahun seleksi.",
        ],
      },
      {
        heading: "Ketentuan penetapan kebutuhan",
        paragraphs: [
          "PermenPANRB Nomor 6 Tahun 2024 mengatur pengadaan ASN. Pengumuman instansi tetap menjadi rujukan untuk melihat jabatan, jumlah kebutuhan, unit penempatan, kualifikasi pendidikan, jadwal, dan persyaratan yang dibuka.",
        ],
      },
    ],
    sourceLinks: formationSources,
  },
  "syarat-cpns": {
    title: "Persyaratan CPNS",
    metaTitle: "Cara Memeriksa Persyaratan CPNS Resmi | Daftar CPNS",
    description:
      "Periksa persyaratan CPNS berdasarkan pengumuman resmi instansi. Ketentuan dapat berbeda dan tidak ditetapkan oleh situs ini.",
    intro:
      "Syarat CPNS bergantung pada jabatan, kualifikasi, dan ketentuan instansi. Gunakan ringkasan ini sebagai daftar pemeriksaan awal, lalu pastikan setiap butir pada pengumuman formasi yang Anda pilih.",
    verifiedAt: "9 November 2026",
    sourceNote: {
      title: "Pengumuman instansi menentukan syarat jabatan",
      body: "Peraturan pengadaan ASN memuat kerangka umum. Kualifikasi pendidikan, dokumen, dan syarat tambahan perlu dicocokkan dengan formasi serta lampiran pengumuman periode yang aktif.",
    },
    sections: [
      {
        heading: "Apa yang perlu diperiksa",
        paragraphs: [
          "Mulai dari batas usia, pendidikan dan program studi, akreditasi atau pengakuan ijazah bila dipersyaratkan, serta kondisi khusus jabatan. Rincian yang berlaku harus mengikuti pengumuman instansi, bukan daftar dari seleksi sebelumnya.",
          "Periksa juga daftar dokumen, format berkas, ukuran file, dan ketentuan unggah. Persyaratan teknis dapat ditetapkan berbeda untuk setiap jabatan.",
        ],
      },
      {
        heading: "Buat daftar cek pribadi",
        paragraphs: [
          "Catat setiap syarat dari pengumuman dan lampiran, lalu siapkan bukti yang diminta sebelum pendaftaran. Pastikan nama, tanggal, dan data pada dokumen terbaca serta sesuai dengan isian di portal.",
          "Jika ada butir yang belum jelas, hubungi kanal resmi instansi atau Helpdesk SSCASN. Daftar CPNS hanya menyediakan panduan belajar dan tidak memproses dokumen pendaftaran.",
        ],
      },
      {
        heading: "Jaga dokumen dan akun Anda",
        paragraphs: [
          "Unggah dokumen hanya melalui portal resmi ketika pendaftaran dibuka. Jangan membagikan kata sandi, NIK, Kartu Keluarga, atau dokumen pribadi kepada pihak yang menawarkan jasa pendaftaran melalui situs latihan atau pesan pribadi.",
        ],
      },
    ],
    sourceLinks: requirementSources,
  },
  "cara-daftar-cpns": {
    title: "Cara Mendaftar CPNS",
    metaTitle: "Cara Mendaftar CPNS Melalui Portal Resmi | Daftar CPNS",
    description:
      "Panduan awal untuk menemukan informasi pendaftaran CPNS dan selalu mengikuti petunjuk resmi SSCASN serta instansi.",
    intro:
      "Pendaftaran CPNS dilakukan secara daring melalui SSCASN. Daftar CPNS bukan portal pendaftaran dan tidak meminta data identitas atau dokumen Anda.",
    verifiedAt: "9 November 2026",
    sourceNote: {
      title: "Daftar hanya saat pengadaan aktif",
      body: "Beranda SSCASN menampilkan seleksi yang sedang berlangsung, tautan buku petunjuk, dan Helpdesk. Ikuti langkah yang tampil di portal karena menu dan prosedur dapat berubah sesuai periode.",
    },
    sections: [
      {
        heading: "Sebelum membuat akun",
        paragraphs: [
          "Baca pengumuman instansi dan seluruh lampirannya. Pastikan periode seleksi, jabatan, kualifikasi, dokumen, serta tenggat sesuai dengan yang Anda tuju.",
          "Ketik alamat SSCASN secara langsung atau ikuti tautan dari kanal pemerintah. Pastikan alamat berakhir dengan domain resmi sebelum memasukkan data.",
        ],
      },
      {
        heading: "Alur pendaftaran",
        paragraphs: [
          "Buat akun pada SSCASN ketika pendaftaran dibuka, lalu ikuti Buku Petunjuk untuk melengkapi profil dan memilih formasi. Isi data dengan teliti, unggah dokumen yang diminta, dan periksa kembali sebelum mengirim pendaftaran.",
          "Simpan bukti pendaftaran dan pantau pengumuman instansi untuk jadwal seleksi berikutnya. Jika mengalami kendala akun atau pendaftaran, gunakan Helpdesk SSCASN.",
        ],
      },
      {
        heading: "Lindungi data akun",
        paragraphs: [
          "Jangan membagikan kata sandi akun, NIK, Kartu Keluarga, atau dokumen pribadi kepada pihak yang menawarkan simulasi. Situs ini tidak meminta data tersebut.",
        ],
      },
    ],
    sourceLinks: registrationSources,
  },
  "passing-grade-cpns": {
    title: "Passing Grade CPNS",
    metaTitle: "Informasi Passing Grade CPNS dan Aturan Resmi | Daftar CPNS",
    description:
      "Kalkulator interaktif untuk memeriksa rujukan ambang SKD dan tautan dokumen resmi berdasarkan tahun aturan.",
    intro:
      "Gunakan kalkulator untuk membandingkan nilai dengan rujukan peraturan yang ditampilkan. Aturan yang tersedia berasal dari tahun berbeda, jadi periksa pengumuman resmi sesuai periode dan instansi yang Anda pilih.",
    sections: [
      {
        heading: "Bedakan nilai latihan dan ketentuan seleksi",
        paragraphs: [
          "Angka pada simulasi demo hanyalah poin latihan yang dihitung dari jawaban benar. Nilai tersebut bukan passing grade dan tidak dapat dibandingkan langsung dengan kalkulator di halaman ini.",
          "Kalkulator merujuk KepmenPANRB 321/2024 untuk kategori umum, cumlaude, disabilitas, dan Papua, serta KepmenPANRB 1023/2021 untuk dokter/spesialis. Periksa dokumen resmi dan pengumuman instansi untuk periode seleksi yang Anda ikuti.",
        ],
      },
      {
        heading: "Cara mengecek angka dari sumber primer",
        paragraphs: [
          "Jika menemukan angka ambang batas di artikel atau unggahan, cari peraturan atau pengumuman pemerintah yang menjadi sumbernya. Cocokkan periode seleksi, jenis tes, kelompok atau jabatan yang disebut, dan tanggal dokumen. Pastikan tidak membaca nilai dari tahun atau jenis seleksi lain sebagai ketentuan saat ini.",
          "Nilai pada simulator dihitung untuk latihan berdasarkan kunci contoh. Kalkulator mengecek angka terhadap rujukan pada tahun yang ditampilkan. Hasil ini tidak membuktikan peserta memenuhi syarat pada periode lain atau akan memperoleh peringkat tertentu.",
        ],
      },
      {
        heading: "Sumber yang perlu diperiksa",
        paragraphs: ["Rujuk kanal BKN, Kementerian PANRB, dan pengumuman resmi instansi terkait."],
      },
    ],
    sourceLinks: passingGradeSources,
  },
  panduan: {
    title: "Panduan Persiapan Seleksi ASN",
    metaTitle: "Panduan Persiapan Seleksi ASN | Daftar CPNS",
    description:
      "Panduan belajar CPNS, PPPK, dan sekolah kedinasan dengan latihan demo dan rujukan ke pengumuman resmi.",
    intro:
      "Persiapan yang terarah dapat dimulai dengan mencari informasi resmi, menyusun jadwal belajar pribadi, berlatih, dan memeriksa kembali penjelasan soal.",
    sections: [
      {
        heading: "Susun kebiasaan belajar",
        paragraphs: [
          "Tentukan waktu belajar yang sesuai, pilih satu topik setiap sesi, lalu tinjau jawaban dan alasan setelah latihan. Catat materi yang perlu diulang tanpa menganggap skor latihan sebagai hasil seleksi.",
          "Materi seleksi dapat berubah. Cocokkan fokus belajar dengan pengumuman dan informasi resmi yang berlaku.",
        ],
        bullets: [
          "Mulai dari satu kategori latihan.",
          "Baca penjelasan sebelum pindah ke soal berikutnya.",
          "Periksa tanggal dan sumber setiap informasi seleksi.",
        ],
      },
      {
        heading: "Contoh siklus belajar yang fleksibel",
        paragraphs: [
          "Mulai dengan sesi singkat untuk mengetahui topik yang perlu dipelajari. Pada sesi berikutnya, fokus pada satu kategori dan baca pembahasan sampai paham alasannya. Sisihkan sesi lain untuk soal campuran dan evaluasi kembali kesalahan yang berulang. Sesuaikan lama serta frekuensi belajar dengan waktu dan kebutuhan Anda; pola ini adalah contoh pengaturan belajar, bukan jadwal resmi.",
          "Simpan catatan berupa jenis kesalahan dan langkah koreksi, bukan sekadar angka skor. Misalnya: salah memahami kata pembatas pada premis, terburu-buru menghitung persentase, atau memilih respons sebelum mengklarifikasi situasi.",
        ],
      },
      {
        heading: "Jelajahi pusat belajar",
        paragraphs: [
          "Buka latihan soal, soal TWK, TIU, TKP, PPPK, atau sekolah kedinasan melalui tautan terkait di halaman ini.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  artikel: {
    title: "Pusat Panduan Persiapan ASN",
    metaTitle: "Panduan Belajar CPNS, PPPK, dan Sekolah Kedinasan | Daftar CPNS",
    description:
      "Pilih panduan latihan CPNS, PPPK, dan sekolah kedinasan serta cara memeriksa informasi seleksi dari sumber resmi.",
    intro:
      "Pusat materi ini mengelompokkan panduan belajar dan halaman latihan yang sudah tersedia. Informasi jadwal, formasi, dan ketentuan seleksi tetap harus dicocokkan dengan pengumuman pemerintah.",
    sections: [
      {
        heading: "Pilih materi sesuai kebutuhan",
        paragraphs: [
          "Mulai dari simulasi jika ingin membiasakan diri dengan timer dan navigasi soal. Buka halaman TWK, TIU, atau TKP untuk melihat contoh dan pembahasan per kategori. Untuk informasi administrasi, gunakan panduan memeriksa syarat, jadwal, formasi, dan pendaftaran.",
        ],
        bullets: [
          "Latihan konsep dan penalaran pada TWK dan TIU.",
          "Menilai alasan pilihan respons pada contoh situasi TKP.",
          "Menemukan sumber resmi sebelum mengambil keputusan pendaftaran.",
        ],
      },
      {
        heading: "Batas informasi seleksi",
        paragraphs: [
          "Halaman ini tidak memuat jadwal atau formasi hasil perkiraan. Informasi yang dapat berubah perlu diperiksa langsung pada pengumuman resmi yang berlaku. Soal, kunci, dan skor demo adalah materi belajar independen, bukan soal atau nilai resmi.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "tentang-kami": {
    title: "Tentang Daftar CPNS",
    metaTitle: "Tentang Daftar CPNS, Platform Edukasi Independen",
    description:
      "Kenali Daftar CPNS sebagai platform edukasi dan simulasi CAT independen, bukan situs pemerintah atau pendaftaran ASN.",
    intro:
      "Daftar CPNS adalah platform edukasi dan simulasi CAT independen. Situs ini tidak mewakili BKN, SSCASN, Kementerian PANRB, atau instansi pemerintah.",
    sections: [
      {
        heading: "Ruang lingkup",
        paragraphs: [
          "Situs menyediakan contoh latihan orisinal, penjelasan jawaban, dan tautan rujukan resmi. Soal demo tidak berasal dari naskah resmi.",
          "Pendaftaran ASN dilakukan melalui portal pemerintah. Jangan mengirim data pendaftaran, identitas, atau kata sandi kepada situs ini.",
        ],
      },
      {
        heading: "Informasi pengelola",
        paragraphs: [
          "Daftar CPNS dikelola oleh Perawat Center. Dukungan, koreksi materi, dan pertanyaan privasi dapat disampaikan ke support@perawatcenter.com.",
        ],
      },
    ],
  },
  "kebijakan-privasi": {
    title: "Kebijakan Privasi",
    metaTitle: "Kebijakan Privasi Daftar CPNS",
    description:
      "Praktik privasi Daftar CPNS: penyimpanan latihan di browser, penggunaan email dukungan, dan kontak pengelola Perawat Center.",
    intro:
      "MVP ini tidak meminta akun, NIK, Kartu Keluarga, kata sandi SSCASN, maupun dokumen identitas. Progres latihan demo disimpan pada penyimpanan browser di perangkat yang digunakan.",
    sections: [
      {
        heading: "Data pada latihan demo",
        paragraphs: [
          "Untuk memulihkan sesi setelah halaman dimuat ulang, browser menyimpan jenis latihan, jawaban, penanda ragu, nomor aktif, dan waktu sesi. Data ini tersimpan lokal di perangkat dan tidak dikirim ke server oleh fitur demo.",
          "Menghapus data situs di browser akan menghapus progres yang tersimpan. Jangan menggunakan perangkat bersama bila Anda tidak ingin orang lain melihat sesi latihan yang tersisa.",
        ],
      },
      {
        heading: "Kontak dan permintaan privasi",
        paragraphs: [
          "Pengelola situs adalah Perawat Center. Kirim pertanyaan privasi atau permintaan terkait korespondensi dukungan ke support@perawatcenter.com. Saat Anda mengirim email, alamat pengirim dan isi pesan diterima melalui layanan email untuk menanggapi permintaan Anda. Jangan mengirim NIK, KK, kata sandi SSCASN, atau dokumen identitas.",
          "Progres latihan tersimpan di browser dan dapat dihapus melalui pengaturan data situs pada perangkat Anda. Pengelola tidak dapat memulihkan progres lokal yang telah dihapus.",
        ],
      },
      {
        heading: "Ruang lingkup kebijakan",
        paragraphs: [
          "Fitur latihan tidak menyediakan akun, formulir pendaftaran, atau analitik peserta. Penyedia hosting dan email dapat memproses data teknis sesuai layanan yang digunakan. Halaman ini tidak menjanjikan bahwa seluruh infrastruktur bebas pencatatan teknis.",
        ],
      },
    ],
  },
  "syarat-ketentuan": {
    title: "Syarat dan Ketentuan",
    metaTitle: "Syarat dan Ketentuan Daftar CPNS",
    description:
      "Ketentuan penggunaan materi latihan demo Daftar CPNS dan batasannya sebagai layanan edukasi independen.",
    intro:
      "Daftar CPNS menyediakan materi edukasi dan simulasi demo. Situs ini bukan portal pendaftaran ASN, bukan kanal pemerintah, dan tidak menjanjikan kelulusan.",
    sections: [
      {
        heading: "Penggunaan materi",
        paragraphs: [
          "Gunakan latihan untuk belajar mandiri. Soal, kunci, waktu, dan skor demo merupakan contoh orisinal yang tidak menggantikan aturan, pengumuman, maupun hasil resmi.",
          "Pastikan informasi seleksi melalui portal pemerintah dan pengumuman instansi yang berwenang. Jangan mengandalkan halaman ini sebagai satu-satunya sumber untuk keputusan pendaftaran.",
        ],
      },
      {
        heading: "Informasi pengelola",
        paragraphs: [
          "Layanan ini dikelola oleh Perawat Center. Pertanyaan penggunaan materi dan dukungan dapat dikirim ke support@perawatcenter.com. Latihan ditujukan untuk belajar mandiri dan tidak menjamin kelulusan seleksi ASN.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    metaTitle: "Disclaimer dan Penegasan Situs Independen | Daftar CPNS",
    description:
      "Daftar CPNS adalah layanan edukasi independen, bukan BKN atau portal SSCASN. Periksa informasi seleksi di kanal pemerintah.",
    intro:
      "Daftar CPNS adalah platform edukasi dan simulasi CAT independen. Kami bukan BKN, SSCASN, Kementerian PANRB, atau instansi pemerintah.",
    sections: [
      {
        heading: "Bukan pendaftaran ASN",
        paragraphs: [
          "Situs ini tidak mendaftarkan peserta, memeriksa status pendaftaran, atau mengumpulkan dokumen pendaftaran. Untuk proses resmi, kunjungi portal SSCASN yang dikelola pemerintah.",
        ],
      },
      {
        heading: "Latihan bukan materi resmi",
        paragraphs: [
          "Semua pertanyaan demo dibuat untuk latihan dan bukan soal resmi, bocoran, kisi-kisi resmi, atau prediksi hasil. Skor tidak menggunakan ambang kelulusan resmi dan tidak menjamin kelulusan.",
        ],
      },
      {
        heading: "Informasi dan kepatuhan",
        paragraphs: [
          "Jadwal, formasi, persyaratan, dan aturan seleksi dapat berubah. Periksa sumber resmi sebelum mengambil keputusan. Situs ini tidak menyatakan telah terdaftar sebagai PSE atau sepenuhnya patuh terhadap seluruh peraturan.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  kontak: {
    title: "Kontak",
    metaTitle: "Kontak Daftar CPNS",
    description:
      "Hubungi Perawat Center, pengelola Daftar CPNS, melalui support@perawatcenter.com untuk dukungan, koreksi materi, dan pertanyaan privasi.",
    intro:
      "Daftar CPNS dikelola oleh Perawat Center. Hubungi support@perawatcenter.com untuk bantuan latihan, melaporkan kesalahan pembahasan, atau menyampaikan pertanyaan privasi.",
    sections: [
      {
        heading: "Menghubungi dukungan",
        paragraphs: [
          "Sertakan alamat halaman dan uraian masalah agar pertanyaan Anda dapat ditelusuri. Jangan menyertakan NIK, KK, kata sandi SSCASN, atau dokumen identitas.",
          "Website ini merupakan platform edukasi dan simulasi CAT CPNS independen, bukan website resmi pemerintah. Untuk pertanyaan pendaftaran atau akun ASN, gunakan kanal bantuan pada portal SSCASN BKN.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  dashboard: {
    title: "Dashboard Latihan",
    metaTitle: "Dashboard dan Riwayat Latihan CAT | Daftar CPNS",
    description:
      "Lanjutkan sesi CAT yang tersimpan, tinjau riwayat hasil, dan lihat tren akurasi latihan pada browser ini.",
    intro:
      "Pusat belajar ini menampilkan sesi yang belum selesai, riwayat tryout, dan tren akurasi dari data browser lokal.",
    sections: [
      {
        heading: "Data lokal perangkat",
        paragraphs: [
          "Lanjutkan sesi yang masih berjalan atau pilih paket baru. Hasil tryout dan tren akurasi muncul setelah sesi selesai.",
        ],
      },
      {
        heading: "Privasi latihan",
        paragraphs: [
          "Halaman ini tidak meminta identitas atau data pendaftaran. Sesi dan riwayat disimpan di localStorage browser dan tidak disinkronkan ke server.",
        ],
      },
    ],
    noIndex: true,
  },
};
