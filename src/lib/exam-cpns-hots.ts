import type { Question, Subject } from "@/lib/exam";

const labels = ["A", "B", "C", "D", "E"] as const;
type Case = [
  prompt: string,
  best: string,
  alternatives: [string, string, string, string],
  explanation: string,
];

function question(subject: Subject, index: number, item: Case): Question {
  const [prompt, best, alternatives, explanation] = item;
  const answerIndex = index % labels.length;
  const texts: string[] = [...alternatives];
  texts.splice(answerIndex, 0, best);
  return {
    id: `cpns-hots-${subject.toLowerCase()}-${index + 1}`,
    subject,
    prompt,
    options: texts.map((text, i) => ({ label: labels[i]!, text })),
    answer: labels[answerIndex]!,
    explanation,
    tip:
      subject === "TIU"
        ? "Tuliskan hubungan antarbesaran dan periksa satuan sebelum membandingkan pilihan."
        : "Tentukan tujuan, pihak yang terdampak, dan batas kewenangan. Uji setiap pilihan terhadap semua kendala dalam kasus.",
    difficulty: "HOTS",
  };
}

const twk: Case[] = [
  [
    "Dalam kasus rekaan, dana hanya cukup untuk satu proyek. Jalan pasar menguntungkan lebih banyak warga, sedangkan jembatan desa menjadi satu-satunya akses sekolah dan sedang tidak aman. Prinsip keadilan sosial paling tepat diterapkan dengan ...",
    "Menilai kebutuhan mendesak, risiko keselamatan, dan alternatif akses sebelum menetapkan prioritas secara terbuka.",
    [
      "Memilih jalan pasar karena jumlah penerima manfaat selalu menentukan keadilan.",
      "Membagi dana sama rata meskipun kedua proyek tidak dapat diselesaikan.",
      "Menyerahkan pilihan kepada desa dengan kontribusi pajak terbesar.",
      "Mengundi kedua proyek agar setiap usulan memiliki peluang sama.",
    ],
    "Jumlah penerima manfaat perlu dibandingkan dengan urgensi dan kerentanan. Risiko putusnya satu-satunya akses sekolah memberi alasan substantif untuk prioritas; pemerataan nominal dan undian tidak menilai dampak tersebut.",
  ],
  [
    "Mayoritas peserta musyawarah menyetujui jadwal kegiatan yang berbenturan dengan ibadah kelompok kecil. Ada jadwal alternatif dengan biaya sama, tetapi memerlukan perubahan undangan. Penilaian yang paling tepat adalah ...",
    "Jadwal alternatif layak dipilih karena menjaga partisipasi tanpa menambah biaya utama kegiatan.",
    [
      "Keputusan mayoritas harus dipertahankan karena musyawarah selesai saat pemungutan suara berakhir.",
      "Kelompok kecil perlu membuat kegiatan tersendiri agar hasil suara tidak berubah.",
      "Seluruh kegiatan harus dibatalkan karena kesepakatan bulat tidak tercapai.",
      "Biaya mencetak ulang undangan selalu lebih penting daripada kesempatan berpartisipasi.",
    ],
    "Keputusan demokratis tetap perlu mempertimbangkan hak dan partisipasi kelompok kecil. Alternatif yang memungkinkan kegiatan bersama dengan dampak terbatas lebih proporsional daripada pemisahan atau pembatalan.",
  ],
  [
    "Panitia bantuan memakai syarat kepemilikan telepon pintar untuk pendaftaran. Evaluasi menemukan warga paling rentan justru banyak yang tidak memilikinya. Kebijakan yang paling konsisten dengan kesetaraan adalah ...",
    "Menyediakan pendaftaran berbantuan dengan pemeriksaan kelayakan yang sama.",
    [
      "Memberi kelonggaran kelayakan kepada seluruh pendaftar manual.",
      "Mempertahankan kanal tunggal agar setiap warga menghadapi aturan identik.",
      "Menghapus pemeriksaan kelayakan untuk mengejar pemerataan.",
      "Mengalihkan bantuan kepada pemilik perangkat agar penyaluran cepat.",
    ],
    "Kesetaraan akses tidak berarti menyeragamkan sarana ketika hambatan warga berbeda. Kanal berbantuan mengurangi hambatan perangkat sambil mempertahankan ukuran kelayakan yang sama.",
  ],
  [
    "Potongan video musyawarah tersebar seolah seorang tokoh menghina kelompok tertentu. Rekaman utuh belum diperiksa dan ketegangan mulai meningkat. Tindakan kewargaan yang paling dapat dipertanggungjawabkan adalah ...",
    "Memeriksa konteks rekaman, menahan penyebaran tuduhan, dan mendukung klarifikasi terbuka dengan menjaga keselamatan pihak terkait.",
    [
      "Menyebarkan potongan lain yang membela tokoh tersebut sebelum diverifikasi.",
      "Meminta semua kritik dihentikan permanen demi persatuan.",
      "Menganggap jumlah pembagi video sebagai bukti kebenaran.",
      "Mengadakan pemungutan suara daring untuk menentukan makna ucapan.",
    ],
    "Persatuan membutuhkan informasi yang dapat diuji, bukan pembelaan tanpa bukti atau pembungkaman kritik. Rekaman lengkap dan klarifikasi membantu menilai konteks sekaligus mengurangi eskalasi.",
  ],
  [
    "Daerah hulu menolak menanggung seluruh biaya konservasi, sedangkan daerah hilir membutuhkan air bersih. Kedua pihak memiliki data kebutuhan yang berbeda. Pendekatan yang paling mencerminkan kepentingan bersama adalah ...",
    "Memadankan data, menghitung manfaat dan beban tiap daerah, lalu menyepakati pembiayaan serta pengawasan bersama.",
    [
      "Meminta hulu menanggung semua biaya karena sumber air berada di wilayahnya.",
      "Membagi biaya berdasarkan luas wilayah tanpa memeriksa manfaat.",
      "Memberi hilir kewenangan menentukan seluruh penggunaan lahan hulu.",
      "Menghentikan kerja sama sampai salah satu pihak mengalah.",
    ],
    "Keterkaitan antardaerah membuat manfaat dan beban tidak berhenti pada batas administratif. Data bersama dan pembagian tanggung jawab memberi dasar kerja sama yang lebih adil dan dapat dievaluasi.",
  ],
  [
    "Dalam rapat kebijakan, anggota yang mempunyai usaha calon penerima program menyampaikan data yang tampak menguntungkan usahanya. Data itu mungkin benar. Langkah yang paling menjaga integritas keputusan adalah ...",
    "Mengungkap konflik kepentingan, meminta penilaian data secara independen, dan membatasi keterlibatan anggota pada keputusan terkait.",
    [
      "Menolak seluruh data karena berasal dari pelaku usaha.",
      "Menerima usulan selama anggota tersebut tidak meminta imbalan.",
      "Mengizinkan anggota memutuskan karena paling memahami bidang usahanya.",
      "Menyembunyikan hubungan usaha agar rapat tidak terpengaruh prasangka.",
    ],
    "Konflik kepentingan tidak otomatis membuktikan datanya salah, tetapi memerlukan pengungkapan dan pengendalian. Penelaahan independen menjaga mutu bukti sekaligus kepercayaan pada proses.",
  ],
  [
    "Sebuah survei kebijakan hanya menjangkau pelanggan daring. Hasilnya dipakai untuk menutup loket fisik, padahal sebagian warga tidak memiliki akses internet. Kelemahan utama alasan kebijakan itu adalah ...",
    "Kelompok yang paling terdampak penutupan tidak terwakili dalam pengumpulan pendapat.",
    [
      "Survei daring tidak pernah dapat memberi informasi yang berguna.",
      "Kebijakan publik hanya sah jika semua warga memberi jawaban sama.",
      "Jumlah responden selalu lebih penting daripada cakupan kelompok responden.",
      "Keberatan satu warga otomatis membatalkan seluruh hasil survei.",
    ],
    "Masalahnya adalah bias cakupan. Pendapat pengguna daring tidak cukup mewakili kebutuhan warga yang bergantung pada loket; memperbesar sampel dari kanal yang sama belum tentu memperbaiki bias itu.",
  ],
  [
    "Warga meminta informasi dasar penetapan penerima program. Daftar lengkap memuat identitas pribadi, tetapi kriteria dan ringkasan penilaian bisa disajikan tanpa identitas. Pilihan yang paling seimbang adalah ...",
    "Membuka kriteria dan ringkasan penilaian yang relevan sambil melindungi data pribadi penerima.",
    [
      "Mempublikasikan seluruh identitas agar tidak ada kesan menutup informasi.",
      "Menolak semua permintaan karena sebagian dokumen berisi data pribadi.",
      "Memberikan informasi hanya kepada warga yang mendukung program.",
      "Mengganti penjelasan dengan pernyataan bahwa panitia dapat dipercaya.",
    ],
    "Akuntabilitas dapat dipenuhi dengan menjelaskan dasar keputusan tanpa mengumbar data pribadi. Memilah informasi yang relevan lebih proporsional daripada membuka atau menutup seluruh dokumen.",
  ],
  [
    "Aturan antrean memberi prioritas kepada warga dengan kebutuhan akses tertentu. Seorang warga menilai semua perbedaan perlakuan pasti diskriminatif. Alasan terbaik untuk mengevaluasi keberatannya adalah ...",
    "Perbedaan dapat dibenarkan bila berbasis kebutuhan yang relevan, proporsional, dan diterapkan konsisten.",
    [
      "Setiap aturan yang sudah ditetapkan pasti adil.",
      "Prioritas dibenarkan hanya jika penerimanya lebih banyak.",
      "Kesetaraan menuntut semua orang menunggu dengan cara identik.",
      "Keberatan warga tidak perlu dibahas jika petugas sudah setuju.",
    ],
    "Penilaian keadilan perlu melihat tujuan dan dasar pembedaan. Akomodasi kebutuhan akses dapat mengurangi hambatan nyata, sedangkan kedekatan pribadi bukan alasan yang relevan.",
  ],
  [
    "Pemuda dua kampung berbeda budaya bekerja sama memperbaiki saluran air. Mereka berselisih soal upacara pembukaan, sedangkan pekerjaan harus dimulai sebelum hujan. Pilihan yang paling menjaga persatuan adalah ...",
    "Menyepakati pembukaan yang dapat diikuti bersama dan memulai pekerjaan, sambil memberi ruang tradisi masing-masing secara sukarela.",
    [
      "Menggunakan seluruh tata cara kampung dengan anggota terbanyak.",
      "Memisahkan saluran air sesuai kelompok budaya.",
      "Menunda pekerjaan sampai semua perbedaan tradisi dihapus.",
      "Melarang semua ekspresi budaya pada kegiatan bersama berikutnya.",
    ],
    "Tujuan bersama dapat dicapai tanpa menyeragamkan identitas. Kesepakatan praktis menjaga keselamatan pekerjaan sekaligus menghormati partisipasi yang tidak memaksa.",
  ],
  [
    "Pengurus mengusulkan bantuan hanya bagi warga yang mengikuti organisasi tertentu karena dianggap lebih mudah diawasi. Warga lain memenuhi ukuran kebutuhan yang sama. Evaluasi paling tepat adalah ...",
    "Keanggotaan tidak relevan dengan kebutuhan bantuan; pengawasan perlu dibuat terbuka bagi semua penerima yang memenuhi kriteria.",
    [
      "Syarat keanggotaan tepat selama mempercepat penyaluran.",
      "Warga lain dapat diminta masuk organisasi sebelum diverifikasi.",
      "Bantuan harus dibagi ke organisasi, bukan kepada warga.",
      "Seluruh pengawasan perlu dihapus agar warga tidak dibedakan.",
    ],
    "Kemudahan administrasi tidak cukup membenarkan pengucilan warga dengan kebutuhan setara. Pengawasan dapat diperbaiki tanpa menjadikan afiliasi sebagai syarat akses bantuan.",
  ],
  [
    "Sebuah kebijakan meningkatkan pendapatan daerah tetapi menutup akses nelayan kecil ke tempat pendaratan satu-satunya. Ada alternatif lokasi komersial yang memberi pendapatan sedikit lebih rendah. Pertimbangan paling lengkap adalah ...",
    "Membandingkan manfaat pendapatan dengan dampak mata pencaharian dan menguji alternatif yang menjaga akses nelayan.",
    [
      "Memilih penerimaan tertinggi karena selalu mewakili kepentingan umum.",
      "Menolak semua kegiatan komersial tanpa mengkaji alternatif.",
      "Menganggap nelayan setuju jika tidak hadir dalam rapat awal.",
      "Menetapkan kebijakan berdasarkan kesediaan investor membiayai sosialisasi.",
    ],
    "Kepentingan umum mencakup distribusi dampak, bukan hanya pendapatan agregat. Alternatif yang masih memberi manfaat ekonomi sambil melindungi akses penghidupan perlu dinilai sebelum keputusan.",
  ],
  [
    "Dalam latihan tanggap bencana, informasi resmi belum lengkap. Warga menemukan jalur evakuasi yang terhalang, sementara peta lama menyatakannya aman. Bentuk bela negara yang paling relevan adalah ...",
    "Melaporkan kondisi dengan lokasi yang jelas dan membantu pengarahan sesuai koordinasi petugas tanpa menyebarkan kepastian yang belum ada.",
    [
      "Mengikuti peta lama karena laporan warga tidak boleh mengubah informasi.",
      "Menyebarkan perkiraan jumlah korban agar warga segera bergerak.",
      "Membuka jalur sendiri tanpa memperhatikan risiko dan koordinasi.",
      "Menunggu laporan lengkap sebelum menyampaikan adanya hambatan.",
    ],
    "Ketahanan bersama memerlukan informasi lapangan yang akurat dan koordinasi. Laporan hambatan yang spesifik berguna segera, meskipun gambaran keseluruhan belum lengkap.",
  ],
  [
    "Hasil musyawarah sudah diputuskan. Sesudahnya muncul data baru bahwa lokasi proyek rawan longsor. Sebagian peserta menolak membahasnya karena dianggap tidak menghormati kesepakatan. Sikap paling bertanggung jawab adalah ...",
    "Meninjau keputusan melalui forum yang sama dengan menguji data risiko dan mencatat alasan perubahan.",
    [
      "Melanjutkan proyek agar konsistensi keputusan terjaga.",
      "Membatalkan keputusan secara sepihak tanpa menyampaikan data.",
      "Memilih lokasi pengganti lewat percakapan pribadi pengurus.",
      "Mengabaikan data sampai terjadi kerusakan yang membuktikannya.",
    ],
    "Menghormati kesepakatan tidak berarti menutup evaluasi berbasis bukti baru. Peninjauan melalui prosedur terbuka menjaga legitimasi keputusan sekaligus keselamatan.",
  ],
  [
    "Program pelestarian budaya ingin mewajibkan seluruh siswa menjalankan ritual tertentu. Tujuan pengenalan budaya dapat dicapai lewat pembelajaran sejarah dan pertunjukan sukarela. Pilihan paling tepat adalah ...",
    "Menggunakan pembelajaran yang mengenalkan budaya tanpa memaksa keterlibatan dalam ritual.",
    [
      "Mewajibkan ritual karena tujuan pelestarian selalu mengatasi keberatan pribadi.",
      "Menghapus seluruh pembelajaran budaya untuk menghindari perbedaan.",
      "Membatasi pelajaran hanya kepada siswa dari budaya tersebut.",
      "Menentukan kewajiban ritual melalui suara mayoritas siswa.",
    ],
    "Pengenalan budaya dan pemaksaan praktik merupakan dua hal berbeda. Alternatif pembelajaran memungkinkan pelestarian sekaligus penghormatan terhadap keyakinan dan partisipasi siswa.",
  ],
  [
    "Kritik warga terhadap mutu layanan berisi bukti antrean panjang tetapi juga komentar merendahkan petugas. Respons kelembagaan yang paling menjaga akuntabilitas adalah ...",
    "Memeriksa bukti layanan, menjelaskan tindak lanjut, dan menanggapi bahasa merendahkan secara terpisah serta proporsional.",
    [
      "Menolak semua isi kritik karena penyampaiannya tidak sopan.",
      "Menerima semua tuduhan sebagai fakta agar terlihat terbuka.",
      "Mencari identitas pengkritik sebelum memeriksa mutu layanan.",
      "Menutup kanal aduan untuk mencegah komentar serupa.",
    ],
    "Mutu bukti perlu dinilai terpisah dari cara penyampaiannya. Institusi tetap bertanggung jawab menanggapi masalah layanan tanpa membenarkan penghinaan atau menerima tuduhan tanpa pemeriksaan.",
  ],
  [
    "Warga perbatasan lebih sering memakai fasilitas negara tetangga karena layanan domestik sulit dijangkau. Usulan kebijakan yang paling mendukung rasa kebangsaan secara substantif adalah ...",
    "Memperbaiki akses layanan dasar berdasarkan kebutuhan warga sambil membangun komunikasi dan partisipasi lokal.",
    [
      "Mengukur loyalitas hanya dari tempat warga berobat.",
      "Mengutamakan slogan tanpa mengevaluasi hambatan layanan.",
      "Membatasi seluruh komunikasi lintas batas tanpa menilai dampaknya.",
      "Memindahkan warga agar kebutuhan fasilitas tidak perlu dipenuhi.",
    ],
    "Keterjangkauan layanan memberi pengalaman nyata kehadiran negara. Pilihan warga yang dipengaruhi keterbatasan akses tidak cukup menjadi dasar menilai loyalitasnya.",
  ],
  [
    "Dua kelompok mengklaim ruang publik pada waktu yang sama. Keduanya memenuhi syarat dan belum ada aturan prioritas. Pengelola merupakan anggota salah satu kelompok. Penyelesaian paling adil adalah ...",
    "Melibatkan pengelola netral untuk menyepakati pembagian waktu atau kriteria terbuka, lalu mendokumentasikan hasilnya.",
    [
      "Memberi ruang kepada kelompok pengelola karena tanggung jawabnya lebih besar.",
      "Menyerahkan kepada kelompok yang membawa peserta terbanyak.",
      "Menolak kedua permintaan secara permanen.",
      "Menentukan pilihan diam-diam agar konflik tidak terlihat.",
    ],
    "Ketika aturan belum tersedia dan ada konflik kepentingan, proses netral serta kriteria terbuka membantu menjaga perlakuan setara. Banyaknya pendukung atau afiliasi pengelola bukan dasar yang memadai.",
  ],
  [
    "Sebuah desa menilai program dari rata-rata pendapatan yang naik. Data rinci menunjukkan pendapatan keluarga termiskin turun karena kehilangan lahan kerja. Kesimpulan paling tepat adalah ...",
    "Rata-rata belum cukup membuktikan pemerataan; perlu menilai distribusi manfaat dan kerugian pada kelompok terdampak.",
    [
      "Kenaikan rata-rata membuktikan semua keluarga memperoleh manfaat.",
      "Penurunan pada sebagian keluarga membuktikan seluruh program tidak bermanfaat.",
      "Data keluarga termiskin harus dikeluarkan karena menyimpang dari tren.",
      "Pemerataan hanya dapat dinilai dari total pendapatan desa.",
    ],
    "Rata-rata dapat naik saat manfaat terkonsentrasi pada kelompok tertentu. Evaluasi keadilan sosial perlu melihat distribusi dan sebab kerugian agar perbaikan menyasar kelompok yang tertinggal.",
  ],
  [
    "Forum warga ingin melarang bahasa daerah saat diskusi informal demi persatuan. Masalah sebenarnya adalah beberapa peserta tidak memahami bagian pembahasan keputusan. Alternatif paling proporsional adalah ...",
    "Menggunakan bahasa Indonesia untuk pembahasan dan ringkasan keputusan bersama, sambil menghormati bahasa daerah dalam percakapan informal.",
    [
      "Melarang seluruh bahasa daerah di lingkungan warga.",
      "Membiarkan keputusan dibahas tanpa memastikan pemahaman peserta.",
      "Memisahkan forum permanen berdasarkan bahasa.",
      "Mengharuskan semua peserta menguasai semua bahasa daerah sebelum rapat.",
    ],
    "Bahasa bersama memastikan akses pada keputusan, sedangkan larangan menyeluruh melampaui kebutuhan itu. Persatuan dapat dibangun melalui pemahaman bersama tanpa menghapus keragaman bahasa.",
  ],
];

const tkp: Case[] = [
  [
    "Anda harus menyelesaikan laporan hari ini. Data dua unit berbeda, dan salah satunya belum mengonfirmasi sumber. Atasan meminta angka segera untuk rapat. Tindakan terbaik adalah ...",
    "Menjelaskan perbedaan dan status verifikasi, menyajikan bagian yang sudah sahih, serta menyepakati batas waktu konfirmasi data sisanya.",
    [
      "Memakai angka unit yang biasanya paling cepat merespons.",
      "Merata-ratakan kedua angka lalu memberi catatan bahwa hasilnya perkiraan.",
      "Menahan seluruh laporan sampai semua data sempurna tanpa memberi kabar.",
      "Mengirim kedua angka tanpa menjelaskan alasan perbedaannya.",
    ],
    "Kebutuhan rapat dapat dipenuhi dengan informasi terverifikasi dan keterbatasan yang jelas. Merata-ratakan angka dengan definisi atau sumber belum pasti tidak menyelesaikan masalah validitas.",
  ],
  [
    "Uji aplikasi memangkas waktu input, tetapi pengguna pembaca layar tidak bisa mengirim formulir. Peluncuran dijadwalkan besok dan kanal lama masih berfungsi. Anda sebaiknya ...",
    "Melaporkan hambatan sebagai kendala peluncuran, mempertahankan kanal yang dapat diakses, dan menguji perbaikan bersama pengguna terdampak.",
    [
      "Meluncurkan penuh karena sebagian besar pengguna lebih cepat.",
      "Meminta pengguna terdampak menyerahkan kata sandi kepada petugas.",
      "Menutup seluruh layanan sampai antarmuka baru sempurna.",
      "Menyarankan pengguna pembaca layar menunggu tanpa alternatif.",
    ],
    "Kecepatan mayoritas tidak mengatasi hambatan yang menutup akses sebagian pengguna. Kanal lama menjaga layanan sementara perbaikan diuji pada kebutuhan nyata, bukan sekadar dinyatakan selesai.",
  ],
  [
    "Rekan berpengalaman melewati langkah verifikasi agar target tercapai. Belum ada kerugian yang terlihat, tetapi langkah itu mencegah pembayaran ganda. Respons terbaik adalah ...",
    "Mengingatkan risikonya, membantu menata prioritas agar verifikasi tetap berjalan, dan membawa kendala kapasitas melalui jalur yang tepat.",
    [
      "Mengikuti cara rekan karena hasilnya selama ini baik.",
      "Memeriksa hanya pembayaran dengan nilai terbesar tanpa persetujuan.",
      "Menyelesaikan target lebih dulu dan mengisi bukti verifikasi belakangan.",
      "Mengumumkan kesalahan rekan di grup publik sebelum membahas prosesnya.",
    ],
    "Kontrol pencegahan tetap diperlukan meski kerugian belum terjadi. Penataan beban dan eskalasi kendala menangani penyebab tekanan target sambil menjaga pengendalian pembayaran.",
  ],
  [
    "Dua tugas mendesak datang bersamaan: memperbaiki kesalahan data penerima yang batas pengirimannya dua jam lagi dan merapikan presentasi internal besok. Pimpinan masing-masing meminta didahulukan. Anda sebaiknya ...",
    "Menjelaskan dampak dan tenggat kedua tugas, mengusulkan koreksi data sebagai prioritas, serta menyepakati penyesuaian presentasi atau bantuan rekan.",
    [
      "Mendahulukan pimpinan yang paling senior tanpa membandingkan dampak.",
      "Mengerjakan keduanya bergantian setiap beberapa menit tanpa menyepakati urutan.",
      "Merapikan presentasi karena hasilnya lebih mudah terlihat.",
      "Menunggu kedua pimpinan bertemu sebelum mengerjakan bagian apa pun.",
    ],
    "Prioritas perlu didasarkan pada dampak keterlambatan dan tenggat nyata. Komunikasi dengan kedua pemberi tugas menghindari janji yang saling bertentangan dan membuka peluang pembagian kerja.",
  ],
  [
    "Warga mengeluhkan berkas hilang setelah menyerahkannya kepada loket Anda. Catatan penerimaan belum jelas dan rekan yang bertugas sedang istirahat. Langkah awal terbaik adalah ...",
    "Mendengarkan kronologi, menelusuri bukti penerimaan dan alur berkas, serta memberi waktu pembaruan tanpa menyimpulkan siapa yang bersalah.",
    [
      "Meminta warga mengulang semua proses karena catatan belum ditemukan.",
      "Menjamin berkas pasti selesai hari ini sebelum penelusuran.",
      "Menyatakan rekan bertanggung jawab karena ia petugas sebelumnya.",
      "Menunda semua pemeriksaan sampai rekan kembali meskipun catatan dapat diakses.",
    ],
    "Penelusuran berbasis bukti dapat dimulai tanpa menuduh atau menjanjikan hasil. Waktu pembaruan memberi kepastian komunikasi sementara keberadaan dan status berkas diperiksa.",
  ],
  [
    "Anda menerima lampiran daftar warga di grup kerja yang juga beranggotakan vendor tanpa kewenangan mengakses data tersebut. File belum lama dikirim. Tindakan paling tepat adalah ...",
    "Menghentikan penyebaran, meminta penanganan akses sesuai prosedur insiden, dan memberi tahu penanggung jawab untuk menilai paparan serta tindak lanjut.",
    [
      "Menghapus file dari perangkat sendiri dan menganggap masalah selesai.",
      "Mengirim ulang file untuk memastikan semua orang tahu mana yang bermasalah.",
      "Menunggu vendor menyatakan telah membuka file sebelum melapor.",
      "Memindahkan diskusi ke akun pribadi agar tidak tercatat.",
    ],
    "Menghapus salinan lokal tidak mengendalikan akses penerima lain. Penanganan insiden perlu membatasi penyebaran, menilai paparan, dan mengikuti kewenangan serta pencatatan yang berlaku.",
  ],
  [
    "Rekan baru menghasilkan banyak koreksi pada tugas yang sama. Panduan berisi istilah yang belum ia pahami, sedangkan beban tim sedang tinggi. Pendekatan paling efektif adalah ...",
    "Mengidentifikasi pola kesalahan, menjelaskan contoh tugas, lalu meminta rekan mencoba dengan pemeriksaan pada bagian berisiko.",
    [
      "Mengambil alih semua tugasnya sampai beban kerja turun.",
      "Meminta ia membaca ulang panduan tanpa memeriksa bagian yang membingungkan.",
      "Membiarkan semua hasil langsung dipakai agar ia belajar dari keluhan.",
      "Mengurangi standar pemeriksaan khusus untuk rekan baru.",
    ],
    "Bimbingan yang menargetkan penyebab kesalahan lebih berguna daripada pengambilalihan permanen. Percobaan dengan pemeriksaan terarah memberi ruang belajar sambil menjaga mutu keluaran.",
  ],
  [
    "Uji layanan baru mengurangi antrean di loket, tetapi jumlah permohonan yang tidak selesai meningkat. Tim menyatakan uji berhasil karena antrean pendek. Anda sebaiknya ...",
    "Membandingkan penyelesaian, waktu total, dan alasan permohonan terhenti sebelum menyimpulkan keberhasilan.",
    [
      "Menerima kesimpulan karena antrean adalah indikator paling terlihat.",
      "Menghentikan inovasi tanpa menelusuri penyebab permohonan terhenti.",
      "Mengeluarkan permohonan tidak selesai dari evaluasi.",
      "Mengubah target agar hasil uji otomatis memenuhi ukuran keberhasilan.",
    ],
    "Antrean pendek dapat terjadi karena pengguna menyerah atau berpindah hambatan. Evaluasi perlu mengukur hasil layanan sampai selesai, bukan hanya tahap yang tampak membaik.",
  ],
  [
    "Anda diminta mewakili tim dalam rapat lintas unit. Tim belum sepakat pada solusi, tetapi sudah sepakat mengenai kebutuhan dan risiko. Cara menyampaikan posisi terbaik adalah ...",
    "Menyampaikan kebutuhan dan risiko yang disepakati, menandai pilihan yang belum diputuskan, serta mencatat usulan untuk dikonfirmasi kepada tim.",
    [
      "Mengatasnamakan pilihan pribadi sebagai keputusan tim agar rapat lancar.",
      "Menolak berbicara sampai seluruh tim hadir.",
      "Mengikuti usulan unit terbesar tanpa membahas kebutuhan tim.",
      "Menyatakan semua solusi dapat diterima agar tidak muncul perbedaan.",
    ],
    "Perwakilan perlu membedakan mandat yang sudah ada dari keputusan yang belum diberi kewenangan. Posisi ini tetap memberi masukan berguna tanpa menciptakan komitmen sepihak.",
  ],
  [
    "Sistem kembali pulih setelah gangguan. Antrean manual dan digital memiliki beberapa nama sama. Layanan harus diteruskan tanpa memproses permohonan ganda. Anda sebaiknya ...",
    "Mencocokkan identitas permohonan dan status proses melalui prosedur pemulihan, kemudian meneruskan antrean dengan pemberitahuan yang jelas.",
    [
      "Memproses seluruh daftar manual lebih dahulu tanpa pencocokan.",
      "Menghapus daftar manual karena sistem sudah pulih.",
      "Meminta semua warga mendaftar ulang agar format sama.",
      "Mengandalkan ingatan petugas untuk menentukan permohonan ganda.",
    ],
    "Pemulihan memerlukan rekonsiliasi catatan, bukan sekadar kembali memakai aplikasi. Pencocokan identitas dan status menjaga urutan serta mencegah proses atau keluaran ganda.",
  ],
  [
    "Seorang warga tidak memahami alasan penolakan berkas. Anda sudah menjelaskan istilah prosedur dua kali, tetapi ia makin bingung dan antrean bertambah. Respons terbaik adalah ...",
    "Menggunakan bahasa sederhana dan contoh dokumen, meminta warga mengulang langkah berikutnya, serta mengatur bantuan lanjutan bila perlu.",
    [
      "Mengulang istilah yang sama dengan suara lebih keras.",
      "Meminta warga mencari penjelasan sendiri di situs.",
      "Menyetujui berkas agar antrean bergerak.",
      "Mengakhiri percakapan karena penjelasan sudah diberikan dua kali.",
    ],
    "Keberhasilan komunikasi dinilai dari pemahaman, bukan jumlah pengulangan. Contoh konkret dan pemeriksaan pemahaman membantu warga bertindak tanpa mengurangi syarat layanan.",
  ],
  [
    "Vendor menawarkan pelatihan gratis disertai permintaan melihat data produksi untuk demonstrasi. Lingkungan uji dengan data sintetis tersedia, tetapi perlu persiapan satu hari. Anda sebaiknya ...",
    "Menawarkan penggunaan lingkungan uji dan menyesuaikan jadwal sesuai persetujuan, tanpa membuka data produksi di luar kewenangan.",
    [
      "Membuka data produksi karena pelatihannya tidak berbayar.",
      "Mengizinkan akses singkat dengan janji lisan vendor.",
      "Menolak seluruh pelatihan meskipun lingkungan uji tersedia.",
      "Meminta vendor menyalin data ke perangkatnya agar demonstrasi cepat.",
    ],
    "Manfaat pelatihan dapat diperoleh melalui data sintetis. Penyesuaian jadwal lebih proporsional daripada membuka data produksi tanpa dasar kewenangan atau menolak kesempatan belajar seluruhnya.",
  ],
  [
    "Anda menemukan kesalahan pada laporan yang sudah dikirim. Koreksi mengubah satu kesimpulan rapat besok, tetapi tidak seluruh isi laporan. Langkah terbaik adalah ...",
    "Segera menjelaskan bagian terdampak, mengirim versi koreksi dengan jejak perubahan, dan memastikan penerima memahami perubahan kesimpulannya.",
    [
      "Mengganti file diam-diam agar penerima hanya melihat versi terbaru.",
      "Menunggu ditanya saat rapat agar tidak mengganggu penerima.",
      "Menarik seluruh laporan tanpa menjelaskan bagian yang masih valid.",
      "Mengirim koreksi angka tanpa menyebut dampaknya pada kesimpulan.",
    ],
    "Penerima memerlukan angka yang benar dan pemahaman tentang keputusan yang terpengaruh. Jejak versi dan penjelasan dampak mengurangi risiko versi lama tetap menjadi dasar rapat.",
  ],
  [
    "Tim terpecah antara dua cara kerja. Cara A lebih cepat tetapi belum diuji pada berkas rumit; cara B sudah stabil tetapi lambat. Tersedia waktu uji terbatas sebelum keputusan. Anda mengusulkan ...",
    "Uji pada sampel berkas sederhana dan rumit dengan ukuran waktu serta kesalahan yang disepakati, lalu pilih berdasarkan hasil dan risikonya.",
    [
      "Memilih A karena inovasi selalu lebih baik daripada proses lama.",
      "Memilih B tanpa uji karena sudah dipakai lebih lama.",
      "Membagi tim berdasarkan preferensi tanpa menyamakan standar keluaran.",
      "Menentukan pemenang dengan jumlah pendukung masing-masing cara.",
    ],
    "Pengujian perlu mencakup kondisi yang membedakan dua pilihan. Ukuran yang disepakati mengubah perdebatan preferensi menjadi penilaian manfaat dan risiko yang dapat diperiksa.",
  ],
  [
    "Seorang tokoh meminta dilayani lebih dahulu dan menawarkan membantu sosialisasi kantor. Tidak ada kondisi darurat atau dasar prioritas. Tindakan terbaik adalah ...",
    "Menjelaskan antrean yang berlaku, tetap melayani sesuai urutan, dan memisahkan tawaran sosialisasi dari keputusan pelayanan.",
    [
      "Mendahulukannya karena bantuan sosialisasi bermanfaat bagi kantor.",
      "Menolak seluruh layanan kepada tokoh tersebut.",
      "Meminta persetujuan lisan warga yang sedang menunggu agar dapat melewati antrean.",
      "Melayani diam-diam melalui pintu lain agar antrean tidak terganggu.",
    ],
    "Manfaat kerja sama tidak menjadi dasar pengecualian antrean. Memisahkan tawaran dari keputusan layanan menjaga profesionalitas sekaligus hak warga lain tanpa menolak layanan yang sah.",
  ],
  [
    "Pimpinan meminta tim menghemat anggaran. Usulan termurah menghilangkan penerjemah pada kegiatan yang diikuti warga yang membutuhkan bantuan bahasa. Alternatif penghematan tempat tersedia. Respons terbaik adalah ...",
    "Membandingkan penghematan tempat dengan kebutuhan akses peserta dan mengusulkan efisiensi yang tetap memungkinkan peserta memahami kegiatan.",
    [
      "Memilih biaya terendah tanpa menilai akibat pada peserta.",
      "Membatalkan seluruh efisiensi karena satu usulan bermasalah.",
      "Meminta peserta membawa penerjemah sendiri tanpa memastikan kemampuannya.",
      "Mengurangi durasi penjelasan khusus bagi peserta yang membutuhkan bantuan.",
    ],
    "Efisiensi perlu dinilai terhadap hasil kegiatan dan akses peserta. Alternatif penghematan tempat layak dikaji karena dapat menjaga tujuan sambil menurunkan biaya.",
  ],
  [
    "Rekan mengirim kritik rinci terhadap pekerjaan Anda di rapat. Sebagian benar, sebagian memakai data versi lama. Anda sebaiknya ...",
    "Mengakui bagian yang benar, menunjukkan versi data yang relevan dengan tenang, dan menyepakati perbaikan serta rujukan versi bersama.",
    [
      "Membantah semua kritik karena sebagian datanya keliru.",
      "Menerima seluruh kritik agar rapat segera selesai.",
      "Membalas dengan daftar kesalahan rekan di pekerjaan lain.",
      "Meminta kritik ditarik sebelum membahas substansinya.",
    ],
    "Respons profesional memisahkan substansi yang valid dari kekeliruan sumber. Rujukan versi bersama membantu perbaikan tanpa mengubah pembahasan menjadi pembelaan pribadi.",
  ],
  [
    "Tugas Anda bergantung pada keluaran unit lain yang terlambat. Masih ada bagian analisis yang dapat dikerjakan dan tenggat dua hari lagi. Langkah terbaik adalah ...",
    "Memastikan status dan kebutuhan unit terkait, mengerjakan bagian yang mandiri, serta mengomunikasikan risiko dan opsi penyesuaian jadwal.",
    [
      "Menunggu seluruh bahan masuk sebelum memulai apa pun.",
      "Menyusun sendiri data unit lain berdasarkan perkiraan tanpa penandaan.",
      "Mengirim pengingat berulang tanpa memeriksa kendala yang dihadapi.",
      "Menyatakan tugas pasti selesai tepat waktu meskipun ketergantungan belum jelas.",
    ],
    "Pekerjaan mandiri dapat berjalan sambil hambatan ketergantungan ditangani. Komunikasi berbasis status memberi kesempatan menyusun bantuan atau penyesuaian tanpa janji yang tidak terukur.",
  ],
  [
    "Kuesioner kepuasan hanya dibagikan kepada warga yang berhasil menyelesaikan layanan. Keluhan datang dari mereka yang gagal mengakses formulir awal. Anda sebaiknya ...",
    "Menambahkan cara umpan balik bagi pengguna yang terhenti di awal dan menganalisis tiap tahap perjalanan layanan.",
    [
      "Menyimpulkan keluhan tidak mewakili karena skor pengguna berhasil tinggi.",
      "Menambah jumlah kuesioner pada kelompok berhasil saja.",
      "Menghapus skor lama sebelum memiliki data pengganti.",
      "Menggabungkan seluruh keluhan tanpa membedakan tahap layanan.",
    ],
    "Pengukuran saat ini melewatkan pengguna yang gagal sebelum layanan selesai. Kanal tambahan dan analisis tahap membantu menemukan hambatan yang tidak terlihat pada skor kelompok berhasil.",
  ],
  [
    "Anda diberi tugas baru di luar pengalaman. Panduan tersedia, ada bagian berisiko yang membutuhkan persetujuan, dan rekan ahli hanya tersedia sore hari. Cara kerja terbaik adalah ...",
    "Mempelajari panduan, mengerjakan bagian yang sudah dipahami sesuai kewenangan, dan menyiapkan pertanyaan serta bagian berisiko untuk ditelaah rekan ahli.",
    [
      "Menunggu sore tanpa membaca panduan agar tidak salah.",
      "Menyelesaikan semua bagian sendiri untuk menunjukkan kemandirian.",
      "Menyerahkan seluruh tugas kepada rekan ahli saat ia tersedia.",
      "Menyalin hasil tugas lama tanpa memeriksa perbedaan kasus.",
    ],
    "Kemandirian dapat berjalan bersama pengendalian risiko. Persiapan dan pengerjaan sesuai kewenangan memanfaatkan waktu, sementara telaah terarah diperlukan untuk bagian yang belum aman diputuskan sendiri.",
  ],
];

function numericalCases(): Case[] {
  return Array.from({ length: 10 }, (_, i): Case[] => {
    const capacity = 80 + i * 10;
    const daily = 30 + i * 10;
    const initial = 120 + i * 12;
    const sample = 40 + i * 4;
    const remaining = initial - sample;
    const sampleMean = 10 + (i % 5);
    const remainingMean = (initial * 15 - sample * sampleMean) / remaining;
    const workers = 5 + i;
    const extraDays = 4 + (i % 4);
    const work = workers * 8 + (workers - 1) * 4 * extraDays;
    const total = 200 + i * 20;
    const first = 60 + i * 6;
    const second = 80 + i * 8;
    const overlap = 20 + i * 2;
    const neither = total - first - second + overlap;
    const weeks = i + 3;
    const shortfall = i + 4;
    return [
      [
        `Dua loket masing-masing mampu melayani ${capacity} permohonan per hari. Saat keduanya beroperasi penuh selama 3 hari, datang ${capacity * 7} permohonan baru dan ada tunggakan awal ${capacity}. Jika tidak ada permohonan dibatalkan, berapa tunggakan setelah hari ketiga?`,
        `${capacity * 2} permohonan`,
        [
          `${capacity} permohonan`,
          `${capacity * 3} permohonan`,
          `${capacity * 4} permohonan`,
          `${capacity * 5} permohonan`,
        ],
        `Beban seluruhnya ${capacity} + ${capacity * 7} = ${capacity * 8}. Kapasitas dua loket selama 3 hari adalah 2 × ${capacity} × 3 = ${capacity * 6}. Sisa ${capacity * 8} − ${capacity * 6} = ${capacity * 2} permohonan. Kedatangan baru harus ditambahkan pada tunggakan awal.`,
      ],
      [
        `Unit A memeriksa ${daily} berkas per hari dan unit B memeriksa ${daily * 2} berkas per hari. Mereka bekerja 4 hari; pada hari terakhir B hanya bekerja setengah hari. Semua berkas A valid, sedangkan 10% hasil B perlu diulang dan belum boleh dihitung valid. Berapa berkas valid yang sudah diperiksa?`,
        `${daily * 4 + daily * 7 * 0.9} berkas`,
        [
          `${daily * 11} berkas`,
          `${daily * 12} berkas`,
          `${daily * 10} berkas`,
          `${daily * 7} berkas`,
        ],
        `A menghasilkan 4 × ${daily} = ${daily * 4} berkas valid. B bekerja setara 3,5 hari sehingga menghasilkan ${daily * 7} berkas; 90% valid yaitu ${daily * 7 * 0.9}. Total valid ${daily * 4 + daily * 7 * 0.9}. Bagian yang diulang belum menambah hasil valid.`,
      ],
      [
        `Sebanyak ${initial} berkas memiliki rata-rata waktu pemeriksaan 15 menit. Kelompok pertama sebanyak ${sample} berkas rata-ratanya ${sampleMean} menit. Berapa rata-rata waktu pemeriksaan ${remaining} berkas sisanya?`,
        `${String(remainingMean).replace(".", ",")} menit`,
        ["13,5 menit", "15 menit", "18 menit", "21 menit"],
        `Total waktu ${initial} × 15 = ${initial * 15} menit. Kelompok pertama memakai ${sample} × ${sampleMean} = ${sample * sampleMean} menit. Sisanya (${initial * 15} − ${sample * sampleMean}) ÷ ${remaining} = ${String(remainingMean).replace(".", ",")} menit. Rata-rata kelompok tidak dapat langsung dirata-ratakan tanpa bobot.`,
      ],
      [
        `Pekerjaan setara ${work} jam-orang ditangani ${workers} petugas dengan produktivitas sama. Setiap petugas bekerja 4 jam efektif per hari. Setelah 2 hari, satu petugas dipindahkan. Berapa hari kerja tambahan yang dibutuhkan tim tersisa untuk menyelesaikan pekerjaan?`,
        `${(work - workers * 8) / ((workers - 1) * 4)} hari`,
        [
          `${extraDays - 2} hari`,
          `${extraDays - 1} hari`,
          `${extraDays + 1} hari`,
          `${extraDays + 2} hari`,
        ],
        `Dua hari pertama menyelesaikan ${workers} × 4 × 2 = ${workers * 8} jam-orang. Sisa ${work - workers * 8} jam-orang dibagi kapasitas baru (${workers} − 1) × 4 = ${(workers - 1) * 4} jam-orang per hari, sehingga perlu ${(work - workers * 8) / ((workers - 1) * 4)} hari tambahan.`,
      ],
      [
        `Dari ${total} peserta pelatihan, ${first} mengikuti modul A dan ${second} mengikuti modul B. Sebanyak ${overlap} mengikuti keduanya. Peserta yang tidak mengikuti satu pun dari dua modul itu mendapat kelas pengantar. Berapa peserta kelas pengantar?`,
        `${neither} peserta`,
        [
          `${total - first - second} peserta`,
          `${total - first} peserta`,
          `${total - second} peserta`,
          `${neither + overlap} peserta`,
        ],
        `Peserta yang mengikuti setidaknya satu modul = ${first} + ${second} − ${overlap} = ${first + second - overlap}. Kelas pengantar diikuti ${total} − ${first + second - overlap} = ${neither} peserta. Irisan dikurangi sekali agar tidak dihitung ganda.`,
      ],
      [
        `Sebuah tim menyelesaikan 12 laporan pada minggu pertama dan menambah 3 laporan setiap minggu berikutnya. Target kumulatif selama ${weeks} minggu adalah ${(weeks * (24 + (weeks - 1) * 3)) / 2 + shortfall} laporan. Jika pola bertahan, berapa tambahan laporan di luar pola yang dibutuhkan agar target tercapai?`,
        `${shortfall} laporan`,
        [
          `${shortfall - 2} laporan`,
          `${shortfall - 1} laporan`,
          `${shortfall + 1} laporan`,
          `${shortfall + 2} laporan`,
        ],
        `Laporan minggu ke-${weeks} = 12 + (${weeks} − 1) × 3 = ${12 + (weeks - 1) * 3}. Jumlah deret = ${weeks} × (12 + ${12 + (weeks - 1) * 3}) ÷ 2 = ${(weeks * (24 + (weeks - 1) * 3)) / 2}. Selisih terhadap target adalah ${shortfall} laporan; bedakan hasil satu minggu dari total kumulatif.`,
      ],
    ];
  }).flat();
}

export const CPNS_HOTS_QUESTIONS: Question[] = [
  ...twk.map((item, index) => question("TWK", index, item)),
  ...tkp.map((item, index) => question("TKP", index, item)),
  ...numericalCases().map((item, index) => question("TIU", index, item)),
];
