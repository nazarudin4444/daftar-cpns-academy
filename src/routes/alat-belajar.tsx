import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site";
import { CASNGlossary, SelectionCalculators } from "@/components/study-tools";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator } from "lucide-react";
import { PageHero, heroGhostLink, heroPrimaryLink } from "@/components/page-hero";
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
      <PageHero
        eyebrow="Persiapan seleksi"
        icon={Calculator}
        title="Pahami peluang. Susun target latihan."
        description="Bandingkan skenario nilai Anda dan pahami istilah dalam pengumuman seleksi."
      >
        <Link to="/kisi-kisi-skd" className={heroPrimaryLink}>
          Kisi-kisi dan latihan topik <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/persiapan-dokumen" className={heroGhostLink}>
          Cek dokumen dan draf surat
        </Link>
      </PageHero>
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        <SelectionCalculators />
        <CASNGlossary />
      </main>
    </SiteShell>
  ),
});
