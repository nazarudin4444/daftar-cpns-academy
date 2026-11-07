# Informasi produksi terkonfirmasi

- Pengelola: Perawat Center.
- Kontak publik dan privasi: support@perawatcenter.com.
- Origin kanonis: https://daftar-cpns.com.

Informasi pengelola sudah dimasukkan ke halaman tentang kami, kontak, kebijakan privasi,
dan syarat ketentuan pada src/lib/content-pages.ts. Jangan menambahkan alamat,
identitas, nomor registrasi, atau klaim kepatuhan yang belum diberikan.

Canonical, URL JSON-LD, dan sitemap menggunakan origin di src/lib/site-config.ts.
Jalankan `bun scripts/generate-sitemap.ts` setelah menambah halaman. Sitemap hanya memuat halaman publik;
dashboard dan URL tidak dikenal tidak boleh masuk sitemap. Pertahankan noindex
pada dashboard. Robots tidak menggantikan autentikasi atau perlindungan data.

QA peluncuran: ponsel 320/390 px, tablet 768 px, desktop, keyboard, pemulihan sesi,
waktu habis, hasil tanpa jawaban, serta unduhan pembahasan. Konfirmasi pengumuman
seleksi hanya melalui sumber pemerintah; latihan tidak menetapkan passing grade.

## Gerbang SEO dan domain sebelum peluncuran

- Pastikan `https://daftar-cpns.com/` dan semua URL di sitemap merespons HTTPS `200`.
- Canonical memakai domain apex. Jika `www.daftar-cpns.com` akan dipakai, buat DNS
  record lalu redirect permanen ke apex; jika tidak, tautkan dan publikasikan apex saja.
- Setelah properti domain diverifikasi di Google Search Console, kirim
  `https://daftar-cpns.com/sitemap.xml`. Pengiriman sitemap tidak menjamin indeksasi.
- Uji halaman utama dan halaman pilar dengan URL Inspection serta Rich Results Test.
- Ukur Core Web Vitals untuk ponsel dan desktop setelah deployment; fokus pada LCP,
  INP, dan CLS. Hasil lab lokal bukan pengganti data pengguna di lapangan.
- Tambahkan konten unik yang menjawab kebutuhan tiap halaman pilar. Untuk jadwal,
  formasi, syarat, dan nilai seleksi, cantumkan sumber primer serta tanggal pemeriksaan
  hanya setelah sumber tersebut benar-benar diverifikasi.
