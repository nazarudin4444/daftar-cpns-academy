import type { ContentPageData } from "@/lib/content-pages";

export const FIGURAL_PAGES: Record<string, ContentPageData> = {
  "soal-tiu-figural": {
    title: "Soal TIU Figural Bergambar dan Pembahasan",
    metaTitle: "Soal TIU Figural HOTS dan Pembahasan | Daftar CPNS",
    description:
      "Latihan TIU figural bergambar: analogi transformasi, matriks, dan deret dua aturan. Pelajari contoh soal HOTS, kunci, serta cara mengerjakannya.",
    intro:
      "Pelajari hubungan antargambar melalui soal analogi, matriks, dan deret. Mulai dari contoh yang disertai pembahasan, lalu lanjutkan latihan per subtopik tanpa akun.",
    sections: [
      {
        heading: "Apa yang diperiksa dalam penalaran figural?",
        paragraphs: [
          "Penalaran figural menggunakan informasi visual untuk menentukan hubungan atau perubahan pola. Pada latihan ini, informasi tersebut berupa posisi sel, arah rotasi, pencerminan, dan perubahan sel hitam-putih. Aturan yang dipilih harus menerangkan seluruh contoh yang diberikan, bukan hanya satu pasangan yang terlihat mirip.",
          "Pisahkan ciri gambar sebelum menghitung perubahan: jumlah sel hitam, letak sel sudut, arah susunan, dan posisi pusat. Rotasi mempertahankan jumlah sel hitam; pertukaran warna mengubahnya menjadi jumlah sel putih semula. Ciri ini membantu mempersempit aturan yang perlu diuji.",
        ],
      },
      {
        heading: "Pilih jenis soal sesuai kesulitan Anda",
        paragraphs: [
          "Analogi melatih penerapan transformasi yang sama pada gambar berbeda. Matriks menuntut pemeriksaan hubungan antarkolom dalam beberapa baris. Deret dua aturan memerlukan pemisahan langkah ganjil dan genap sebelum menentukan pola berikutnya.",
          "Jika sering tertukar antara rotasi dan cermin, mulai dari analogi. Jika posisi gambar sudah dipahami tetapi penggabungan sel masih sulit, pilih matriks. Untuk melatih konsistensi aturan sepanjang rangkaian, pilih deret. Ketiga panduan di bawah menyediakan contoh yang dapat diperiksa sebelum membuka kunci.",
        ],
        bullets: [
          "Baca orientasi dan aturan yang diizinkan pada soal.",
          "Uji dugaan pada seluruh contoh yang lengkap.",
          "Bandingkan hasil akhir dengan semua pilihan, bukan sekadar kemiripan visual.",
        ],
      },
      {
        heading: "Cara menggunakan pembahasan",
        paragraphs: [
          "Kerjakan contoh terlebih dahulu. Setelah membuka pembahasan, cocokkan posisi sel satu per satu dan catat langkah pertama yang berbeda dari cara Anda. Ulangi dengan contoh lain untuk memastikan Anda memahami hubungan, bukan mengingat huruf jawaban.",
          "Soal ini merupakan materi latihan orisinal Daftar CPNS. Label HOTS menjelaskan latihan analisis beberapa aturan; label tersebut bukan pengesahan tingkat kesulitan atau kisi-kisi dari penyelenggara seleksi.",
        ],
      },
    ],
  },
  "soal-tiu-analogi-gambar": {
    title: "Soal Analogi Gambar TIU: Rotasi dan Pencerminan",
    metaTitle: "Soal Analogi Gambar TIU HOTS dan Pembahasan | Daftar CPNS",
    description:
      "Pelajari analogi gambar TIU dengan gabungan rotasi, pencerminan, dan pertukaran warna. Coba soal HOTS bergambar serta pembahasannya langkah demi langkah.",
    intro:
      "Dua pasangan gambar memperlihatkan transformasi yang sama. Tugas Anda adalah menemukan transformasinya lalu menerapkannya pada gambar baru.",
    sections: [
      {
        heading: "Bedakan rotasi dan pencerminan",
        paragraphs: [
          "Rotasi menggerakkan seluruh sel mengelilingi pusat kisi. Pada rotasi 90° searah jarum jam, sudut kiri atas berpindah ke kanan atas. Pencerminan kiri-kanan menukar kolom kiri dengan kolom kanan, sementara kolom tengah tetap. Kedua operasi ini bisa menghasilkan gambar berbeda meskipun jumlah sel hitam sama.",
          "Gunakan satu sel yang mudah dikenali sebagai penanda, lalu periksa sel lainnya. Pada gambar yang simetris, satu pasangan mungkin belum cukup untuk membedakan beberapa aturan. Karena itu, contoh latihan berikut memberikan dua pasangan yang harus dijelaskan oleh aturan yang sama.",
        ],
      },
      {
        heading: "Urutan operasi memengaruhi hasil",
        paragraphs: [
          "Mencerminkan gambar lalu memutarnya tidak selalu sama dengan memutar dahulu lalu mencerminkan. Ikuti urutan yang dinyatakan soal. Dalam contoh ini, pencerminan dilakukan sebelum rotasi, sedangkan pertukaran warna dilakukan setelah perubahan posisi.",
          "Pertukaran warna berarti setiap sel hitam menjadi putih dan setiap sel putih menjadi hitam, termasuk sel di tengah. Pada kisi sembilan sel, pola dengan tiga sel hitam akan memiliki enam sel hitam setelah pertukaran warna. Gunakan jumlah ini sebagai pemeriksaan tambahan, bukan sebagai satu-satunya dasar jawaban.",
        ],
      },
      {
        heading: "Periksa aturan sebelum memilih jawaban",
        paragraphs: [
          "Uji aturan pada kedua pasangan lengkap. Setelah keduanya cocok, terapkan urutan yang sama pada gambar terakhir. Tulis posisi hasil sebagai baris dan kolom bila diperlukan. Pembahasan di bawah memakai notasi baris.kolom, dihitung dari atas dan kiri, sehingga hasil dapat dibandingkan secara tepat.",
        ],
      },
    ],
  },
  "soal-tiu-matriks-gambar": {
    title: "Soal Matriks Gambar TIU dan Cara Menggabungkan Pola",
    metaTitle: "Soal Matriks Gambar TIU HOTS dan Pembahasan | Daftar CPNS",
    description:
      "Latihan matriks gambar TIU: tentukan rotasi dan aturan penggabungan sel dari dua baris contoh. Lengkap dengan pilihan gambar, kunci, dan pembahasan.",
    intro:
      "Temukan hubungan antara tiga kisi pada setiap baris. Anda perlu menentukan sudut rotasi sekaligus cara dua pola digabung untuk melengkapi kotak kosong.",
    sections: [
      {
        heading: "Tiga aturan penggabungan sel",
        paragraphs: [
          "Pada aturan tepat satu, sel hasil berwarna hitam jika hanya salah satu gambar asal memiliki sel hitam pada posisi itu. Dua sel hitam yang bertumpuk menghasilkan putih. Pada aturan setidaknya satu, hasil tetap hitam selama salah satu atau kedua sel asal hitam.",
          "Pada aturan keduanya, hasil hanya hitam jika kedua sel asal sama-sama hitam. Jika salah satunya putih, hasil putih. Ketiga aturan diterapkan per posisi sel, bukan pada jumlah sel secara keseluruhan.",
        ],
        bullets: [
          "Tepat satu: hitam + putih menjadi hitam; hitam + hitam menjadi putih.",
          "Setidaknya satu: hitam + hitam tetap hitam.",
          "Keduanya: hitam + putih menjadi putih.",
        ],
      },
      {
        heading: "Putar kisi yang benar sebelum menggabungkan",
        paragraphs: [
          "Dalam contoh berikut, hanya kisi pertama pada tiap baris yang diputar. Kisi kedua mempertahankan orientasinya. Jika kedua kisi ikut diputar, hasil perhitungan tidak lagi mengikuti aturan soal. Buat salinan mental kisi pertama yang sudah diputar, lalu bandingkan sel-selnya dengan kisi kedua.",
          "Jangan memilih operasi berdasarkan satu baris saja. Sebuah pola dapat kebetulan menghasilkan hasil yang sama dengan dua operasi berbeda. Gunakan baris lengkap berikutnya untuk menguji sudut dan operasi sekaligus. Setelah kedua baris cocok, terapkan aturan pada baris yang belum lengkap.",
        ],
      },
      {
        heading: "Strategi mengurangi kesalahan",
        paragraphs: [
          "Mulai dari sudut atau bagian gambar yang paling berbeda, kemudian lanjutkan ke sel pusat. Pisahkan tahap rotasi dan tahap penggabungan agar tidak ada sel yang dihitung dua kali. Cocokkan seluruh kisi hasil dengan pilihan jawaban sebelum memeriksa pembahasannya.",
        ],
      },
    ],
  },
  "soal-tiu-deret-gambar": {
    title: "Soal Deret Gambar TIU dengan Dua Aturan Bergantian",
    metaTitle: "Soal Deret Gambar TIU HOTS dan Pembahasan | Daftar CPNS",
    description:
      "Coba deret gambar TIU HOTS dengan dua transformasi bergantian. Pelajari rotasi, perubahan warna, dan langkah menentukan gambar berikutnya.",
    intro:
      "Pisahkan transformasi pada langkah ganjil dan genap. Cocokkan setiap aturan pada beberapa perpindahan sebelum memilih pola ketujuh.",
    sections: [
      {
        heading: "Nomori perpindahan, bukan hanya gambar",
        paragraphs: [
          "Rangkaian enam gambar memiliki lima perpindahan yang dapat diperiksa. Aturan X berlaku pada perpindahan 1 ke 2, 3 ke 4, dan 5 ke 6. Aturan Y berlaku pada perpindahan 2 ke 3 dan 4 ke 5. Karena gambar berikutnya adalah gambar ketujuh, perpindahan terakhir memakai Y.",
          "Kesalahan yang sering muncul adalah mengulang aturan yang baru saja dipakai. Pada deret bergantian, langkah 5 ke 6 dan langkah 6 ke 7 justru menggunakan transformasi berbeda. Tuliskan urutan X, Y, X, Y, X, Y untuk menjaga posisi langkah.",
        ],
      },
      {
        heading: "Periksa posisi dan warna secara terpisah",
        paragraphs: [
          "Setiap transformasi dapat berisi rotasi dan pertukaran warna. Amati dahulu perpindahan posisi sel, lalu tentukan apakah seluruh warna ditukar. Jumlah sel hitam dapat membantu: pada kisi sembilan sel, perubahan dari dua menjadi tujuh sel hitam sesuai dengan pertukaran warna.",
          "Satu perubahan jumlah sel belum membuktikan sudut rotasi. Periksa sel sudut atau pola yang tidak simetris untuk membedakan 90°, 180°, dan 270°. Aturan yang benar harus cocok pada semua perpindahan sejenis, baik yang berada di awal maupun akhir deret.",
        ],
      },
      {
        heading: "Mengerjakan pola berikutnya",
        paragraphs: [
          "Setelah X dan Y ditemukan, terapkan Y pada gambar keenam. Jangan membangun aturan baru dari pilihan jawaban. Pilihan digunakan untuk mencocokkan hasil yang sudah Anda hitung. Buka pembahasan setelah menjawab dan bandingkan kedua transformasi serta letak sel hasilnya.",
        ],
      },
    ],
  },
};

export const FIGURAL_TOPIC_LINKS = Object.entries(FIGURAL_PAGES).map(([slug, page]) => ({
  slug,
  title: page.title,
}));
