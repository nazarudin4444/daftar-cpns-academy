import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DIRECTORY_TIPS,
  TIP_TOPICS,
  dailyTipIndex,
  filterDirectoryTips,
} from "@/lib/directory-tips-data";
import { DirectoryTips } from "@/components/directory-tips";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
afterEach(cleanup);

describe("100 tips dan trik", () => {
  it("menyediakan 100 tips unik, 20 setiap kategori, lengkap dengan contoh", () => {
    expect(DIRECTORY_TIPS).toHaveLength(100);
    expect(new Set(DIRECTORY_TIPS.map((tip) => tip.id)).size).toBe(100);
    expect(new Set(DIRECTORY_TIPS.map((tip) => tip.title)).size).toBe(100);
    for (const topic of TIP_TOPICS.filter((t) => t !== "Semua"))
      expect(filterDirectoryTips(topic, "")).toHaveLength(20);
    for (const tip of DIRECTORY_TIPS) {
      expect(tip.action.length).toBeGreaterThan(80);
      expect(tip.example.length).toBeGreaterThan(50);
      expect(["/soal-twk", "/soal-tiu", "/soal-tkp", "/persiapan-dokumen", "/panduan"]).toContain(
        tip.href,
      );
    }
  });
  it("mencari seluruh kata pada judul, isi, dan contoh tanpa membedakan kapital", () => {
    expect(filterDirectoryTips("TIU", "  SELISIH   27 ").map((tip) => tip.id)).toContain("deret");
    expect(filterDirectoryTips("Dokumen", "kata sandi").length).toBeGreaterThan(0);
    expect(filterDirectoryTips("TWK", "kata-yang-tidak-ada")).toEqual([]);
  });
  it("mengganti tips saat tanggal WIB berganti, termasuk pergantian tahun", () => {
    const before = Date.parse("2026-12-31T16:59:59Z"),
      after = Date.parse("2026-12-31T17:00:00Z");
    expect(dailyTipIndex(after)).toBe((dailyTipIndex(before) + 1) % 100);
    expect(dailyTipIndex(before - 3600000)).toBe(dailyTipIndex(before));
  });
  it("menampilkan bertahap, memfilter, mencari, dan memulihkan keadaan kosong", () => {
    render(<DirectoryTips />);
    fireEvent.click(screen.getByText("Jelajahi semua tips · 100 bacaan"));
    expect(screen.getAllByRole("article")).toHaveLength(12);
    fireEvent.click(screen.getByRole("button", { name: "Tampilkan 12 tips berikutnya" }));
    expect(screen.getAllByRole("article")).toHaveLength(24);
    fireEvent.click(screen.getByRole("button", { name: "TIU (20)" }));
    expect(screen.getAllByRole("article")).toHaveLength(12);
    fireEvent.change(screen.getByLabelText("Cari tips dan contoh"), {
      target: { value: "selisih 27" },
    });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    fireEvent.change(screen.getByLabelText("Cari tips dan contoh"), {
      target: { value: "tidak-tersedia-xyz" },
    });
    expect(screen.getByText("Tips belum ditemukan")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hapus filter tips" }));
    expect(screen.getAllByRole("article")).toHaveLength(12);
  });
});
