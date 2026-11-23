import type { Question } from "@/lib/exam";

const FULL = 511;
const labels = ["A", "B", "C", "D", "E"];

function rotate(mask: number, turns: number) {
  let result = mask;
  for (let turn = 0; turn < turns; turn++) {
    let next = 0;
    for (let cell = 0; cell < 9; cell++) {
      if (result & (1 << cell)) next |= 1 << ((cell % 3) * 3 + 2 - Math.floor(cell / 3));
    }
    result = next;
  }
  return result;
}

function reflect(mask: number) {
  let result = 0;
  for (let cell = 0; cell < 9; cell++) {
    if (mask & (1 << cell)) result |= 1 << (Math.floor(cell / 3) * 3 + 2 - (cell % 3));
  }
  return result;
}

function analogy(mask: number, rule: number) {
  const oriented = rotate(rule & 4 ? reflect(mask) : mask, rule % 4);
  return rule & 8 ? oriented ^ FULL : oriented;
}

function sequenceStep(mask: number, rule: number) {
  return rotate(mask, rule % 4) ^ (rule >= 4 ? FULL : 0);
}

function combine(left: number, right: number, rule: number) {
  const rotated = rotate(left, rule % 4);
  return rule < 4 ? rotated ^ right : rule < 8 ? rotated | right : rotated & right;
}

function maskDescription(mask: number) {
  const cells = Array.from({ length: 9 }, (_, cell) => cell)
    .filter((cell) => mask & (1 << cell))
    .map((cell) => `${Math.floor(cell / 3) + 1}.${(cell % 3) + 1}`);
  return cells.length ? `sel hitam ${cells.join(", ")}` : "semua sel putih";
}

function panel(mask: number | null, x: number, y: number, title: string, role: string) {
  return `<g data-panel="${role}" transform="translate(${x} ${y})"><text x="45" y="-10" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#334155">${title}</text>${mask === null ? '<rect width="90" height="90" fill="white" stroke="#64748b" stroke-dasharray="5 4"/><text x="45" y="59" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" fill="#334155">?</text>' : Array.from({ length: 9 }, (_, cell) => `<rect x="${(cell % 3) * 30}" y="${Math.floor(cell / 3) * 30}" width="30" height="30" fill="${mask & (1 << cell) ? "#1e293b" : "#ffffff"}" stroke="#94a3b8" stroke-width="1"/>`).join("")}</g>`;
}

function rotationName(turns: number) {
  return turns === 0 ? "tanpa rotasi" : `rotasi ${turns * 90}° searah jarum jam`;
}

function analogyName(rule: number) {
  return `${rule & 4 ? "cerminkan kiri-kanan, lalu " : ""}${rotationName(rule % 4)}${rule & 8 ? ", lalu tukar semua sel hitam dan putih" : ", tanpa menukar warna sel"}`;
}

function sequenceName(rule: number) {
  return `${rotationName(rule % 4)}${rule >= 4 ? " dan tukar semua sel hitam-putih" : " tanpa pertukaran warna"}`;
}

type Family = "analogi" | "matriks" | "deret";
type Draft = {
  family: Family;
  inputs: number[];
  result: number;
  prompt: string;
  explanation: string;
  tip: string;
};

function question(draft: Draft, index: number): Question {
  const candidates = [draft.result];
  for (const value of [
    rotate(draft.result, 1),
    rotate(draft.result, 2),
    reflect(draft.result),
    draft.result ^ FULL,
    draft.result ^ 1,
    draft.result ^ 16,
    draft.result ^ 256,
  ]) {
    if (!candidates.includes(value)) candidates.push(value);
  }
  const choices = candidates.slice(0, 5);
  const offset = index % 5;
  const ordered = choices.slice(offset).concat(choices.slice(0, offset));
  const cells: Array<number | null> = [...draft.inputs, null];
  const columns = draft.family === "analogi" ? 2 : 3;
  const rows = Math.ceil(cells.length / columns);
  const optionTop = rows * 125 + 75;
  const height = optionTop + 240;
  const body = cells
    .map((mask, i) =>
      panel(
        mask,
        columns === 2 ? 95 + (i % 2) * 250 : 50 + (i % 3) * 180,
        30 + Math.floor(i / columns) * 125,
        draft.family === "analogi"
          ? `${Math.floor(i / 2) + 1}${i % 2 === 0 ? " awal" : " hasil"}`
          : draft.family === "deret"
            ? `Pola ${i + 1}`
            : `Baris ${Math.floor(i / 3) + 1} · ${(i % 3) + 1}`,
        `given-${i}`,
      ),
    )
    .join("");
  const optionSvg = ordered
    .map((mask, i) =>
      panel(
        mask,
        50 + (i % 3) * 180,
        optionTop + Math.floor(i / 3) * 125,
        labels[i]!,
        `option-${labels[i]}`,
      ),
    )
    .join("");
  const alt = `${draft.family === "deret" ? "Baca pola berurutan dari kiri ke kanan, lalu baris berikutnya." : "Baca setiap baris dari kiri ke kanan."} ${draft.inputs.map((mask, i) => `Pola ${i + 1}: ${maskDescription(mask)}`).join(". ")}. Pola terakhir kosong. Pilihan: ${ordered.map((mask, i) => `${labels[i]}: ${maskDescription(mask)}`).join("; ")}. Notasi sel adalah baris.kolom, dihitung dari atas dan kiri.`;
  return {
    id: `tiu-figural-hots-${draft.family}-${String(index + 1).padStart(3, "0")}`,
    subject: "TIU",
    difficulty: "HOTS",
    prompt: `${draft.prompt} Pilih pola A–E di bagian bawah gambar. Semua kisi berukuran 3 × 3 dan rotasi berpusat pada pusat kisi.`,
    diagram: {
      alt,
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${height}" viewBox="0 0 600 ${height}"><rect width="600" height="${height}" fill="#f8fafc"/>${body}<path d="M25 ${optionTop - 38} H575" stroke="#94a3b8"/>${optionSvg}</svg>`,
    },
    options: ordered.map((_, i) => ({ label: labels[i]!, text: `Pola ${labels[i]} pada gambar` })),
    answer: labels[ordered.indexOf(draft.result)]!,
    explanation: `${draft.explanation} Hasilnya ${maskDescription(draft.result)} (baris.kolom dari atas dan kiri), sesuai pola ${labels[ordered.indexOf(draft.result)]}.`,
    tip: draft.tip,
  };
}

function buildQuestions(batch: number, seen: Set<string>) {
  let seed = 20261117 + batch * 104729;
  const nextMask = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return 1 + (seed % 510);
  };
  const output: Question[] = [];
  const families: Family[] = ["analogi", "matriks", "deret"];
  for (const family of families) {
    const target = family === "analogi" ? 168 : 166;
    let count = 0;
    for (let attempt = 0; count < target && attempt < 20000; attempt++) {
      const a = nextMask(),
        b = nextMask(),
        c = nextMask();
      let draft: Draft;
      if (family === "analogi") {
        const compoundRules = [5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
        const rule = compoundRules[attempt % compoundRules.length]!;
        const examples = [a, analogy(a, rule), b, analogy(b, rule), c];
        const valid = Array.from({ length: 16 }, (_, r) => r).filter(
          (r) => analogy(a, r) === examples[1] && analogy(b, r) === examples[3],
        );
        if (valid.length !== 1) continue;
        draft = {
          family,
          inputs: examples,
          result: analogy(c, rule),
          prompt:
            "Dua baris pertama memperlihatkan transformasi yang sama dari kisi awal menjadi hasil. Aturannya berurutan: boleh mencerminkan kiri-kanan, kemudian rotasi 0°, 90°, 180°, atau 270° searah jarum jam, kemudian boleh menukar seluruh sel hitam-putih. Tentukan hasil untuk kisi awal pada baris ketiga dengan aturan yang cocok pada kedua contoh.",
          explanation: `Aturan yang cocok pada kedua pasangan adalah: ${analogyName(rule)}. Terapkan urutan operasi yang sama pada pola awal baris ketiga; urutan cermin dan rotasi tidak boleh dibalik.`,
          tip: "Gunakan posisi sel sudut untuk membedakan rotasi dan cermin. Cocokkan juga jumlah sel hitam untuk mendeteksi pertukaran warna.",
        };
      } else if (family === "matriks") {
        const d = nextMask(),
          e = nextMask(),
          f = nextMask();
        const rule = (Math.floor(attempt / 3) % 3) * 4 + 1 + (attempt % 3);
        const valid = Array.from({ length: 12 }, (_, r) => r).filter(
          (r) =>
            combine(a, b, r) === combine(a, b, rule) && combine(c, d, r) === combine(c, d, rule),
        );
        if (valid.length !== 1) continue;
        const operation =
          rule < 4
            ? "hitam hanya jika tepat satu kisi memiliki sel hitam di posisi itu"
            : rule < 8
              ? "hitam jika setidaknya satu kisi memiliki sel hitam di posisi itu"
              : "hitam hanya jika kedua kisi memiliki sel hitam di posisi itu";
        draft = {
          family,
          inputs: [a, b, combine(a, b, rule), c, d, combine(c, d, rule), e, f],
          result: combine(e, f, rule),
          prompt:
            "Pada tiap baris, kisi pertama diputar 0°, 90°, 180°, atau 270° searah jarum jam, kemudian digabung dengan kisi kedua. Kisi kedua tidak diputar. Aturan gabungannya salah satu dari: hitam jika tepat satu, setidaknya satu, atau kedua sel asal hitam. Sudut dan aturan gabungan sama pada semua baris. Simpulkan keduanya dari dua baris lengkap, lalu lengkapi baris ketiga.",
          explanation: `Kedua baris lengkap hanya cocok dengan ${rotationName(rule % 4)} pada kisi pertama, lalu aturan ${operation}. Putar kisi pertama baris ketiga dengan sudut itu, lalu evaluasi setiap sel terhadap kisi kedua.`,
          tip: "Uji sudut dan operasi sekaligus pada kedua baris contoh. Satu baris saja bisa cocok dengan lebih dari satu aturan.",
        };
      } else {
        const rule1 = 1 + (attempt % 7);
        const rule2 = 1 + (Math.floor(attempt / 7) % 7);
        if (rule1 === rule2) continue;
        const sequence = [a];
        for (let i = 0; i < 6; i++)
          sequence.push(sequenceStep(sequence[i]!, i % 2 === 0 ? rule1 : rule2));
        const valid = Array.from({ length: 64 }, (_, r) => r).filter((r) =>
          sequence
            .slice(0, 5)
            .every(
              (mask, i) =>
                sequenceStep(mask, i % 2 === 0 ? r % 8 : Math.floor(r / 8)) === sequence[i + 1],
            ),
        );
        if (valid.length !== 1) continue;
        draft = {
          family,
          inputs: sequence.slice(0, 6),
          result: sequence[6]!,
          prompt:
            "Enam pola dibaca dari kiri ke kanan lalu lanjut ke baris berikutnya. Transformasi X dipakai pada langkah 1→2, 3→4, dan 5→6; transformasi Y pada langkah 2→3, 4→5, dan 6→7. Masing-masing berupa rotasi 0°, 90°, 180°, atau 270° searah jarum jam, dengan atau tanpa pertukaran seluruh sel hitam-putih. Simpulkan X dan Y, lalu pilih pola ketujuh.",
          explanation: `Transformasi X adalah ${sequenceName(rule1)}. Transformasi Y adalah ${sequenceName(rule2)}. Ketiga langkah X dan kedua langkah Y pada contoh mendukung pasangan ini. Langkah 6→7 memakai Y, sehingga terapkan ${sequenceName(rule2)} pada pola keenam.`,
          tip: "Pisahkan langkah bernomor ganjil dan genap. Verifikasi rotasi dan perubahan warna secara terpisah sebelum memilih pola berikutnya.",
        };
      }
      const signature = `${family}:${draft.inputs.join(",")}`;
      if (seen.has(signature)) continue;
      seen.add(signature);
      output.push(question(draft, count + batch * target));
      count++;
    }
    if (count !== target) throw new Error(`Jumlah soal figural ${family} tidak terpenuhi`);
  }
  return output;
}

const usedPatterns = new Set<string>();
export const TIU_FIGURAL_HOTS_QUESTIONS = [
  ...buildQuestions(0, usedPatterns),
  ...buildQuestions(1, usedPatterns),
];
