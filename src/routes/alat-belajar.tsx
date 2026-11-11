import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site";
import { CASNGlossary, SelectionCalculators } from "@/components/study-tools";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/alat-belajar")({
  head: () => ({
    meta: [
      { title: "Kalkulator SKB & Kamus CASN | Daftar CPNS" },
      {
        name: "description",
        content: "Hitung kuota 3 kali formasi dan simulasikan nilai akhir SKD dan SKB.",
      },
    ],
    links: [{ rel: "canonical", href: "/alat-belajar" }],
  }),
  component: () => (
    <SiteShell>
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <header className="border-b border-border pb-8">
          <p className="font-semibold text-primary">Persiapan seleksi</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Pahami peluang. Susun target latihan.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Bandingkan skenario nilai Anda dan pahami istilah dalam pengumuman seleksi.
          </p>
          <Link to="/kisi-kisi-skd" className="study-control mt-4">
            Buka kisi-kisi dan latihan topik
          </Link>
          <Link to="/persiapan-dokumen" className="study-control mt-4 sm:ml-3">
            Cek dokumen dan buat draf surat
          </Link>
        </header>
        <SelectionCalculators />
        <CASNGlossary />
      </main>
    </SiteShell>
  ),
});
