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
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        <header className="border-b border-border pb-8">
          <p className="font-semibold text-primary">Persiapan administrasi</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">
            Siapkan berkas. Periksa sebelum dikirim.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Pemeriksaan ukuran dan penyusunan draf surat langsung di perangkat Anda. Verifikasi
            akhir tetap mengikuti pengumuman instansi.
          </p>
          <nav aria-label="Alat dokumen" className="mt-5 flex flex-wrap gap-3">
            <a className="study-control" href="#documents-heading">
              Cek dan kompres berkas
            </a>
            <a className="study-control" href="#letter-heading">
              Buat draf surat
            </a>
          </nav>
        </header>
        <DocumentPreparation />
        <LetterGenerator />
      </main>
    </SiteShell>
  ),
});
