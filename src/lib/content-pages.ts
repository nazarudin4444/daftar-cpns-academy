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
      "Halaman ini menjelaskan cara memeriksa jadwal, bukan menerbitkan tanggal yang belum dipastikan. Jadwal seleksi dapat berubah; cocokkan informasi dengan pengumuman resmi sebelum membuat rencana pendaftaran.",
    sections: [
      {
        heading: "Cara memeriksa jadwal",
        paragraphs: [
          "Periksa pengumuman pada SSCASN, BKN, Kementerian PANRB, dan laman instansi terkait. Cocokkan tanggal, periode pendaftaran, serta perubahan jadwal dengan dokumen sumbernya.",
          "Halaman ini tidak mengambil atau memperkirakan tanggal secara otomatis. Perbarui informasi hanya setelah sumber primer diperiksa.",
        ],
      },
      {
        heading: "Checklist saat membaca pengumuman",
        paragraphs: [
          "Pastikan dokumen berasal dari domain pemerintah atau instansi yang membuka seleksi. Periksa nama dokumen, instansi penerbit, tanggal pengumuman, periode yang dibahas, serta apakah ada ralat atau pengumuman lanjutan. Catat tanggal mulai dan akhir sesuai dokumen terbaru, bukan dari gambar ringkasan yang tidak memuat tautan sumber.",
          "Jika dua halaman menyebut tanggal berbeda, utamakan dokumen primer terbaru dari pihak yang berwenang dan periksa apakah salah satunya merupakan perubahan jadwal. Jangan mengirim identitas atau kata sandi ke situs yang menawarkan bantuan pendaftaran.",
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
        heading: "Bandingkan formasi dengan kualifikasi Anda",
        paragraphs: [
          "Buat daftar dari dokumen instansi: nama jabatan dan unit, kebutuhan lokasi, kualifikasi pendidikan yang tertulis, dokumen yang diminta, serta ketentuan tambahan yang berlaku untuk jabatan tersebut. Periksa catatan kaki dan lampiran karena keterangan penting bisa berada di bagian yang berbeda dari tabel formasi.",
          "Sebelum memilih, pastikan informasi berasal dari periode yang benar dan cocokkan nama serta kode jabatan di pengumuman instansi dengan data yang ditampilkan di portal SSCASN. Situs ini tidak menampilkan daftar lowongan hasil perkiraan.",
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
        heading: "Buat daftar cek dari pengumuman instansi",
        paragraphs: [
          "Pisahkan persyaratan umum yang tertulis, kualifikasi jabatan, dokumen pendukung, format berkas, dan ketentuan khusus bila tercantum. Tandai butir yang membutuhkan bukti agar Anda dapat memeriksanya sebelum mengisi portal resmi. Jangan menganggap persyaratan dari seleksi sebelumnya masih berlaku untuk periode berikutnya.",
          "Jika ada istilah atau ketentuan yang tidak jelas, cari penjelasan pada lampiran atau kanal tanya jawab resmi instansi. Jangan mengunggah dokumen identitas ke Daftar CPNS; latihan di situs ini tidak membutuhkan data pendaftaran.",
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
        heading: "Alur umum sebelum mengisi portal resmi",
        paragraphs: [
          "Baca pengumuman beserta lampirannya, tentukan jabatan yang sesuai, lalu periksa kembali kualifikasi dan daftar dokumen. Akses SSCASN dengan mengetik alamat portal secara langsung atau mengikuti tautan dari pengumuman pemerintah. Setelah masuk ke portal, ikuti urutan dan petunjuk yang sedang ditampilkan di sana; nama menu dan langkah rinci dapat berubah.",
          "Periksa ulang data dan berkas sebelum mengirim sesuai petunjuk portal. Simpan bukti atau nomor pendaftaran hanya pada perangkat pribadi Anda. Daftar CPNS tidak menerima berkas, tidak mengelola akun SSCASN, dan tidak dapat mengoreksi pendaftaran.",
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
        heading: "Cara mengecek angka dari sumber primer",
        paragraphs: [
          "Jika menemukan angka ambang batas di artikel atau unggahan, cari peraturan atau pengumuman pemerintah yang menjadi sumbernya. Cocokkan periode seleksi, jenis tes, kelompok atau jabatan yang disebut, dan tanggal dokumen. Pastikan tidak membaca nilai dari tahun atau jenis seleksi lain sebagai ketentuan saat ini.",
          "Nilai pada simulator ini dihitung untuk latihan berdasarkan kunci contoh. Ia tidak membuktikan seseorang memenuhi syarat, melewati ambang resmi, atau akan memperoleh peringkat tertentu.",
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
