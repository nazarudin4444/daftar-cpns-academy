import { expect, it } from "vitest";
import { TIU_FIGURAL_HOTS_QUESTIONS } from "@/lib/exam-tiu-figural-hots";
import { CPNS_SUBJECT_CATALOG } from "@/lib/exam-catalog";
import { QUESTION_BANK } from "@/lib/exam";

type Grid = boolean[];
const equal = (a: Grid, b: Grid) => a.every((cell, i) => cell === b[i]);

function transform(grid: Grid, turns: number, mirror: boolean, invert: boolean): Grid {
  const output = Array<boolean>(9).fill(false);
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      let px = mirror ? -x : x;
      let py = y;
      const angle = (turns * Math.PI) / 2;
      const rx = Math.round(px * Math.cos(angle) - py * Math.sin(angle));
      const ry = Math.round(px * Math.sin(angle) + py * Math.cos(angle));
      output[(ry + 1) * 3 + rx + 1] = grid[(y + 1) * 3 + x + 1]! !== invert;
    }
  }
  return output;
}

function readPanel(element: Element): Grid {
  const output = Array<boolean>(9).fill(false);
  const rects = [...element.querySelectorAll("rect")];
  expect(rects).toHaveLength(9);
  for (const rect of rects) {
    const x = Number(rect.getAttribute("x"));
    const y = Number(rect.getAttribute("y"));
    expect([0, 30, 60]).toContain(x);
    expect([0, 30, 60]).toContain(y);
    expect(rect.getAttribute("width")).toBe("30");
    expect(rect.getAttribute("height")).toBe("30");
    expect(["#1e293b", "#ffffff"]).toContain(rect.getAttribute("fill"));
    output[(y / 30) * 3 + x / 30] = rect.getAttribute("fill") === "#1e293b";
  }
  return output;
}

function analogy(grid: Grid, rule: number) {
  return transform(grid, rule % 4, Math.floor(rule / 4) % 2 === 1, rule >= 8);
}
function step(grid: Grid, rule: number) {
  return transform(grid, rule % 4, false, rule >= 4);
}
function matrix(a: Grid, b: Grid, rule: number) {
  return transform(a, rule % 4, false, false).map((cell, i) =>
    rule < 4 ? cell !== b[i] : rule < 8 ? cell || b[i]! : cell && b[i]!,
  );
}

it("memuat tepat 1000 HOTS, terdaftar dalam bank dan subbab, tanpa ID duplikat", () => {
  expect(TIU_FIGURAL_HOTS_QUESTIONS).toHaveLength(1000);
  expect(new Set(QUESTION_BANK.map((q) => q.id)).size).toBe(QUESTION_BANK.length);
  const ids = CPNS_SUBJECT_CATALOG.flatMap((c) =>
    c.chapters.flatMap((ch) => ch.subchapters.flatMap((s) => s.questionIds)),
  );
  for (const q of TIU_FIGURAL_HOTS_QUESTIONS) {
    expect(q.difficulty).toBe("HOTS");
    expect(q.subject).toBe("TIU");
    expect(QUESTION_BANK).toContain(q);
    expect(ids.filter((id) => id === q.id)).toHaveLength(1);
  }
});

for (const family of ["analogi", "matriks", "deret"]) {
  it.each(Array.from({ length: 11 }, (_, index) => index))(
    `membuktikan aturan dan jawaban tunggal ${family}, kelompok %i`,
    (batch) => {
      const questions = TIU_FIGURAL_HOTS_QUESTIONS.filter((q) => q.id.includes(`-${family}-`));
      expect(questions).toHaveLength(family === "analogi" ? 336 : 332);
      for (const q of questions.slice(batch * 32, (batch + 1) * 32)) {
        const doc = new DOMParser().parseFromString(q.diagram!.svg, "image/svg+xml");
        expect(doc.querySelector("parsererror")).toBeNull();
        const givenPanels = [...doc.querySelectorAll('[data-panel^="given-"]')];
        const given = givenPanels.slice(0, -1).map(readPanel);
        expect(givenPanels.at(-1)?.textContent).toContain("?");
        const choices = [...doc.querySelectorAll('[data-panel^="option-"]')].map(readPanel);
        expect(choices).toHaveLength(5);
        expect(new Set(choices.map((grid) => grid.map(Number).join(""))).size).toBe(5);
        let candidates: number[];
        let result: Grid;
        if (family === "analogi") {
          expect(given).toHaveLength(5);
          candidates = Array.from({ length: 16 }, (_, r) => r).filter(
            (r) =>
              equal(analogy(given[0]!, r), given[1]!) && equal(analogy(given[2]!, r), given[3]!),
          );
          expect(candidates, q.id).toHaveLength(1);
          const rule = candidates[0]!;
          expect(
            Number(rule % 4 !== 0) + Number(Math.floor(rule / 4) % 2 === 1) + Number(rule >= 8),
          ).toBeGreaterThanOrEqual(2);
          result = analogy(given[4]!, candidates[0]!);
        } else if (family === "matriks") {
          expect(given).toHaveLength(8);
          candidates = Array.from({ length: 12 }, (_, r) => r).filter(
            (r) =>
              equal(matrix(given[0]!, given[1]!, r), given[2]!) &&
              equal(matrix(given[3]!, given[4]!, r), given[5]!),
          );
          expect(candidates, q.id).toHaveLength(1);
          expect(candidates[0]! % 4).not.toBe(0);
          result = matrix(given[6]!, given[7]!, candidates[0]!);
        } else {
          expect(given).toHaveLength(6);
          candidates = Array.from({ length: 64 }, (_, r) => r).filter((r) =>
            given
              .slice(0, 5)
              .every((grid, i) =>
                equal(step(grid, i % 2 ? Math.floor(r / 8) : r % 8), given[i + 1]!),
              ),
          );
          expect(candidates, q.id).toHaveLength(1);
          expect(candidates[0]! % 8).not.toBe(Math.floor(candidates[0]! / 8));
          result = step(given[5]!, Math.floor(candidates[0]! / 8));
        }
        const matching = choices.flatMap((choice, i) => (equal(choice, result) ? [i] : []));
        expect(matching, q.id).toHaveLength(1);
        expect(q.answer, q.id).toBe("ABCDE"[matching[0]!]);
        const coordinates = result.flatMap((black, i) =>
          black ? [`${Math.floor(i / 3) + 1}.${(i % 3) + 1}`] : [],
        );
        expect(q.explanation).toContain(
          coordinates.length ? `sel hitam ${coordinates.join(", ")}` : "semua sel putih",
        );
        expect(q.explanation).toContain(`sesuai pola ${q.answer}`);
      }
    },
  );
}
