import { FileCheck } from "lucide-react";
import { PageHero, heroGhostLink, heroPrimaryLink } from "@/components/page-hero";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";
import { DocumentPreparation, LetterGenerator } from "@/components/document-preparation";

export const Route = createFileRoute("/persiapan-dokumen")({
  head: () => contentHead(CONTENT_PAGES["persiapan-dokumen"]!, "/persiapan-dokumen"),
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
