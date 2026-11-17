import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PPPKHub } from "@/components/pppk-hub";
import { QUESTION_BANK } from "@/lib/exam";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));
vi.mock("@/components/site", () => ({
  CATSimulator: ({ initialTrack }: { initialTrack: string }) => <div>Simulator {initialTrack}</div>,
}));
afterEach(cleanup);

it("memeriksa jawaban dan mempertahankan hasil saat berpindah soal", () => {
  render(<PPPKHub />);
  const question = QUESTION_BANK.find((q) => q.subject === "Manajerial")!;
  expect(screen.getByRole("button", { name: "Periksa jawaban" })).toBeDisabled();
  const option = question.options.find((o) => o.label === question.answer)!;
  fireEvent.click(screen.getByRole("radio", { name: `${option.label}. ${option.text}` }));
  fireEvent.click(screen.getByRole("button", { name: "Periksa jawaban" }));
  expect(screen.getByText("1 / 1 benar")).toBeInTheDocument();
  expect(screen.getByText(question.explanation)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Soal berikutnya" }));
  fireEvent.click(screen.getByRole("button", { name: "Sebelumnya" }));
  expect(screen.getByText("1 / 1 benar")).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: `${option.label}. ${option.text}` })).toBeDisabled();
});

it("mengubah kompetensi, menyaring HOTS, dan membuka simulator PPPK", () => {
  render(<PPPKHub />);
  fireEvent.click(screen.getByRole("button", { name: /Sosial Kultural/ }));
  fireEvent.click(screen.getByRole("checkbox", { name: "HOTS saja" }));
  const first = QUESTION_BANK.find(
    (q) => q.subject === "Sosial Kultural" && q.difficulty === "HOTS",
  )!;
  expect(screen.getByText(first.prompt)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Buka 20 paket/ }));
  expect(screen.getByText("Simulator pppk")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Kembali ke materi PPPK" }));
  expect(screen.getByText(first.prompt)).toBeInTheDocument();
});
