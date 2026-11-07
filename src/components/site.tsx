import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, BookOpen, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContentPageData } from "@/lib/content-pages";

const nav = [
  ["Beranda", "/"],
  ["Simulasi CAT", "/simulasi-cat-cpns"],
  ["Bank Soal", "/latihan-soal-cpns"],
  ["Info CPNS", "/jadwal-cpns"],
  ["PPPK", "/pppk"],
  ["Panduan", "/panduan"],
  ["Dashboard", "/dashboard"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-3" aria-label="Daftar CPNS, beranda">
          <span className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground"><BookOpen size={20} /></span>
          <span className="leading-tight"><span className="block font-extrabold text-foreground">Daftar CPNS</span><span className="hidden text-xs text-muted-foreground sm:block">Belajar, berlatih, persiapkan ASN</span></span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 xl:flex">
          {nav.map(([label, href]) => <Link key={href} to={href} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary">{label}</Link>)}
        </nav>
        <div className="hidden xl:block"><Button asChild className="min-h-11"><Link to="/simulasi-cat-cpns">Mulai latihan</Link></Button></div>
        <Button variant="outline" size="icon" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} className="min-h-11 min-w-11 xl:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav aria-label="Navigasi seluler" className="grid gap-1 border-t border-border bg-background px-4 py-3 xl:hidden">{nav.map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-md px-3 font-medium hover:bg-secondary">{label}</Link>)}<Button asChild className="mt-2 min-h-11"><Link to="/simulasi-cat-cpns" onClick={() => setOpen(false)}>Mulai latihan</Link></Button></nav>}
    </header>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-card">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
      <div><Link to="/" className="text-lg font-extrabold text-foreground">Daftar CPNS</Link><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Platform Edukasi &amp; Simulasi CAT Independen. Bukan BKN, SSCASN, atau portal pemerintah.</p><a href="https://sscasn.bkn.go.id/" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline">Pendaftaran resmi di SSCASN <ArrowUpRight size={16} /></a></div>
      <div><h2 className="font-bold">Pusat belajar</h2><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link to="/simulasi-cat-cpns" className="min-h-8 hover:text-primary">Simulasi CAT</Link><Link to="/soal-twk" className="min-h-8 hover:text-primary">Latihan TWK</Link><Link to="/soal-tiu" className="min-h-8 hover:text-primary">Latihan TIU</Link><Link to="/soal-tkp" className="min-h-8 hover:text-primary">Latihan TKP</Link><Link to="/pppk" className="min-h-8 hover:text-primary">Panduan PPPK</Link></div></div>
      <div><h2 className="font-bold">Informasi</h2><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link to="/tentang-kami" className="min-h-8 hover:text-primary">Tentang kami</Link><Link to="/kontak" className="min-h-8 hover:text-primary">Kontak</Link><Link to="/kebijakan-privasi" className="min-h-8 hover:text-primary">Kebijakan privasi</Link><Link to="/syarat-ketentuan" className="min-h-8 hover:text-primary">Syarat dan ketentuan</Link><Link to="/disclaimer" className="min-h-8 hover:text-primary">Disclaimer</Link></div></div>
    </div>
    <div className="border-t border-border"><p className="mx-auto max-w-7xl px-4 py-4 text-xs leading-5 text-muted-foreground sm:px-6 lg:px-8">Latihan pada situs ini adalah materi demo orisinal, bukan soal resmi. Periksa jadwal, formasi, syarat, dan aturan seleksi melalui kanal pemerintah.</p></div>
  </footer>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}

export function ContentPage({ page }: { page: ContentPageData }) {
  return <SiteShell><main className="min-h-[65vh]">
    <div className="border-b border-border bg-card"><div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"><nav aria-label="Jejak halaman" className="mb-5 text-sm text-muted-foreground"><Link to="/" className="hover:text-primary">Beranda</Link><span aria-hidden="true"> / </span><span>{page.title}</span></nav><p className="text-sm font-bold text-primary">Platform Edukasi &amp; Simulasi CAT Independen</p><h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{page.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{page.intro}</p></div></div>
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_250px] lg:px-8">
      <article className="min-w-0 space-y-9">{page.sections.map((section) => <section key={section.heading}><h2 className="text-xl font-bold text-foreground">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-muted-foreground">{paragraph}</p>)}{section.bullets && <ul className="mt-4 list-disc space-y-2 pl-5 leading-6 text-muted-foreground">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}
        <section className="border-t border-border pt-6"><h2 className="text-lg font-bold">Lanjutkan belajar</h2><div className="mt-4 flex flex-wrap gap-3"><Button asChild className="min-h-11"><Link to="/simulasi-cat-cpns">Buka simulasi demo</Link></Button><Button asChild variant="outline" className="min-h-11"><Link to="/panduan">Panduan belajar</Link></Button></div></section>
      </article>
      <aside className="h-fit border-t-2 border-primary pt-4 md:border-t-0 md:border-l-2 md:border-primary md:pl-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={20} /><div><h2 className="font-bold">Rujukan &amp; batas informasi</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Informasi seleksi dapat berubah. Periksa sumber pemerintah sebelum mengambil keputusan.</p></div></div>{page.sourceLinks && <ul className="mt-4 grid gap-3">{page.sourceLinks.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">{source.label}</a></li>)}</ul>}</aside>
    </div>
  </main></SiteShell>;
}

export function contentHead(page: ContentPageData, canonical: string) {
  return { meta: [
    { title: page.metaTitle },
    { name: "description", content: page.description },
    { property: "og:title", content: page.metaTitle },
    { property: "og:description", content: page.description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(page.noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ], links: [{ rel: "canonical", href: canonical }] };
}