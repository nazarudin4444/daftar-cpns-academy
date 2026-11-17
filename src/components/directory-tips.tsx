import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Lightbulb } from "lucide-react";
import {
  DIRECTORY_TIPS,
  TIP_TOPICS,
  dailyTipIndex,
  filterDirectoryTips,
  type DirectoryTip,
} from "@/lib/directory-tips-data";

const PAGE_SIZE = 12;

function TipContent({ tip }: { tip: DirectoryTip }) {
  return (
    <>
      <p className="text-xs font-bold text-primary">{tip.topic}</p>
      <h3 className="mt-1 text-lg font-bold leading-snug">{tip.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{tip.action}</p>
      <details className="mt-3 rounded-lg border border-border bg-background/70 px-3">
        <summary className="min-h-[44px] cursor-pointer py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
          Lihat contoh singkat
        </summary>
        <p className="pb-3 text-sm leading-6 text-muted-foreground">{tip.example}</p>
      </details>
      <Link
        to={tip.href}
        className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-md text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        {tip.cta}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </>
  );
}

export function DirectoryTips() {
  const [featured, setFeatured] = useState(0);
  const [topic, setTopic] = useState<(typeof TIP_TOPICS)[number]>("Semua");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  useEffect(() => {
    const update = () => setFeatured(dailyTipIndex());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const visible = filterDirectoryTips(topic, query);
  const count = Math.min(limit, visible.length);
  const featuredTip = DIRECTORY_TIPS[featured] ?? DIRECTORY_TIPS[0]!;
  return (
    <section
      aria-labelledby="directory-tips-heading"
      className="mt-6 rounded-xl border border-blue-200 border-t-4 border-t-blue-600 bg-blue-50 p-4 dark:border-blue-900 dark:border-t-blue-400 dark:bg-blue-950/30 sm:p-5"
    >
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-md bg-amber-100 px-2.5 py-2 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
            <Lightbulb size={17} aria-hidden="true" />
            Tips Hari Ini
          </p>
          <h2
            id="directory-tips-heading"
            className="mt-3 text-xl font-bold text-blue-950 dark:text-blue-100"
          >
            100 tips dan trik untuk persiapan yang lebih terarah
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Langkah praktis dan contoh untuk TWK, TIU, TKP, dokumen, serta strategi ujian. Pilihan
            harian berganti menurut waktu Jakarta.
          </p>
        </div>
        <div className="min-w-0 rounded-lg border border-blue-200 bg-card p-4 dark:border-blue-800 sm:p-5">
          <TipContent tip={featuredTip} />
        </div>
      </div>
      <details className="group mt-3 border-t border-blue-200 pt-2 dark:border-blue-900">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
          Jelajahi semua tips · {DIRECTORY_TIPS.length} bacaan
          <ChevronDown
            size={17}
            className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-3">
          <label htmlFor="directory-tip-search" className="text-sm font-semibold">
            Cari tips dan contoh
          </label>
          <input
            id="directory-tip-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Misalnya: persentase, dokumen, waktu…"
            className="mt-2 min-h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Topik tips">
          {TIP_TOPICS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => {
                setTopic(item);
                setLimit(PAGE_SIZE);
              }}
              className={`min-h-[44px] cursor-pointer rounded-lg border px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${topic === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"}`}
            >
              {item}{" "}
              <span className="ml-1">
                (
                {item === "Semua"
                  ? DIRECTORY_TIPS.length
                  : DIRECTORY_TIPS.filter((tip) => tip.topic === item).length}
                )
              </span>
            </button>
          ))}
        </div>
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          Menampilkan {count} dari {visible.length} tips{topic !== "Semua" ? ` ${topic}` : ""}
          {query.trim() ? " yang cocok dengan pencarian" : ""}.
        </p>
        {!visible.length && (
          <div className="mt-4 rounded-lg border border-dashed border-border bg-card p-5">
            <h3 className="font-bold">Tips belum ditemukan</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Coba kata lain atau tampilkan kembali semua kategori.
            </p>
            <button
              type="button"
              className="mt-3 min-h-11 cursor-pointer rounded-md border border-border bg-background px-4 text-sm font-semibold hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              onClick={() => {
                setTopic("Semua");
                setQuery("");
                setLimit(PAGE_SIZE);
              }}
            >
              Hapus filter tips
            </button>
          </div>
        )}
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {visible.slice(0, limit).map((tip) => (
            <article key={tip.id} className="min-w-0 rounded-lg border border-border bg-card p-4">
              <TipContent tip={tip} />
            </article>
          ))}
        </div>
        {count < visible.length && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="min-h-11 cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              onClick={() => setLimit(limit + PAGE_SIZE)}
            >
              Tampilkan {Math.min(PAGE_SIZE, visible.length - count)} tips berikutnya
            </button>
            <span className="text-sm text-muted-foreground">
              {visible.length - count} tips lainnya tersedia
            </span>
          </div>
        )}
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Tips merupakan materi pembelajaran independen, bukan ketentuan seleksi. Contoh angka dan
          situasi digunakan untuk latihan. Untuk persyaratan dokumen dan aturan ujian, ikuti
          pengumuman resmi instansi serta SSCASN pada direktori di bawah.
        </p>
      </details>
    </section>
  );
}
