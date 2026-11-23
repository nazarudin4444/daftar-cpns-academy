import { expect, it } from "vitest";
import { TIU_SPATIAL_QUESTIONS } from "@/lib/exam-tiu-spatial";
import { QUESTION_BANK } from "@/lib/exam";

const names = [
  "atas",
  "kanan atas",
  "kanan",
  "kanan bawah",
  "bawah",
  "kiri bawah",
  "kiri",
  "kiri atas",
];

it("memverifikasi semua kunci rotasi dan cermin dari geometri SVG", () => {
  expect(TIU_SPATIAL_QUESTIONS).toHaveLength(48);
  for (const question of TIU_SPATIAL_QUESTIONS) {
    expect(QUESTION_BANK.some((q) => q.id === question.id)).toBe(true);
    const doc = new DOMParser().parseFromString(question.diagram!.svg, "image/svg+xml");
    expect(doc.querySelector("parsererror")).toBeNull();
    let expected: string;
    if (question.id.includes("rotasi")) {
      const angles = [...doc.querySelectorAll("[data-direction]")].map((node) =>
        Number(node.getAttribute("transform")!.match(/rotate\((\d+)\)/)![1]),
      );
      expect(angles).toHaveLength(4);
      const delta = (angles[1]! - angles[0]! + 360) % 360;
      expect([45, 90, 135]).toContain(delta);
      for (let i = 1; i < angles.length; i++)
        expect((angles[i]! - angles[i - 1]! + 360) % 360).toBe(delta);
      expected = names[((angles[3]! + delta) % 360) / 45]!;
    } else {
      const point = doc.querySelector("[data-point]")!;
      const px = Number(point.getAttribute("cx")) - 300;
      const py = Number(point.getAttribute("cy")) - 70;
      const path = doc.querySelector("[data-axis]")!.getAttribute("d");
      // Reflection matrix I - 2nnᵀ, where n is the unit normal to the drawn axis.
      const normal =
        path === "M300 8 V132"
          ? [1, 0]
          : path === "M238 70 H362"
            ? [0, 1]
            : [Math.SQRT1_2, -Math.SQRT1_2];
      const dot = px * normal[0]! + py * normal[1]!;
      const x = Math.round(px - 2 * dot * normal[0]!);
      const y = Math.round(py - 2 * dot * normal[1]!);
      const angle = ((Math.atan2(x, -y) * 180) / Math.PI + 360) % 360;
      expected = names[Math.round(angle / 45) % 8]!;
    }
    const correct = question.options.find((o) => o.label === question.answer)!;
    expect(correct.text, question.id).toBe(expected);
    expect(question.explanation).toContain(expected);
    expect(new Set(question.options.map((o) => o.text)).size).toBe(5);
  }
});
