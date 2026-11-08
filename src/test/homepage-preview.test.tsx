import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeCatPreview } from "@/components/home-cat-preview";

describe("Pratinjau soal CAT di beranda", () => {
  it("menampilkan pembahasan dan tips setelah jawaban diperiksa", () => {
    render(<HomeCatPreview />);

    fireEvent.click(screen.getByRole("radio", { name: /D\. 15 menit/ }));
    fireEvent.click(screen.getByRole("button", { name: "Periksa jawaban" }));

    expect(screen.getByRole("status")).toHaveTextContent("Jawaban Anda tepat.");
    expect(screen.getByRole("status")).toHaveTextContent("5 × 12 = 60 menit");
    expect(screen.getByRole("status")).toHaveTextContent("Rata-rata bukan berarti");
  });

  it("menjelaskan kunci yang tepat untuk pilihan yang salah", () => {
    render(<HomeCatPreview />);

    fireEvent.click(screen.getByRole("radio", { name: /A\. 12 menit/ }));
    fireEvent.click(screen.getByRole("button", { name: "Periksa jawaban" }));

    expect(screen.getByRole("status")).toHaveTextContent("Jawaban yang tepat D.");
    expect(screen.getByRole("status")).toHaveTextContent("15 menit");
  });
});
