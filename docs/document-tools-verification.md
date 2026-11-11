# Verifikasi alat persiapan dokumen

Tanggal: 11 November 2026. Lingkup: halaman `/persiapan-dokumen`, tautan dari `/alat-belajar`, dan penjelasan privasi terkait.

## Pemeriksaan teknis

- PASS: 58 tes pada 7 berkas, termasuk 5 tes baru pemrosesan dokumen. Setelah perubahan teks privasi, 24 tes konten/SEO dijalankan kembali dan lulus.
- PASS: `npx tsc --noEmit`.
- PASS: ESLint pada komponen, modul, route, pengujian, setup tes, dan data konten yang berubah pada pekerjaan ini.
- PASS: `git diff --check`.
- PASS: build produksi melalui konfigurasi sementara dengan output `.output-documents.local`. Konfigurasi pemeriksaan telah dihapus. Build standar sebelumnya tertahan EPERM pada folder `.output/public/assets`; izin folder tersebut tidak diubah.

## Delivery gate antislop

- Hard Gate PASS untuk penambahan ini: input berlabel, tombol native, fokus terlihat, status kosong/proses/gagal tersedia, unduhan JPG/PDF/DOCX diuji di browser, tanpa angka promosi atau klaim lolos administrasi. Tidak ada animasi baru. Lebar dokumen tidak melebihi viewport pada pemeriksaan 357 dan 1280 piksel; mode terang dan malam diperiksa.
- Purpose Gate PASS: warna primer situs menandai instruksi dan hasil; border membedakan kelompok berkas. Tidak ada ilustrasi, ikon, gradien, atau klaim resmi baru. Dua kolom desktop mengikuti lima berkas administrasi, lalu beralih ke satu kolom ponsel.
- Liveliness PASS: ENERGY 2 / RHYTHM 2 / MOTION 1 mengikuti arah sesi. Judul halaman, panel pemeriksaan, dan pratinjau surat membentuk urutan baca. Aksen primer konsisten dengan ruang belajar situs.
- Craftsmanship PASS dalam lingkup tersebut: kompresi, pilihan format/batas, hapus file, pergantian jenis surat, penggantian isian, dan unduhan terhubung ke perilaku nyata. Template berlabel draf; data dan berkas tidak dikirim oleh modul pemrosesan atau disimpan ke localStorage. Memuat ulang halaman mengosongkan pilihan dan isian.

## Bukti alur browser

- Data surat sintetis menghasilkan `draf-surat-lamaran-casn.docx` dan `draf-surat-pernyataan-casn.docx`.
- PDF sintetis 1 halaman turun sekitar 32%; PDF hasil unduhan dibuka kembali menggunakan pdf-lib dan tetap memiliki 1 halaman. Tes terpisah memverifikasi PDF 2 halaman dan penolakan penanda tanda tangan digital.
- Gambar ilustrasi repositori 85,6 KB turun menjadi 34,3 KB dengan target 40 KB. Hasil unduhan dibuka dan diperiksa secara visual.
- JPG 85,6 KB ditandai di bawah minimum contoh 100 KB, kemudian batas diubah untuk pengujian kompresi.
- Tombol unduh surat tidak aktif sebelum isian lengkap dan pengakuan draf dicentang. Mengganti jenis surat menghapus pengakuan, mempertahankan isian, dan mengganti redaksi/pratinjau.

## Batas kemampuan

Preset ukuran adalah contoh, bukan verifikasi ketentuan terbaru setiap instansi. Deteksi file memeriksa penanda format, bukan autentisitas atau kelayakan administrasi. Optimasi PDF memakai object streams dan belum melakukan downsampling gambar hasil pindai; hasil dapat tidak mengecil. PDF bertanda tangan digital/e-Meterai tidak ditujukan untuk diproses. Surat adalah draf yang dapat disunting, tidak menyertakan e-Meterai, serta harus disesuaikan dengan format resmi instansi. Tidak ada pernyataan sertifikasi atau jaminan kepatuhan hukum.
