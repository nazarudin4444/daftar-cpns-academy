import type { Question } from "@/lib/exam";

const directions = [
  "atas",
  "kanan atas",
  "kanan",
  "kanan bawah",
  "bawah",
  "kiri bawah",
  "kiri",
  "kiri atas",
];
const labels = ["A", "B", "C", "D", "E"];
const wrap = (n: number) => (n + 8) % 8;
const svg = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="160" viewBox="0 0 600 160"><rect width="600" height="160" fill="#f8fafc"/>${body}</svg>`;
const text = (x: number, y: number, value: string) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#334155">${value}</text>`;

function choices(answer: number, offset: number) {
  const values = [answer, wrap(answer + 1), wrap(answer + 2), wrap(answer + 4), wrap(answer + 6)];
  const ordered = values.slice(offset).concat(values.slice(0, offset));
  return {
    options: ordered.map((value, i) => ({ label: labels[i]!, text: directions[value]! })),
    answer: labels[ordered.indexOf(answer)]!,
  };
}

const rotations: Question[] = Array.from({ length: 24 }, (_, index) => {
  const start = index % 8;
  const step = Math.floor(index / 8) + 1;
  const sequence = Array.from({ length: 4 }, (_, i) => wrap(start + i * step));
  const result = wrap(start + 4 * step);
  return {
    id: `tiu-visual-rotasi-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU",
    difficulty: "Latihan",
    prompt:
      "Panah berputar searah jarum jam dengan sudut tetap yang kurang dari 180° pada setiap langkah. Ke arah mana panah kelima menunjuk? Atas gambar menjadi acuan arah atas.",
    diagram: {
      alt: `Empat panah berturut-turut menunjuk ${sequence.map((n) => directions[n]).join(", ")}; posisi kelima bertanda tanya.`,
      svg: svg(
        sequence
          .map(
            (n, i) =>
              `<g transform="translate(${60 + i * 120} 65)"><circle r="40" fill="white" stroke="#94a3b8"/><path data-direction="${n}" transform="rotate(${n * 45})" d="M0 28 V-26 M-13 -10 L0 -26 L13 -10" fill="none" stroke="#1e40af" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>${text(60 + i * 120, 135, String(i + 1))}`,
          )
          .join("") +
          text(540, 75, "?") +
          text(540, 135, "5"),
      ),
    },
    ...choices(result, index % 5),
    explanation: `Setiap langkah memutar panah ${step * 45}° searah jarum jam. Panah keempat menunjuk ${directions[sequence[3]!]}. Setelah diputar ${step * 45}° lagi, panah kelima menunjuk ${directions[result]}.`,
    tip: "Gunakan delapan arah dengan jarak 45°. Periksa sudut perpindahan pada semua pasangan panah.",
  };
});

const positions = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
] as const;
const mirrors = ["garis vertikal", "garis horizontal", "diagonal dari kiri atas ke kanan bawah"];
const reflections: Question[] = Array.from({ length: 24 }, (_, index) => {
  const start = index % 8;
  const mirror = Math.floor(index / 8);
  const [x, y] = positions[start]!;
  const target = mirror === 0 ? [-x, y] : mirror === 1 ? [x, -y] : [y, x];
  const result = positions.findIndex(([px, py]) => px === target[0] && py === target[1]);
  const axis = mirror === 0 ? "M300 8 V132" : mirror === 1 ? "M238 70 H362" : "M240 10 L360 130";
  return {
    id: `tiu-visual-cermin-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU",
    difficulty: "Latihan",
    prompt: `Titik hitam pada kisi 3 × 3 dicerminkan terhadap ${mirrors[mirror]} yang melewati pusat kisi (garis putus-putus). Di sel mana bayangannya berada, dilihat dari pusat kisi? Orientasi kisi tetap.`,
    diagram: {
      alt: `Kisi 3 × 3 dengan titik pada sel ${directions[start]}. Sumbu cermin berupa ${mirrors[mirror]} melalui pusat kisi.`,
      svg: svg(
        `<rect x="240" y="10" width="120" height="120" fill="white" stroke="#64748b"/><path d="M280 10 V130 M320 10 V130 M240 50 H360 M240 90 H360" stroke="#94a3b8"/><path data-axis="${mirror}" d="${axis}" stroke="#1e40af" stroke-width="2" stroke-dasharray="5 4"/><circle data-point="true" cx="${300 + x * 40}" cy="${70 + y * 40}" r="7" fill="#0f172a"/>${text(300, 153, "Kisi awal dan sumbu cermin")}`,
      ),
    },
    ...choices(result, index % 5),
    explanation: `Titik awal berada di ${directions[start]}. Pencerminan terhadap ${mirrors[mirror]} ${mirror === 0 ? "menukar kiri dan kanan serta mempertahankan posisi atas atau bawah" : mirror === 1 ? "menukar atas dan bawah serta mempertahankan posisi kiri atau kanan" : "menukar jarak mendatar dan jarak tegak dari pusat, dengan arah kanan dan bawah bernilai positif"}. Bayangannya berada di ${directions[result]}.${start === result ? " Titik terletak pada sumbu cermin sehingga posisinya tetap." : " Jarak titik dan bayangannya ke sumbu cermin sama."}`,
    tip: "Tarik garis tegak lurus sumbu cermin dari titik awal, lalu ukur jarak yang sama di sisi lainnya.",
  };
});

export const TIU_SPATIAL_QUESTIONS: Question[] = [...rotations, ...reflections];
