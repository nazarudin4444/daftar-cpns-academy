import type { Question } from "@/lib/exam";

const labels = ["A", "B", "C", "D", "E"];
const frame = (content: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="#f8fafc"/>${content}</svg>`;
const caption = (x: number, y: number, value: string) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#334155">${value}</text>`;

function options(values: string[], correct: string, rotation: number) {
  const ordered = values.slice(rotation).concat(values.slice(0, rotation));
  return {
    options: ordered.map((text, i) => ({ label: labels[i]!, text })),
    answer: labels[ordered.indexOf(correct)]!,
  };
}

const movements: Question[] = Array.from({ length: 50 }, (_, index) => {
  const row = Math.floor((index % 25) / 5);
  const col = index % 5;
  const horizontalFirst = index < 25;
  const right = horizontalFirst ? 1 : 2;
  const down = horizontalFirst ? 2 : 1;
  const targetRow = (row + down) % 5;
  const targetCol = (col + right) % 5;
  const answer = `Baris ${targetRow + 1}, kolom ${targetCol + 1}`;
  const values = [
    answer,
    `Baris ${row + 1}, kolom ${col + 1}`,
    `Baris ${targetRow + 1}, kolom ${col + 1}`,
    `Baris ${row + 1}, kolom ${targetCol + 1}`,
    `Baris ${((targetRow + 1) % 5) + 1}, kolom ${targetCol + 1}`,
  ];
  const arrows = horizontalFirst ? ["kanan", "bawah", "bawah"] : ["bawah", "kanan", "kanan"];
  return {
    id: `tiu-visual-lintasan-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU",
    difficulty: "Latihan",
    prompt:
      "Mulai dari titik hitam, ikuti tiga panah di kanan gambar dari kiri ke kanan. Setiap panah memindahkan titik satu sel. Saat melewati tepi, titik masuk dari sisi seberangnya pada baris atau kolom yang sama. Di mana posisi akhirnya? Baris dihitung dari atas dan kolom dari kiri, mulai dari 1.",
    diagram: {
      alt: `Kisi 5 × 5, titik awal di baris ${row + 1}, kolom ${col + 1}. Langkah: ${arrows.join(", ")}. Tepi kisi saling terhubung.`,
      svg: frame(
        `<rect x="50" y="45" width="200" height="200" fill="white" stroke="#64748b"/>${Array.from({ length: 4 }, (_, i) => `<path d="M${90 + i * 40} 45 V245 M50 ${85 + i * 40} H250" stroke="#94a3b8"/>`).join("")}${Array.from({ length: 5 }, (_, i) => caption(70 + i * 40, 32, String(i + 1)) + caption(32, 72 + i * 40, String(i + 1))).join("")}<circle data-start="true" cx="${70 + col * 40}" cy="${65 + row * 40}" r="9" fill="#0f172a"/>${arrows.map((direction, i) => `<path transform="translate(${325 + i * 90} 140) rotate(${direction === "kanan" ? 90 : 180})" d="M0 25 V-25 M-12 -10 L0 -25 L12 -10" fill="none" stroke="#1e40af" stroke-width="5" stroke-linejoin="round"/>${caption(325 + i * 90, 200, String(i + 1))}`).join("")}`,
      ),
    },
    ...options(values, answer, index % 5),
    explanation: `Titik mulai pada baris ${row + 1}, kolom ${col + 1}. Urutan ${arrows.join(", ")} memindahkannya ${down} sel ke bawah dan ${right} sel ke kanan. Setelah posisi yang melewati 5 kembali ke 1, hasilnya baris ${targetRow + 1}, kolom ${targetCol + 1}.`,
    tip: "Catat baris dan kolom setelah setiap panah. Saat melewati sel kelima, lanjutkan dari sel pertama.",
  };
});

function dotBox(count: number, x: number, y: number, index: number) {
  return `<g data-box="${index}" transform="translate(${x} ${y})"><rect width="120" height="110" rx="6" fill="white" stroke="#64748b"/>${Array.from({ length: count }, (_, i) => `<circle cx="${20 + (i % 5) * 20}" cy="${20 + Math.floor(i / 5) * 24}" r="6" fill="#1e40af"/>`).join("")}</g>`;
}

const matrices: Question[] = Array.from({ length: 72 }, (_, index) => {
  const subtract = index >= 36;
  const a = 1 + Math.floor((index % 36) / 6);
  const b = 1 + (index % 6);
  const first = subtract ? a + b + 2 : a;
  const second = b;
  const result = subtract ? first - second : first + second;
  const sampleA = subtract ? 9 : 3;
  const sampleB = 4;
  const sampleResult = subtract ? 5 : 7;
  const answer = `${result} titik`;
  return {
    id: `tiu-visual-matriks-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU",
    difficulty: "Latihan",
    prompt: `Pada setiap baris, jumlah titik di kotak ketiga adalah ${subtract ? "selisih jumlah titik kotak pertama dikurangi kotak kedua" : "jumlah seluruh titik kotak pertama dan kedua"}. Baris atas memberi contoh. Berapa titik yang harus mengisi kotak bertanda tanya pada baris bawah? Posisi titik di dalam kotak tidak memengaruhi aturan.`,
    diagram: {
      alt: `Dua baris, masing-masing tiga kotak. Baris atas: ${sampleA}, ${sampleB}, ${sampleResult} titik. Baris bawah: ${first}, ${second} titik, lalu tanda tanya.`,
      svg: frame(
        dotBox(sampleA, 60, 15, 0) +
          dotBox(sampleB, 240, 15, 1) +
          dotBox(sampleResult, 420, 15, 2) +
          dotBox(first, 60, 165, 3) +
          dotBox(second, 240, 165, 4) +
          `<rect x="420" y="165" width="120" height="110" rx="6" fill="white" stroke="#64748b" stroke-dasharray="5 4"/>${caption(480, 225, "?")}`,
      ),
    },
    ...options(
      [result, result + 1, result + 2, result + 3, result - 1].map((n) => `${n} titik`),
      answer,
      index % 5,
    ),
    explanation: `Baris atas menunjukkan ${sampleA} ${subtract ? "−" : "+"} ${sampleB} = ${sampleResult} titik. Terapkan aturan yang sama pada baris bawah: ${first} ${subtract ? "−" : "+"} ${second} = ${result} titik. Jadi kotak kosong harus berisi ${result} titik.`,
    tip: "Hitung titik per kotak, cek aturan pada baris lengkap, lalu terapkan pada baris yang belum lengkap.",
  };
});

export const TIU_GRID_QUESTIONS: Question[] = [...movements, ...matrices];
