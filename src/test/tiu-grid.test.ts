import { expect, it } from "vitest";
import { TIU_GRID_QUESTIONS } from "@/lib/exam-tiu-grid";
import { QUESTION_BANK } from "@/lib/exam";
import { CPNS_SUBJECT_CATALOG } from "@/lib/exam-catalog";

it("memeriksa 122 kunci dari koordinat, arah panah, dan jumlah titik SVG", () => {
  expect(TIU_GRID_QUESTIONS).toHaveLength(122);
  const catalogIds = CPNS_SUBJECT_CATALOG.flatMap((c) =>
    c.chapters.flatMap((ch) => ch.subchapters.flatMap((s) => s.questionIds)),
  );
  for (const q of TIU_GRID_QUESTIONS) {
    expect(QUESTION_BANK.some((item) => item.id === q.id)).toBe(true);
    expect(catalogIds).toContain(q.id);
    const doc = new DOMParser().parseFromString(q.diagram!.svg, "image/svg+xml");
    expect(doc.querySelector("parsererror")).toBeNull();
    let expected: string;
    if (q.id.includes("lintasan")) {
      const start = doc.querySelector("[data-start]")!;
      let col = (Number(start.getAttribute("cx")) - 70) / 40;
      let row = (Number(start.getAttribute("cy")) - 65) / 40;
      const arrows = [...doc.querySelectorAll("path[transform]")];
      expect(arrows).toHaveLength(3);
      for (const arrow of arrows) {
        const degrees = Number(arrow.getAttribute("transform")!.match(/rotate\((\d+)\)/)![1]);
        expect([90, 180]).toContain(degrees);
        col = (col + Math.round(Math.sin((degrees * Math.PI) / 180))) % 5;
        row = (row - Math.round(Math.cos((degrees * Math.PI) / 180))) % 5;
      }
      expected = `Baris ${row + 1}, kolom ${col + 1}`;
      expect(q.explanation).toContain(expected.toLowerCase());
    } else {
      const counts = [...doc.querySelectorAll("g[data-box]")].map(
        (box) => box.querySelectorAll("circle").length,
      );
      expect(counts).toHaveLength(5);
      const sum = counts[0]! + counts[1]! === counts[2];
      const difference = counts[0]! - counts[1]! === counts[2];
      expect(Number(sum) + Number(difference)).toBe(1);
      const result = sum ? counts[3]! + counts[4]! : counts[3]! - counts[4]!;
      expected = `${result} titik`;
      expect(q.explanation).toContain(`= ${result} titik`);
      for (const circle of doc.querySelectorAll("g circle")) {
        expect(Number(circle.getAttribute("cx"))).toBeLessThan(114);
        expect(Number(circle.getAttribute("cy"))).toBeLessThan(104);
      }
    }
    expect(q.options.find((o) => o.label === q.answer)?.text, q.id).toBe(expected);
    expect(new Set(q.options.map((o) => o.text)).size).toBe(5);
  }
});
