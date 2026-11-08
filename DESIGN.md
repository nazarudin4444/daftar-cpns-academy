# Daftar CPNS — Ruang Latihan

## Arah yang dipilih

Pengguna memilih konsep ketiga, **Ruang Latihan**, dari pratinjau desain pada 8 November 2026. Dokumen ini mencatat pilihan tersebut sebagai acuan implementasi. Pemilihan desain tidak menyatakan semua fitur atau paket pada pratinjau telah tersedia di produksi.

Platform belajar persiapan ASN harus terasa modern, rapi, tenang, dan nyaman digunakan dalam sesi panjang. Fokus visual adalah materi, pilihan paket, dan tindakan berikutnya. Identitas tetap menggunakan logo monogram **DC**, nama **DAFTAR CPNS**, serta tagline **Belajar & Latihan CAT CPNS**.

## Susunan halaman

- Desktop memakai navigasi samping yang ringkas di kiri dan area kerja utama yang luas di kanan.
- Navigasi ruang belajar: Ringkasan, Materi Belajar, Bank Soal, Simulasi CAT, dan Hasil Latihan. Tautan hanya ditampilkan jika tujuan benar-benar tersedia.
- Halaman CAT menampilkan judul, pilihan CPNS atau PPPK, paket yang dipilih, ringkasan sesi, lalu panduan sebelum mulai.
- Pilihan paket berbentuk kisi bernomor dengan label konsisten, misalnya Paket 01. Status terpilih harus terlihat tanpa bergantung pada warna saja.
- Satu tindakan utama per tahap: pilih paket, baca panduan, mulai ujian, atau tinjau hasil.
- Halaman materi memberi ruang utama pada bacaan, dengan bab dan subbab mudah ditemukan. Hindari memenuhi halaman dengan kartu statistik yang tidak membantu belajar.

## Warna dan permukaan

- Gunakan biru merek untuk tindakan utama, pilihan aktif, dan fokus interaksi.
- Latar utama putih atau netral terang; navigasi samping memakai netral yang sedikit lebih gelap. Panel paket terpilih memakai biru muda yang lembut.
- Teks utama berwarna gelap dengan kontras jelas. Teks sekunder tetap mudah dibaca.
- Amber digunakan untuk perhatian atau soal yang ditandai. Merah untuk kesalahan dan tindakan berisiko. Hijau untuk status berhasil.
- Gunakan token semantik di `src/styles.css`; implementasi warna mengikuti format OKLCH yang sudah digunakan proyek.
- Mode gelap memakai padanan token yang menjaga hierarki dan keterbacaan. Tidak menggunakan gradien dekoratif, efek kaca berlapis, atau cahaya neon.

## Tipografi dan jarak

- Gunakan sans-serif yang jelas dan konsisten dengan font proyek.
- Isi soal dan bacaan mengutamakan keterbacaan: ukuran sekitar 16–18 px, tinggi baris sekitar 1,6, dan panjang baris yang terkendali.
- Judul memiliki hierarki jelas tanpa mendominasi ruang belajar. Angka timer, nomor soal, dan skor memakai angka tabular.
- Spasi menggunakan kelipatan 4 atau 8 px. Sudut komponen sekitar 8–12 px; bayangan hanya untuk lapisan yang memang berada di atas konten.

## Ponsel dan aksesibilitas

- Navigasi samping berubah menjadi navigasi ringkas yang dapat dibuka; area belajar tetap mendapat lebar penuh.
- Kisi paket menyusut menjadi dua atau tiga kolom sesuai ruang. Jangan mengecilkan teks atau target sentuh demi mempertahankan susunan desktop.
- Tombol utama dan pilihan jawaban memiliki target sentuh minimal 44 px, fokus keyboard yang jelas, dan label yang dapat dipahami pembaca layar.
- Tampilan tetap dapat dipakai pada lebar 320 px dan saat teks diperbesar, tanpa gulir horizontal untuk konten utama.
- Gunakan kontrol HTML semantik, judul berurutan, label formulir, serta status yang tidak hanya dibedakan melalui warna.

## Alur CAT

1. Pilih jalur dan paket.
2. Baca panduan singkat: jumlah soal, durasi latihan, cara menjawab, melewati, menandai, serta mengakhiri ujian.
3. Peserta menyatakan siap, lalu menekan tombol mulai. Timer baru berjalan pada tahap ini.
4. Layar ujian fokus pada soal dan jawaban. Timer, progres, nomor soal, serta status dijawab atau ditandai mudah ditemukan.
5. Tombol Back saat ujian meminta konfirmasi. Jelaskan bahwa jawaban tersimpan dan waktu tetap berjalan jika peserta keluar.
6. Sesi tersimpan ditampilkan dengan identitas jalur dan paket sebelum peserta memilih melanjutkan.
7. Hasil menampilkan evaluasi per materi, waktu pengerjaan, pembahasan, tips, dan pilihan mengunduh hasil.

Pilihan paket pada pratinjau adalah arah antarmuka. Jumlah soal, kesiapan paket, status pengerjaan, dan hasil yang ditampilkan harus berasal dari data nyata.

## Gerak dan nada bahasa

Gunakan transisi singkat untuk memperjelas perubahan pilihan atau status. Hindari animasi berulang saat membaca dan mengerjakan soal; hormati preferensi pengurangan gerak. Intensitas acuan: **ENERGY 2 / RHYTHM 2 / MOTION 1**.

Bahasa Indonesia harus langsung dan mudah dipahami: “Pilih paket”, “Baca panduan”, “Lanjutkan ujian”, dan “Lihat pembahasan”. Hindari janji kelulusan, angka pengguna rekaan, atau tekanan promosi berlebihan.

## Identitas dan batas produk

Daftar CPNS adalah platform edukasi independen yang dikelola Perawat Center, bukan situs resmi pemerintah, BKN, atau SSCASN. Pendaftaran resmi diarahkan ke `https://sscasn.bkn.go.id`. Jangan meminta NIK atau KK. Durasi, skor, dan komposisi latihan tidak boleh disajikan sebagai aturan resmi yang belum diverifikasi.

Domain kanonis: `https://daftar-cpns.com`. Kontak publik: `support@perawatcenter.com`.

Implementasi tetap memakai TanStack Start, React, dan Tailwind yang ada. Patuhi `antislop.md` dan skill terkait. Perubahan tidak dikirim ke GitHub sampai pengguna memerintahkannya.
