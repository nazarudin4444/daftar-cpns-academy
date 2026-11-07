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
