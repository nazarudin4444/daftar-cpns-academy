import { FileCheck } from "lucide-react";
import { PageHero, heroGhostLink, heroPrimaryLink } from "@/components/page-hero";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site";
import { DocumentPreparation, LetterGenerator } from "@/components/document-preparation";

export const Route = createFileRoute("/persiapan-dokumen")({
  head: () => ({
    meta: [
      { title: "Cek Berkas SSCASN, Kompres Lokal & Draf Surat CASN | Daftar CPNS" },
      {
        name: "description",
        content:
          "Periksa ukuran JPG/PDF, kompres dokumen di browser, dan susun draf surat CASN tanpa mengunggah berkas ke server.",
      },
    ],
    links: [{ rel: "canonical", href: "/persiapan-dokumen" }],
  }),
  component: () => (
    <SiteShell>
      <PageHero
        eyebrow="Persiapan administrasi"
        icon={FileCheck}
        title="Siapkan berkas. Periksa sebelum dikirim."
        description="Pemeriksaan ukuran dan penyusunan draf surat langsung di perangkat Anda. Verifikasi akhir tetap mengikuti pengumuman instansi."
        stats={[
          { value: "Lokal", label: "Diproses di browser" },
          { value: "0", label: "Berkas dikirim ke server" },
          { value: "Rp0", label: "Tanpa akun" },
        ]}
      >
        <a className={heroPrimaryLink} href="#documents-heading">
          Cek dan kompres berkas
        </a>
        <a className={heroGhostLink} href="#letter-heading">
          Buat draf surat
        </a>
      </PageHero>
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        <DocumentPreparation />
        <LetterGenerator />
      </main>
    </SiteShell>
  ),
});
