# Panduan belajar CPNS dan PPPK

Implementasi lokal untuk `/panduan`, 17 November 2026. Belum dipublikasikan.

## Fitur

- Rencana 14, 30, 60, atau 90 hari dengan alokasi 15, 30, 60, atau 90 menit sehari. Rencana CPNS dan PPPK disimpan terpisah.
- Rotasi kategori berselang-seling dengan opsi memperbanyak fokus tertentu. Agenda berisi konsep, lima soal, serta tinjauan; total alokasi mengikuti pilihan peserta.
- Agenda harian, pemilihan hari lain, gambaran seluruh periode, centang progres, dan unduhan teks.
- Tes pemetaan sembilan soal, hasil per kategori, rekomendasi fokus, pembahasan, dan pencatatan otomatis jawaban salah.
- Peta topik dari katalog CPNS dan kelompok materi PPPK, pencarian, filter kategori/status, materi, metode penalaran, jebakan, serta latihan langsung.
- Bedah HOTS untuk enam kategori. Enam contoh terkurasi mempunyai alasan untuk masing-masing dari lima pilihan; contoh lain memakai pembahasan dan tips bank soal.
- Jurnal dengan penyebab kesalahan, langkah koreksi, status tinjauan, impor jawaban salah dari simulasi jalur terpilih, penghapusan/pemulihan terakhir, dan ekspor teks.
- Evaluasi tujuh hari dengan aktivitas harian, ketepatan soal dijawab, jumlah sesi, waktu pengerjaan, grafik tugas, dan rincian tabel.
- Checklist persiapan administrasi, tautan alat dokumen/kalkulator/kamus, sumber informasi, serta FAQ penggunaan dan penyimpanan.

## Arah tampilan

Mengikuti identitas Ruang Latihan pada DESIGN.md dan permintaan pengguna untuk tampilan modern dengan tombol yang mudah dibedakan. ENERGY 2 / RHYTHM 2 / MOTION 1.

- Biru untuk belajar, latihan, dan navigasi utama; hijau untuk menyimpan/menyelesaikan; amber untuk tinjauan; netral untuk pengaturan/unduhan; merah hanya untuk penghapusan. Label dan status melengkapi warna.
- Header memperkenalkan alur, panel rencana menampilkan data pribadi sebenarnya, agenda menonjolkan tindakan berikutnya, materi memakai baris yang dapat dicari, dan evaluasi memakai grafik/tabel. Susunan mengikuti kebutuhan fitur.
- Sans-serif proyek dipertahankan demi kesinambungan dan keterbacaan. Input dan pilihan jawaban menggunakan ukuran 16 px; kontrol utama mempunyai tinggi minimum 44 px.
- Layout CSS berubah pada 640 dan 960 px. Semua kolom utama memakai lebar fleksibel; daftar navigasi dan tabel mempunyai area gulir sendiri. Focus keyboard terlihat dan reduced-motion dihormati.
- Tidak menambah gambar, testimoni, klaim kelulusan, atau statistik pengguna. Ikon buku, kalender, target, jurnal, dan grafik menamai fungsi bagian terkait.

## Delivery Gate dan bukti

- Hard Gate konten/interaksi otomatis PASS: tes memeriksa penyimpanan/pemulihan, penolakan storage, tes pemetaan, pembahasan, filter kosong, jurnal, undo, unduhan, pergantian jalur, dan pemilihan hari. Seluruh tautan mengarah ke route yang tersedia. Konten publik tetap muncul pada render HTML awal. Pemeriksaan visual browser belum terverifikasi, sebagaimana batas di bawah.
- Purpose-Gate PASS: warna memisahkan fungsi, ikon menyatakan isi, penomoran menunjukkan langkah, dan grafik memakai data aktivitas yang tersimpan. Tidak menambah efek visual dekoratif atau aset eksternal.
- Liveliness diterapkan sesuai arah 2/2/1: header, agenda, daftar materi, latihan, dan evaluasi mempunyai komposisi berbeda; fokus bergeser mengikuti tindakan belajar. Penilaian visual manual belum terverifikasi.
- Craftsmanship fungsional PASS: 82 tes dalam 10 berkas lulus; build produksi dan ESLint pada modul panduan lulus. Pengujian meliputi pergantian tanggal WIB, pergantian tahun, pemisahan rencana jalur, rotasi semua kategori, jumlah/alokasi agenda, data rusak, deduplikasi impor, dan statistik berdasarkan tanggal penyelesaian.

Kontras dihitung dari nilai OKLCH pada CSS dengan konversi ke luminansi sRGB dan rumus WCAG: biru/putih 8,10:1; hijau/putih 8,62:1; amber/teks 10,30:1; teks sekunder terang 7,11:1 pada kartu dan 6,53:1 pada tint; teks sekunder gelap 8,62:1 pada kartu dan 8,15:1 pada tint. Warna isi progress/grafik dibuat lebih terang pada mode gelap.

## Batas verifikasi dan penyimpanan

Alat Computer Use menghentikan kontrol browser karena penegakan kebijakan URL belum didukung untuk browser Windows yang tersedia. Kontrol browser tidak dilanjutkan. Karena itu tidak ada klaim telah memeriksa screenshot, reflow aktual, atau alur browser manual. Pengujian interaksi dilakukan melalui React Testing Library/JSDOM dan tidak menggantikan pemeriksaan visual di browser.

Progres disimpan di browser perangkat, tanpa sinkronisasi akun. Jurnal menyimpan maksimal 300 catatan dan pemetaan 30 hasil terbaru. Ekspor teks tidak mempunyai fasilitas impor kembali. Soal PPPK teknis merupakan latihan umum, bukan cakupan kompetensi seluruh jabatan. Tes pemetaan singkat dan ketepatan latihan tidak memprediksi hasil seleksi.

Fallback komponen tips diperbaiki dari `tips[featured]` menjadi `tips[featured] ?? tips[0]` untuk mengatasi kemungkinan nilai kosong yang sebelumnya menghalangi pemeriksaan TypeScript seluruh proyek.
