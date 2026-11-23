import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { BankQuestionCard } from "@/components/bank-question-card";
import { TIU_FIGURAL_HOTS_QUESTIONS } from "@/lib/exam-tiu-figural-hots";

afterEach(cleanup);
const question = TIU_FIGURAL_HOTS_QUESTIONS[0]!;

it("memeriksa jawaban yang dipilih dan membuka pembahasan", () => {
  render(<BankQuestionCard question={question} number={1} />);
  const check = screen.getByRole("button", { name: "Periksa jawaban" });
  expect(check).toBeDisabled();
  const correct = question.options.find((option) => option.label === question.answer)!;
  fireEvent.click(screen.getByRole("radio", { name: new RegExp(correct.text) }));
  fireEvent.click(check);
  expect(screen.getByRole("status")).toHaveTextContent("Jawaban Anda benar.");
  expect(screen.getByText("Lihat kunci dan pembahasan").closest("details")).toHaveAttribute("open");
  const wrong = question.options.find((option) => option.label !== question.answer)!;
  fireEvent.click(screen.getByRole("radio", { name: new RegExp(wrong.text) }));
  expect(screen.queryByRole("status")).toBeNull();
  fireEvent.click(check);
  expect(screen.getByRole("status")).toHaveTextContent(
    `Jawaban yang benar adalah ${question.answer}`,
  );
});

it("memperbesar diagram dalam area gulir dan mengembalikan ukuran", () => {
  render(<BankQuestionCard question={question} number={1} />);
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("width", "600");
  expect(img).toHaveAttribute("height");
  fireEvent.click(screen.getByRole("button", { name: "Perbesar gambar" }));
  expect(screen.getByRole("button", { name: "Ukuran normal" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByRole("region", { name: /Gambar diperbesar/ })).toHaveAttribute(
    "tabindex",
    "0",
  );
  fireEvent.click(screen.getByRole("button", { name: "Ukuran normal" }));
  expect(screen.queryByRole("region")).toBeNull();
});
