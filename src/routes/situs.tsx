import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ExternalLink,
  Search,
  ShieldCheck,
  BookOpen,
  Landmark,
  Play,
  X,
} from "lucide-react";
import { SiteShell } from "@/components/site";

type SourceCategory = "pemerintah" | "youtube" | "literasi";
function SourceLogo({ source }: { source: Source }) {
  const [failed, setFailed] = useState(false);
  const isChannel = source.category === "youtube";
  const host = new URL(source.url).hostname;
  const handle = new URL(source.url).pathname.replace("/@", "").toLowerCase();
  const initials = source.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className={
        "grid size-14 shrink-0 place-items-center overflow-hidden border border-border bg-background " +
        (isChannel ? "rounded-full" : "rounded-xl")
      }
    >
      {failed ? (
        <span
          aria-label={"Logo " + source.name + " tidak tersedia"}
          className="text-sm font-bold text-muted-foreground"
        >
          {initials}
        </span>
      ) : (
        <img
          src={
            isChannel
              ? "/brand/channels/" + handle + ".jpg"
              : "https://www.google.com/s2/favicons?domain=" + host + "&sz=128"
          }
          alt={"Logo " + source.name}
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className={isChannel ? "size-14 object-cover" : "size-8 object-contain"}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

type CategoryFilter = "semua" | SourceCategory;

type Source = {
  name: string;
  category: SourceCategory;
  url: string;
  description: string;
  tags: string[];
  action: string;
};

const sources: Source[] = [
  {
    name: "SSCASN BKN",
    category: "pemerintah",
    url: "https://sscasn.bkn.go.id/",
    description:
      "Periksa portal seleksi dan ikuti petunjuk pendaftaran yang berlaku pada periode seleksi.",
    tags: ["Pendaftaran", "Formasi", "CPNS", "PPPK"],
    action: "Buka portal SSCASN",
  },
  {
    name: "Portal Resmi BKN",
    category: "pemerintah",
    url: "https://www.bkn.go.id/",
    description:
      "Rujukan informasi dan pengumuman dari Badan Kepegawaian Negara. Periksa tanggal dan konteks setiap pengumuman.",
    tags: ["Pengumuman", "Jadwal", "CAT"],
    action: "Buka situs BKN",
  },
  {
    name: "Kementerian PANRB",
    category: "pemerintah",
    url: "https://www.menpan.go.id/",
    description:
      "Cari kebijakan dan pengumuman terkait aparatur negara. Gunakan dokumen resmi yang berlaku untuk seleksi Anda.",
    tags: ["Regulasi", "Seleksi ASN", "Passing grade"],
    action: "Buka situs PANRB",
  },
  {
    name: "Simulasi CAT BKN",
    category: "pemerintah",
    url: "https://cat.bkn.go.id/",
    description:
      "Kunjungi portal CAT BKN dan cek ketersediaan layanan simulasi langsung di situs resminya.",
    tags: ["CAT", "Simulasi", "Antarmuka ujian"],
    action: "Buka portal CAT BKN",
  },
  {
    name: "Privat Al Faiz",
    category: "youtube",
    url: "https://www.youtube.com/@PrivatAlFaiz",
    description: "Pembahasan TIU, TWK, dan TKP untuk SKD, serta materi matematika, SNBT, dan PPPK.",
    tags: ["TIU", "Numerik", "Deret angka", "Silogisme"],
    action: "Buka kanal YouTube",
  },
  {
    name: "PING LIE",
    category: "youtube",
    url: "https://www.youtube.com/@PingLie",
    description:
      "Belajar matematika dan penalaran dengan fokus TIU, untuk persiapan CPNS dan sekolah kedinasan.",
    tags: ["TIU", "Hitung cepat", "Penalaran", "Figural"],
    action: "Buka kanal YouTube",
  },
  {
    name: "doseNdeso",
    category: "youtube",
    url: "https://www.youtube.com/@DosenDeso",
    description:
      "Persiapan CPNS dan PPPK, informasi seleksi, serta soal dan pembahasan TWK, TIU, dan TKP.",
    tags: ["TWK", "Integritas", "Pembahasan soal"],
    action: "Buka kanal YouTube",
  },
  {
    name: "VIRACUN",
    category: "youtube",
    url: "https://www.youtube.com/@viracun",
    description: "Telusuri video latihan dan pembahasan persiapan CPNS di kanal VIRACUN.",
    tags: ["TKP", "Strategi latihan", "CAT"],
    action: "Buka kanal YouTube",
  },
  {
    name: "Sahabat CPNS",
    category: "youtube",
    url: "https://www.youtube.com/@SahabatCPNS",
    description: "Kumpulan video latihan soal CPNS untuk menemani belajar mandiri.",
    tags: ["Latihan soal", "CPNS", "PPPK"],
    action: "Buka kanal YouTube",
  },
  {
    name: "KBBI Daring",
    category: "literasi",
    url: "https://kbbi.kemdikbud.go.id/",
    description:
      "Gunakan kamus daring untuk memeriksa makna dan penggunaan kata saat belajar kosakata Bahasa Indonesia.",
    tags: ["Bahasa Indonesia", "Kosakata", "Makna kata"],
    action: "Buka KBBI Daring",
  },
  {
    name: "Portal Informasi Indonesia",
    category: "literasi",
    url: "https://indonesia.go.id/",
    description:
      "Bahan bacaan umum tentang Indonesia. Cocokkan informasi kebijakan dengan dokumen dari instansi terkait.",
    tags: ["Wawasan kebangsaan", "Indonesia", "Literasi"],
    action: "Buka portal Indonesia.go.id",
  },
];

const filters: { id: CategoryFilter; label: string }[] = [
  { id: "semua", label: "Semua Sumber" },
  { id: "pemerintah", label: "Portal Resmi Pemerintah" },
  { id: "youtube", label: "Kanal YouTube" },
  { id: "literasi", label: "Literasi & Bahasa" },
];

export const Route = createFileRoute("/situs")({
  component: DirectoryPage,
  head: () => ({
    meta: [
      { title: "Direktori Portal Resmi & Kanal Belajar CPNS Terpercaya | daftar-cpns.com" },
      {
        name: "description",
        content:
          "Kumpulan tautan resmi SSCASN BKN, regulasi MenPAN-RB, serta rekomendasi kanal YouTube edukasi latihan soal SKD TIU, TWK, dan TKP terpercaya.",
      },
      { property: "og:site_name", content: "Daftar CPNS" },
      {
        property: "og:title",
        content: "Direktori Portal Resmi & Kanal Belajar CPNS Terpercaya",
      },
      {
        property: "og:description",
        content:
          "Direktori portal pemerintah, kanal belajar independen, dan sumber literasi untuk persiapan CASN.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/situs" },
      { property: "og:locale", content: "id_ID" },
      { property: "og:image", content: "/brand/social-card.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Direktori rujukan belajar CPNS dari Daftar CPNS",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Direktori Portal Resmi & Kanal Belajar CPNS",
      },
      {
        name: "twitter:description",
        content:
          "Portal pemerintah, kanal belajar independen, dan sumber literasi untuk persiapan CASN.",
      },
      { name: "twitter:image", content: "/brand/social-card.jpg" },
      {
        name: "twitter:image:alt",
        content: "Direktori rujukan belajar CPNS dari Daftar CPNS",
      },
    ],
    links: [{ rel: "canonical", href: "/situs" }],
  }),
});

const categoryDetails = {
  pemerintah: {
    icon: Landmark,
    title: "Portal resmi pemerintah",
    copy: "Rujukan utama untuk pendaftaran, jadwal, dan aturan seleksi.",
  },
  youtube: {
    icon: Play,
    title: "Belajar bersama pengajar",
    copy: "Temukan gaya belajar yang cocok lewat kanal YouTube independen.",
  },
  literasi: {
    icon: BookOpen,
    title: "Literasi & bahasa",
    copy: "Perluas wawasan dan periksa makna kata dari sumber rujukan.",
  },
};

function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("semua");
  const searchMatches = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase("id-ID").split(/\s+/).filter(Boolean);
    return sources.filter((source) => {
      const haystack = [source.name, source.description, ...source.tags]
        .join(" ")
        .toLocaleLowerCase("id-ID");
      return terms.every((term) => haystack.includes(term));
    });
  }, [query]);
  const visibleSources = searchMatches.filter(
    (source) => activeFilter === "semua" || source.category === activeFilter,
  );
  const reset = () => {
    setQuery("");
    setActiveFilter("semua");
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <header className="grid gap-8 border-b border-border py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-positive">
              <BookOpen size={17} aria-hidden="true" /> Pustaka belajar CASN
            </p>
            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Rujukan jelas.
              <br />
              <span className="text-primary">Belajar lebih terarah.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Portal resmi, pengajar pilihan, dan bahan bacaan dalam satu direktori. Cari sumber
              yang Anda perlukan, lalu lanjutkan belajar.
            </p>
          </div>
          <aside className="rounded-xl border border-primary/15 bg-secondary/60 p-5">
            <span className="flex items-center gap-2 text-sm font-bold text-primary">
              <ShieldCheck size={19} aria-hidden="true" /> Sedang mencari info pendaftaran?
            </span>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Mulai dari SSCASN. Cocokkan jadwal dan persyaratan dengan pengumuman instansi.
            </p>
            <a
              href="https://sscasn.bkn.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Buka SSCASN BKN <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (tab baru)</span>
            </a>
          </aside>
        </header>

        <section aria-label="Pencarian direktori" className="py-7 sm:py-8">
          <label htmlFor="directory-search" className="mb-2 block text-sm font-semibold">
            Sumber atau materi apa yang Anda cari?
          </label>
          <div className="relative max-w-3xl">
            <Search
              size={21}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="directory-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setQuery("");
              }}
              placeholder="Nama kanal, TIU, TWK, atau pendaftaran…"
              className="min-h-14 w-full rounded-xl border border-input bg-card py-3 pl-12 pr-14 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            {query && (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setQuery("")}
                className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-muted-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-muted-foreground">Cari cepat:</span>
            {["TIU", "TWK", "TKP", "Pendaftaran"].map((topic) => (
              <button
                type="button"
                key={topic}
                onClick={() => {
                  setQuery(topic);
                  setActiveFilter("semua");
                }}
                className="min-h-11 cursor-pointer rounded-lg px-3 font-semibold text-primary underline-offset-4 hover:bg-secondary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                {topic}
              </button>
            ))}
          </div>
        </section>

        <div className="grid items-start gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">
          <aside className="min-w-0">
            <h2 className="mb-3 text-sm font-bold">Jelajahi kategori</h2>
            <div
              className="grid grid-cols-2 gap-2 lg:grid-cols-1"
              role="group"
              aria-label="Filter kategori sumber"
            >
              {filters.map(({ id, label }) => {
                const count = searchMatches.filter(
                  (source) => id === "semua" || source.category === id,
                ).length;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={activeFilter === id}
                    onClick={() => setActiveFilter(id)}
                    className={
                      "flex min-h-12 cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
                      (activeFilter === id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary")
                    }
                  >
                    <span>{label}</span>
                    <span className="shrink-0 text-xs tabular-nums opacity-80">{count}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Tautan sumber dibuka di tab baru agar direktori tetap mudah diakses.
            </p>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                <strong className="font-bold text-foreground">{visibleSources.length}</strong>{" "}
                sumber ditemukan{query.trim() ? " untuk “" + query.trim() + "”" : ""}
              </p>
              {(query || activeFilter !== "semua") && (
                <button
                  type="button"
                  onClick={reset}
                  className="min-h-11 cursor-pointer rounded-lg px-3 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                >
                  Reset filter
                </button>
              )}
            </div>
            {visibleSources.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card px-5 py-12 text-center">
                <Search
                  className="mx-auto mb-4 text-muted-foreground"
                  size={28}
                  aria-hidden="true"
                />
                <h2 className="text-lg font-bold">Belum ada sumber yang cocok</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  Coba nama kanal, kata kunci yang lebih singkat, atau pilih kategori lain.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 min-h-11 cursor-pointer rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Tampilkan semua sumber
                </button>
              </div>
            ) : (
              (["pemerintah", "youtube", "literasi"] as const).map((category) => {
                const items = visibleSources.filter((source) => source.category === category);
                if (!items.length) return null;
                const { icon: Icon, title, copy } = categoryDetails[category];
                return (
                  <section
                    key={category}
                    aria-labelledby={"category-" + category}
                    className="mb-9 last:mb-0"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <Icon size={20} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                      <div>
                        <h2
                          id={"category-" + category}
                          className="text-xl font-bold tracking-tight"
                        >
                          {title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {items.map((source) => (
                        <article
                          key={source.url}
                          className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:p-6"
                        >
                          <div className="flex items-center gap-3">
                            <SourceLogo source={source} />
                            <div className="min-w-0">
                              <h3 className="break-words text-lg font-bold leading-snug">
                                {source.name}
                              </h3>
                              <p className="mt-1 break-all text-xs text-muted-foreground">
                                {category === "youtube"
                                  ? new URL(source.url).pathname.slice(1)
                                  : new URL(source.url).hostname.replace(/^www\./, "")}
                              </p>
                            </div>
                          </div>
                          <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                            {source.description}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topik terkait">
                            {source.tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-md bg-secondary/60 px-2 py-1 text-xs font-medium text-secondary-foreground"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 flex min-h-11 items-center justify-between gap-3 rounded-lg border border-border px-3 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          >
                            {source.action}
                            <ExternalLink size={16} className="shrink-0" aria-hidden="true" />
                            <span className="sr-only"> (tab baru)</span>
                          </a>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>

        <footer className="mt-12 grid gap-6 border-t border-border pt-7 sm:grid-cols-2 sm:gap-10">
          <div className="flex items-start gap-3">
            <ShieldCheck size={21} className="mt-1 shrink-0 text-positive" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold">Jaga data pribadi Anda</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Periksa alamat domain pemerintah yang berakhiran .go.id. Waspadai calo dan tautan
                tiruan. Daftar CPNS tidak meminta NIK, nomor KK, atau kata sandi SSCASN.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold">Referensi belajar independen</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Kanal YouTube tidak berafiliasi dengan Daftar CPNS. Nama dan logo milik masing-masing
              pemilik kanal. Selalu cocokkan informasi seleksi dengan pengumuman instansi.
            </p>
          </div>
        </footer>
      </main>
    </SiteShell>
  );
}
