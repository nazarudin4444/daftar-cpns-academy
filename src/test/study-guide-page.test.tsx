import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StudyGuide } from "@/components/study-guide";
import { GUIDE_KEY, emptyGuide, readGuide } from "@/lib/study-guide";
import { renderToString } from "react-dom/server";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
beforeEach(() => {
  localStorage.clear();
  HTMLElement.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Alur halaman panduan", () => {
  it("menyediakan isi panduan dalam HTML awal sebelum progres browser dimuat", () => {
    const html = renderToString(<StudyGuide />);
    expect(html).toContain("Belajar terarah.");
    expect(html).toContain("Tes pemetaan singkat");
    expect(html).toContain("Jurnal kesalahan");
  });
  it("membuat agenda, menyimpan centang, dan memulihkan progres setelah dibuka ulang", () => {
    const view = render(<StudyGuide />);
    fireEvent.click(screen.getByRole("button", { name: "Buat rencana belajar saya" }));
    expect(readGuide(localStorage.getItem(GUIDE_KEY)).plan?.days).toBe(30);
    fireEvent.click(screen.getByRole("checkbox", { name: /Pelajari:/ }));
    expect(Object.keys(readGuide(localStorage.getItem(GUIDE_KEY)).completed)).toHaveLength(1);
    view.unmount();
    render(<StudyGuide />);
    expect(screen.getByRole("checkbox", { name: /Pelajari:/ })).toBeChecked();
  });
  it("menampilkan keadaan kosong saat pencarian tidak cocok dan dapat menghapus filter", () => {
    render(<StudyGuide />);
    fireEvent.change(screen.getByLabelText("Cari topik"), {
      target: { value: "topik-tidak-tersedia-xyz" },
    });
    expect(screen.getByText("Topik belum ditemukan")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hapus filter" }));
    expect(screen.queryByText("Topik belum ditemukan")).not.toBeInTheDocument();
  });
  it("menyimpan jurnal dan hanya menyelesaikan tinjauan setelah koreksi diisi", () => {
    localStorage.setItem(
      GUIDE_KEY,
      JSON.stringify({
        ...emptyGuide(),
        journal: [
          {
            id: "test",
            subject: "TIU",
            title: "Keliru memakai rata-rata",
            cause: "Konsep",
            correction: "",
            resolved: false,
            createdAt: Date.now(),
          },
        ],
      }),
    );
    render(<StudyGuide />);
    expect(screen.getByRole("button", { name: "Tandai sudah ditinjau" })).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Apa yang akan diperbaiki?"), {
      target: { value: "Hitung total setiap kelompok sebelum membagi jumlah berkas." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Tandai sudah ditinjau" }));
    expect(readGuide(localStorage.getItem(GUIDE_KEY)).journal[0]?.resolved).toBe(true);
  });
  it("tetap dapat membuat rencana jika browser menolak penyimpanan", () => {
    render(<StudyGuide />);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    fireEvent.click(screen.getByRole("button", { name: "Buat rencana belajar saya" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Browser menolak penyimpanan");
    expect(screen.getByRole("checkbox", { name: /Pelajari:/ })).toBeInTheDocument();
  });
  it("menampilkan materi PPPK dan memperbarui kategori contoh HOTS", () => {
    render(<StudyGuide />);
    fireEvent.click(screen.getByRole("button", { name: "Persiapan PPPK" }));
    expect(screen.getByRole("button", { name: "Mulai tes PPPK" })).toBeInTheDocument();
    expect(screen.getByLabelText("Kategori contoh")).toHaveValue("Manajerial");
    expect(screen.getByText(/Materi teknis di sini merupakan latihan/)).toBeInTheDocument();
  });
  it("menyimpan rencana CPNS dan PPPK secara terpisah", () => {
    render(<StudyGuide />);
    fireEvent.click(screen.getByRole("button", { name: "Buat rencana belajar saya" }));
    fireEvent.click(screen.getByRole("button", { name: "Persiapan PPPK" }));
    fireEvent.click(screen.getByRole("button", { name: "Buat rencana belajar saya" }));
    const saved = readGuide(localStorage.getItem(GUIDE_KEY));
    expect(saved.plans.cpns?.track).toBe("cpns");
    expect(saved.plans.pppk?.track).toBe("pppk");
    fireEvent.click(screen.getByRole("button", { name: "Persiapan CPNS" }));
    expect(screen.getByRole("button", { name: "Simpan perubahan rencana" })).toBeInTheDocument();
  });
  it("menghapus dan memulihkan catatan tanpa kehilangan langkah koreksi", () => {
    const entry = {
      id: "undo-test",
      subject: "TIU",
      title: "Tinjau persentase",
      cause: "Hitungan",
      correction: "Periksa penyebut",
      resolved: false,
      createdAt: Date.now(),
    };
    localStorage.setItem(GUIDE_KEY, JSON.stringify({ ...emptyGuide(), journal: [entry] }));
    render(<StudyGuide />);
    fireEvent.click(screen.getByRole("button", { name: "Hapus catatan" }));
    expect(readGuide(localStorage.getItem(GUIDE_KEY)).journal).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Pulihkan catatan terakhir" }));
    expect(readGuide(localStorage.getItem(GUIDE_KEY)).journal[0]?.correction).toBe(
      "Periksa penyebut",
    );
  });
  it("memindahkan agenda ke hari yang dipilih", () => {
    render(<StudyGuide />);
    fireEvent.click(screen.getByRole("button", { name: "Buat rencana belajar saya" }));
    const select = screen.getByLabelText("Lihat hari lain") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: select.options[1]!.value } });
    expect(screen.getByText(/Hari 2 dari 30/)).toBeInTheDocument();
  });
  it("menyiapkan unduhan rencana dan jurnal sebagai berkas teks", () => {
    vi.useFakeTimers();
    const create = vi.fn(() => "blob:guide-test"),
      revoke = vi.fn();
    vi.stubGlobal(
      "URL",
      Object.assign(class extends URL {}, { createObjectURL: create, revokeObjectURL: revoke }),
    );
    const clicked: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      clicked.push(this.download);
    });
    localStorage.setItem(
      GUIDE_KEY,
      JSON.stringify({
        ...emptyGuide(),
        journal: [
          {
            id: "export",
            subject: "TIU",
            title: "Catatan",
            cause: "Konsep",
            correction: "",
            resolved: false,
            createdAt: Date.now(),
          },
        ],
      }),
    );
    render(<StudyGuide />);
    fireEvent.click(screen.getByRole("button", { name: "Buat rencana belajar saya" }));
    fireEvent.click(screen.getByRole("button", { name: "Unduh rencana tersimpan (.txt)" }));
    fireEvent.click(screen.getByRole("button", { name: "Unduh jurnal (.txt)" }));
    expect(clicked).toHaveLength(2);
    expect(clicked.every((name) => name.endsWith(".txt"))).toBe(true);
    expect(create).toHaveBeenCalledTimes(2);
    vi.runAllTimers();
    expect(revoke).toHaveBeenCalledTimes(2);
  });
});
