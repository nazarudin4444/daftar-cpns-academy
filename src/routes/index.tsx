import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CircleHelp,
  FileSearch,
  GraduationCap,
  Landmark,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HomeCatPreview } from "@/components/home-cat-preview";
import { SiteShell } from "@/components/site";
import { canonicalUrl, CONTACT_EMAIL, OPERATOR_NAME, SITE_ORIGIN } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Belajar & Latihan CAT CPNS | Simulasi Gratis | Daftar CPNS" },
      {
        name: "description",
        content:
          "Belajar dan latihan CAT CPNS melalui simulasi gratis 110 soal, latihan TWK, TIU, TKP, dan pembahasan. Platform independen, bukan situs pemerintah.",
      },
      { property: "og:site_name", content: "Daftar CPNS" },
      { property: "og:title", content: "Belajar & Latihan CAT CPNS | Simulasi Gratis" },
      {
        property: "og:description",
        content:
          "Simulasi demo CAT CPNS 110 soal, latihan TWK, TIU, TKP, serta pembahasan dari platform edukasi independen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: canonicalUrl("/brand/social-card.jpg") },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Daftar CPNS, latihan CAT CPNS dan soal TWK, TIU, serta TKP",
      },
      { name: "twitter:image", content: canonicalUrl("/brand/social-card.jpg") },
      { property: "og:url", content: canonicalUrl("/") },
      { property: "og:locale", content: "id_ID" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Belajar & Latihan CAT CPNS | Simulasi Gratis" },
      {
        name: "twitter:description",
        content:
          "Simulasi demo CAT CPNS 110 soal, latihan TWK, TIU, TKP, serta pembahasan dari platform edukasi independen.",
      },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/") }],
  }),
});

const category = [
  {
    title: "CPNS",
    copy: "Latihan demo SKD: TWK, TIU, dan TKP.",
    href: "/simulasi-cat-cpns",
    label: "Coba latihan",
    icon: GraduationCap,
    tags: ["TWK", "TIU", "TKP"],
    tone: "primary",
  },
  {
    title: "PPPK",
    copy: "Panduan kelompok kompetensi dan rujukan informasi seleksi resmi.",
    href: "/pppk",
    label: "Lihat latihan",
    icon: Briefcase,
    tags: ["Teknis", "Manajerial", "Sosial kultural"],
    tone: "positive",
  },
  {
    title: "Sekolah kedinasan",
    copy: "Latihan dasar dan rujukan pengumuman instansi.",
    href: "/sekolah-kedinasan",
    label: "Pelajari",
    icon: Landmark,
    tags: ["Tes dasar", "Rujukan instansi"],
    tone: "brand",
  },
];

const questions = [
  [
    "Apa itu CAT CPNS?",
    "CAT adalah metode tes berbantuan komputer yang digunakan pada seleksi tertentu. Informasi pelaksanaan yang berlaku perlu diperiksa pada pengumuman resmi.",
  ],
  [
    "Apakah simulasi ini simulasi CAT BKN resmi?",
    "Bukan. Daftar CPNS adalah layanan edukasi independen. Materi di sini merupakan demo orisinal, bukan layanan BKN atau SSCASN.",
  ],
  [
    "Di mana pendaftaran CPNS resmi dilakukan?",
    "Gunakan portal pemerintah SSCASN dan ikuti pengumuman resmi instansi yang dituju.",
  ],
  [
    "Bagaimana mengetahui jadwal CPNS yang valid?",
    "Periksa kanal BKN, Kementerian PANRB, SSCASN, dan pengumuman instansi. Jangan mengandalkan tanggal yang belum terverifikasi.",
  ],
];

const cpnsInfoLinks = [
  {
    label: "Jadwal CPNS",
    copy: "Lihat pengumuman dan tanggal seleksi yang aktif.",
    href: "/jadwal-cpns",
    icon: CalendarDays,
  },
  {
    label: "Formasi CPNS",
    copy: "Cari jabatan, instansi, dan kualifikasi.",
    href: "/formasi-cpns",
    icon: Briefcase,
  },
  {
    label: "Persyaratan CPNS",
    copy: "Periksa syarat jabatan dan dokumen.",
    href: "/syarat-cpns",
    icon: ListChecks,
  },
  {
    label: "Cara daftar CPNS",
    copy: "Ikuti proses melalui portal SSCASN resmi.",
    href: "/cara-daftar-cpns",
    icon: FileSearch,
  },
];

function HomePage() {
  const homeUrl = canonicalUrl("/");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: "Daftar CPNS",
        url: homeUrl,
        inLanguage: "id",
        publisher: { "@id": `${SITE_ORIGIN}/#operator` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#operator`,
        name: OPERATOR_NAME,
        email: CONTACT_EMAIL,
        url: homeUrl,
        logo: canonicalUrl("/brand/daftar-cpns-mark.svg"),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: CONTACT_EMAIL,
          availableLanguage: "Indonesian",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: "Belajar & Latihan CAT CPNS | Simulasi Gratis | Daftar CPNS",
        description:
          "Belajar dan latihan CAT CPNS melalui simulasi gratis 110 soal, latihan TWK, TIU, TKP, dan pembahasan. Platform independen, bukan situs pemerintah.",
        inLanguage: "id",
        publisher: { "@id": `${SITE_ORIGIN}/#operator` },
      },
    ],
  };
  return (
    <SiteShell>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <section className="bg-hero relative overflow-hidden text-primary-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pb-28 md:pt-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur-md">
                <ShieldCheck size={16} aria-hidden="true" />
                Platform Edukasi &amp; Simulasi CAT Independen
              </p>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
                Belajar &amp; Latihan CAT CPNS
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Simulasi demo SKD 110 soal, latihan TWK, TIU, dan TKP, lengkap dengan pembahasan
                setiap jawaban. Gratis, tanpa akun.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="secondary" className="min-h-12 px-6 text-base font-bold shadow-lg">
                  <Link to="/simulasi-cat-cpns">
                    Mulai Simulasi Gratis <ArrowRight size={17} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="min-h-12 border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/latihan-soal-cpns">Latihan Soal CPNS</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/70">
                Bukan portal pemerintah. Pendaftaran resmi hanya di{" "}
                <a
                  href="https://sscasn.bkn.go.id/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary-foreground underline underline-offset-4"
                >
                  SSCASN
                </a>
                .
              </p>
            </div>
            <div className="hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur-md md:block">
              <p className="text-sm font-semibold text-primary-foreground/70">Format paket demo SKD</p>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["110", "soal pilihan ganda"],
                  ["100", "menit timer CAT"],
                  ["3", "materi: TWK, TIU, TKP"],
                  ["Rp0", "tanpa akun"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-primary-foreground/10 p-4">
                    <dt className="text-3xl font-extrabold tabular-nums">{value}</dt>
                    <dd className="mt-1 text-sm text-primary-foreground/75">{label}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-5 text-primary-foreground/60">
                Konfigurasi latihan situs, bukan ketentuan resmi seleksi.
              </p>
            </div>
          </div>
        </section>
        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Informasi CPNS yang sering dicari"
            className="grid gap-2 rounded-2xl border border-border bg-card p-2 shadow-xl sm:grid-cols-2 lg:grid-cols-4"
          >
            {cpnsInfoLinks.map(({ label, copy, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="group flex min-h-16 items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-secondary"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">{label}</span>
                  <span className="block text-xs leading-5 text-muted-foreground">{copy}</span>
                </span>
              </Link>
            ))}
          </nav>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold text-primary">Pilih fokus belajar</p>
              <h2 className="mt-2 text-2xl font-extrabold">Mulai dari jalur seleksi Anda</h2>
            </div>
            <Link
              to="/panduan"
              className="min-h-11 self-start py-3 text-sm font-bold text-primary hover:underline sm:self-auto"
            >
              Buka panduan <ArrowRight className="ml-1 inline" size={16} />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {category.map((item, index) => (
              <Link
                key={item.title}
                to={item.href}
                className="group relative flex min-h-60 flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:-translate-y-1"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 ${item.tone === "primary" ? "bg-primary" : item.tone === "positive" ? "bg-positive" : "bg-accent"}`}
                />
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-xl ${item.tone === "primary" ? "bg-primary/10 text-primary" : item.tone === "positive" ? "bg-positive/10 text-positive" : "bg-accent/15 text-accent-foreground"}`}
                  >
                    <item.icon size={24} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold tabular-nums text-muted-foreground">
                    Jalur 0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-2 leading-6 text-muted-foreground">{item.copy}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Materi">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto flex min-h-11 items-center justify-between gap-2 border-t border-border pt-4 font-bold text-primary">
                  {item.label}
                  <span className="grid size-9 place-items-center rounded-full bg-primary/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:px-8">
            <div>
              <p className="text-sm font-bold text-primary">Lihat cara kerja CAT</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Coba satu soal sebelum memulai simulasi
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                Pilih jawaban pada contoh soal TIU ini untuk melihat cara pembahasan ditampilkan.
                Ini pratinjau latihan, bukan bagian dari sesi simulasi penuh.
              </p>
              <div className="mt-6">
                <HomeCatPreview />
              </div>
            </div>
            <aside className="h-fit border-l-2 border-primary pl-5 md:mt-10">
              <h3 className="text-lg font-extrabold">Di simulasi CAT CPNS</h3>
              <p className="mt-2 leading-6 text-muted-foreground">
                Paket demo SKD berisi 110 soal dengan durasi 100 menit. Jumlah dan waktu ini adalah
                konfigurasi latihan situs, bukan ketentuan resmi seleksi.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6">
                <li>Navigasi untuk berpindah antarsoal.</li>
                <li>Penanda untuk soal yang ingin ditinjau kembali.</li>
                <li>Hasil per kategori dan pembahasan setelah sesi.</li>
              </ul>
              <Button asChild className="mt-6 min-h-11">
                <Link to="/simulasi-cat-cpns">
                  Coba simulasi lengkap <ArrowRight size={17} />
                </Link>
              </Button>
            </aside>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <CircleHelp className="text-primary" size={20} aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-primary">Jawaban singkat</p>
              <h2 className="text-xl font-extrabold">Pertanyaan umum</h2>
            </div>
          </div>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {questions.map(([question, answer]) => (
              <details key={question} className="group py-1">
                <summary className="flex min-h-11 list-none items-center justify-between gap-4 py-2 font-semibold marker:hidden">
                  {question}
                  <span aria-hidden="true" className="text-xl text-primary group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-4 pr-8 leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="sumber-resmi" className="border-t border-border bg-card">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
              <ShieldCheck className="mt-0.5 shrink-0 text-positive" size={18} aria-hidden="true" />
              Cocokkan jadwal dan syarat seleksi dengan kanal resmi. Kami tidak meminta NIK, KK, atau kata sandi SSCASN.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ["SSCASN BKN", "https://sscasn.bkn.go.id/"],
                ["BKN", "https://www.bkn.go.id/"],
                ["Kementerian PANRB", "https://www.menpan.go.id/"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold hover:border-primary hover:text-primary"
                >
                  {label} <ArrowRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
