import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DiagnosticTest, WorkedQuestion } from "@/components/guide-practice";
import { diagnosticQuestions } from "@/lib/study-guide";

afterEach(cleanup);
describe("Latihan dalam panduan", () => {
  it("menahan pembahasan sampai jawaban diperiksa dan mengizinkan pengulangan", () => {
    const q = diagnosticQuestions("cpns")[0]!;
    const save = vi.fn();
    render(<WorkedQuestion question={q} onSave={save} />);
    expect(screen.getByRole("button", { name: "Periksa jawaban" })).toBeDisabled();
    expect(screen.queryByText(q.explanation)).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("radio")[0]!);
    fireEvent.click(screen.getByRole("button", { name: "Periksa jawaban" }));
    expect(screen.getByText(q.explanation)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Catat di jurnal kesalahan" }));
    expect(save).toHaveBeenCalledWith(q);
    fireEvent.click(screen.getByRole("button", { name: "Kerjakan ulang" }));
    expect(screen.getByRole("button", { name: "Periksa jawaban" })).toBeDisabled();
  });
  it("mengumpulkan sembilan jawaban sebelum menyimpan tes pemetaan", () => {
    const finish = vi.fn(),
      running = vi.fn();
    render(
      <DiagnosticTest
        track="pppk"
        latest={undefined}
        onFinish={finish}
        onRunning={running}
        onUseFocus={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Mulai tes PPPK" }));
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getAllByRole("radio")[0]!);
      if (i < 8) fireEvent.click(screen.getByRole("button", { name: "Soal berikutnya" }));
    }
    fireEvent.click(screen.getByRole("button", { name: "Selesaikan dan lihat rekomendasi" }));
    expect(finish).toHaveBeenCalledOnce();
    expect(Object.keys(finish.mock.calls[0]![0].answers)).toHaveLength(9);
    expect(running).toHaveBeenLastCalledWith(false);
  });
});
