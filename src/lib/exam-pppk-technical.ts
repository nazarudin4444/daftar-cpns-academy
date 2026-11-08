import type { Question } from "@/lib/exam";

export const PPPK_TECHNICAL_QUESTIONS: Question[] = [
  {
    id: "pppk-tek-hots-01",
    subject: "Teknis",
    difficulty: "HOTS",
    prompt:
      "Laporan unit A menyebut 90% dari 100 berkas selesai tepat waktu. Unit B melaporkan 60% dari 300 berkas tepat waktu. Jika kedua kelompok tidak tumpang tindih dan memakai definisi yang sama, berapa persentase gabungan yang tepat?",
    options: [
      { label: "A", text: "60%" },
      { label: "B", text: "67,5%" },
      { label: "C", text: "70%" },
      { label: "D", text: "75%" },
      { label: "E", text: "82,5%" },
    ],
    answer: "B",
    explanation:
      "Unit A menyelesaikan 90 berkas tepat waktu, sedangkan B menyelesaikan 180. Jumlahnya 270 dari 400 berkas, sehingga persentase gabungan 270/400 × 100% = 67,5%. Rata-rata sederhana 75% keliru karena ukuran kelompok berbeda.",
    tip: "Ubah persentase menjadi jumlah kejadian, jumlahkan pembilang dan penyebut, lalu hitung persentase gabungan.",
  },
  {
    id: "pppk-tek-hots-02",
    subject: "Teknis",
    difficulty: "HOTS",
    prompt:
      "Dari 600 permohonan, 150 membutuhkan pemeriksaan lanjutan. Sebanyak 20% kelompok tersebut memiliki lebih dari satu kekurangan, sedangkan sisanya hanya satu kekurangan. Berapa permohonan yang membutuhkan pemeriksaan lanjutan tetapi hanya memiliki satu kekurangan?",
    options: [
      { label: "A", text: "30" },
      { label: "B", text: "90" },
      { label: "C", text: "120" },
      { label: "D", text: "150" },
      { label: "E", text: "480" },
    ],
    answer: "C",
    explanation:
      "Dasar perhitungan 20% adalah 150 permohonan yang diperiksa lanjutan, bukan seluruh 600 permohonan. Ada 30 dengan lebih dari satu kekurangan, sehingga yang hanya satu kekurangan berjumlah 150 − 30 = 120.",
    tip: "Tandai kelompok acuan setiap persentase. Frasa 'kelompok tersebut' membatasi penyebut pada kelompok yang baru disebut.",
  },
  {
    id: "pppk-tek-hots-03",
    subject: "Teknis",
    difficulty: "HOTS",
    prompt:
      "Sistem mencatat 240 baris pengajuan. Pemeriksaan menemukan 20 pasangan baris duplikat; tiap pasangan mewakili satu pengajuan dan tidak ada kelompok duplikat lain. Setelah deduplikasi, berapa pengajuan unik yang tersisa?",
    options: [
      { label: "A", text: "200" },
      { label: "B", text: "210" },
      { label: "C", text: "220" },
      { label: "D", text: "230" },
      { label: "E", text: "240" },
    ],
    answer: "C",
    explanation:
      "Setiap pasangan berisi dua baris tetapi harus menyisakan satu baris. Jadi hanya satu baris per pasangan yang dihapus: 240 − 20 = 220. Menghapus 40 baris akan menghilangkan seluruh representasi 20 pengajuan sah.",
    tip: "Dalam deduplikasi, hitung baris berlebih, bukan seluruh baris yang termasuk kelompok duplikat.",
  },
  {
    id: "pppk-tek-hots-04",
    subject: "Teknis",
    difficulty: "HOTS",
    prompt:
      "Dua file menggunakan kode penerima yang sama sebagai kunci. File pertama memuat satu baris per penerima, sedangkan file kedua satu baris per kunjungan. Setelah digabung, total bantuan tampak meningkat meskipun tidak ada transaksi baru. Penyebab yang paling perlu diperiksa adalah ...",
    options: [
      { label: "A", text: "Perubahan urutan alfabet pada nama penerima." },
      { label: "B", text: "Perbedaan format tampilan tanggal tanpa perubahan jumlah baris." },
      { label: "C", text: "Pembulatan angka bantuan pada tampilan layar." },
      {
        label: "D",
        text: "Pengulangan nilai bantuan pada penggabungan satu penerima ke banyak kunjungan.",
      },
      { label: "E", text: "Penyimpanan file dalam folder yang berbeda." },
    ],
    answer: "D",
    explanation:
      "Penggabungan satu-ke-banyak dapat menyalin nilai bantuan penerima ke setiap baris kunjungan. Menjumlahkan kolom bantuan setelah penggabungan akan menghitung nilai yang sama berulang kali. Periksa tingkat rincian data dan agregasikan pada unit yang sesuai.",
    tip: "Sebelum menggabungkan tabel, tentukan arti satu baris di setiap tabel dan periksa keunikan kuncinya.",
  },
  {
    id: "pppk-tek-hots-05",
    subject: "Teknis",
    difficulty: "HOTS",
    prompt:
      "Petugas menyalin rumus rasio dari baris 2 ke baris 100. Pembilang harus mengikuti jumlah layanan tiap baris, sedangkan penyebut harus selalu mengambil target tahunan di sel F1. Bentuk rumus awal yang sesuai adalah ...",
    options: [
      { label: "A", text: "=B2/F1" },
      { label: "B", text: "=$B$2/F1" },
      { label: "C", text: "=B2/$F$1" },
      { label: "D", text: "=$B$2/$F$1" },
      { label: "E", text: "=B$2/F1" },
    ],
    answer: "C",
    explanation:
      "Referensi B2 relatif sehingga berubah menjadi B3, B4, dan seterusnya saat disalin ke bawah. Referensi $F$1 absolut sehingga tetap menunjuk target yang sama. Mengunci pembilang akan membuat seluruh baris memakai jumlah layanan baris 2.",
    tip: "Tentukan bagian yang boleh bergerak saat rumus disalin. Gunakan tanda dolar pada kolom dan baris yang harus tetap.",
  },
  {
    id: "pppk-tek-hots-06",
    subject: "Teknis",
    difficulty: "HOTS",
    prompt:
      "Pemindaian dokumen selesai dan hasilnya dapat dibuka. Tim hendak menghapus salinan kerja asli. Pemeriksaan tambahan paling penting sebelum mengikuti prosedur penghapusan yang berlaku adalah ...",
    options: [
      { label: "A", text: "Memastikan nama file cukup pendek agar mudah diketik." },
      {
        label: "B",
        text: "Memastikan semua halaman terbaca, metadata sesuai, penyimpanan disetujui, serta salinan cadangan dapat dipulihkan.",
      },
      { label: "C", text: "Menghitung ukuran total file tanpa membuka halaman yang dipindai." },
      {
        label: "D",
        text: "Mengirim seluruh file kepada semua pegawai agar tersedia banyak salinan.",
      },
      {
        label: "E",
        text: "Mengganti format file berulang kali untuk memastikan konversi berjalan.",
      },
    ],
    answer: "B",
    explanation:
      "File yang dapat dibuka belum tentu lengkap, terbaca, atau dapat dipulihkan saat salinan utama rusak. Pemeriksaan isi, metadata, lokasi yang berwenang, dan pemulihan cadangan mengendalikan risiko kehilangan sebelum penghapusan sesuai prosedur.",
    tip: "Bedakan keberhasilan membuat file dari keberhasilan menjaga informasi. Periksa kelengkapan, keterbacaan, kewenangan, dan kemampuan pemulihan.",
  },
];
