import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Search, ShieldAlert, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site";
import { PageHero } from "@/components/page-hero";

type SourceCategory = "pemerintah" | "youtube" | "literasi";
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
    description:
      "Kanal belajar pihak ketiga. Telusuri video dan playlist yang relevan, lalu cocokkan materi dengan kisi-kisi seleksi.",
    tags: ["TIU", "Numerik", "Deret angka", "Silogisme"],
    action: "Buka kanal YouTube",
  },
  {
    name: "Ping Lie",
    category: "youtube",
    url: "https://www.youtube.com/@PingLie",
    description:
      "Kanal belajar pihak ketiga. Periksa langsung video yang tersedia untuk menemukan topik hitung dan penalaran.",
    tags: ["TIU", "Hitung cepat", "Penalaran", "Figural"],
    action: "Buka kanal YouTube",
  },
  {
    name: "Dosen Deso",
    category: "youtube",
    url: "https://www.youtube.com/@DosenDeso",
    description:
      "Kanal belajar pihak ketiga. Jadikan video sebagai bahan latihan dan verifikasi informasi seleksi melalui pengumuman resmi.",
    tags: ["TWK", "Integritas", "Pembahasan soal"],
    action: "Buka kanal YouTube",
  },
  {
    name: "Viracun",
    category: "youtube",
    url: "https://www.youtube.com/@viracun",
    description:
      "Kanal belajar pihak ketiga. Lihat konten terbaru dan gunakan pembahasan sebagai bahan latihan tambahan.",
    tags: ["TKP", "Strategi latihan", "CAT"],
    action: "Buka kanal YouTube",
  },
  {
    name: "Sahabat CPNS",
    category: "youtube",
    url: "https://www.youtube.com/@SahabatCPNS",
    description:
      "Kanal belajar pihak ketiga. Periksa isi kanal dan tanggal video sebelum mengandalkan informasi seleksi.",
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

const categoryLabels: Record<SourceCategory, string> = {
  pemerintah: "Portal pemerintah",
  youtube: "Kanal YouTube independen",
  literasi: "Literasi & bahasa",
};

const categoryStyles: Record<SourceCategory, string> = {
  pemerintah: "border-primary/20 bg-primary/10 text-primary",
  youtube: "border-destructive/20 bg-destructive/10 text-destructive",
  literasi: "border-positive/20 bg-positive/10 text-positive",
};

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

const categoryStrip: Record<SourceCategory, string> = {
  pemerintah: "bg-primary",
  youtube: "bg-destructive",
  literasi: "bg-positive",
};

function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("semua");

  const visibleSources = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
    return sources.filter((source) => {
      const matchesCategory = activeFilter === "semua" || source.category === activeFilter;
      const searchableText = `${source.name} ${source.description} ${source.tags.join(" ")}`;
      return (
        matchesCategory &&
        (!normalizedQuery || searchableText.toLocaleLowerCase("id-ID").includes(normalizedQuery))
      );
    });
  }, [activeFilter, query]);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Pustaka Rujukan Mandiri · Anti-Salah Info"
        icon={ShieldCheck}
        title="Direktori Portal Resmi & Kanal Belajar CASN"
        description={
          <>
            <p>Satu tempat untuk menemukan portal pemerintah, bahan belajar mandiri, dan sumber literasi. Untuk jadwal, syarat, serta aturan seleksi, selalu cek pengumuman resmi.</p>
          <label className="relative mt-7 block max-w-2xl text-left">
              <span className="sr-only">Cari sumber atau materi</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={19}
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari BKN, TIU, TKP, Bahasa Indonesia…"
                className="min-h-12 w-full rounded-xl border border-input bg-background text-base shadow-lg pl-11 pr-4 text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            </>
        }
        stats={[
          { value: String(sources.filter((s) => s.category === "pemerintah").length), label: "Portal pemerintah" },
          { value: String(sources.filter((s) => s.category === "youtube").length), label: "Kanal YouTube" },
          { value: String(sources.filter((s) => s.category === "literasi").length), label: "Sumber literasi" },
        ]}
      />
      <main className="mx-auto max-w-7xl px-4 py-12 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-border bg-card p-4 text-left shadow-sm sm:p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-positive/10 text-positive">
                <ShieldAlert size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold text-foreground">Kenali rujukan dan jaga data Anda</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Portal pemerintah Indonesia umumnya memakai domain <strong>.go.id</strong>.
                  Waspadai calo berbayar dan tautan tiruan. Daftar CPNS tidak meminta NIK, nomor
                  KK, atau kata sandi SSCASN.
                </p>
              </div>
            </div>
          </div>
        <section aria-label="Daftar sumber belajar">
          <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filter kategori sumber">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={activeFilter === id}
                onClick={() => setActiveFilter(id)}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeFilter === id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            {visibleSources.length} sumber
            {query.trim() ? ` cocok untuk “${query.trim()}”` : " tersedia"}
          </p>

          {visibleSources.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleSources.map((source) => (
                <article
                  key={source.url}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 pt-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6 sm:pt-7"
                >
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${categoryStrip[source.category]}`} />
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="min-w-0 text-lg font-bold leading-snug text-foreground">
                      {source.name}
                    </h2>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryStyles[source.category]}`}
                    >
                      {categoryLabels[source.category]}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {source.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Topik terkait">
                    {source.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-secondary/50 px-3.5 text-sm font-bold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {source.action}
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
              Tidak ada sumber yang cocok. Coba kata kunci atau kategori lain.
            </p>
          )}
        </section>

        <aside className="mt-12 rounded-2xl border border-border bg-secondary/50 p-5 sm:p-6">
          <h2 className="font-bold text-foreground">Tentang direktori ini</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
            Daftar CPNS adalah platform edukasi independen. Tautan kanal belajar pihak ketiga
            dicantumkan sebagai referensi terbuka tanpa afiliasi komersial atau dukungan resmi.
            Ketersediaan konten dapat berubah; nilai setiap materi secara mandiri dan gunakan
            pengumuman instansi sebagai acuan aturan seleksi.
          </p>
          <a
            href="https://sscasn.bkn.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            Buka portal SSCASN <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </aside>
      </main>
    </SiteShell>
  );
}
