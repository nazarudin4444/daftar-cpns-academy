import type { Question, Subject } from "@/lib/exam";

const LABELS = ["A", "B", "C", "D", "E"] as const;
type Label = (typeof LABELS)[number];

function shuffledOptions(correct: string, distractors: readonly string[], index: number) {
  const answerIndex = index % LABELS.length;
  const choices = [...distractors];
  choices.splice(answerIndex, 0, correct);
  return {
    answer: LABELS[answerIndex]!,
    options: choices.map((text, optionIndex) => ({ label: LABELS[optionIndex]!, text })),
  };
}

function makeCaseQuestions(
  subject: Subject,
  prefix: string,
  cases: readonly CaseItem[],
  frames: readonly string[],
  countPerCase: number,
  difficulty: (index: number) => Question["difficulty"] = () => "Latihan",
): Question[] {
  return cases.flatMap((item, caseIndex) =>
    Array.from({ length: countPerCase }, (_, variant) => {
      const index = caseIndex * countPerCase + variant;
      const choices = shuffledOptions(item.best, item.alternatives, index);
      return {
        id: `${prefix}-bank-${String(index + 1).padStart(3, "0")}`,
        subject,
        prompt: `${frames[variant % frames.length]} ${item.context}`,
        options: choices.options,
        answer: choices.answer,
        explanation: item.explanation,
        tip: item.tip,
        difficulty: difficulty(index),
      };
    }),
  );
}

type CaseItem = {
  context: string;
  best: string;
  alternatives: [string, string, string, string];
  explanation: string;
  tip: string;
};

const TWK_CASES: CaseItem[] = [
  {
    context: "Dua calon bantuan memiliki kebutuhan serupa; salah satunya kerabat panitia.",
    best: "Gunakan kriteria terbuka yang sama, minta penelaahan independen, dan catat alasannya.",
    alternatives: [
      "Utamakan kerabat agar proses lebih mudah.",
      "Batalkan bantuan untuk keduanya tanpa pemeriksaan.",
      "Serahkan pilihan kepada penyumbang terbesar.",
      "Umumkan identitas dan dokumen pribadi kedua pemohon.",
    ],
    explanation:
      "Hubungan pribadi menimbulkan konflik kepentingan yang perlu dikelola. Kriteria yang sama dan penelaahan independen menjaga keputusan tetap adil serta dapat diperiksa.",
    tip: "Uji apakah kriteria diterapkan sama dan konflik kepentingan sudah dikendalikan.",
  },
  {
    context:
      "Pendaftaran layanan hanya daring, padahal sebagian warga tidak memiliki perangkat atau koneksi.",
    best: "Sediakan kanal berbantuan dengan syarat kelayakan dan perlindungan data yang sama.",
    alternatives: [
      "Hapus semua syarat agar setiap kanal terasa sama.",
      "Pertahankan kanal tunggal meskipun kelompok terdampak tersisih.",
      "Minta warga meminjam akun orang lain.",
      "Buka akses data pendaftar kepada seluruh relawan.",
    ],
    explanation:
      "Kesetaraan akses kadang memerlukan sarana yang berbeda untuk mengatasi hambatan, sambil mempertahankan standar kelayakan dan keamanan yang konsisten.",
    tip: "Bedakan kesamaan aturan dari kesamaan kesempatan untuk mengakses layanan.",
  },
  {
    context: "Potongan video rapat menyebar dan memicu tuduhan; rekaman utuh belum tersedia.",
    best: "Tahan penyebaran, periksa sumber dan konteks lengkap, lalu sampaikan klarifikasi terverifikasi.",
    alternatives: [
      "Sebarkan potongan lain sebagai balasan.",
      "Anggap jumlah pembagian sebagai bukti kebenaran.",
      "Larangan permanen untuk semua kritik.",
      "Tentukan kebenaran melalui jajak pendapat daring.",
    ],
    explanation:
      "Memeriksa konteks mencegah tuduhan yang belum teruji memperbesar konflik. Persatuan tetap memberi ruang bagi kritik yang disampaikan berdasarkan informasi yang dapat diperiksa.",
    tip: "Periksa sumber, konteks, dan bukti sebelum menyimpulkan atau meneruskan informasi.",
  },
  {
    context:
      "Jadwal kegiatan bersama berbenturan dengan kebutuhan ibadah sebagian peserta, sementara jadwal alternatif tersedia.",
    best: "Pilih jadwal alternatif yang menjaga partisipasi dan tetap memenuhi tujuan kegiatan.",
    alternatives: [
      "Paksa kelompok kecil menyesuaikan diri dengan mayoritas.",
      "Pisahkan kegiatan berdasarkan keyakinan peserta.",
      "Batalkan kegiatan tanpa mencoba pilihan lain.",
      "Minta peserta menyembunyikan kebutuhannya.",
    ],
    explanation:
      "Akomodasi yang wajar memungkinkan kegiatan bersama tetap berjalan tanpa mengistimewakan atau menyingkirkan kelompok tertentu.",
    tip: "Cari penyesuaian proporsional yang menjaga tujuan bersama dan partisipasi.",
  },
  {
    context:
      "Anggaran hanya cukup untuk satu proyek; satu akses sekolah berisiko terputus, sedangkan proyek lain melayani lebih banyak orang.",
    best: "Bandingkan urgensi, keselamatan, jumlah penerima, dan alternatif sebelum menetapkan prioritas terbuka.",
    alternatives: [
      "Pilih proyek dengan penerima terbanyak tanpa melihat risiko.",
      "Bagi dana rata walau tidak ada proyek yang dapat diselesaikan.",
      "Utamakan wilayah dengan kontribusi pajak tertinggi.",
      "Undi proyek tanpa mempertimbangkan dampak.",
    ],
    explanation:
      "Keadilan sosial menimbang manfaat sekaligus tingkat kebutuhan dan risiko. Alasan prioritas perlu diumumkan agar keputusan dapat dipahami dan dievaluasi.",
    tip: "Pertimbangkan dampak pada kelompok paling rentan, bukan hanya jumlah penerima.",
  },
  {
    context:
      "Anggota rapat memiliki usaha yang mungkin menerima manfaat dari keputusan yang sedang dibahas.",
    best: "Ungkapkan hubungan tersebut dan gunakan penilaian independen dengan batas keterlibatan yang jelas.",
    alternatives: [
      "Sembunyikan hubungan agar rapat berlangsung cepat.",
      "Tolak semua data dari anggota itu tanpa memeriksanya.",
      "Izinkan anggota memutuskan karena paling memahami usahanya.",
      "Anggap tidak ada konflik selama belum ada imbalan.",
    ],
    explanation:
      "Konflik kepentingan tidak otomatis membuat bukti keliru, tetapi harus diungkap dan dikelola supaya proses tetap dipercaya.",
    tip: "Pisahkan kualitas bukti dari kepentingan pribadi yang perlu diungkap.",
  },
  {
    context:
      "Warga meminta dasar penetapan penerima program; dokumen berisi identitas dan informasi pribadi.",
    best: "Jelaskan kriteria dan ringkasan penilaian sambil menyamarkan data pribadi yang tidak diperlukan.",
    alternatives: [
      "Publikasikan seluruh identitas untuk membuktikan keterbukaan.",
      "Tolak semua informasi karena dokumen memuat data pribadi.",
      "Berikan daftar hanya kepada pendukung program.",
      "Ganti penjelasan dengan pernyataan bahwa panitia dapat dipercaya.",
    ],
    explanation:
      "Keterbukaan dan perlindungan privasi dapat dipenuhi bersama dengan memilah informasi yang relevan untuk akuntabilitas.",
    tip: "Buka dasar keputusan dan lindungi data pribadi yang tidak diperlukan publik.",
  },
  {
    context: "Forum warga jarang dihadiri pekerja bergiliran karena waktu pertemuan selalu sama.",
    best: "Sediakan pilihan waktu atau kanal masukan dengan tenggat dan rangkuman yang dapat diakses semua pihak.",
    alternatives: [
      "Anggap yang absen menyetujui semua keputusan.",
      "Berikan hak suara hanya kepada peserta yang hadir.",
      "Tunda keputusan tanpa batas sampai semua warga hadir.",
      "Hapus catatan masukan agar rapat lebih ringkas.",
    ],
    explanation:
      "Partisipasi bermakna perlu mempertimbangkan hambatan kehadiran sambil menjaga proses dan tenggat yang jelas.",
    tip: "Tanyakan siapa yang tidak terwakili dan bagaimana hambatan partisipasinya dapat dikurangi.",
  },
  {
    context:
      "Dua wilayah hulu dan hilir berbeda pendapat tentang biaya menjaga sumber air bersama.",
    best: "Padankan data manfaat dan beban, lalu sepakati pembiayaan serta pemantauan bersama.",
    alternatives: [
      "Bebankan seluruh biaya kepada wilayah tempat sumber air berada.",
      "Bagi biaya menurut luas wilayah tanpa mengukur dampak.",
      "Berikan seluruh keputusan kepada pengguna terbanyak.",
      "Hentikan kerja sama sampai salah satu pihak mengalah.",
    ],
    explanation:
      "Dampak sumber daya melintasi batas wilayah. Data bersama membantu membagi manfaat dan tanggung jawab secara proporsional.",
    tip: "Petakan dampak lintas wilayah dan tanggung jawab semua pihak yang memperoleh manfaat.",
  },
  {
    context:
      "Sebuah survei daring dipakai untuk menghapus loket fisik, tetapi warga tanpa internet tidak ikut disurvei.",
    best: "Lengkapi data dengan kanal dan kelompok yang terdampak sebelum memutuskan perubahan layanan.",
    alternatives: [
      "Perbesar sampel daring saja tanpa memperluas cakupannya.",
      "Abaikan hasil survei seluruhnya karena dilakukan daring.",
      "Tutup loket segera karena mayoritas responden setuju.",
      "Anggap warga tanpa internet tidak membutuhkan layanan.",
    ],
    explanation:
      "Survei tersebut memiliki bias cakupan: kelompok yang terkena dampak tidak terwakili. Menambah responden dari kanal sama belum tentu memperbaiki bias.",
    tip: "Periksa siapa yang tidak terjangkau oleh metode pengumpulan data.",
  },
  {
    context:
      "Seorang tokoh meminta pengecualian aturan fasilitas umum tanpa alasan yang berlaku bagi warga lain.",
    best: "Terapkan aturan konsisten dan jelaskan jalur resmi untuk mengusulkan perubahan bagi semua warga.",
    alternatives: [
      "Beri pengecualian karena jasa tokoh itu.",
      "Izinkan penggunaan tanpa pencatatan.",
      "Tolak seluruh permintaan penggunaan fasilitas.",
      "Minta warga lain tidak membicarakan pengecualian.",
    ],
    explanation:
      "Aturan bersama harus diterapkan tanpa keistimewaan pribadi. Perubahan kebijakan dibahas melalui proses terbuka dan berlaku umum.",
    tip: "Uji apakah pengecualian berbasis kebutuhan objektif atau kedekatan pribadi.",
  },
  {
    context: "Warga dengan bahasa berbeda perlu memahami persyaratan sebelum menyetujui layanan.",
    best: "Gunakan bantuan bahasa yang tersedia dan pastikan informasi serta persetujuan dipahami.",
    alternatives: [
      "Minta tanda tangan meski isi belum dipahami.",
      "Serahkan telepon pribadi petugas untuk diterjemahkan tanpa izin.",
      "Tolak layanan karena warga belum fasih.",
      "Minta anak kecil menjadi penerjemah untuk informasi sensitif.",
    ],
    explanation:
      "Akses bahasa mendukung pemahaman dan persetujuan yang bermakna. Bantuan tetap harus menjaga privasi serta martabat warga.",
    tip: "Pastikan orang memahami pilihan dan konsekuensi sebelum meminta persetujuan.",
  },
  {
    context:
      "Perbedaan kebiasaan muncul saat dua kelompok bekerja pada tujuan lingkungan yang sama.",
    best: "Sepakati tujuan dan aturan kerja bersama sambil memberi ruang bagi tradisi yang dapat dilakukan secara sukarela.",
    alternatives: [
      "Jadikan kebiasaan kelompok terbesar sebagai aturan semua.",
      "Pisahkan pekerjaan menurut identitas kelompok.",
      "Hentikan kerja sampai semua tradisi diseragamkan.",
      "Larang semua ekspresi budaya pada kegiatan bersama.",
    ],
    explanation:
      "Persatuan dapat merangkul perbedaan tanpa mengorbankan tujuan bersama atau memaksa keseragaman.",
    tip: "Bedakan kesepakatan praktis dari tuntutan untuk menyeragamkan identitas.",
  },
  {
    context:
      "Kriteria bantuan harus diperbarui, tetapi warga khawatir perubahan dibuat untuk menguntungkan kelompok tertentu.",
    best: "Umumkan alasan perubahan, libatkan pihak terdampak, dan terapkan kriteria baru secara konsisten.",
    alternatives: [
      "Ubah kriteria tanpa penjelasan agar tidak diperdebatkan.",
      "Pertahankan kriteria meskipun bukti menunjukkan ketidakadilan.",
      "Terapkan kriteria baru hanya untuk pendukung pengurus.",
      "Minta warga memilih penerima berdasarkan popularitas.",
    ],
    explanation:
      "Keadilan memerlukan kriteria yang relevan dan proses perubahan yang terbuka. Konsistensi penerapan mencegah kebijakan menjadi alat kepentingan kelompok.",
    tip: "Jelaskan bukti, proses perubahan, dan cara kriteria diterapkan setelah diperbarui.",
  },
];

const CIVIC_FRAMES = [
  "Langkah yang paling menjaga keadilan dan kebersamaan dalam situasi berikut adalah ...",
  "Untuk membuat keputusan yang dapat dipertanggungjawabkan, pengambil keputusan sebaiknya ...",
  "Sebelum memilih tindakan, prinsip yang perlu diuji terlebih dahulu pada kasus berikut adalah ...",
  "Kebijakan yang paling seimbang dengan hak warga dan kepentingan bersama adalah ...",
  "Cara menilai usulan tersebut tanpa mengabaikan pihak yang terdampak adalah ...",
  "Agar prosesnya transparan sekaligus inklusif, tindakan yang paling tepat adalah ...",
  "Kesimpulan tindakan yang paling proporsional berdasarkan informasi kasus ini adalah ...",
  "Pilihan yang paling konsisten dengan perlakuan setara dan perlindungan warga adalah ...",
  "Untuk mengurangi dampak yang tidak adil, pengelola perlu ...",
  "Tindak lanjut yang paling memungkinkan evaluasi terbuka adalah ...",
];

const WORK_FRAMES = [
  "Respons awal yang paling efektif dalam situasi kerja berikut adalah ...",
  "Untuk menyelesaikan masalah tanpa mengabaikan mutu layanan, Anda sebaiknya ...",
  "Tindakan yang menunjukkan tanggung jawab dan komunikasi profesional adalah ...",
  "Pilihan yang paling aman bagi pengguna layanan dan tim adalah ...",
  "Agar masalah tidak berulang, langkah yang paling tepat adalah ...",
  "Dalam batas kewenangan, tindak lanjut yang paling kuat adalah ...",
  "Cara merespons yang menjaga kepercayaan dan akuntabilitas adalah ...",
  "Keputusan yang paling proporsional terhadap risiko pada kasus ini adalah ...",
  "Untuk membantu pihak terdampak dan menjaga proses tetap berjalan, Anda perlu ...",
  "Tindakan yang memberi dasar perbaikan terukur adalah ...",
];

const TWK_QUESTIONS = makeCaseQuestions("TWK", "twk", TWK_CASES, CIVIC_FRAMES, 10, (index) =>
  index < 20 ? "HOTS" : "Latihan",
);

const TKP_CASES: CaseItem[] = [
  {
    context: "Aplikasi layanan berhenti saat antrean panjang dan waktu pulih belum diketahui.",
    best: "Jelaskan gangguan dengan jujur, hubungi tim teknis, dan jalankan prosedur alternatif yang diizinkan.",
    alternatives: [
      "Janji aplikasi pulih dalam sepuluh menit tanpa kepastian.",
      "Minta warga menyerahkan kata sandi agar dibantu.",
      "Suruh semua warga pulang tanpa arahan.",
      "Unggah keluhan dan data pemohon ke akun pribadi.",
    ],
    explanation:
      "Informasi yang jujur, koordinasi, dan alternatif resmi menjaga layanan tanpa membuat janji yang tidak dapat dipastikan atau membuka data.",
    tip: "Nyatakan apa yang diketahui, apa yang sedang dilakukan, dan kapan pembaruan diberikan.",
  },
  {
    context: "Warga menyampaikan keluhan dengan nada tinggi karena berkasnya belum diproses.",
    best: "Dengarkan inti masalah, jelaskan kekurangan dan langkah lanjut dengan tenang, serta atur antrean.",
    alternatives: [
      "Menyuruh warga diam sebelum memahami masalahnya.",
      "Melewati berkas tanpa penjelasan.",
      "Menaikkan suara agar warga mendengar.",
      "Meminta keamanan mengeluarkan warga sebagai langkah pertama.",
    ],
    explanation:
      "Mendengarkan dan memberi tindak lanjut yang jelas menangani penyebab keluhan. Sikap tenang juga menjaga layanan bagi pemohon lain.",
    tip: "Pisahkan emosi yang muncul dari masalah layanan yang perlu diselesaikan.",
  },
  {
    context: "Anda menyadari angka pada laporan yang sudah dikirim tidak sesuai sumber asli.",
    best: "Beri tahu penerima, verifikasi angka, lalu kirim koreksi yang menjelaskan dampaknya.",
    alternatives: [
      "Tunggu sampai orang lain menemukan kesalahan.",
      "Hapus pesan lama tanpa penjelasan.",
      "Salahkan sumber tanpa memeriksa ulang.",
      "Kirim angka baru tanpa menyatakan ada koreksi.",
    ],
    explanation:
      "Pemberitahuan dan koreksi terverifikasi mencegah keputusan berdasarkan informasi keliru serta menjaga kepercayaan.",
    tip: "Koreksi dengan cepat, sebutkan perubahan, dan pastikan versi yang benar mudah dikenali.",
  },
  {
    context:
      "Permintaan data pribadi datang dari alamat pengirim dan kanal yang belum dapat diverifikasi.",
    best: "Verifikasi identitas, tujuan, dan kanal resmi sebelum membagikan data minimum yang diperlukan.",
    alternatives: [
      "Kirim sebagian data sebagai percobaan.",
      "Unggah data ke penyimpanan pribadi sementara.",
      "Teruskan berkas ke grup umum untuk bertanya.",
      "Kirim seluruh data agar pekerjaan tidak tertunda.",
    ],
    explanation:
      "Verifikasi dan pembatasan data mengurangi risiko kebocoran. Kecepatan tidak membenarkan pengiriman melalui kanal yang belum dipercaya.",
    tip: "Periksa kewenangan dan tujuan sebelum memberi akses ke data pribadi.",
  },
  {
    context:
      "Rekan meminta bantuan menjelang tenggat, sementara tugas Anda juga harus selesai hari itu.",
    best: "Bandingkan urgensi dan kapasitas, jelaskan prioritas, lalu sepakati bantuan yang realistis.",
    alternatives: [
      "Ambil alih semua pekerjaan tanpa menilai kapasitas.",
      "Abaikan permintaan tanpa memberi kabar.",
      "Selesaikan tugas seadanya dan sembunyikan keterlambatan.",
      "Minta rekan mencari bantuan tanpa menjelaskan kendala.",
    ],
    explanation:
      "Penilaian prioritas dan komunikasi mencegah dua tanggung jawab terbengkalai serta membantu tim membuat rencana yang dapat dijalankan.",
    tip: "Sampaikan kapasitas dan risiko lebih awal sebelum berkomitmen pada bantuan.",
  },
  {
    context: "Pengguna lanjut usia kesulitan membaca petunjuk kecil pada layar layanan.",
    best: "Tanyakan bentuk bantuan yang diinginkan, jelaskan dengan jelas, dan pastikan pengguna tetap menyetujui setiap langkah.",
    alternatives: [
      "Isi seluruh formulir tanpa meminta persetujuan.",
      "Minta pengguna kembali bersama keluarga.",
      "Lewati pengguna agar antrean bergerak.",
      "Serahkan perangkat kepada orang lain tanpa izin.",
    ],
    explanation:
      "Akomodasi yang meminta persetujuan membantu akses tanpa mengambil alih keputusan atau mengurangi kemandirian pengguna.",
    tip: "Tawarkan bantuan dan biarkan pengguna menentukan dukungan yang dibutuhkan.",
  },
  {
    context: "Dua unit berselisih tentang prioritas, sementara permintaan warga mulai menumpuk.",
    best: "Kumpulkan data dampak dan tenggat, tetapkan urutan berdasarkan kebutuhan warga, lalu komunikasikan alasan.",
    alternatives: [
      "Ikuti unit yang paling keras menyampaikan keberatan.",
      "Pilih urutan berdasarkan senioritas saja.",
      "Tunda seluruh pekerjaan sampai konflik selesai.",
      "Bagi waktu sama rata tanpa menilai jenis kebutuhan.",
    ],
    explanation:
      "Ukuran dampak dan tenggat memberi dasar keputusan yang objektif. Komunikasi alasan membantu unit berkoordinasi pada tujuan pelayanan.",
    tip: "Prioritaskan berdasarkan dampak, urgensi, dan konsekuensi penundaan.",
  },
  {
    context:
      "Panduan kerja lama tidak menjelaskan kasus yang sering muncul dan pegawai baru menafsirkan langkah secara berbeda.",
    best: "Catat kasus yang berulang, sepakati pemilik pembaruan, dan uji draf baru pada pengguna dengan pengalaman berbeda.",
    alternatives: [
      "Salin panduan lama agar cepat selesai.",
      "Biarkan setiap pegawai membuat aturannya sendiri.",
      "Tunggu instruksi rinci tanpa mengumpulkan masalah.",
      "Hapus panduan karena sulit diperbarui.",
    ],
    explanation:
      "Masukan dari pengguna dan uji kasus nyata menemukan bagian yang rancu sebelum panduan diperluas. Penanggung jawab mencegah pembaruan terhenti.",
    tip: "Uji petunjuk dengan pekerjaan nyata dan orang yang belum terbiasa dengan proses.",
  },
  {
    context:
      "Rekan mengusulkan mengubah urutan berkas untuk membantu kenalannya yang tidak memiliki kebutuhan mendesak.",
    best: "Pertahankan urutan dan jelaskan kriteria prioritas yang berlaku sama kepada semua pemohon.",
    alternatives: [
      "Dahulukan kenalan demi menjaga hubungan.",
      "Ubah urutan diam-diam agar tidak menimbulkan pertanyaan.",
      "Batalkan semua pengecualian termasuk kebutuhan darurat.",
      "Minta pemohon lain menentukan sendiri urutannya.",
    ],
    explanation:
      "Integritas layanan memerlukan aturan yang konsisten. Pengecualian hanya layak bila berbasis kriteria objektif yang diterapkan kepada siapa pun.",
    tip: "Bedakan kebutuhan prioritas yang sah dari permintaan berbasis kedekatan.",
  },
  {
    context:
      "Beban pekerjaan meningkat setelah sistem baru diterapkan dan jumlah kesalahan ikut naik.",
    best: "Petakan tahap yang menimbulkan kesalahan, lakukan pendampingan, dan pantau mutu serta beban kerja.",
    alternatives: [
      "Minta semua pegawai bekerja lebih cepat.",
      "Anggap kesalahan sebagai kurang disiplin tanpa memeriksa proses.",
      "Hapus pemeriksaan mutu untuk mengejar jumlah.",
      "Pindahkan semua tugas kepada satu pegawai berpengalaman.",
    ],
    explanation:
      "Pola kesalahan setelah perubahan dapat menunjukkan kebutuhan pelatihan atau perbaikan proses. Pemantauan mutu dan beban memberi dasar intervensi yang sesuai.",
    tip: "Cari penyebab sistemik sebelum menyimpulkan masalah berasal dari individu.",
  },
  {
    context: "Anda menerima kritik bahwa penjelasan layanan sulit dipahami oleh warga.",
    best: "Minta contoh bagian yang membingungkan, perbaiki bahasanya, lalu minta pengguna menguji versi baru.",
    alternatives: [
      "Pertahankan teks karena sudah disahkan.",
      "Balas kritik bahwa warga seharusnya membaca lebih teliti.",
      "Ubah semua informasi tanpa memeriksa ketepatannya.",
      "Hapus petunjuk agar tidak ada kritik.",
    ],
    explanation:
      "Contoh spesifik dan uji pengguna membantu memperbaiki kejelasan tanpa mengorbankan ketepatan informasi.",
    tip: "Gunakan umpan balik untuk menguji pemahaman, bukan untuk mencari siapa yang salah.",
  },
  {
    context:
      "Tugas lintas unit terlambat karena setiap pihak mengira unit lain bertanggung jawab atas langkah berikutnya.",
    best: "Petakan alur, tetapkan penanggung jawab dan tenggat tiap tahap, lalu buat cara eskalasi kendala.",
    alternatives: [
      "Minta semua pihak bekerja lebih keras tanpa mengubah alur.",
      "Salahkan unit yang terakhir memegang berkas.",
      "Serahkan semua tahap kepada satu unit.",
      "Tunggu sampai pihak lain mengambil inisiatif.",
    ],
    explanation:
      "Kejelasan tanggung jawab dan tenggat mengurangi celah koordinasi, sementara eskalasi membantu kendala diketahui sebelum tenggat terlewati.",
    tip: "Tentukan siapa melakukan apa, kapan, dan kepada siapa hambatan dilaporkan.",
  },
  {
    context: "Cuaca buruk mengancam keselamatan tim yang sedang menjalankan tugas lapangan.",
    best: "Nilai risiko, hentikan bagian yang tidak aman, koordinasikan prosedur keselamatan, dan beri kabar perubahan jadwal.",
    alternatives: [
      "Teruskan tugas agar target tidak berubah.",
      "Minta tim memutuskan sendiri tanpa informasi risiko.",
      "Batalkan semua kegiatan berikutnya tanpa penilaian.",
      "Sembunyikan penundaan sampai ada keluhan.",
    ],
    explanation:
      "Keselamatan menjadi batas kerja. Penilaian risiko dan komunikasi membantu memilih penyesuaian yang proporsional serta menjaga akuntabilitas.",
    tip: "Target waktu tidak menghapus kewajiban menilai risiko keselamatan.",
  },
  {
    context:
      "Sebuah perubahan prosedur diumumkan mendadak dan beberapa pegawai tidak dapat mengakses materi pelatihan daring.",
    best: "Sediakan materi alternatif dan sesi tanya jawab, lalu pastikan pemahaman sebelum menerapkan perubahan penuh.",
    alternatives: [
      "Anggap semua pegawai sudah membaca pengumuman.",
      "Tunda tanpa batas dan jangan berikan informasi.",
      "Salahkan pegawai yang tidak masuk platform.",
      "Ubah prosedur hanya untuk pegawai yang mudah mengakses pelatihan.",
    ],
    explanation:
      "Penyebaran informasi perlu mempertimbangkan akses yang berbeda. Kanal alternatif dan pengecekan pemahaman membantu penerapan konsisten.",
    tip: "Pastikan perubahan dapat diakses dan dipahami oleh semua pelaksana terdampak.",
  },
];

const TKP_QUESTIONS = makeCaseQuestions("TKP", "tkp", TKP_CASES, WORK_FRAMES, 10, (index) =>
  index < 20 ? "HOTS" : "Latihan",
);

type NumericQuestion = {
  prompt: (values: number[]) => string;
  values: (variant: number) => number[];
  solve: (values: number[]) => number;
  explanation: (values: number[], answer: number) => string;
  tip: string;
};

const NUMERIC_CASES: NumericQuestion[] = [
  {
    prompt: ([total, percent]) =>
      `Dari ${total} berkas, ${percent}% belum lengkap. Berapa berkas yang sudah lengkap?`,
    values: (n) => [240 + n * 20, 10 + (n % 6) * 5],
    solve: ([total, percent]) => (total * (100 - percent)) / 100,
    explanation: ([total, percent], answer) =>
      `Berkas belum lengkap: ${total} × ${percent}% = ${(total * percent) / 100}. Kurangi dari total, sehingga ${total} − ${(total * percent) / 100} = ${answer} berkas.`,
    tip: "Hitung bagian yang belum lengkap, lalu kurangkan dari keseluruhan.",
  },
  {
    prompt: ([workers, hours, items]) =>
      `${workers} petugas menyelesaikan ${items} berkas dalam ${hours} jam dengan laju tetap. Berapa berkas yang dapat diselesaikan ${workers + 2} petugas dalam ${hours} jam?`,
    values: (n) => [3 + (n % 5), 2 + (n % 4), (3 + (n % 5)) * (20 + n)],
    solve: ([workers, , items]) => (items / workers) * (workers + 2),
    explanation: ([workers, , items], answer) =>
      `Laju tiap petugas adalah ${items} ÷ ${workers}. Dengan ${workers + 2} petugas selama waktu sama, hasilnya ${answer} berkas.`,
    tip: "Ubah jumlah petugas secara proporsional karena waktu dan laju tetap.",
  },
  {
    prompt: ([count, average, known]) =>
      `Rata-rata waktu ${count} layanan adalah ${average} menit. Jumlah waktu ${count - 1} layanan pertama adalah ${known} menit. Berapa waktu layanan terakhir?`,
    values: (n) => [4 + (n % 5), 20 + n, (3 + (n % 5)) * (20 + n) - 2],
    solve: ([count, average, known]) => count * average - known,
    explanation: ([count, average, known], answer) =>
      `Total waktu adalah ${count} × ${average} = ${count * average} menit. Kurangi ${known} menit yang sudah diketahui; sisanya ${answer} menit.`,
    tip: "Ubah rata-rata menjadi total sebelum mencari nilai yang belum diketahui.",
  },
  {
    prompt: ([a, b, total]) =>
      `Perbandingan jumlah berkas unit A dan B adalah ${a}:${b}. Jika totalnya ${total}, berapa berkas milik unit A?`,
    values: (n) => [2 + (n % 5), 3 + ((n * 2) % 6), (2 + (n % 5) + 3 + ((n * 2) % 6)) * (10 + n)],
    solve: ([a, b, total]) => (a * total) / (a + b),
    explanation: ([a, b, total], answer) =>
      `Jumlah bagian ${a} + ${b} = ${a + b}. Satu bagian bernilai ${total} ÷ ${a + b}; bagian A bernilai ${a} × ${total} ÷ ${a + b} = ${answer}.`,
    tip: "Jumlahkan bagian perbandingan, lalu kalikan bagian yang dicari.",
  },
  {
    prompt: ([start, step, n]) =>
      `Jumlah laporan pada minggu pertama ${start}. Setiap minggu bertambah ${step} laporan. Berapa jumlah laporan pada minggu ke-${n}?`,
    values: (v) => [12 + v * 3, 3 + (v % 7), 5 + (v % 6)],
    solve: ([start, step, n]) => start + (n - 1) * step,
    explanation: ([start, step, n], answer) =>
      `Dari minggu pertama ke minggu ke-${n} ada ${n - 1} kenaikan. Maka ${start} + (${n - 1} × ${step}) = ${answer} laporan.`,
    tip: "Jumlah kenaikan adalah nomor minggu dikurangi satu.",
  },
  {
    prompt: ([first, second, third, fourth]) =>
      `Perhatikan pola bilangan ${first}, ${second}, ${third}, ${fourth}, ... Jika pola selisih bertambah tetap, bilangan berikutnya adalah ...`,
    values: (n) => {
      const d = 2 + (n % 7);
      const dd = 1 + (n % 4);
      return [3 + n, 3 + n + d, 3 + n + 2 * d + dd, 3 + n + 3 * d + 3 * dd];
    },
    solve: ([, second, third, fourth]) =>
      fourth + (fourth - third) + (fourth - third - (third - second)),
    explanation: ([, second, third, fourth], answer) => {
      const d1 = third - second;
      const d2 = fourth - third;
      return `Selisih berturut-turut adalah ${d1} dan ${d2}; selisih itu bertambah ${d2 - d1}. Selisih berikutnya ${d2 + (d2 - d1)}, sehingga bilangan berikutnya ${fourth} + ${d2 + (d2 - d1)} = ${answer}.`;
    },
    tip: "Bandingkan selisih berurutan sebelum menebak pola bilangan.",
  },
  {
    prompt: ([workers, days, jobs]) =>
      `${workers} petugas menyelesaikan pekerjaan dalam ${days} hari. Dengan produktivitas sama, berapa hari yang dibutuhkan ${workers + 2} petugas?`,
    values: (n) => [4 + (n % 7), (6 + (n % 7)) * (6 + n), 0],
    solve: ([workers, days]) => (workers * days) / (workers + 2),
    explanation: ([workers, days], answer) =>
      `Beban kerja tetap ${workers} × ${days} = ${workers * days} petugas-hari. Bagi dengan ${workers + 2} petugas: ${workers * days} ÷ ${workers + 2} = ${answer} hari.`,
    tip: "Untuk beban tetap, jumlah petugas dan waktu berbanding terbalik.",
  },
  {
    prompt: ([price, percent]) =>
      `Sebuah perlengkapan berharga Rp${price.toLocaleString("id-ID")}. Diskon ${percent}% diberikan saat pembelian. Berapa harga setelah diskon?`,
    values: (n) => [100000 + n * 12500, 10 + (n % 6) * 5],
    solve: ([price, percent]) => (price * (100 - percent)) / 100,
    explanation: ([price, percent], answer) =>
      `Harga setelah diskon adalah ${price} × (${100} − ${percent})% = ${answer.toLocaleString("id-ID")} rupiah.`,
    tip: "Kalikan harga awal dengan persentase yang masih harus dibayar.",
  },
  {
    prompt: ([a, b, c]) =>
      `Nilai tiga kelompok masing-masing ${a}, ${b}, dan ${c} berkas. Berapa rata-rata jumlah berkas per kelompok?`,
    values: (n) => [18 + n * 2, 24 + n * 3, 30 + n * 4],
    solve: (v) => v.reduce((sum, value) => sum + value, 0) / v.length,
    explanation: ([a, b, c], answer) =>
      `Jumlahkan seluruh nilai: ${a} + ${b} + ${c} = ${a + b + c}. Bagi tiga kelompok, sehingga rata-ratanya ${answer}.`,
    tip: "Rata-rata kelompok adalah jumlah seluruh nilai dibagi banyak kelompok.",
  },
  {
    prompt: ([distance, speed]) =>
      `Sebuah kendaraan menempuh ${distance} km dengan kecepatan rata-rata ${speed} km/jam. Berapa lama perjalanan dalam menit?`,
    values: (n) => [36 + n * 6, 30 + n * 5],
    solve: ([distance, speed]) => (distance / speed) * 60,
    explanation: ([distance, speed], answer) =>
      `Waktu dalam jam adalah ${distance} ÷ ${speed}. Kalikan 60 untuk mengubahnya menjadi ${answer} menit.`,
    tip: "Bagi jarak dengan kecepatan, kemudian ubah jam ke menit.",
  },
  {
    prompt: ([a, b, both]) =>
      `Dari ${a + b + 60} peserta, ${a + 30} memilih pelatihan A, ${b + 30} memilih B, dan ${both} memilih keduanya. Berapa peserta memilih sedikitnya satu?`,
    values: (n) => [20 + n * 2, 25 + n * 3, 5 + (n % 12)],
    solve: ([a, b, both]) => a + 30 + b + 30 - both,
    explanation: ([a, b, both], answer) =>
      `Gunakan prinsip inklusi-eksklusi: ${a + 30} + ${b + 30} − ${both} = ${answer}. Peserta yang memilih dua kegiatan tidak dihitung ganda.`,
    tip: "Kurangi irisan agar anggota yang memilih dua kelompok tidak terhitung dua kali.",
  },
  {
    prompt: ([success, total]) =>
      `Dalam ${total} berkas, terdapat ${success} berkas yang memerlukan pemeriksaan ulang. Jika satu berkas dipilih acak, berapa peluang terpilihnya berkas yang perlu diperiksa, dalam persen?`,
    values: (n) => [2 + (n % 8), 20 + n * 3],
    solve: ([success, total]) => (success / total) * 100,
    explanation: ([success, total], answer) =>
      `Peluang = kejadian yang diinginkan ÷ semua kemungkinan = ${success}/${total} = ${answer}%.`,
    tip: "Nyatakan banyak kejadian yang dicari dibandingkan seluruh hasil yang mungkin.",
  },
  {
    prompt: ([rate, hours, target]) =>
      `Satu tim memproses ${rate} berkas per jam selama ${hours} jam. Berapa berkas yang masih harus diproses untuk mencapai target ${target}?`,
    values: (n) => [12 + n * 2, 3 + (n % 6), (12 + n * 2) * (3 + (n % 6)) + 20 + n],
    solve: ([rate, hours, target]) => target - rate * hours,
    explanation: ([rate, hours, target], answer) =>
      `Jumlah yang sudah diproses ${rate} × ${hours} = ${rate * hours}. Sisa menuju target ${target} adalah ${target} − ${rate * hours} = ${answer}.`,
    tip: "Hitung capaian aktual terlebih dahulu, lalu bandingkan dengan target.",
  },
  {
    prompt: ([old, increase]) =>
      `Jumlah pemohon meningkat dari ${old} menjadi ${old + increase}. Berapa persen kenaikannya terhadap jumlah semula?`,
    values: (n) => [80 + n * 10, 8 + (n % 9) * 4],
    solve: ([old, increase]) => (increase / old) * 100,
    explanation: ([old, increase], answer) =>
      `Kenaikan adalah ${increase}. Persentase terhadap nilai awal: ${increase} ÷ ${old} × 100% = ${answer}%.`,
    tip: "Gunakan nilai awal sebagai penyebut saat menghitung persentase kenaikan.",
  },
];

function numericQuestions(variants = 10, start = 0): Question[] {
  return NUMERIC_CASES.flatMap((item, family) =>
    Array.from({ length: variants }, (_, variant) => {
      const index = family * variants + variant;
      const values = item.values(variant + start);
      const answer = item.solve(values);
      const offsets = answer % 1 === 0 ? [-2, -1, 1, 2] : [-2, -1, 1, 2].map((n) => n / 2);
      const choices = shuffledOptions(
        String(answer),
        offsets.map((offset) => String(answer + offset)),
        index,
      );
      return {
        id: `tiu-bank-${String(index + 1).padStart(3, "0")}`,
        subject: "TIU" as const,
        prompt: item.prompt(values),
        options: choices.options,
        answer: choices.answer,
        explanation: item.explanation(values, answer),
        tip: item.tip,
        difficulty: index < 20 ? ("HOTS" as const) : ("Latihan" as const),
      };
    }),
  );
}

const PPPK_DISTRACTORS: Record<
  "Manajerial" | "Sosial Kultural" | "Teknis",
  [string, string, string, string]
> = {
  Manajerial: [
    "Menetapkan keputusan sepihak tanpa memeriksa dampak.",
    "Menunda semua pekerjaan sampai masalah selesai sendiri.",
    "Mengejar jumlah hasil dengan mengabaikan mutu.",
    "Menyalahkan anggota sebelum mencari penyebab.",
  ],
  "Sosial Kultural": [
    "Menganggap semua orang memiliki kebutuhan dan akses yang sama.",
    "Meminta pihak yang kesulitan menyesuaikan diri tanpa dukungan.",
    "Membagikan informasi pribadi kepada pihak yang tidak berwenang.",
    "Mengakhiri komunikasi tanpa memastikan pemahaman.",
  ],
  Teknis: [
    "Mengubah data sumber agar hasil tampak sesuai target.",
    "Menghapus catatan pemeriksaan untuk mempercepat proses.",
    "Menggunakan akses pribadi di luar prosedur.",
    "Mengirim hasil tanpa memeriksa konsistensi dan kelengkapannya.",
  ],
};

function pppkQuestions(
  subject: "Manajerial" | "Sosial Kultural" | "Teknis",
  prefix: string,
  cases: readonly Omit<CaseItem, "alternatives">[],
  count: number,
) {
  const items: CaseItem[] = cases.map((item) => ({
    ...item,
    alternatives: PPPK_DISTRACTORS[subject],
  }));
  return makeCaseQuestions(subject, prefix, items, WORK_FRAMES, 2).slice(0, count);
}

const MANAGERIAL_CASES = [
  {
    context: "Dua unit mengajukan prioritas berbeda dan antrean layanan bertambah.",
    best: "Bandingkan dampak, tenggat, dan kapasitas lalu sepakati urutan kerja serta penanggung jawab.",
    explanation:
      "Prioritas berbasis dampak dan tenggat membantu unit menyelaraskan sumber daya dengan kebutuhan pengguna.",
    tip: "Gunakan kriteria yang disepakati dan jelaskan alasan prioritas.",
  },
  {
    context: "Target kuantitas tercapai, tetapi kesalahan pemeriksaan meningkat.",
    best: "Analisis sumber kesalahan dan perbaiki proses sambil memantau mutu serta capaian.",
    explanation:
      "Jumlah hasil saja tidak cukup bila kualitas menurun. Analisis penyebab menentukan apakah perlu pelatihan, pemeriksaan, atau perbaikan alur.",
    tip: "Pantau indikator hasil dan mutu secara bersamaan.",
  },
  {
    context: "Pegawai baru lambat karena belum menguasai aplikasi kerja.",
    best: "Dampingi satu siklus, tetapkan target belajar bertahap, lalu evaluasi perkembangannya.",
    explanation:
      "Pendampingan terarah memperbaiki kesenjangan keterampilan tanpa mengambil seluruh tanggung jawab dari pegawai.",
    tip: "Sesuaikan dukungan dengan penyebab dan tingkat penguasaan tugas.",
  },
  {
    context: "Perubahan prosedur dipahami berbeda oleh beberapa anggota tim.",
    best: "Rangkum aturan, buka sesi klarifikasi, dan pastikan semua anggota memakai versi prosedur yang sama.",
    explanation: "Sumber acuan tunggal dan pengecekan pemahaman mencegah variasi pelaksanaan.",
    tip: "Pastikan instruksi dapat diakses dan dipahami sebelum menilai kepatuhan.",
  },
  {
    context: "Proyek lintas unit tertunda karena kepemilikan setiap tahapan tidak jelas.",
    best: "Petakan tahapan, tetapkan pemilik dan tenggat, lalu sepakati jalur eskalasi hambatan.",
    explanation:
      "Pembagian tanggung jawab yang eksplisit mengurangi pekerjaan terlewat dan mempercepat koordinasi.",
    tip: "Setiap keluaran perlu pemilik, tenggat, dan cara melaporkan kendala.",
  },
  {
    context: "Satu anggota tim sering memberi hasil baik tetapi melewati prosedur pencatatan.",
    best: "Bahas risikonya dengan bukti, sepakati perbaikan, dan pantau kepatuhan secara konsisten.",
    explanation:
      "Kinerja dan kepatuhan sama-sama penting. Umpan balik spesifik memberi kesempatan memperbaiki perilaku sebelum tindak lanjut berikutnya.",
    tip: "Sampaikan dampak perilaku dan standar yang perlu dipenuhi.",
  },
  {
    context: "Kapasitas tim turun sementara permintaan layanan meningkat.",
    best: "Petakan pekerjaan kritis, alihkan kapasitas secara terbuka, dan komunikasikan estimasi yang realistis.",
    explanation:
      "Pemimpin perlu melindungi layanan paling berdampak tanpa membuat janji yang tidak didukung kapasitas.",
    tip: "Sesuaikan rencana dengan kapasitas nyata dan sampaikan perubahan sejak awal.",
  },
  {
    context: "Data kinerja dari dua unit memakai definisi indikator yang berbeda.",
    best: "Samakan definisi dan periode data sebelum membandingkan capaian atau menetapkan tindakan.",
    explanation:
      "Perbandingan dengan ukuran yang tidak setara dapat menyesatkan keputusan dan penilaian tim.",
    tip: "Validasi definisi, sumber, dan periode sebelum menggabungkan data.",
  },
  {
    context: "Anggota tim menolak gagasan baru karena pengalaman buruk pada perubahan sebelumnya.",
    best: "Dengarkan risiko yang mereka lihat, uji perubahan dalam lingkup kecil, dan gunakan hasilnya untuk perbaikan.",
    explanation:
      "Uji coba terukur mengurangi risiko dan memberi bukti yang relevan untuk membangun dukungan.",
    tip: "Tanggapi keberatan dengan bukti dan uji terbatas, bukan tekanan.",
  },
  {
    context: "Tugas penting hanya dikuasai satu pegawai yang akan cuti.",
    best: "Dokumentasikan langkah kunci dan latih pengganti melalui praktik dengan pemeriksaan hasil.",
    explanation:
      "Transfer pengetahuan mengurangi ketergantungan pada satu orang dan menjaga kesinambungan layanan.",
    tip: "Rencanakan dokumentasi dan serah terima sebelum kebutuhan mendesak muncul.",
  },
  {
    context: "Anggota tim memberikan usulan perbaikan tetapi tidak memiliki data lengkap.",
    best: "Uji skala kecil dengan indikator yang disepakati sebelum memutuskan penerapan luas.",
    explanation:
      "Eksperimen terbatas memungkinkan pembelajaran tanpa menganggap hipotesis sebagai fakta.",
    tip: "Bedakan dugaan awal dari hasil yang sudah diukur.",
  },
  {
    context: "Tugas rutin dan permintaan mendesak bersaing untuk kapasitas yang sama.",
    best: "Nilai tenggat, dampak, serta risiko tiap pekerjaan dan komunikasikan penyesuaian jadwal.",
    explanation:
      "Prioritas transparan membantu pihak terkait memahami konsekuensi perubahan dan mengurangi pekerjaan yang terlewat.",
    tip: "Bandingkan urgensi dengan dampak penundaan.",
  },
  {
    context:
      "Rapat rutin menghasilkan banyak catatan tetapi sedikit keputusan yang ditindaklanjuti.",
    best: "Akhiri rapat dengan keputusan, pemilik tindakan, tenggat, dan cara mengecek kemajuannya.",
    explanation:
      "Tindak lanjut yang terukur mengubah diskusi menjadi pekerjaan yang dapat dipantau.",
    tip: "Catat siapa melakukan apa dan kapan hasilnya ditinjau.",
  },
  {
    context:
      "Seorang pegawai membuat kesalahan berulang setelah menerima instruksi yang berubah-ubah.",
    best: "Periksa kejelasan instruksi, tetapkan acuan tertulis, lalu beri umpan balik pada pekerjaan berikutnya.",
    explanation:
      "Sebelum menyimpulkan masalah individu, pemimpin perlu memastikan ekspektasi dan sumber acuan konsisten.",
    tip: "Cari faktor proses dan faktor keterampilan sebelum menentukan tindakan.",
  },
  {
    context:
      "Beberapa anggota mengalami beban berlebih sementara anggota lain memiliki kapasitas kosong.",
    best: "Tinjau beban dan kompetensi, redistribusikan tugas dengan persetujuan, lalu pantau hasilnya.",
    explanation:
      "Distribusi berbasis kapasitas membantu tim mencapai target tanpa membebani orang yang sama terus-menerus.",
    tip: "Gunakan gambaran beban nyata, bukan asumsi tentang kapasitas.",
  },
  {
    context: "Pimpinan meminta hasil cepat meskipun satu pemeriksaan wajib belum dilakukan.",
    best: "Jelaskan risiko melewati pemeriksaan dan usulkan percepatan langkah lain yang tetap memenuhi kontrol.",
    explanation:
      "Target waktu tidak menghapus kontrol penting. Alternatif yang aman menjaga mutu sekaligus menunjukkan inisiatif.",
    tip: "Sampaikan risiko dan pilihan yang tetap mematuhi standar.",
  },
  {
    context: "Anggota berbeda pendapat tentang solusi tetapi data masalah sudah tersedia.",
    best: "Sepakati ukuran keberhasilan lalu bandingkan solusi terhadap bukti dan dampaknya.",
    explanation:
      "Kriteria bersama mengurangi debat preferensi dan membantu memilih solusi sesuai kebutuhan.",
    tip: "Tentukan cara menilai sebelum membandingkan pilihan.",
  },
  {
    context: "Serah terima pekerjaan belum lengkap dan batas waktu penerima manfaat semakin dekat.",
    best: "Konfirmasi status dan risiko, lengkapi catatan yang diperlukan, lalu tetapkan kontak untuk tindak lanjut.",
    explanation:
      "Serah terima yang jelas menjaga kesinambungan dan memastikan risiko tidak hilang saat tanggung jawab berpindah.",
    tip: "Pastikan status, langkah berikutnya, dan penanggung jawab tercatat.",
  },
  {
    context:
      "Indikator bulanan menurun, tetapi tim belum memeriksa perubahan volume dan jenis permintaan.",
    best: "Periksa konteks dan konsistensi data sebelum menetapkan penyebab atau menyalahkan pelaksana.",
    explanation:
      "Perubahan volume atau komposisi pekerjaan dapat memengaruhi indikator; analisis konteks mendahului intervensi.",
    tip: "Validasi tren dan konteks sebelum menarik kesimpulan.",
  },
];

const SOCIAL_CASES = [
  {
    context: "Pemohon tidak fasih berbahasa Indonesia dan perlu memahami isi dokumen layanan.",
    best: "Gunakan dukungan bahasa yang tersedia dan pastikan informasi serta persetujuan dipahami.",
    explanation:
      "Bantuan bahasa mendukung akses dan persetujuan yang bermakna sambil melindungi martabat pemohon.",
    tip: "Periksa pemahaman, bukan hanya apakah informasi sudah dibacakan.",
  },
  {
    context: "Pengguna kursi roda kesulitan mencapai meja layanan yang terlalu tinggi.",
    best: "Tawarkan tempat dan cara pelayanan yang aksesibel tanpa memaksa pengguna berpindah atau menunggu tanpa kepastian.",
    explanation:
      "Akomodasi yang mempertimbangkan pilihan pengguna mengurangi hambatan layanan dan menjaga kemandirian.",
    tip: "Tanyakan bentuk akomodasi yang dibutuhkan sebelum bertindak.",
  },
  {
    context: "Warga lanjut usia kesulitan membaca petunjuk digital berukuran kecil.",
    best: "Tanyakan bantuan yang diinginkan, sampaikan dengan jelas, dan pastikan keputusan tetap pada warga.",
    explanation: "Bantuan yang disetujui memberi akses tanpa mengambil alih pilihan pribadi.",
    tip: "Sesuaikan cara komunikasi dengan kebutuhan pengguna.",
  },
  {
    context: "Dua kelompok budaya berbeda menafsirkan tata cara kegiatan bersama.",
    best: "Dengarkan kebutuhan masing-masing dan sepakati aturan yang memungkinkan partisipasi tanpa pemaksaan.",
    explanation:
      "Dialog dan kesepakatan sukarela menjaga tujuan bersama sambil menghormati perbedaan.",
    tip: "Cari aturan yang melindungi partisipasi, bukan menyeragamkan kebiasaan.",
  },
  {
    context:
      "Seorang warga mengeluhkan perlakuan tidak sopan dan khawatir identitasnya diketahui petugas lain.",
    best: "Dengarkan secara privat, jelaskan jalur pengaduan, dan batasi akses informasi sesuai kebutuhan penanganan.",
    explanation:
      "Penanganan yang menghormati privasi mendorong warga menyampaikan masalah dan memungkinkan tindak lanjut yang aman.",
    tip: "Jaga kerahasiaan dan jelaskan proses tindak lanjut.",
  },
  {
    context: "Warga yang tidak memiliki telepon pintar tertinggal dari pengumuman layanan.",
    best: "Sediakan kanal informasi non-digital dan pastikan isi serta tenggatnya sama.",
    explanation: "Kanal alternatif mencegah akses layanan bergantung pada kepemilikan perangkat.",
    tip: "Pertahankan kesetaraan informasi di semua kanal.",
  },
  {
    context: "Seorang pengguna tampak bingung tetapi tidak meminta bantuan karena antrean ramai.",
    best: "Tawarkan bantuan secara sopan tanpa mengasumsikan kebutuhan atau mengambil alih proses.",
    explanation:
      "Tawaran yang tidak memaksa menjaga otonomi pengguna sekaligus membuka akses bantuan.",
    tip: "Tawarkan, jangan berasumsi atau langsung mengambil alih.",
  },
  {
    context: "Penerjemah informal menemani pemohon dan meminta melihat dokumen sensitif.",
    best: "Pastikan persetujuan pemohon dan gunakan dukungan bahasa yang berwenang untuk informasi sensitif.",
    explanation:
      "Persetujuan dan batas akses melindungi privasi. Penerjemahan perlu cukup akurat untuk keputusan penting.",
    tip: "Jaga kerahasiaan dan pastikan pemohon menyetujui siapa yang mendampingi.",
  },
  {
    context:
      "Anak dan orang tua datang bersama, tetapi informasi yang dibutuhkan bersifat pribadi.",
    best: "Berbicara langsung dengan orang yang berhak dan meminta persetujuannya sebelum melibatkan pendamping.",
    explanation:
      "Pendampingan harus menghormati privasi, kapasitas, dan persetujuan pihak yang menerima layanan.",
    tip: "Jangan mengalihkan komunikasi kepada pendamping tanpa persetujuan.",
  },
  {
    context:
      "Warga dari kelompok minoritas menyampaikan keluhan dalam forum yang didominasi kelompok lain.",
    best: "Beri ruang bicara yang aman, catat pokok masalah, dan jelaskan bagaimana masukan akan ditindaklanjuti.",
    explanation:
      "Kesempatan menyampaikan pengalaman membantu keputusan mempertimbangkan pihak yang paling terdampak.",
    tip: "Periksa apakah format forum membuat sebagian suara sulit terdengar.",
  },
  {
    context: "Pemohon menunjukkan emosi setelah beberapa kali diminta mengulang dokumen yang sama.",
    best: "Akui ketidaknyamanan, telusuri riwayat proses, lalu jelaskan langkah berikutnya secara spesifik.",
    explanation:
      "Memahami penyebab pengulangan mencegah warga kembali menghadapi kendala yang sama.",
    tip: "Cari akar masalah dan beri penjelasan yang dapat ditindaklanjuti.",
  },
  {
    context:
      "Kegiatan kelompok menjadwalkan sesi panjang tanpa jeda, sehingga peserta dengan kebutuhan kesehatan kesulitan ikut.",
    best: "Sesuaikan jeda dan sediakan cara memberi tahu kebutuhan secara privat sebelum kegiatan.",
    explanation:
      "Penyesuaian yang wajar membantu partisipasi tanpa meminta peserta mengumumkan kondisi pribadinya.",
    tip: "Rancang akses dan jeda sebagai bagian dari kegiatan sejak awal.",
  },
  {
    context:
      "Komentar bernada stereotip muncul dalam diskusi kerja dan anggota yang terdampak menjadi diam.",
    best: "Hentikan komentar dengan tenang, tegaskan standar saling menghormati, dan buka ruang aman untuk melanjutkan diskusi.",
    explanation:
      "Respons segera menandai batas perilaku dan menjaga kesempatan berpartisipasi tanpa mempermalukan pihak terdampak.",
    tip: "Tanggapi perilaku dan dampaknya, bukan menyerang identitas orang.",
  },
  {
    context: "Seorang warga tidak dapat mengikuti instruksi tertulis karena hambatan penglihatan.",
    best: "Tanyakan format yang dapat diakses dan sampaikan informasi dengan cara yang dipilih warga.",
    explanation:
      "Format aksesibel memastikan warga menerima informasi yang sama dan dapat menentukan tindakannya.",
    tip: "Tanyakan format yang dibutuhkan; jangan menentukan kebutuhan atas nama warga.",
  },
  {
    context:
      "Dua pemohon mendapat hasil berbeda karena petugas menjelaskan syarat dengan cara yang tidak konsisten.",
    best: "Periksa pedoman bersama, koreksi informasi yang keliru, dan samakan penjelasan tanpa menyalahkan pemohon.",
    explanation:
      "Ketidakkonsistenan informasi perlu diperbaiki pada proses agar pemohon menerima kesempatan yang setara.",
    tip: "Perbaiki sumber inkonsistensi, lalu pastikan semua petugas menggunakan acuan sama.",
  },
  {
    context: "Kelompok masyarakat meminta jadwal layanan menyesuaikan pola kerja musiman mereka.",
    best: "Tinjau data kebutuhan dan uji penyesuaian jadwal dengan kriteria layanan yang transparan.",
    explanation:
      "Pengujian berbasis kebutuhan dapat memperluas akses dan memberi dasar untuk menilai kelayakan jangka panjang.",
    tip: "Gunakan kebutuhan dan hasil uji, bukan anggapan tentang suatu kelompok.",
  },
  {
    context: "Pemohon tidak memahami istilah teknis pada surat keputusan.",
    best: "Jelaskan istilah dengan bahasa sederhana dan pastikan pemohon memahami pilihan serta tenggatnya.",
    explanation:
      "Bahasa yang mudah dipahami mendukung akses informasi tanpa mengubah isi keputusan.",
    tip: "Gunakan kata yang dikenal dan minta pemohon menjelaskan kembali langkahnya.",
  },
  {
    context: "Relawan mengunggah foto penerima bantuan tanpa meminta persetujuan.",
    best: "Hentikan penyebaran, minta penghapusan melalui kanal terkait, dan ingatkan prosedur persetujuan serta privasi.",
    explanation:
      "Dokumentasi tidak menghapus hak privasi penerima. Penanganan cepat membatasi dampak dan mencegah kejadian berulang.",
    tip: "Minta persetujuan sebelum mendokumentasikan atau membagikan identitas.",
  },
  {
    context:
      "Seorang pemohon meminta waktu untuk membaca ulang persetujuan sebelum menyerahkan dokumen.",
    best: "Beri waktu yang wajar, jelaskan bagian yang ditanyakan, dan hormati keputusan pemohon.",
    explanation:
      "Persetujuan perlu diberikan setelah informasi dipahami. Memberi waktu dan penjelasan menjaga pilihan tetap berada pada pemohon.",
    tip: "Pastikan persetujuan diberikan dengan pemahaman, bukan karena tekanan antrean.",
  },
];

const TECHNICAL_CASES = [
  {
    context: "Data rekap dari dua sumber berbeda jumlahnya dan batas waktu laporan dekat.",
    best: "Tandai angka sementara, telusuri perbedaan sumber, dan laporkan status verifikasi beserta waktu pembaruan.",
    explanation:
      "Memisahkan angka sementara dari angka terverifikasi menjaga akurasi tanpa menyembunyikan status pekerjaan.",
    tip: "Nyatakan sumber, status verifikasi, dan batas data yang digunakan.",
  },
  {
    context:
      "Berkas digital dapat dibuka tetapi ukuran dan jumlah halamannya berbeda dari dokumen sumber.",
    best: "Bandingkan isi, urutan, dan kelengkapan terhadap sumber sebelum menyatakan berkas siap.",
    explanation:
      "File yang terbuka belum tentu lengkap atau akurat. Pemeriksaan isi mencegah kehilangan informasi.",
    tip: "Validasi isi dan kelengkapan, bukan hanya keberhasilan membuka file.",
  },
  {
    context:
      "Rumus pada lembar kerja mengubah satuan dan hasil terlihat jauh di luar rentang historis.",
    best: "Telusuri rumus dan satuan pada beberapa baris uji, lalu rekonsiliasi hasil dengan sumber.",
    explanation:
      "Pemeriksaan sampel dan satuan membantu menemukan kesalahan logika sebelum nilai dipakai lebih luas.",
    tip: "Periksa asumsi, satuan, rumus, dan hasil pembanding.",
  },
  {
    context: "Permintaan pembaruan data datang melalui berkas tanpa identitas pengirim yang jelas.",
    best: "Verifikasi sumber dan otorisasi, simpan salinan asli, lalu terapkan perubahan melalui prosedur resmi.",
    explanation:
      "Verifikasi dan jejak perubahan membantu mencegah manipulasi serta memungkinkan audit.",
    tip: "Pertahankan sumber asli dan catat setiap perubahan yang disahkan.",
  },
  {
    context:
      "Format tanggal yang berbeda membuat sebagian nilai terbaca sebagai bulan, sebagian sebagai hari.",
    best: "Tetapkan format baku, konversi dari sumber terverifikasi, dan validasi sampel sebelum pemrosesan penuh.",
    explanation: "Format konsisten mencegah tanggal bergeser dan hasil analisis salah.",
    tip: "Normalisasi format berdasarkan sumber, bukan tebakan sistem.",
  },
  {
    context: "Daftar memuat entri ganda dengan ejaan nama yang sedikit berbeda.",
    best: "Gunakan pengenal yang sah untuk meninjau kemungkinan duplikasi sebelum menghapus atau menggabungkan baris.",
    explanation:
      "Kemiripan nama saja tidak cukup untuk menghapus data; pemeriksaan pengenal mencegah catatan berbeda tergabung.",
    tip: "Jangan menghapus duplikasi hanya berdasarkan kecocokan teks.",
  },
  {
    context: "Satu kolom kosong dapat berarti belum diperiksa atau memang tidak berlaku.",
    best: "Periksa definisi dan sumber, bedakan status kosong, lalu dokumentasikan aturan pengisian.",
    explanation:
      "Nilai kosong dengan makna berbeda harus dibedakan agar pengolahan tidak mengubah data secara keliru.",
    tip: "Tetapkan arti nilai kosong sebelum mengisi atau menganalisisnya.",
  },
  {
    context: "Laporan otomatis menghasilkan angka berbeda setelah daftar kode kategori diperbarui.",
    best: "Bandingkan pemetaan kode sebelum dan sesudah, uji kategori terdampak, lalu catat versi yang digunakan.",
    explanation:
      "Perubahan kode dapat mengubah klasifikasi. Pengujian terarah menunjukkan sumber selisih dan membuat hasil dapat direproduksi.",
    tip: "Catat versi referensi dan uji seluruh kategori yang berubah.",
  },
  {
    context: "Pemohon mengirim tangkapan layar yang terpotong sebagai bukti pendukung.",
    best: "Minta bagian yang diperlukan melalui kanal resmi dan tandai berkas belum lengkap sampai dapat diverifikasi.",
    explanation:
      "Bukti yang tidak utuh belum cukup untuk memeriksa konteks. Permintaan ulang sebaiknya membatasi data yang dibagikan.",
    tip: "Jelaskan bagian yang perlu dilengkapi dan gunakan kanal resmi.",
  },
  {
    context: "Hasil ekspor tidak memuat beberapa baris di bagian akhir daftar.",
    best: "Periksa batas rentang dan jumlah baris terhadap sumber, lalu buat ulang ekspor sebelum diserahkan.",
    explanation:
      "Rekonsiliasi jumlah baris mencegah data hilang saat pemilihan rentang atau ekspor.",
    tip: "Cocokkan jumlah dan batas data sumber dengan hasil keluaran.",
  },
  {
    context: "Seseorang meminta data mentah yang memuat kolom identitas untuk analisis umum.",
    best: "Tentukan kebutuhan minimum dan berikan data yang telah disamarkan melalui akses yang disetujui.",
    explanation:
      "Pengurangan data menjaga privasi tanpa menghalangi analisis yang tidak memerlukan identitas.",
    tip: "Berikan data minimum sesuai tujuan yang sah.",
  },
  {
    context: "Pembaruan aplikasi mengubah satuan keluaran, tetapi petunjuk lama masih dipakai tim.",
    best: "Validasi satuan pada dokumentasi dan keluaran, perbarui petunjuk, lalu informasikan perubahan sebelum pemrosesan.",
    explanation:
      "Petunjuk dan keluaran harus konsisten agar pengguna tidak mencampur skala pengukuran.",
    tip: "Pastikan dokumentasi mengikuti versi alat yang sedang digunakan.",
  },
  {
    context: "Hasil pengukuran lapangan berbeda jauh dari catatan sebelumnya.",
    best: "Ulangi pengukuran dengan prosedur yang sama dan catat kondisi yang dapat menjelaskan perbedaan.",
    explanation:
      "Pengukuran ulang dan dokumentasi konteks membedakan perubahan nyata dari kesalahan pencatatan atau metode.",
    tip: "Jangan membuang pencilan sebelum memeriksa metode dan konteksnya.",
  },
  {
    context: "Dua versi dokumen beredar tanpa penanda mana yang terakhir disahkan.",
    best: "Verifikasi versi pada pemilik dokumen, arsipkan versi terdahulu, dan bagikan satu salinan terkendali.",
    explanation: "Pengendalian versi mencegah tim bekerja dari instruksi yang berbeda.",
    tip: "Gunakan penanda versi, tanggal, dan status persetujuan.",
  },
  {
    context: "Perangkat penyimpanan hampir penuh saat proses pencadangan berjalan.",
    best: "Periksa ruang dan status salinan, gunakan media berwenang, dan verifikasi hasil pemulihan sebelum menghapus apa pun.",
    explanation:
      "Pencadangan harus dapat dipulihkan; menghapus data sebelum verifikasi dapat menyebabkan kehilangan permanen.",
    tip: "Pastikan salinan lengkap dan dapat dipulihkan sebelum perubahan destruktif.",
  },
  {
    context: "Baris data memiliki nilai di luar rentang yang mungkin menurut definisi variabel.",
    best: "Tandai nilai, cek sumber dan aturan validasi, lalu koreksi hanya berdasarkan bukti yang dapat ditelusuri.",
    explanation: "Koreksi tanpa jejak bukti dapat mengganti anomali dengan asumsi yang salah.",
    tip: "Pertahankan nilai asli dan catat dasar setiap koreksi.",
  },
  {
    context:
      "Permintaan statistik membandingkan periode dengan definisi kategori yang berubah di tengah tahun.",
    best: "Samakan definisi atau tampilkan perubahan metodologi dengan catatan yang jelas sebelum membandingkan.",
    explanation:
      "Perubahan definisi dapat membuat tren tampak berubah padahal metode pengelompokan yang berubah.",
    tip: "Jaga keterbandingan periode atau jelaskan batas perbandingannya.",
  },
  {
    context: "Sebuah file dapat diedit oleh banyak akun tanpa riwayat perubahan yang jelas.",
    best: "Batasi hak akses, aktifkan pencatatan versi pada media resmi, dan tetapkan penanggung jawab pembaruan.",
    explanation:
      "Kontrol akses dan riwayat versi membantu melindungi integritas serta melacak perubahan.",
    tip: "Terapkan hak akses minimum dan jejak perubahan yang dapat ditinjau.",
  },
  {
    context: "Hasil perhitungan berbeda setelah sebagian baris berisi teks alih-alih angka.",
    best: "Identifikasi nilai yang tidak sesuai tipe data, telusuri sumbernya, lalu validasi hasil setelah koreksi tercatat.",
    explanation:
      "Tipe data yang tidak konsisten dapat dikecualikan atau diproses keliru. Koreksi harus bisa ditelusuri dan hasil akhirnya diperiksa ulang.",
    tip: "Validasi tipe dan rentang data sebelum menarik kesimpulan dari perhitungan.",
  },
];

const PPPK_QUESTIONS = [
  ...pppkQuestions("Manajerial", "pppk-man", MANAGERIAL_CASES, 38),
  ...pppkQuestions("Sosial Kultural", "pppk-sos", SOCIAL_CASES, 37),
  ...pppkQuestions("Teknis", "pppk-tek", TECHNICAL_CASES, 37),
];

export const KEDINASAN_NUMERIC_QUESTIONS: Question[] = numericQuestions(68, 10)
  .slice(0, 940)
  .map((question, index) => ({
    ...question,
    id: `kedinasan-numerik-${index + 1}`,
    subject: "Kedinasan",
    difficulty: "Latihan",
  }));

export const BANK_EXPANSION_QUESTIONS: Question[] = [
  ...TWK_QUESTIONS,
  ...numericQuestions(),
  ...TKP_QUESTIONS,
  ...PPPK_QUESTIONS,
];
