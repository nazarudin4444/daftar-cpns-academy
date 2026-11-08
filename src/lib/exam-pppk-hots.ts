import type { Question } from "@/lib/exam";

export const PPPK_HOTS_QUESTIONS: Question[] = [
  {
    id: "pppk-man-hots-06",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Tiga kegiatan mendesak berebut dua petugas: pemulihan layanan yang terhenti, penyusunan bahan rapat besok, dan pembaruan arsip rutin. Petugas pertama menguasai pemulihan, petugas kedua menguasai bahan rapat. Koordinator lain meminta keduanya membantu arsip agar target bulanannya tercapai. Keputusan terbaik adalah ...",
    options: [
      { label: "A", text: "Membagi waktu kedua petugas sama rata untuk ketiga kegiatan." },
      { label: "B", text: "Mengutamakan arsip karena target bulanan sudah disepakati." },
      {
        label: "C",
        text: "Menempatkan petugas sesuai keahlian pada pemulihan dan bahan rapat, lalu menyepakati jadwal arsip berdasarkan dampak penundaannya.",
      },
      { label: "D", text: "Meminta petugas memilih kegiatan yang paling mereka sukai." },
      {
        label: "E",
        text: "Mengerjakan semuanya sendiri agar tidak menolak permintaan koordinator lain.",
      },
    ],
    answer: "C",
    explanation:
      "Prioritas mempertimbangkan gangguan layanan, tenggat, dan kecocokan kompetensi. Arsip tetap dijadwalkan melalui kesepakatan, tetapi pembagian sama rata dapat memperlambat dua pekerjaan dengan risiko penundaan lebih tinggi.",
    tip: "Susun prioritas berdasarkan dampak jika ditunda, batas waktu, dan sumber daya yang benar-benar cocok untuk menyelesaikannya.",
  },
  {
    id: "pppk-man-hots-07",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Tim menyarankan menghapus tahap verifikasi karena menjadi antrean terpanjang. Sampel menunjukkan sebagian besar waktu justru habis untuk menghubungi pengirim yang tidak mengisi data wajib. Langkah perbaikan yang paling tepat adalah ...",
    options: [
      { label: "A", text: "Menghapus verifikasi dan membebankan semua kesalahan kepada pengirim." },
      {
        label: "B",
        text: "Memperbaiki validasi dan petunjuk pada tahap penerimaan, lalu mengukur penurunan berkas tidak lengkap sebelum mengubah kapasitas verifikasi.",
      },
      { label: "C", text: "Memperpanjang jam kerja verifikator tanpa membenahi penerimaan." },
      { label: "D", text: "Mengurangi informasi pada formulir agar lebih cepat diisi." },
      { label: "E", text: "Mengganti semua verifikator karena antrean terjadi di unit mereka." },
    ],
    answer: "B",
    explanation:
      "Lokasi antrean tidak selalu merupakan sumber masalah. Data menunjukkan cacat input dari tahap sebelumnya menyebabkan waktu tunggu. Pencegahan pada penerimaan menangani akar masalah sambil mempertahankan fungsi verifikasi.",
    tip: "Bedakan tempat masalah terlihat dengan tempat penyebabnya muncul. Perbaikan proses sering perlu dilakukan di tahap hulu.",
  },
  {
    id: "pppk-man-hots-08",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Dua anggota tim berbeda pendapat mengenai metode kerja. Metode lama lebih stabil, metode baru diperkirakan lebih cepat tetapi belum diuji. Pekerjaan rutin harus tetap berjalan. Apa keputusan koordinator yang paling masuk akal?",
    options: [
      {
        label: "A",
        text: "Mengganti seluruh proses dengan metode baru untuk menunjukkan keberanian berinovasi.",
      },
      { label: "B", text: "Mempertahankan metode lama selamanya karena belum pernah gagal besar." },
      { label: "C", text: "Mengundi metode yang akan digunakan selama setahun." },
      {
        label: "D",
        text: "Menguji metode baru pada lingkup terbatas dengan ukuran mutu, waktu, dan kriteria penghentian yang disepakati.",
      },
      {
        label: "E",
        text: "Membiarkan setiap anggota memakai metode sendiri tanpa membandingkan hasil.",
      },
    ],
    answer: "D",
    explanation:
      "Uji terbatas menghasilkan bukti manfaat dan risiko tanpa mengorbankan seluruh layanan. Ukuran mutu dan waktu mencegah keberhasilan dinilai hanya dari kecepatan, sedangkan kriteria penghentian membatasi dampak jika uji gagal.",
    tip: "Saat manfaat inovasi belum terbukti, cari percobaan terkendali dengan ukuran keberhasilan dan batas risiko yang jelas.",
  },
  {
    id: "pppk-man-hots-09",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Seorang staf melaporkan potensi kesalahan dalam laporan tim sehari sebelum presentasi. Ketua tim khawatir koreksi akan merusak reputasi, tetapi bukti staf cukup spesifik untuk diperiksa. Sikap yang paling tepat adalah ...",
    options: [
      {
        label: "A",
        text: "Memverifikasi bukti segera, mengoreksi bagian terdampak, dan menjelaskan perubahan kepada pihak yang menerima laporan.",
      },
      {
        label: "B",
        text: "Menunda pemeriksaan sampai presentasi selesai agar tim terlihat kompak.",
      },
      { label: "C", text: "Menghapus seluruh laporan tanpa mengetahui bagian yang salah." },
      {
        label: "D",
        text: "Meminta staf menyimpan temuan agar tidak dianggap menentang ketua tim.",
      },
      { label: "E", text: "Mengumumkan staf sebagai penyebab masalah sebelum memeriksa bukti." },
    ],
    answer: "A",
    explanation:
      "Akuntabilitas memerlukan pemeriksaan bukti dan koreksi yang proporsional. Menjaga citra dengan menunda temuan dapat memperbesar dampak keputusan yang didasarkan pada laporan salah. Komunikasi perubahan menjaga pengguna laporan memahami versi yang benar.",
    tip: "Lindungi kualitas keputusan melalui verifikasi dan koreksi. Kekompakan tim tidak mengharuskan menyembunyikan kesalahan.",
  },
  {
    id: "pppk-man-hots-10",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Program pendampingan dinilai berhasil karena jumlah peserta meningkat dua kali lipat. Namun, tidak ada data apakah peserta dapat menyelesaikan tugas yang menjadi tujuan program. Evaluasi lanjutan yang paling relevan adalah ...",
    options: [
      { label: "A", text: "Menghitung jumlah poster promosi yang dibagikan." },
      { label: "B", text: "Menaikkan target peserta lagi agar tren pertumbuhan berlanjut." },
      { label: "C", text: "Menilai keberhasilan hanya dari lama kegiatan berlangsung." },
      { label: "D", text: "Menggunakan jumlah pendaftar sebagai pengganti hasil belajar." },
      {
        label: "E",
        text: "Mengukur kemampuan menyelesaikan tugas sebelum dan sesudah pendampingan dengan kriteria yang konsisten serta memeriksa faktor lain yang berpengaruh.",
      },
    ],
    answer: "E",
    explanation:
      "Jumlah peserta menunjukkan jangkauan kegiatan, bukan pencapaian kemampuan. Pengukuran sebelum dan sesudah dengan kriteria konsisten membantu menilai perubahan, sementara pemeriksaan faktor lain menghindari klaim bahwa seluruh perubahan pasti disebabkan program.",
    tip: "Bedakan masukan, aktivitas, keluaran, dan hasil. Pilih indikator yang paling dekat dengan tujuan yang ingin dicapai.",
  },
  {
    id: "pppk-man-hots-01",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Dua unit mengklaim pekerjaan integrasi sudah selesai, tetapi uji layanan masih gagal. Unit A mengukur keberhasilan dari pengiriman data, sedangkan unit B dari penerimaan data yang valid. Tenggat tinggal dua hari. Langkah koordinator yang paling tepat adalah ...",
    options: [
      {
        label: "A",
        text: "Menetapkan pengiriman data sebagai ukuran akhir karena unit A selesai lebih awal.",
      },
      {
        label: "B",
        text: "Meminta kedua unit menambah jam kerja tanpa mengubah ukuran keberhasilan.",
      },
      {
        label: "C",
        text: "Menyepakati kriteria layanan ujung ke ujung, menguji titik gagal bersama, dan menetapkan pemilik perbaikannya.",
      },
      {
        label: "D",
        text: "Menyerahkan seluruh pekerjaan kepada unit B agar tanggung jawab tidak terbagi.",
      },
      {
        label: "E",
        text: "Menerima laporan kedua unit dan menjadwalkan evaluasi setelah peluncuran.",
      },
    ],
    answer: "C",
    explanation:
      "Masalah utama adalah ukuran keberhasilan yang tidak sama pada antarmuka kerja. Pengiriman belum membuktikan data dapat digunakan. Kriteria bersama dan uji ujung ke ujung mengungkap titik gagal sekaligus memperjelas tanggung jawab sebelum tenggat.",
    tip: "Bedakan selesainya tugas tiap unit dari tercapainya hasil layanan bersama. Pada masalah lintas unit, periksa titik serah terima.",
  },
  {
    id: "pppk-man-hots-02",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Target tim adalah 200 berkas per minggu. Produktivitas naik menjadi 230, tetapi pengembalian karena kesalahan naik dari 4 menjadi 23 berkas. Atasan meminta kenaikan target lagi. Usulan Anda yang paling kuat adalah ...",
    options: [
      {
        label: "A",
        text: "Menaikkan target karena jumlah berkas yang diproses sudah melampaui sasaran.",
      },
      {
        label: "B",
        text: "Membandingkan keluaran yang benar dan biaya pengerjaan ulang, lalu menguji perbaikan mutu sebelum menetapkan target baru.",
      },
      {
        label: "C",
        text: "Mengembalikan target ke angka lama tanpa memeriksa penyebab kesalahan.",
      },
      { label: "D", text: "Mengeluarkan berkas yang dikembalikan dari laporan produktivitas." },
      {
        label: "E",
        text: "Menambah pemeriksaan pada semua tahap tanpa menilai hambatan kapasitas.",
      },
    ],
    answer: "B",
    explanation:
      "Volume kotor meningkat, tetapi tingkat kesalahan naik dari 2% menjadi 10%. Keluaran benar naik dari 196 menjadi 207, jauh lebih kecil daripada kenaikan volume. Target perlu mempertimbangkan mutu dan pekerjaan ulang, dengan perbaikan berbasis penyebab.",
    tip: "Hitung hasil yang benar, bukan hanya jumlah yang diproses. Bandingkan persentase kesalahan ketika volume berubah.",
  },
  {
    id: "pppk-man-hots-03",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Seorang anggota senior selalu menyelesaikan tugas tercepat, tetapi hanya ia yang memahami proses penting. Ia akan cuti bulan depan. Anggota baru sering melakukan kesalahan saat mencoba membantu. Rencana yang paling berkelanjutan adalah ...",
    options: [
      {
        label: "A",
        text: "Meminta senior menyelesaikan seluruh pekerjaan bulan depan sebelum cuti.",
      },
      { label: "B", text: "Menunda pekerjaan penting sampai senior kembali." },
      {
        label: "C",
        text: "Mengalihkan semua tugas sekaligus kepada anggota baru untuk mempercepat adaptasi.",
      },
      {
        label: "D",
        text: "Mengadakan praktik berpasangan, mendokumentasikan keputusan penting, dan menguji anggota pengganti secara bertahap.",
      },
      { label: "E", text: "Meminta senior selalu tersedia melalui telepon selama cuti." },
    ],
    answer: "D",
    explanation:
      "Ketergantungan pada satu orang adalah risiko kesinambungan. Dokumentasi saja belum membuktikan pengganti mampu bekerja. Praktik, umpan balik, dan uji mandiri bertahap memindahkan pengetahuan sambil mengendalikan kesalahan.",
    tip: "Cari pilihan yang membangun kapasitas tim sekaligus mengurangi risiko transisi, bukan hanya memindahkan beban sementara.",
  },
  {
    id: "pppk-man-hots-04",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Uji coba aplikasi baru mempercepat layanan di kantor pusat, tetapi petugas lapangan melaporkan kegagalan saat koneksi lemah. Tim pengembang meminta peluncuran serentak berdasarkan rata-rata waktu layanan yang membaik. Keputusan paling tepat adalah ...",
    options: [
      {
        label: "A",
        text: "Memisahkan hasil berdasarkan kondisi koneksi, menetapkan batas kelayakan, dan melakukan peluncuran bertahap dengan prosedur cadangan.",
      },
      {
        label: "B",
        text: "Meluncurkan serentak karena rata-rata mencakup semua peserta uji coba.",
      },
      {
        label: "C",
        text: "Menghentikan aplikasi secara permanen karena belum berhasil di setiap lokasi.",
      },
      {
        label: "D",
        text: "Menghapus hasil lapangan karena kondisi koneksi berada di luar kendali pengembang.",
      },
      {
        label: "E",
        text: "Meluncurkan serentak sambil meminta petugas lapangan mencari koneksi sendiri.",
      },
    ],
    answer: "A",
    explanation:
      "Rata-rata dapat menyembunyikan kegagalan pada kelompok pengguna tertentu. Analisis per kondisi, batas kelayakan, dan cadangan layanan memungkinkan manfaat inovasi diterapkan tanpa membebankan seluruh risiko kepada lokasi yang belum siap.",
    tip: "Jika hasil rata-rata baik tetapi sebagian kelompok gagal, periksa distribusi hasil sebelum memperluas kebijakan.",
  },
  {
    id: "pppk-man-hots-05",
    subject: "Manajerial",
    difficulty: "HOTS",
    prompt:
      "Anggaran hanya cukup untuk satu dari dua pelatihan. Pelatihan A diminati banyak pegawai; pelatihan B berkaitan dengan kesalahan yang menyebabkan pengulangan pekerjaan pada proses utama. Data belum menjelaskan apakah kesalahan berasal dari keterampilan atau sistem. Apa langkah awal terbaik?",
    options: [
      { label: "A", text: "Memilih A agar anggaran dimanfaatkan oleh peserta terbanyak." },
      { label: "B", text: "Memilih B segera karena berkaitan dengan proses utama." },
      {
        label: "C",
        text: "Membagi anggaran sama rata meskipun kedua pelatihan tidak dapat berjalan lengkap.",
      },
      {
        label: "D",
        text: "Meminta pegawai membiayai pelatihan sendiri sebelum menentukan prioritas.",
      },
      {
        label: "E",
        text: "Menganalisis contoh kesalahan dan penyebabnya, lalu menilai intervensi yang paling mungkin memperbaiki hasil kerja.",
      },
    ],
    answer: "E",
    explanation:
      "Pelatihan cocok untuk kesenjangan kompetensi, tetapi tidak otomatis memperbaiki sistem atau prosedur yang keliru. Mengidentifikasi penyebab terlebih dahulu mencegah penggunaan anggaran pada solusi yang tidak menyasar masalah.",
    tip: "Jangan langsung memilih intervensi hanya karena masalah penting. Pastikan hubungan antara penyebab, tindakan, dan hasil yang diharapkan.",
  },
];
