# Verifikasi 100 paket CPNS HOTS

Lingkup: bank soal, pemilihan paket, versi sesi, katalog, dan keterangan pada halaman simulasi. Mengikuti arah Ruang Latihan pada DESIGN.md: ENERGY 1 / RHYTHM 1 / MOTION 1. Warna, tipografi, kisi, dan kontrol yang ada dipertahankan supaya peserta tetap mengenali alur latihan. Kisi bernomor memudahkan pemilihan paket; biru menandai tindakan dan pilihan aktif.

## Delivery Gate

- Hard Gate PASS untuk perubahan: tidak menambah aset, klaim statistik, tautan, atau kontrol baru. Skenario merupakan soal latihan. Paket 100 diuji dari pemilihan, konfirmasi, mulai, jawaban, penandaan, navigasi ke soal 110, penyelesaian, hasil, hingga pembahasan. Tidak ada galat konsol pada alur ini. Lebar dokumen sama dengan viewport pada pengujian 360 dan 1280 px.
- Purpose-Gate PASS: tidak menambah teknik visual. Label HOTS menjelaskan tingkat soal yang benar-benar disaring, dan keterangan bank bersama menjelaskan kemungkinan soal lintas paket berulang.
- Liveliness PASS dalam lingkup: mengikuti dials dan identitas Ruang Latihan yang ada; fokus tetap pemilihan paket dan isi soal. Tidak membuat susunan atau animasi baru.
- Craftsmanship PASS untuk fitur: 61 tes dalam 7 berkas lulus. Seluruh 100 paket CPNS memiliki susunan berbeda, 110 ID unik per paket, hanya soal HOTS, dan komposisi 30 TWK / 35 TIU / 45 TKP. Kunci numerik contoh awal dan akhir enam jenis kasus diperiksa. Seluruh 100 soal tambahan memiliki lima teks opsi berbeda, kunci, pembahasan, serta tips. Katalog mencakup seluruh soal CPNS tepat sekali. Sesi lama diuji terhadap pemilihan bank sebelumnya.

## Batas pemeriksaan

- Build produksi PASS: `npm run build` selesai setelah perubahan terakhir pada soal TIU.
- Bank baru berisi 20 kasus TWK, 20 kasus TKP, dan 60 variasi numerik dari enam jenis soal TIU. Ini bukan 11.000 soal unik; bank soal digunakan bersama antarpaket.
- Pemeriksaan browser mencakup alur yang terdampak, bukan audit seluruh kontrol situs.
- ESLint lulus pada modul data dan tes yang diubah. Pada pemeriksaan pekerjaan CPNS ini, TypeScript menemukan kesalahan lama pada `src/components/directory-tips.tsx:140`, yaitu kemungkinan nilai `tips[featured]` tidak tersedia. Fallback tersebut kemudian diperbaiki dalam pekerjaan halaman panduan; lihat `panduan-belajar.md`.
- Perubahan belum dipublikasikan atau didorong ke git remote.
