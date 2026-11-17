export const TIP_TOPICS = ["Semua", "TWK", "TIU", "TKP", "Dokumen", "Strategi ujian"] as const;
export type TipTopic = Exclude<(typeof TIP_TOPICS)[number], "Semua">;
export type DirectoryTip = {
  id: string;
  topic: TipTopic;
  title: string;
  action: string;
  example: string;
  href: string;
  cta: string;
};
type TipDraft = [title: string, action: string, example: string];

const tiu: TipDraft[] = [
  [
    "Cari selisih sebelum menebak pola",
    "Tulis selisih antarangka. Jika berubah, periksa selisih berikutnya dan bandingkan dengan pola perkalian atau selang-seling. Pastikan dugaan cocok pada seluruh suku yang tersedia.",
    "3, 6, 11, 18 memiliki selisih 3, 5, 7. Jika pola selisih ganjil berlanjut, suku berikutnya 27.",
  ],
  [
    "Bedakan semua dengan sebagian",
    "Ubah premis menjadi hubungan kelompok. Ambil kesimpulan hanya dari informasi yang diberikan; hubungan yang terasa masuk akal belum tentu dijamin premis.",
    "Semua A adalah B. Sebagian B adalah C. Belum tentu ada A yang termasuk C.",
  ],
  [
    "Tetapkan penyebut sebelum menghitung persentase",
    "Lingkari kelompok acuan persentase. Frasa dari kelompok tersebut berarti hitungan memakai kelompok terakhir yang disebut, bukan otomatis seluruh populasi.",
    "Dari 200 berkas, 50 perlu revisi. Jika 20% dari 50 memerlukan dua revisi, jumlahnya 10 berkas, bukan 40.",
  ],
  [
    "Ubah rata-rata menjadi jumlah total",
    "Kalikan rata-rata dengan banyak data sebelum menggabungkan atau mencari nilai yang hilang. Jangan memberi bobot sama kepada kelompok dengan jumlah anggota berbeda.",
    "Dua berkas rata-rata 10 menit dan tiga berkas rata-rata 20 menit menghasilkan rata-rata gabungan 80/5 = 16 menit.",
  ],
  [
    "Periksa arah perbandingan",
    "Tentukan apakah besaran bergerak searah atau berlawanan. Tambahan petugas dapat mengurangi waktu hanya jika beban dan produktivitas yang diasumsikan tetap.",
    "Pekerjaan 24 jam-orang selesai dalam 6 jam oleh 4 petugas yang produktivitasnya sama.",
  ],
  [
    "Samakan satuan sebelum menjumlah",
    "Ubah jam, menit, jarak, atau volume ke satuan yang sama. Tulis satuan pada hasil antara agar angka yang tampak cocok tidak menutupi kesalahan konversi.",
    "1,5 jam ditambah 45 menit adalah 90 + 45 = 135 menit, bukan 1,95 jam.",
  ],
  [
    "Pakai dasar yang sama saat membandingkan pecahan",
    "Gunakan penyebut bersama atau perkalian silang untuk menentukan pecahan lebih besar. Cara ini menghindari pembulatan desimal terlalu awal.",
    "Bandingkan 5/8 dengan 3/5: 5 × 5 = 25 dan 3 × 8 = 24, sehingga 5/8 lebih besar.",
  ],
  [
    "Hitung perubahan bertahap secara berurutan",
    "Kenaikan dan penurunan persentase biasanya memakai dasar yang berubah. Terapkan perubahan kedua pada hasil perubahan pertama, bukan pada nilai awal.",
    "Nilai 100 naik 20% menjadi 120. Turun 20% sesudahnya menghasilkan 96.",
  ],
  [
    "Pisahkan pola pada posisi ganjil dan genap",
    "Jika selisih deret tidak konsisten, periksa dua deret yang saling berselang. Uji masing-masing pola sampai suku terakhir sebelum memilih kelanjutannya.",
    "2, 10, 4, 20, 6, 30 terdiri dari deret 2, 4, 6 dan 10, 20, 30.",
  ],
  [
    "Buat tabel untuk soal urutan",
    "Catat hubungan sebelum, sesudah, dan tidak bersebelahan dalam tabel atau garis posisi. Tempatkan syarat yang paling membatasi terlebih dahulu.",
    "A sebelum B dan B sebelum C menjamin A sebelum C, tetapi belum menentukan posisi D.",
  ],
  [
    "Jangan membalik hubungan jika-maka",
    "Bedakan implikasi dari kebalikannya. Pernyataan jika A maka B tidak otomatis memberi kesimpulan jika B maka A.",
    "Jika hujan, jalan basah. Jalan basah saja tidak membuktikan hujan karena mungkin ada penyebab lain.",
  ],
  [
    "Gunakan kontraposisi dengan tepat",
    "Pada implikasi jika A maka B, pernyataan yang setara adalah jika bukan B maka bukan A. Jangan tertukar dengan menyangkal A lalu menyangkal B.",
    "Jika berkas lengkap maka lolos pemeriksaan awal. Tidak lolos berarti berkas tidak lengkap, selama premis berlaku sebagai aturan kasus.",
  ],
  [
    "Kurangi irisan yang terhitung dua kali",
    "Saat menghitung anggota dua kelompok, jumlahkan keduanya lalu kurangi anggota irisan sekali. Bedakan anggota gabungan dari anggota yang tidak mengikuti keduanya.",
    "20 peserta A, 15 peserta B, dan 5 mengikuti keduanya: gabungannya 20 + 15 − 5 = 30.",
  ],
  [
    "Jumlahkan laju kerja, bukan lama pengerjaan",
    "Ubah durasi kerja menjadi bagian pekerjaan per satuan waktu sebelum menggabungkan kemampuan dua pihak. Periksa asumsi mereka bekerja bersama secara independen.",
    "A selesai dalam 6 jam dan B 3 jam. Laju gabungan 1/6 + 1/3 = 1/2 pekerjaan per jam, sehingga selesai 2 jam.",
  ],
  [
    "Bedakan rata-rata kecepatan dan rata-rata angka",
    "Hitung total jarak dibagi total waktu. Rata-rata sederhana dua kecepatan hanya cocok pada kondisi durasi yang sesuai.",
    "Pergi 60 km pada 60 km/jam dan pulang 60 km pada 30 km/jam: total 120 km dalam 3 jam, rata-rata 40 km/jam.",
  ],
  [
    "Tuliskan hubungan analogi dengan satu kalimat",
    "Nyatakan hubungan pasangan awal secara spesifik, lalu uji arah yang sama pada setiap opsi. Hindari memilih hanya karena kata-katanya berasal dari tema serupa.",
    "Termometer mengukur suhu. Pasangan pengganti perlu mempertahankan hubungan alat dengan besaran yang diukur.",
  ],
  [
    "Cari bukti dalam bacaan",
    "Untuk pertanyaan pemahaman, tandai kalimat yang mendukung jawaban. Pisahkan informasi eksplisit, kesimpulan yang didukung, dan pendapat yang tidak ada dalam teks.",
    "Teks menyebut sebagian layanan beralih daring. Opsi semua layanan berhenti tatap muka melampaui informasi tersebut.",
  ],
  [
    "Selesaikan soal umur dengan satu titik waktu",
    "Nyatakan umur sekarang sebagai variabel. Tambahkan atau kurangi waktu pada setiap orang secara konsisten sebelum membentuk persamaan.",
    "Umur A sekarang x dan B x + 4. Tiga tahun lagi menjadi x + 3 dan x + 7; selisihnya tetap 4.",
  ],
  [
    "Lakukan perkiraan sebelum hitungan rinci",
    "Perkirakan rentang jawaban untuk mendeteksi salah koma, salah satuan, atau salah operasi. Gunakan perkiraan untuk memeriksa, bukan menggantikan ketelitian jika opsi berdekatan.",
    "19% dari 510 mendekati 20% dari 500, yaitu 100. Hasil 9,69 perlu diperiksa kembali.",
  ],
  [
    "Periksa jawaban lewat substitusi",
    "Masukkan hasil ke hubungan awal, terutama pada soal persamaan dan pembagian. Jawaban yang ada di opsi belum tentu memenuhi semua syarat.",
    "Jika 3x + 5 = 26 dan x = 7, substitusi menghasilkan 21 + 5 = 26.",
  ],
];

const twk: TipDraft[] = [
  [
    "Hubungkan nilai dengan tindakan",
    "Kenali nilai yang diuji, lalu periksa tindakan konkret dan akibatnya. Catat alasan pemilihan agar Anda dapat menerapkan prinsip pada kasus lain.",
    "Mengakui kesalahan laporan dan memperbaikinya memperlihatkan kejujuran serta tanggung jawab, bukan sekadar pernyataan bersedia jujur.",
  ],
  [
    "Bedakan persatuan dengan penyeragaman",
    "Cari pilihan yang memungkinkan kerja sama tanpa menghapus perbedaan yang tidak menghalangi tujuan bersama. Perhatikan apakah partisipasi dilakukan tanpa paksaan.",
    "Kegiatan warga dapat memakai jadwal yang disepakati sambil memberi ruang kebiasaan budaya masing-masing.",
  ],
  [
    "Nilai akses, bukan hanya aturan yang identik",
    "Periksa apakah aturan yang sama menciptakan hambatan berbeda bagi warga. Alternatif akses dapat tetap memakai standar kelayakan yang sama.",
    "Pendaftaran berbantuan membantu warga tanpa perangkat, sementara syarat penerimanya tetap diperiksa dengan ukuran yang sama.",
  ],
  [
    "Lihat kelompok yang belum terwakili",
    "Saat menilai musyawarah atau survei, tanyakan siapa yang tidak sempat memberi pendapat. Kesimpulan dapat berat sebelah jika pihak yang terdampak justru tidak dijangkau.",
    "Survei melalui aplikasi saja belum mewakili warga yang tidak bisa menggunakan aplikasi tersebut.",
  ],
  [
    "Pisahkan kritik kebijakan dari serangan pribadi",
    "Uji bukti dan alasan kritik tanpa langsung menilai identitas pengkritik. Bahasa yang tidak pantas dapat ditanggapi terpisah dari masalah layanan yang perlu diperbaiki.",
    "Keluhan antrean disertai ucapan kasar tetap dapat memuat bukti keterlambatan yang perlu diperiksa.",
  ],
  [
    "Utamakan verifikasi sebelum menyebarkan kabar",
    "Periksa sumber, waktu, dan konteks informasi sebelum menanggapinya. Jangan memakai jumlah pembagi sebagai pengganti bukti.",
    "Cuplikan video rapat dapat kehilangan konteks. Cari rekaman lengkap atau klarifikasi sebelum menyimpulkan isi ucapan.",
  ],
  [
    "Timbang dampak pada kelompok rentan",
    "Bandingkan manfaat umum dengan beban yang ditanggung pihak yang paling sulit mencari alternatif. Banyaknya penerima manfaat bukan satu-satunya ukuran prioritas.",
    "Perbaikan satu-satunya jembatan ke sekolah memiliki pertimbangan akses berbeda dari penambahan jalur alternatif pasar.",
  ],
  [
    "Kenali konflik kepentingan",
    "Perhatikan hubungan pribadi atau usaha yang dapat memengaruhi keputusan. Pengungkapan dan penilaian independen lebih kuat daripada sekadar meminta semua pihak percaya.",
    "Anggota panitia yang keluarganya menjadi peserta dapat mengungkap hubungan itu dan tidak ikut memutuskan penilaian terkait.",
  ],
  [
    "Bedakan keterbukaan dan pembukaan data pribadi",
    "Cari cara menjelaskan dasar keputusan dengan informasi yang relevan. Akuntabilitas tidak selalu memerlukan publikasi identitas atau seluruh dokumen pribadi.",
    "Panitia dapat membuka kriteria dan ringkasan penilaian tanpa menampilkan nomor identitas penerima.",
  ],
  [
    "Uji alasan pengecualian",
    "Tanyakan apakah perbedaan perlakuan didasarkan pada kebutuhan yang relevan atau kedekatan pribadi. Periksa konsistensi penerapannya pada pihak lain dengan kondisi sama.",
    "Prioritas akses karena kebutuhan khusus berbeda dasar dari mendahulukan kenalan petugas.",
  ],
  [
    "Pahami musyawarah sebagai proses pertukaran alasan",
    "Periksa apakah peserta mendapat kesempatan memahami masalah dan menyampaikan pertimbangan. Keputusan cepat belum tentu lahir dari proses yang terbuka.",
    "Peserta membahas manfaat, risiko, dan keberatan sebelum memilih usulan yang dapat dilaksanakan bersama.",
  ],
  [
    "Izinkan peninjauan saat muncul bukti baru",
    "Keputusan bersama tetap dapat dievaluasi lewat prosedur yang dapat dipertanggungjawabkan. Bedakan perubahan berbasis bukti dari perubahan karena tekanan pribadi.",
    "Data longsor yang baru ditemukan dapat menjadi alasan membahas ulang lokasi proyek melalui forum terkait.",
  ],
  [
    "Lihat keterkaitan antardaerah",
    "Dalam kasus wilayah, petakan manfaat dan beban yang melewati batas administratif. Cari pembagian tanggung jawab yang sesuai hubungan tersebut.",
    "Konservasi di hulu memberi manfaat air di hilir, sehingga pembiayaannya dapat dibahas bersama berdasarkan data.",
  ],
  [
    "Jangan menilai loyalitas dari satu pilihan praktis",
    "Periksa kendala layanan atau kondisi hidup sebelum menyimpulkan sikap seseorang terhadap negara. Pilihan karena keterbatasan akses tidak otomatis menunjukkan penolakan nilai kebangsaan.",
    "Warga mencari layanan terdekat karena fasilitas domestik sulit dijangkau; masalah akses perlu ditelaah lebih dahulu.",
  ],
  [
    "Cari kontribusi bela negara yang sesuai konteks",
    "Baca ancaman atau kebutuhan yang dinyatakan dalam kasus. Pilih kontribusi yang berguna, aman, dan sesuai kapasitas tokoh.",
    "Dalam situasi bencana rekaan, melaporkan jalur terhalang dengan lokasi jelas membantu koordinasi evakuasi.",
  ],
  [
    "Tolak alasan afiliasi yang tidak relevan",
    "Bedakan kriteria program dari keanggotaan kelompok atau kedekatan dengan pengurus. Kemudahan pengawasan perlu diperbaiki tanpa menutup akses pihak yang memenuhi syarat.",
    "Warga yang layak menerima bantuan tidak semestinya harus mengikuti organisasi pengurus hanya agar mudah didata.",
  ],
  [
    "Periksa distribusi di balik rata-rata",
    "Kenaikan angka agregat belum membuktikan semua kelompok memperoleh manfaat. Cari informasi pihak yang tertinggal atau justru menanggung kerugian.",
    "Rata-rata pendapatan desa meningkat, tetapi keluarga kehilangan lahan kerja. Evaluasi perlu melihat kedua informasi itu.",
  ],
  [
    "Gunakan bahasa bersama untuk keputusan bersama",
    "Nilai apakah peserta memahami pembahasan dan hasil rapat. Bahasa pengantar bersama dapat membantu tanpa melarang seluruh penggunaan bahasa daerah di luar kebutuhan tersebut.",
    "Ringkasan keputusan tersedia dalam bahasa Indonesia, sementara percakapan informal tetap menghormati bahasa peserta.",
  ],
  [
    "Bedakan pelestarian budaya dan pemaksaan praktik",
    "Cari alternatif pengenalan budaya yang menjaga kesempatan belajar sekaligus menghormati partisipasi. Perhatikan apakah tujuan bisa dicapai tanpa kewajiban yang tidak diperlukan.",
    "Sejarah dan pertunjukan sukarela dapat mengenalkan tradisi tanpa mewajibkan setiap peserta menjalankan ritual.",
  ],
  [
    "Tulis satu alasan penolak opsi terdekat",
    "Setelah memilih jawaban, jelaskan mengapa pilihan lain yang terdengar baik masih kurang tepat. Gunakan fakta kasus, bukan slogan umum.",
    "Membagi dana sama rata tampak adil, tetapi dapat tidak efektif bila tidak ada proyek yang dapat diselesaikan.",
  ],
];

const tkp: TipDraft[] = [
  [
    "Baca peran dan batas kewenangan",
    "Kenali masalah, pihak yang terdampak, dan tindakan yang dapat dilakukan tokoh. Pilih respons yang membantu tanpa mengambil keputusan di luar kewenangannya.",
    "Petugas dapat menjelaskan kekurangan berkas dan jalur tindak lanjut tanpa menjanjikan kelulusan pemeriksaan.",
  ],
  [
    "Klarifikasi kebutuhan sebelum menawarkan solusi",
    "Periksa apa yang sebenarnya dibutuhkan warga atau rekan. Solusi yang cepat disampaikan bisa tidak berguna jika didasarkan pada asumsi yang salah.",
    "Warga meminta penjelasan alur, bukan mempercepat antrean. Bantuan yang relevan adalah memperjelas langkah berikutnya.",
  ],
  [
    "Jangan menjanjikan waktu yang belum pasti",
    "Bandingkan janji dengan data dan kapasitas yang diketahui. Respons profesional menyebut status sebenarnya dan kapan pembaruan akan diberikan.",
    "Saat aplikasi bermasalah, sampaikan proses penanganan dan waktu pembaruan informasi, bukan memastikan pulih dalam lima menit tanpa dasar.",
  ],
  [
    "Gabungkan upaya awal dan eskalasi",
    "Hindari dua ekstrem: menyerahkan semua masalah kepada atasan atau menyelesaikan semuanya sendiri di luar kewenangan. Cari tindakan awal yang aman dan jalur koordinasi yang tepat.",
    "Catat gangguan, jalankan alternatif yang diizinkan, lalu laporkan bagian yang membutuhkan keputusan penanggung jawab.",
  ],
  [
    "Prioritaskan dampak dan tenggat",
    "Susun urutan kerja dari akibat keterlambatan, batas waktu, dan ketergantungan tugas. Senioritas pemberi tugas saja bukan ukuran urgensi.",
    "Koreksi data yang harus dikirim dua jam lagi dapat lebih mendesak daripada merapikan bahan rapat minggu depan.",
  ],
  [
    "Periksa bukti sebelum menyalahkan",
    "Bedakan temuan, dugaan, dan pihak yang bertanggung jawab. Penelusuran proses lebih membantu daripada tuduhan sebelum status kasus jelas.",
    "Berkas belum ditemukan. Periksa catatan penerimaan dan perpindahan berkas sebelum menyatakan rekan menghilangkannya.",
  ],
  [
    "Pertahankan kontrol saat mengejar target",
    "Periksa apakah opsi mempercepat pekerjaan dengan melewati verifikasi penting. Cari penataan prioritas atau bantuan kapasitas yang menjaga fungsi pengendalian.",
    "Pembayaran ganda dicegah melalui pemeriksaan. Mengisi bukti pemeriksaan belakangan tidak menggantikan verifikasi yang sebenarnya.",
  ],
  [
    "Lindungi data saat berkoordinasi",
    "Cari respons yang membagikan informasi secukupnya kepada pihak berwenang. Kecepatan koordinasi tidak membenarkan penyebaran berkas pribadi ke kanal sembarang.",
    "Gunakan ringkasan masalah tanpa identitas warga ketika penerima tidak membutuhkan rincian identitas untuk membantu.",
  ],
  [
    "Tindak lanjuti kesalahan setelah laporan terkirim",
    "Nilai apakah koreksi menjelaskan bagian yang berubah dan dampaknya pada keputusan. Mengganti file diam-diam dapat membuat penerima tetap memakai versi lama.",
    "Kirim versi koreksi dengan penjelasan kesimpulan yang terpengaruh dan minta penerima merujuk versi terbaru.",
  ],
  [
    "Ukur keberhasilan sampai layanan selesai",
    "Jangan berhenti pada indikator yang membaik di satu tahap. Periksa apakah pengguna berhasil menuntaskan kebutuhan dan apakah hambatan berpindah ke tempat lain.",
    "Antrean lebih pendek belum tentu berhasil jika banyak warga gagal menyelesaikan formulir sebelum masuk loket.",
  ],
  [
    "Uji perubahan dalam lingkup terkendali",
    "Jika manfaat metode baru belum terbukti, cari opsi uji terbatas dengan ukuran mutu, waktu, dan batas penghentian. Bandingkan hasilnya dengan kondisi awal.",
    "Uji alur baru pada beberapa berkas sederhana dan rumit sebelum mengganti seluruh proses.",
  ],
  [
    "Bimbing rekan berdasarkan pola kesalahan",
    "Pilih dukungan yang membantu rekan memahami tugas sambil menjaga mutu keluaran. Pengambilalihan terus-menerus dapat menunda pembelajaran.",
    "Tunjukkan contoh yang benar, minta rekan mencoba, lalu periksa bagian yang paling berisiko salah.",
  ],
  [
    "Periksa pemahaman lawan bicara",
    "Menjelaskan berulang tidak sama dengan memastikan pemahaman. Gunakan bahasa sederhana dan minta orang tersebut menyebutkan kembali langkah yang akan dilakukan.",
    "Setelah menjelaskan dokumen pengganti, tanyakan berkas apa yang akan disiapkan warga pada kunjungan berikutnya.",
  ],
  [
    "Tanggapi kritik dengan memilah isinya",
    "Akui bagian kritik yang benar dan klarifikasi bagian yang memakai informasi lama. Sikap terbuka tidak berarti menerima seluruh tuduhan tanpa pemeriksaan.",
    "Anda menerima koreksi hitungan, tetapi menunjukkan sumber versi terbaru untuk angka yang dipersoalkan secara keliru.",
  ],
  [
    "Jaga akses saat sistem berubah",
    "Periksa apakah inovasi menutup layanan bagi pengguna tertentu. Solusi yang kuat menyediakan alternatif yang dapat digunakan sambil memperbaiki hambatan.",
    "Kanal lama tetap tersedia saat formulir baru belum dapat dikirim oleh pengguna pembaca layar.",
  ],
  [
    "Pisahkan kerja sama dan perlakuan istimewa",
    "Tawaran bantuan dari tokoh atau mitra tidak otomatis menjadi dasar pengecualian layanan. Nilai apakah opsi menjaga standar yang berlaku untuk pihak lain.",
    "Tawaran membantu sosialisasi kantor dibahas terpisah dari permintaan untuk melewati antrean tanpa dasar prioritas.",
  ],
  [
    "Kerjakan bagian yang tidak bergantung pada bahan lain",
    "Ketika unit lain terlambat, identifikasi pekerjaan mandiri yang masih dapat dilakukan. Komunikasikan status ketergantungan tanpa mengarang data pengganti.",
    "Anda menyiapkan struktur analisis dan memeriksa sumber yang sudah tersedia sambil meminta kepastian bahan yang tertunda.",
  ],
  [
    "Rekonsiliasi catatan setelah gangguan",
    "Pulihnya aplikasi belum menyelesaikan perbedaan data selama proses manual. Cocokkan identitas dan status sebelum melanjutkan layanan.",
    "Nama yang muncul pada daftar manual dan digital diperiksa agar satu permohonan tidak diproses dua kali.",
  ],
  [
    "Bedakan sikap sopan dan solusi yang lengkap",
    "Dua opsi dapat sama-sama santun tetapi berbeda mutu tindak lanjut. Cari langkah yang menjelaskan proses, penanggung jawab, dan cara memantau penyelesaian.",
    "Meminta maaf saja belum mengatasi berkas tertahan; warga juga membutuhkan informasi kekurangan dan tindakan berikutnya.",
  ],
  [
    "Evaluasi keputusan dari beberapa sisi",
    "Bandingkan integritas, layanan, kerja sama, serta risiko secara bersamaan. Jangan menganggap satu kata positif pada opsi otomatis membuatnya terbaik.",
    "Respons cepat tetap perlu dinilai apakah datanya benar, jalurnya berwenang, dan pihak terdampak mendapat informasi yang jelas.",
  ],
];

const documents: TipDraft[] = [
  [
    "Buat daftar berkas dari pengumuman instansi",
    "Catat nama dokumen, format, ukuran, dan ketentuan pengesahan dari pengumuman yang Anda ikuti. Jangan menyalin persyaratan instansi lain tanpa mencocokkannya.",
    "Buat kolom dokumen, syarat dari pengumuman, status pemeriksaan, dan catatan perbaikan.",
  ],
  [
    "Simpan sumber persyaratan beserta tanggalnya",
    "Catat alamat pengumuman dan tanggal Anda memeriksanya. Saat menemukan perubahan, bandingkan dokumen sumber sebelum mengubah checklist.",
    "Catatan persyaratan menyertakan tautan pengumuman, nama instansi, dan tanggal pemeriksaan terakhir.",
  ],
  [
    "Bedakan berkas asli dan versi unggahan",
    "Simpan hasil pindai sumber secara terpisah dari berkas yang diperkecil atau disesuaikan. Dengan begitu Anda dapat membuat ulang versi unggahan jika hasilnya tidak terbaca.",
    "Folder Asli menyimpan sumber; folder Siap unggah menyimpan hasil yang sudah diperiksa.",
  ],
  [
    "Gunakan nama berkas yang mudah dikenali",
    "Pilih nama konsisten berdasarkan jenis dokumen dan versinya. Hindari menambahkan data pribadi yang tidak diperlukan pada nama berkas.",
    "Ijazah-versi-final.pdf lebih mudah diperiksa daripada scan-baru-akhir-2.pdf.",
  ],
  [
    "Periksa seluruh halaman hasil pindai",
    "Buka setiap halaman, bukan hanya pratinjau awal. Pastikan tidak ada bagian terpotong, halaman terbalik, bayangan berat, atau teks yang kabur.",
    "Dokumen dua halaman perlu diperiksa halaman pertama dan kedua setelah disimpan menjadi PDF.",
  ],
  [
    "Uji keterbacaan setelah kompresi",
    "Periksa hasil kompresi pada ukuran tampilan normal dan saat diperbesar. Berkas yang lebih kecil belum tentu layak dipakai jika informasi penting tidak terbaca.",
    "Nomor dokumen dan tanggal masih dapat dibaca dengan jelas setelah ukuran berkas diperkecil.",
  ],
  [
    "Cocokkan format berkas, bukan hanya namanya",
    "Gunakan proses ekspor atau konversi yang sesuai. Mengganti ekstensi nama tidak otomatis mengubah jenis isi berkas.",
    "Mengganti nama foto.jpg menjadi foto.pdf tidak menghasilkan dokumen PDF yang valid.",
  ],
  [
    "Periksa ukuran tiap berkas secara terpisah",
    "Bandingkan ukuran aktual dengan batas pada kolom unggahan atau pengumuman terkait. Jangan menganggap semua dokumen memakai batas ukuran yang sama.",
    "Ukuran foto dan dokumen pendukung dicatat pada baris berbeda karena ketentuannya bisa berbeda.",
  ],
  [
    "Periksa urutan halaman dokumen gabungan",
    "Sebelum menggabungkan berkas, pastikan memang diminta sebagai satu dokumen. Sesudahnya cocokkan urutan dan jumlah halaman dengan kebutuhan.",
    "Jika diminta surat lalu lampiran, buka PDF gabungan untuk memastikan susunannya tidak tertukar.",
  ],
  [
    "Cocokkan identitas pada seluruh dokumen",
    "Periksa konsistensi penulisan data yang diminta. Jika menemukan perbedaan, cari petunjuk resmi atau kanal klarifikasi; jangan mengubah dokumen sumber sendiri.",
    "Perbedaan penulisan nama dicatat untuk ditanyakan melalui kanal yang tercantum dalam pengumuman.",
  ],
  [
    "Ikuti ketentuan tanda tangan yang spesifik",
    "Baca siapa yang harus menandatangani dan bentuk dokumen yang diminta. Jangan menyamakan contoh surat dari internet dengan ketentuan instansi tujuan.",
    "Sebelum memakai draf surat, cocokkan penandatangan, isi pernyataan, dan format dengan pengumuman yang diikuti.",
  ],
  [
    "Periksa kebutuhan meterai sebelum membubuhkan",
    "Pastikan dokumen dan bentuk pengesahan yang diminta melalui pengumuman serta petunjuk resmi. Hindari mengikuti saran umum yang tidak menyebut sumber dan konteks.",
    "Tandai dokumen yang memang diminta bermeterai pada checklist, bukan menambahkan meterai ke semua berkas.",
  ],
  [
    "Bedakan draf surat dan dokumen siap kirim",
    "Gunakan alat pembuat surat sebagai titik awal. Baca kembali setiap isian, hapus placeholder, dan cocokkan format akhir dengan petunjuk instansi.",
    "Tulisan Nama Instansi pada templat harus sudah diganti dan diverifikasi sebelum dokumen disahkan.",
  ],
  [
    "Periksa orientasi dan batas halaman",
    "Putar halaman agar mudah dibaca dan hindari pemotongan informasi di tepi. Periksa hasil akhir setelah perubahan, bukan hanya tampilan pada aplikasi penyunting.",
    "Foto dokumen yang miring diperbaiki orientasinya tanpa memotong bagian nomor atau tanda tangan.",
  ],
  [
    "Hindari menyebarkan berkas identitas ke kanal sembarang",
    "Gunakan sarana yang sesuai kebutuhan dan periksa cara pemrosesan berkas. Jangan menyerahkan dokumen pribadi kepada pihak yang tidak diperlukan hanya untuk meminta bantuan format.",
    "Untuk bertanya batas ukuran, kirim pertanyaan tentang persyaratannya tanpa melampirkan identitas lengkap.",
  ],
  [
    "Jangan membagikan kredensial untuk dibantu mendaftar",
    "Pisahkan bantuan membaca petunjuk dari akses akun. Jaga kata sandi dan kode verifikasi, serta gunakan kanal resmi saat memerlukan dukungan akun.",
    "Rekan dapat membantu memahami langkah tanpa menerima kata sandi atau kode verifikasi Anda.",
  ],
  [
    "Verifikasi alamat portal dari kanal resmi",
    "Buka portal melalui rujukan resmi yang dapat diperiksa. Waspadai halaman tiruan dan jangan menjadikan kemiripan logo sebagai satu-satunya bukti keaslian.",
    "Cocokkan domain tujuan dengan tautan pada pengumuman resmi sebelum memasukkan data akun.",
  ],
  [
    "Pratinjau berkas setelah diunggah",
    "Jika sistem menyediakan pratinjau, periksa dokumen yang benar-benar terpasang. Nama file yang tampak benar belum menjamin isinya sesuai.",
    "Kolom ijazah perlu menampilkan ijazah yang dimaksud, bukan berkas lain dengan nama serupa.",
  ],
  [
    "Baca ulang sebelum menyelesaikan pengiriman",
    "Cocokkan isian dan lampiran sebelum tindakan akhir. Jangan menganggap setiap sistem selalu menyediakan kesempatan mengubah data setelah pengiriman.",
    "Gunakan checklist terakhir untuk memeriksa pilihan instansi, data yang diminta, dan kecocokan lampiran.",
  ],
  [
    "Simpan bukti dan tindak lanjuti lewat kanal yang tepat",
    "Simpan konfirmasi yang memang disediakan sistem dan catat pertanyaan yang belum selesai. Untuk masalah administrasi, gunakan petunjuk atau kanal dukungan resmi yang relevan.",
    "Catatan kendala menyebut tahap, waktu kejadian, dan pesan galat tanpa menyertakan kata sandi.",
  ],
];

const strategy: TipDraft[] = [
  [
    "Ulangi alasan salah, bukan hanya soalnya",
    "Kelompokkan kesalahan setelah latihan dan pilih satu penyebab yang akan diperbaiki. Mengingat huruf jawaban tidak cukup untuk menghadapi kasus dengan susunan berbeda.",
    "Jika kata kecuali sering terlewat, tambahkan langkah membaca ulang pertanyaan sebelum memilih jawaban.",
  ],
  [
    "Mulai dari pemetaan kemampuan",
    "Kerjakan sampel soal untuk menentukan fokus awal, lalu periksa pembahasannya. Perlakukan hasil singkat sebagai petunjuk belajar, bukan kesimpulan kesiapan seleksi.",
    "Tiga kesalahan numerik menjadi alasan meninjau model hitungan, lalu mengujinya lagi pada soal lain.",
  ],
  [
    "Buat target sesi yang dapat diperiksa",
    "Nyatakan hasil belajar sebagai tindakan konkret dan terbatas. Target menyelesaikan topik beserta alasan jawaban lebih mudah dievaluasi daripada hanya belajar lebih rajin.",
    "Sesi ini: pahami rata-rata berbobot, kerjakan lima soal, lalu catat satu kesalahan.",
  ],
  [
    "Sesuaikan rencana dengan waktu yang tersedia",
    "Pilih alokasi yang dapat dijalankan dan bagi untuk konsep, latihan, serta tinjauan. Jika agenda sering tertunda, sesuaikan beban alih-alih menumpuk tugas tanpa batas.",
    "Waktu 30 menit dapat dibagi menjadi 10 menit konsep, 15 menit latihan, dan 5 menit tinjauan.",
  ],
  [
    "Bedakan latihan pemahaman dan latihan waktu",
    "Gunakan sesi tanpa batas waktu untuk mempelajari langkah. Setelah modelnya dipahami, lakukan sesi bertimer untuk memeriksa kelancaran dan pengaturan waktu.",
    "Soal dipelajari perlahan hari ini, lalu konsep yang sama diuji melalui soal baru dengan timer pada sesi berikutnya.",
  ],
  [
    "Baca kata pembatas pada pertanyaan",
    "Tandai kata seperti kecuali, paling tepat, hanya, dan tidak dapat disimpulkan. Kata tersebut menentukan apa yang sebenarnya diminta.",
    "Pertanyaan yang meminta pernyataan tidak didukung memerlukan pilihan berbeda dari pertanyaan yang meminta kesimpulan benar.",
  ],
  [
    "Buat aturan berpindah dari soal yang buntu",
    "Dalam latihan, sepakati kapan Anda akan menandai dan beralih. Uji aturan itu pada beberapa sesi agar waktu tidak habis pada satu soal.",
    "Setelah mencoba model dan belum menemukan kemajuan, tandai soal untuk ditinjau setelah soal yang lebih siap dikerjakan.",
  ],
  [
    "Gunakan penanda dengan alasan",
    "Bedakan ragu karena hitungan belum dicek, konsep belum jelas, atau dua opsi sulit dibedakan. Alasan ini membantu menentukan urutan peninjauan.",
    "Catatan ragu hitungan mengingatkan Anda memeriksa operasi, bukan membaca seluruh teori dari awal.",
  ],
  [
    "Catat ketepatan bersama waktu pengerjaan",
    "Bandingkan jawaban dan waktu, bukan kecepatan saja. Sesi lebih cepat dapat menurunkan mutu jika banyak langkah penting dilewati.",
    "Dua sesi sama-sama 8 dari 10 benar; waktu dapat dibandingkan sambil memeriksa apakah tingkat soal sebanding.",
  ],
  [
    "Gunakan catatan kesalahan sebagai agenda berikutnya",
    "Pilih beberapa kesalahan yang berulang dan tulis langkah koreksi. Buka kembali catatan itu sebelum memulai latihan berikutnya.",
    "Kesalahan persentase ditindaklanjuti dengan membiasakan menuliskan penyebut sebelum menghitung.",
  ],
  [
    "Uji pemahaman dengan soal yang belum dihafal",
    "Setelah mengulang soal lama, pindah ke soal baru dengan konsep serupa. Nilai yang membaik pada soal yang sama bisa dipengaruhi ingatan kunci.",
    "Setelah memahami soal laju kerja dua petugas, coba kasus perubahan jumlah petugas di tengah pekerjaan.",
  ],
  [
    "Coba menjelaskan tanpa melihat pembahasan",
    "Tutup penjelasan lalu uraikan model dan langkah dengan bahasa sendiri. Bagian yang tidak dapat dijelaskan menjadi sasaran belajar berikutnya.",
    "Anda menjelaskan mengapa rata-rata kelompok harus dibobot sebelum mengecek ulang penjelasan tertulis.",
  ],
  [
    "Jadwalkan tinjauan ulang",
    "Sediakan sesi untuk kembali ke topik lama, bukan hanya mengejar materi baru. Sesuaikan jarak tinjauan berdasarkan kesulitan yang masih muncul.",
    "Topik yang keliru hari ini dimasukkan ke sesi tinjauan berikutnya dengan soal yang berbeda.",
  ],
  [
    "Seimbangkan kategori saat memperdalam kelemahan",
    "Berikan waktu tambahan pada kategori lemah tanpa meninggalkan kategori lain terlalu lama. Periksa kembali prioritas setelah ada hasil latihan tambahan.",
    "Fokus TIU ditambah, sementara TWK dan TKP tetap mendapat giliran latihan dalam rencana mingguan.",
  ],
  [
    "Bandingkan hasil dari sesi yang sepadan",
    "Perhatikan jumlah soal, tingkat kesulitan, dan kondisi pengerjaan sebelum menyimpulkan kemajuan. Satu nilai lebih tinggi belum menjelaskan penyebab perubahannya.",
    "Latihan sepuluh soal dasar tidak langsung dibandingkan dengan paket panjang HOTS hanya dari persentase benar.",
  ],
  [
    "Kenali navigasi sebelum sesi panjang",
    "Coba memilih jawaban, berpindah nomor, menandai, dan membuka ringkasan pada latihan. Ikuti petunjuk sistem yang benar-benar dipakai.",
    "Pada simulasi, periksa apakah jawaban sebelumnya masih terpilih setelah berpindah ke nomor lain.",
  ],
  [
    "Periksa penyimpanan progres latihan",
    "Pahami tempat data latihan disimpan dan batasnya. Jangan menganggap progres browser otomatis tersedia di perangkat lain atau tetap ada setelah data browser dihapus.",
    "Unduh catatan belajar yang penting jika fitur menyediakan ekspor, lalu simpan salinannya sendiri.",
  ],
  [
    "Sisihkan waktu untuk pemeriksaan akhir",
    "Latih pengaturan waktu yang menyisakan kesempatan mengecek jawaban ragu dan pertanyaan terlewat. Sesuaikan pembagian dengan hasil latihan Anda.",
    "Pemeriksaan akhir dimulai dari soal yang modelnya sudah jelas tetapi hitungan akhirnya belum diverifikasi.",
  ],
  [
    "Evaluasi mingguan dari bukti aktivitas",
    "Lihat tugas yang selesai, jenis kesalahan, serta waktu sesi dalam satu periode. Gunakan temuan untuk mengubah agenda secara terarah.",
    "Jika agenda terlalu padat dan banyak tertunda, kurangi target harian sambil mempertahankan sesi tinjauan.",
  ],
  [
    "Pisahkan tips belajar dan ketentuan seleksi",
    "Gunakan strategi sebagai alat latihan. Untuk jadwal, dokumen, mekanisme, dan ketentuan ujian, selalu cocokkan dengan pengumuman resmi yang berlaku bagi pilihan Anda.",
    "Tips mengatur waktu boleh disesuaikan; persyaratan berkas tidak boleh diganti hanya karena saran latihan.",
  ],
];

const groups: [TipTopic, TipDraft[], string, string][] = [
  ["TWK", twk, "/soal-twk", "Latihan TWK"],
  ["TIU", tiu, "/soal-tiu", "Latihan TIU"],
  ["TKP", tkp, "/soal-tkp", "Latihan TKP"],
  ["Dokumen", documents, "/persiapan-dokumen", "Buka alat persiapan dokumen"],
  ["Strategi ujian", strategy, "/panduan", "Buka panduan belajar"],
];

const legacyIds: Record<string, string> = {
  "TWK:0": "twk",
  "TIU:0": "deret",
  "TIU:1": "silogisme",
  "TKP:0": "tkp",
  "Dokumen:0": "dokumen",
  "Strategi ujian:0": "evaluasi",
};
export const DIRECTORY_TIPS: DirectoryTip[] = groups.flatMap(([topic, drafts, href, cta]) =>
  drafts.map(([title, action, example], i) => ({
    id: legacyIds[`${topic}:${i}`] ?? `tips-${topic.toLowerCase().replaceAll(" ", "-")}-${i + 1}`,
    topic,
    title,
    action,
    example,
    href,
    cta,
  })),
);

export function filterDirectoryTips(topic: (typeof TIP_TOPICS)[number], query: string) {
  const words = query.trim().toLocaleLowerCase("id").split(/\s+/).filter(Boolean);
  return DIRECTORY_TIPS.filter(
    (tip) =>
      (topic === "Semua" || tip.topic === topic) &&
      words.every((word) =>
        `${tip.title} ${tip.action} ${tip.example} ${tip.topic}`
          .toLocaleLowerCase("id")
          .includes(word),
      ),
  );
}

export function dailyTipIndex(time = Date.now()): number {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(time);
  return Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000) % DIRECTORY_TIPS.length;
}
