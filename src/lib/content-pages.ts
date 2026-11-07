export type ContentPageData = {
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  sourceLinks?: { label: string; href: string }[];
  noIndex?: boolean;
};

const officialSources = [
  { label: "Portal SSCASN BKN", href: "https://sscasn.bkn.go.id/" },
  { label: "Badan Kepegawaian Negara", href: "https://www.bkn.go.id/" },
  { label: "Kementerian PANRB", href: "https://www.menpan.go.id/" },
];

export const CONTENT_PAGES: Record<string, ContentPageData> = {
  "simulasi-cat-cpns": {
    title: "Simulasi CAT CPNS",
    metaTitle: "Simulasi CAT CPNS Gratis, Latihan Demo | Daftar CPNS",
    description:
      "Coba latihan demo CAT CPNS tanpa akun. Jawab soal orisinal, tandai soal ragu, pulihkan progres, lalu baca hasil dan pembahasan.",
    intro:
      "Coba latihan pilihan ganda yang berjalan langsung di perangkat Anda. Semua pertanyaan dan penilaian pada halaman ini adalah contoh latihan, bukan soal resmi atau prediksi hasil seleksi.",
    sections: [
      {
        heading: "Cara menggunakan latihan",
        paragraphs: [
          "Pilih jenis latihan, mulai sesi, lalu jawab soal satu per satu. Gunakan daftar nomor untuk berpindah, dan tandai soal yang ingin diperiksa kembali.",
          "Waktu, jumlah soal, dan penilaian demo dapat diubah pada konfigurasi latihan. Pada sesi ini, nilai dihitung satu poin untuk setiap jawaban benar, tanpa ambang lulus.",
        ],
        bullets: [
          "Tidak perlu masuk akun.",
          "Jawaban sementara disimpan di browser perangkat ini.",
          "Hasil dan pembahasan hanya untuk evaluasi belajar.",
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
    metaTitle: "Tryout CPNS Gratis dengan Pembahasan Demo | Daftar CPNS",
    description:
      "Ikuti tryout CPNS gratis dalam format latihan demo, lihat nilai per kategori, dan telaah penjelasan setiap jawaban.",
    intro:
      "Tryout demo membantu Anda membiasakan diri membaca soal pilihan ganda, mengatur waktu, dan meninjau alasan di balik jawaban.",
    sections: [
      {
        heading: "Apa yang tersedia",
        paragraphs: [
          "Sesi demo memuat contoh soal orisinal, penghitung waktu, penanda ragu, navigasi nomor, hasil per kategori, dan pembahasan.",
          "Skor demo bukan nilai resmi, bukan passing grade, dan tidak menjamin hasil seleksi.",
        ],
      },
      {
        heading: "Mulai latihan",
        paragraphs: [
          "Pilih SKD CPNS pada halaman simulasi untuk memulai sesi. Progres sementara disimpan di perangkat dan dapat dipulihkan setelah halaman dimuat ulang.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "latihan-soal-cpns": {
    title: "Latihan Soal CPNS Online",
    metaTitle: "Latihan Soal CPNS Online dan Pembahasan | Daftar CPNS",
    description:
      "Latihan soal CPNS online dengan contoh orisinal, pembahasan, serta kategori TWK, TIU, dan TKP.",
    intro:
      "Gunakan latihan untuk membangun kebiasaan memahami soal dan mengevaluasi alasan jawaban. Materi pada situs ini merupakan contoh belajar mandiri, bukan soal resmi.",
    sections: [
      {
        heading: "Pilih kategori latihan",
        paragraphs: [
          "Latihan demo SKD menggabungkan contoh TWK, TIU, dan TKP. Anda juga dapat membuka pengenalan masing-masing kategori.",
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
          "Perhatikan pembahasan dan kategori yang perlu diulang. Nilai latihan tidak dipakai untuk menyimpulkan kelulusan.",
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
    metaTitle: "Panduan Belajar dan Simulasi PPPK | Daftar CPNS",
    description:
      "Pengenalan latihan PPPK demo dengan contoh manajerial, sosial kultural, dan teknis. Periksa persyaratan pada pengumuman resmi.",
    intro:
      "Halaman ini mengarahkan Anda ke latihan PPPK demo dan sumber pengumuman pemerintah. Ketentuan seleksi, jabatan, dan materi mengikuti pengumuman resmi yang berlaku.",
    sections: [
      {
        heading: "Latihan demo PPPK",
        paragraphs: [
          "Sesi latihan memuat contoh orisinal kategori manajerial, sosial kultural, dan teknis. Kategori pada latihan ini hanya untuk demonstrasi belajar, bukan kisi-kisi resmi.",
          "Nilai dihitung dari jawaban yang benar menurut kunci contoh. Jangan membandingkannya dengan ambang nilai seleksi.",
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
      "Belum ada jadwal seleksi yang terverifikasi pada halaman ini. Jangan menjadikan tanggal dari pesan berantai atau perkiraan sebagai jadwal resmi.",
    sections: [
      {
        heading: "Cara memeriksa jadwal",
        paragraphs: [
          "Periksa pengumuman pada SSCASN, BKN, Kementerian PANRB, dan laman instansi terkait. Cocokkan tanggal, periode pendaftaran, serta perubahan jadwal dengan dokumen sumbernya.",
          "Halaman ini tidak mengambil atau memperkirakan tanggal secara otomatis. Perbarui informasi hanya setelah sumber primer diperiksa.",
        ],
      },
      {
        heading: "Waspadai tautan pendaftaran palsu",
        paragraphs: [
          "Layanan ini bukan portal pendaftaran. Untuk pendaftaran ASN resmi, buka SSCASN secara langsung dan periksa alamat situs sebelum memasukkan informasi apa pun.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "formasi-cpns": {
    title: "Informasi Formasi CPNS",
    metaTitle: "Informasi Formasi CPNS dan Sumber Resmi | Daftar CPNS",
    description:
      "Panduan mencari informasi formasi CPNS dengan memeriksa portal dan pengumuman resmi instansi, tanpa data formasi rekaan.",
    intro:
      "Belum ada daftar formasi terverifikasi yang diterbitkan di halaman ini. Formasi bergantung pada pengumuman resmi instansi dan periode seleksi.",
    sections: [
      {
        heading: "Periksa detail pada dokumen sumber",
        paragraphs: [
          "Cocokkan nama jabatan, kualifikasi, lokasi, dan ketentuan lain dengan pengumuman instansi serta informasi pada portal SSCASN.",
          "Jangan mengandalkan salinan yang tidak mencantumkan sumber atau tanggal dokumen. Situs ini tidak menebak formasi atau ketersediaannya.",
        ],
      },
      {
        heading: "Portal rujukan",
        paragraphs: [
          "Gunakan portal pemerintah yang tercantum berikut untuk mencari pengumuman terbaru.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "syarat-cpns": {
    title: "Persyaratan CPNS",
    metaTitle: "Cara Memeriksa Persyaratan CPNS Resmi | Daftar CPNS",
    description:
      "Periksa persyaratan CPNS berdasarkan pengumuman resmi instansi. Ketentuan dapat berbeda dan tidak ditetapkan oleh situs ini.",
    intro:
      "Persyaratan yang berlaku harus dibaca pada pengumuman resmi untuk formasi dan instansi yang dituju. Halaman ini tidak menetapkan atau menggantikan syarat resmi.",
    sections: [
      {
        heading: "Periksa persyaratan secara teliti",
        paragraphs: [
          "Baca dokumen pengumuman dari awal sampai akhir. Cocokkan setiap persyaratan dengan jabatan dan instansi yang dituju, serta pastikan tidak ada perubahan atau penjelasan tambahan.",
          "Jangan mengirim NIK, Kartu Keluarga, dokumen identitas, atau kata sandi SSCASN ke situs latihan ini.",
        ],
      },
      {
        heading: "Sumber resmi",
        paragraphs: [
          "Portal berikut membantu Anda menuju kanal pemerintah. Persyaratan final tetap merujuk pada pengumuman instansi yang relevan.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "cara-daftar-cpns": {
    title: "Cara Mendaftar CPNS",
    metaTitle: "Cara Mendaftar CPNS Melalui Portal Resmi | Daftar CPNS",
    description:
      "Panduan awal untuk menemukan informasi pendaftaran CPNS dan selalu mengikuti petunjuk resmi SSCASN serta instansi.",
    intro:
      "Pendaftaran ASN bukan dilakukan di Daftar CPNS. Buka portal resmi SSCASN dan ikuti petunjuk terbaru serta pengumuman instansi yang dituju.",
    sections: [
      {
        heading: "Langkah awal yang aman",
        paragraphs: [
          "Mulai dengan membaca pengumuman resmi, memastikan alamat situs pemerintah, dan mencocokkan persyaratan jabatan dengan dokumen sumber.",
          "Tahapan, dokumen, dan tenggat dapat berubah sesuai pengumuman. Karena itu, panduan ini tidak menyalin prosedur yang belum diverifikasi untuk periode tertentu.",
        ],
      },
      {
        heading: "Lindungi data akun",
        paragraphs: [
          "Jangan membagikan kata sandi akun, NIK, Kartu Keluarga, atau dokumen pribadi kepada pihak yang menawarkan simulasi. Situs ini tidak meminta data tersebut.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  "passing-grade-cpns": {
    title: "Passing Grade CPNS",
    metaTitle: "Informasi Passing Grade CPNS dan Aturan Resmi | Daftar CPNS",
    description:
      "Informasi mengenai cara memeriksa ketentuan nilai seleksi CPNS dari sumber resmi tanpa mengarang ambang batas.",
    intro:
      "Halaman ini tidak menetapkan angka ambang batas. Ketentuan nilai dan cara seleksi harus diperiksa pada peraturan serta pengumuman resmi untuk periode yang berlaku.",
    sections: [
      {
        heading: "Bedakan nilai latihan dan ketentuan seleksi",
        paragraphs: [
          "Angka pada simulasi demo hanyalah poin latihan yang dihitung dari jawaban benar. Nilai tersebut bukan passing grade dan tidak dapat dipakai untuk memprediksi kelulusan.",
          "Sebelum memakai informasi angka seleksi, periksa dokumen resmi pemerintah dan cocokkan konteks, periode, serta jenis seleksinya.",
        ],
      },
      {
        heading: "Sumber yang perlu diperiksa",
        paragraphs: ["Rujuk kanal BKN, Kementerian PANRB, dan pengumuman resmi instansi terkait."],
      },
    ],
    sourceLinks: officialSources,
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
        heading: "Jelajahi pusat belajar",
        paragraphs: [
          "Buka latihan soal, soal TWK, TIU, TKP, PPPK, atau sekolah kedinasan melalui tautan terkait di halaman ini.",
        ],
      },
    ],
    sourceLinks: officialSources,
  },
  artikel: {
    title: "Artikel Persiapan ASN",
    metaTitle: "Artikel dan Catatan Belajar ASN | Daftar CPNS",
    description:
      "Kumpulan catatan belajar CPNS, PPPK, dan sekolah kedinasan. Pengumuman seleksi hanya dirujuk dari sumber resmi.",
    intro:
      "Pusat artikel berisi panduan evergreen untuk membantu pembaca mencari sumber resmi dan menggunakan latihan demo dengan tepat.",
    sections: [
      {
        heading: "Catatan belajar yang tersedia",
        paragraphs: [
          "Panduan di situs ini berfokus pada kebiasaan belajar, penjelasan soal contoh, dan cara memeriksa sumber pengumuman. Tanggal seleksi, formasi, serta ambang nilai tidak diperkirakan atau dibuat-buat.",
        ],
        bullets: [
          "Panduan persiapan belajar.",
          "Contoh soal dan pembahasan.",
          "Tautan ke portal resmi.",
        ],
      },
      {
        heading: "Pembaruan informasi",
        paragraphs: [
          "Informasi seleksi berubah mengikuti pengumuman pemerintah. Jika perubahan belum diverifikasi dari sumber primer, halaman terkait akan menyatakan bahwa datanya belum terverifikasi.",
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
    title: "Ringkasan Latihan",
    metaTitle: "Ringkasan Latihan Demo | Daftar CPNS",
    description:
      "Ringkasan privat dari hasil latihan demo terakhir yang hanya tersimpan pada browser perangkat ini.",
    intro:
      "Ringkasan hanya menampilkan hasil latihan yang tersimpan di browser ini. Akun, sinkronisasi lintas perangkat, dan riwayat berbasis server belum tersedia.",
    sections: [
      {
        heading: "Data lokal perangkat",
        paragraphs: [
          "Jika sesi demo pernah diselesaikan pada browser ini, ringkasannya dapat dibuka di bawah. Jika tidak ada, mulailah latihan dari halaman simulasi.",
        ],
      },
      {
        heading: "Privasi latihan",
        paragraphs: [
          "Halaman ini tidak meminta identitas atau data pendaftaran. Hasil demo tidak dikirim ke server.",
        ],
      },
    ],
    noIndex: true,
  },
};
