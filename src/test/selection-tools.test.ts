import { describe, expect, it } from "vitest";
import { integratedScore, requiredSKB, skbCapacity } from "@/lib/selection-tools";
describe("selection scenarios", () => {
  it("normalizes the two components onto a 100 point scale", () => {
    expect(integratedScore(550, 100)).toBe(100);
    expect(integratedScore(0, 0)).toBe(0);
    expect(integratedScore(275, 50)).toBe(50);
  });
  it("solves the crossover score without rounding away a tie", () => {
    const target = requiredSKB(400, 420, 80);
    expect(integratedScore(400, target)).toBeCloseTo(integratedScore(420, 80));
    expect(requiredSKB(0, 550, 100)).toBeGreaterThan(100);
  });
  it("rejects invalid quotas", () => {
    expect(skbCapacity(2)).toBe(6);
    for (const value of [0, -1, 1.5, NaN, Infinity]) expect(skbCapacity(value)).toBeNull();
  });
});
