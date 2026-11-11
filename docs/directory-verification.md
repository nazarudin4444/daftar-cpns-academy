# Verifikasi direktori /situs

Tanggal: 11 November 2026.

## Desain

Direktori memakai warna navy dan mint situs, hierarki judul ringkas, kategori terpisah, serta kartu sumber dengan nama, domain/handle, materi, dan tombol kunjungan. Kategori menjadi dua kolom pada ponsel dan sidebar pada desktop. Pencarian memiliki label, tombol hapus, jumlah hasil, dan keadaan kosong dengan aksi reset.

## Logo kanal

Lima avatar diambil dari metadata og:image halaman kanal YouTube yang ditautkan. Nama kanal disesuaikan dengan metadata sumber. URL sumber dan tanggal pemeriksaan tersimpan di channel-logo-sources.json. Aset disajikan lokal, dengan inisial cadangan jika gambar gagal dimuat. Logo merupakan snapshot saat pemeriksaan dan perlu diperbarui jika pemilik kanal mengubahnya.

## Pemeriksaan

- bun install --frozen-lockfile: berhasil.
- bun run build: berhasil.
- Pemeriksaan Chrome headless melalui Playwright pada 320, 390, 768, dan 1280 piksel: tidak ada overflow horizontal.
- Semua sumber: 11; pemerintah: 4; YouTube: 5; literasi: 2.
- Pencarian beberapa kata, pencarian tanpa hasil, reset, dan pintasan materi: berhasil.
- Kelima gambar kanal dimuat dengan naturalWidth 900 piksel.
- Mode gelap diperiksa pada lebar 390 dan 1280 piksel.
- Tidak ada pageerror selama alur pemeriksaan.
- Screenshot desktop terang dan ponsel gelap ditinjau secara visual.

Pemeriksaan ini dilakukan pada server lokal. Keberhasilan deployment Cloudflare belum diverifikasi.
