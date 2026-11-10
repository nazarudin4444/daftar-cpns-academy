import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularTerms = ["S-1 Hukum", "Pendidikan", "Keperawatan", "SLTA", "Akuntansi"];

export function FormasiQuickSearch() {
  const [term, setTerm] = useState("");
  const go = (value: string) => {
    const q = value.trim();
    window.location.assign(q ? `/formasi-cpns?q=${encodeURIComponent(q)}` : "/formasi-cpns");
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    go(term);
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-extrabold">Cari formasi sesuai jurusan Anda</h2>
        <p className="text-xs text-muted-foreground">Data snapshot dari portal SSCASN</p>
      </div>
      <form onSubmit={submit} role="search" className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="home-formasi-q" className="sr-only">
          Jurusan, jabatan, atau instansi
        </label>
        <div className="relative flex-1">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="home-formasi-q"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            maxLength={80}
            placeholder="Contoh: S-1 Hukum, D-III Komputer, Perawat"
            className="min-h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <Button type="submit" className="min-h-12 px-6 font-bold">
          Cari formasi
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Populer:</span>
        {popularTerms.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            className="min-h-9 rounded-full border border-border bg-background px-3 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    title: "Pengumuman & buat akun",
    copy: "Baca pengumuman resmi, lalu buat akun di portal SSCASN.",
    where: "Portal SSCASN",
    href: "/cara-daftar-cpns",
  },
  {
    title: "Seleksi administrasi",
    copy: "Unggah dokumen sesuai syarat jabatan dan pantau masa sanggah.",
    where: "Portal SSCASN",
    href: "/syarat-cpns",
  },
  {
    title: "SKD dengan CAT",
    copy: "Tes TWK, TIU, dan TKP. Tahap ini bisa Anda latih di sini.",
    where: "Latih di Daftar CPNS",
    href: "/simulasi-cat-cpns",
    highlight: true,
  },
  {
    title: "Perangkingan SKD",
    copy: "Peserta diurutkan berdasarkan nilai untuk menuju tahap berikutnya.",
    where: "Pengumuman instansi",
    href: "/passing-grade-cpns",
  },
  {
    title: "SKB & pengumuman akhir",
    copy: "Tes bidang sesuai jabatan, lalu pengumuman kelulusan akhir.",
    where: "Instansi pembina",
    href: "/jadwal-cpns",
  },
];

export function SelectionTimeline() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-bold text-primary">Alur seleksi CPNS</p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Lima tahap, satu yang paling menentukan</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Gambaran umum tahapan. Urutan dan tanggal pasti selalu mengikuti pengumuman resmi tiap periode.
        </p>
      </div>
      <ol className="mt-10 grid gap-4 md:grid-cols-5 md:gap-3">
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-10 h-[calc(100%-1rem)] w-px bg-border md:left-10 md:top-5 md:h-px md:w-[calc(100%-1.5rem)]"
              />
            )}
            <Link
              to={step.href}
              className={`group relative flex gap-4 rounded-2xl p-1 md:flex-col md:gap-0 ${step.highlight ? "" : ""}`}
            >
              <span
                className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-sm font-extrabold tabular-nums ring-4 ring-background ${
                  step.highlight
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`block flex-1 rounded-xl p-4 transition duration-200 md:mt-4 ${
                  step.highlight
                    ? "border border-primary/30 bg-primary/5 group-hover:border-primary"
                    : "border border-transparent group-hover:border-border group-hover:bg-card"
                }`}
              >
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    step.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step.where}
                </span>
                <span className="mt-3 block font-extrabold">{step.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">{step.copy}</span>
                {step.highlight && (
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Mulai latihan <ArrowRight size={14} aria-hidden="true" />
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
