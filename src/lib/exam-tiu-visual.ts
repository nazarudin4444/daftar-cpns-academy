import type { Question } from "@/lib/exam";

const shapes = ["lingkaran", "persegi", "segitiga", "belah ketupat", "heksagon"] as const;
const shapeSvg = (sequence: readonly number[]) => {
  const draw = (shape: number, x: number) => {
    const common = `fill=\"${shape % 2 ? "#dbeafe" : "#ede9fe"}\" stroke=\"#1e40af\" stroke-width=\"3\"`;
    if (shape === 0) return `<circle cx=\"${x}\" cy=\"52\" r=\"20\" ${common}/>`;
    if (shape === 1)
      return `<rect x=\"${x - 19}\" y=\"33\" width=\"38\" height=\"38\" rx=\"3\" ${common}/>`;
    if (shape === 2) return `<path d=\"M${x} 30 L${x + 22} 70 H${x - 22} Z\" ${common}/>`;
    if (shape === 3)
      return `<path d=\"M${x} 27 L${x + 22} 52 L${x} 77 L${x - 22} 52 Z\" ${common}/>`;
    return `<path d=\"M${x - 24} 52 L${x - 12} 31 H${x + 12} L${x + 24} 52 L${x + 12} 73 H${x - 12} Z\" ${common}/>`;
  };
  return `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"112\" viewBox=\"0 0 600 112\"><rect width=\"600\" height=\"112\" rx=\"16\" fill=\"#f8fafc\"/>${sequence.map((shape, index) => `<g>${index === sequence.length - 1 ? `<rect x=\"${65 + index * 116 - 25}\" y=\"27\" width=\"50\" height=\"50\" rx=\"10\" fill=\"white\" stroke=\"#64748b\" stroke-dasharray=\"5 4\"/>` : draw(shape, 65 + index * 116)}<text x=\"${65 + index * 116}\" y=\"105\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-size=\"13\" fill=\"#334155\">${index === sequence.length - 1 ? "?" : String.fromCharCode(65 + index)}</text></g>`).join("")}</svg>`;
};

const offsets = Array.from({ length: 30 }, (_, index) => ({
  start: Math.floor(index / 4) % 5,
  step: 1 + (index % 4),
}));
export const TIU_VISUAL_QUESTIONS: Question[] = offsets.map(({ start, step }, index) => {
  const sequence = Array.from(
    { length: index < 20 ? 4 : 5 },
    (_, i) => (start + i * step) % shapes.length,
  );
  const answerIndex = sequence[sequence.length - 1]!;
  const labels = ["A", "B", "C", "D", "E"] as const;
  const options = shapes.map((text, i) => ({ label: labels[i]!, text }));
  return {
    id: `tiu-visual-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU",
    prompt:
      "Gunakan siklus lingkaran → persegi → segitiga → belah ketupat → heksagon → kembali ke lingkaran. Setiap perpindahan melompati jumlah posisi yang tetap. Bentuk pada tanda tanya adalah ...",
    diagram: {
      alt: `Urutan bentuk ${sequence
        .slice(0, -1)
        .map((n) => shapes[n])
        .join(", ")}, diikuti tanda tanya.`,
      svg: shapeSvg(sequence),
    },
    options,
    answer: labels[answerIndex]!,
    explanation: `Urutan berpindah ${step} posisi setiap langkah pada siklus lima bentuk. Setelah ${shapes[sequence[sequence.length - 2]!]!}, bentuk berikutnya adalah ${shapes[answerIndex]}.`,
    tip: "Beri nomor pada setiap bentuk, lalu hitung perpindahan yang berulang.",
    difficulty: "HOTS",
  };
});

const arithmetic = Array.from({ length: 30 }, (_, index) => {
  const base = 8 + index * 3;
  const ratio = 2 + (index % 5);
  const total = base * (ratio + 1);
  const answer = base * ratio;
  const labels = ["A", "B", "C", "D", "E"] as const;
  const answerIndex = index % 5;
  const choices = [answer - 12, answer - 6, answer + 6, answer + 12];
  choices.splice(answerIndex, 0, answer);
  return {
    id: `tiu-bank-lanjutan-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU" as const,
    prompt: `Sebuah tim membagi ${total} berkas ke dua unit dengan rasio beban ${ratio}:1. Berapa berkas yang ditangani unit dengan beban lebih besar?`,
    options: choices.map((value, i) => ({ label: labels[i]!, text: `${value} berkas` })),
    answer: labels[answerIndex]!,
    explanation: `Jumlah bagian rasio adalah ${ratio + 1}. Satu bagian bernilai ${total} ÷ ${ratio + 1} = ${base}; bagian yang lebih besar ${ratio} × ${base} = ${answer} berkas.`,
    tip: "Jumlahkan bagian rasio dan kalikan total dengan bagian yang ditanyakan.",
    difficulty: index % 3 === 0 ? ("HOTS" as const) : ("Latihan" as const),
  };
});
export const TIU_EXTRA_QUESTIONS: Question[] = arithmetic;
