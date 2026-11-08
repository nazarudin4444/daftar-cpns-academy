import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, CircleHelp, Clock3, ShieldCheck } from "lucide-react";
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
  },
  {
    title: "PPPK",
    copy: "Panduan kelompok kompetensi dan rujukan informasi seleksi resmi.",
    href: "/pppk",
    label: "Lihat latihan",
  },
  {
    title: "Sekolah kedinasan",
    copy: "Latihan dasar dan rujukan pengumuman instansi.",
    href: "/sekolah-kedinasan",
    label: "Pelajari",
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
        <section className="mx-auto grid max-w-7xl items-center gap-7 px-4 pb-12 pt-8 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:py-14 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 border-l-2 border-positive pl-3 text-sm font-bold text-positive">
              Platform Edukasi &amp; Simulasi CAT Independen
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] text-foreground sm:text-5xl">
              Belajar &amp; Latihan CAT CPNS
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Kerjakan simulasi demo SKD CPNS 110 soal, berlatih TWK, TIU, dan TKP, lalu pelajari
              pembahasan setiap jawaban. Materi ini dibuat untuk belajar mandiri, bukan layanan
              resmi pemerintah.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="min-h-12">
                <Link to="/simulasi-cat-cpns">
                  Mulai Simulasi Gratis <ArrowRight size={17} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="min-h-12">
                <Link to="/latihan-soal-cpns">Latihan Soal CPNS</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm">
              <a
                href="https://sscasn.bkn.go.id/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Panduan pendaftaran resmi di SSCASN
              </a>
            </p>
            <div className="mt-7 flex items-start gap-3 border-t border-border pt-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-positive" size={19} />
              <p className="text-sm leading-6 text-muted-foreground">
                <strong className="text-foreground">Independen, bukan portal pemerintah.</strong>{" "}
                Kami tidak meminta NIK, Kartu Keluarga, kata sandi SSCASN, atau dokumen identitas.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px] border border-border bg-card p-5 sm:p-6">
            <p className="text-sm font-bold text-primary">Pusat informasi CPNS</p>
            <h2 className="mt-2 text-xl font-extrabold text-foreground">
              Apa yang sedang Anda cari?
            </h2>
            <nav
              aria-label="Informasi CPNS yang sering dicari"
              className="mt-4 divide-y divide-border"
            >
              {(
                [
                  ["Jadwal CPNS", "/jadwal-cpns"],
                  ["Formasi CPNS", "/formasi-cpns"],
                  ["Persyaratan CPNS", "/syarat-cpns"],
                  ["Cara daftar CPNS", "/cara-daftar-cpns"],
                ] as const
              ).map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="flex min-h-12 items-center justify-between gap-3 py-2 font-semibold text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {label}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
              Jadwal dan formasi pada situs ini belum terverifikasi. Periksa pengumuman pemerintah
              sebelum mengambil keputusan.
            </p>
            <a
              href="#sumber-resmi"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Lihat sumber resmi
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            {[
              [Clock3, "Latihan bertimer", "Atur ritme menjawab dalam sesi demo."],
              [BookOpenCheck, "Pembahasan jawaban", "Tinjau alasan pada setiap soal."],
              [
                ShieldCheck,
                "Progres tersimpan lokal",
                "Lanjutkan sesi pada browser perangkat ini.",
              ],
            ].map(([Icon, title, copy]) => {
              const IconPart = Icon as typeof Clock3;
              return (
                <div key={String(title)} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                    <IconPart size={21} />
                  </span>
                  <div>
                    <h2 className="font-bold">{String(title)}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{String(copy)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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
              <article
                key={item.title}
                className={`flex min-h-56 flex-col border-t-2 ${index === 0 ? "border-primary" : index === 1 ? "border-positive" : "border-border"} bg-card p-5`}
              >
                <span className="text-sm font-bold text-muted-foreground">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-6 text-muted-foreground">{item.copy}</p>
                <Link
                  to={item.href}
                  className="mt-auto flex min-h-11 items-end gap-2 pt-4 font-bold text-primary"
                >
                  {item.label}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-secondary">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-bold text-primary">Panduan belajar</p>
              <h2 className="mt-2 text-2xl font-extrabold">Belajar dengan langkah yang jelas</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Gunakan latihan untuk memahami pola soal. Cocokkan persiapan dan informasi seleksi
                dengan pengumuman resmi.
              </p>
              <Button asChild variant="outline" className="mt-5 min-h-11">
                <Link to="/panduan">Baca panduan</Link>
              </Button>
            </div>
            <ol className="grid gap-0">
              {[
                "Periksa informasi dari kanal pemerintah.",
                "Pilih kategori dan kerjakan latihan demo.",
                "Baca pembahasan dan ulangi materi yang perlu diperkuat.",
              ].map((text, i) => (
                <li
                  key={text}
                  className="flex gap-4 border-b border-border py-4 first:pt-0 last:border-b-0"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-background font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-6">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="sumber-resmi" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-primary">Sumber resmi</p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Pastikan informasi seleksi di kanal pemerintah
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Jadwal, formasi, persyaratan, dan tahapan seleksi dapat berubah. Cocokkan informasi
              dengan pengumuman dari pemerintah atau instansi yang dituju.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
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
                className="flex min-h-11 items-center gap-2 border border-border bg-card px-4 font-semibold hover:border-primary hover:text-primary"
              >
                {label}
                <ArrowRight size={15} />
              </a>
            ))}
          </div>
        </section>
        <section className="border-y border-border bg-secondary/50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:py-14 lg:px-8">
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
        <section className="mx-auto max-w-4xl px-4 py-9 sm:px-6 lg:px-8">
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
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-l-4 border-primary bg-card px-5 py-6 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-sm font-bold text-primary">Latihan tanpa akun</p>
              <h2 className="mt-2 text-2xl font-extrabold">Mulai sesi demo Anda</h2>
              <p className="mt-2 text-muted-foreground">
                Jawaban tersimpan lokal di browser perangkat ini.
              </p>
            </div>
            <Button asChild className="min-h-12">
              <Link to="/simulasi-cat-cpns">
                Mulai simulasi gratis <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
