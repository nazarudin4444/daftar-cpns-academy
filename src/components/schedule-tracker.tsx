import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileCheck,
  FileSearch,
  GraduationCap,
  Landmark,
  Link2,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
  Timer,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site";

type SelectionStage = {
  title: string;
  summary: string;
  icon: LucideIcon;
  documents: string[];
  tip: string;
  avoid: string;
};

const stages: SelectionStage[] = [
  {
    title: "Pengumuman formasi dan syarat jabatan",
    summary: "Baca pengumuman instansi sebelum memilih jabatan.",
    icon: FileSearch,
    documents: [
      "Pengumuman resmi beserta lampiran formasi.",
      "Ijazah, program studi, dan dokumen pendukung yang diminta instansi.",
    ],
    tip: "Cocokkan jenjang, nama program studi, syarat jabatan, dan lokasi dengan dokumen resmi instansi.",
    avoid:
      "Jangan memakai poster atau syarat dari periode sebelumnya sebagai acuan pendaftaran baru.",
  },
  {
    title: "Registrasi akun dan pengajuan lamaran",
    summary: "Buat akun dan pilih formasi melalui portal SSCASN.",
    icon: UserRoundCheck,
    documents: [
      "Data identitas yang diminta saat membuat akun.",
      "Ijazah, transkrip, pasfoto, dan berkas lain sesuai pengumuman formasi.",
    ],
    tip: "Periksa kembali biodata dan pratinjau setiap dokumen sebelum mengirim lamaran.",
    avoid:
      "Jangan memasukkan NIK, kata sandi, atau dokumen ke situs selain portal resmi. Daftar CPNS tidak meminta data tersebut.",
  },
  {
    title: "Verifikasi administrasi dan masa sanggah",
    summary: "Instansi memeriksa kesesuaian lamaran dengan persyaratan.",
    icon: ClipboardCheck,
    documents: [
      "Bukti pendaftaran dan status seleksi administrasi di akun SSCASN.",
      "Dokumen pendukung yang relevan jika mengajukan sanggah.",
    ],
    tip: "Baca alasan hasil administrasi. Ajukan sanggah melalui SSCASN hanya bila ada kekeliruan verifikasi, sesuai masa sanggah resmi.",
    avoid:
      "Sanggah bukan kesempatan untuk mengganti atau melengkapi dokumen yang keliru dikirim pelamar.",
  },
  {
    title: "Jadwal SKD dan kartu ujian",
    summary: "Peserta yang memenuhi syarat mengikuti jadwal dan lokasi yang ditetapkan.",
    icon: CalendarDays,
    documents: [
      "Kartu ujian dari akun SSCASN.",
      "Identitas dan perlengkapan yang diminta dalam tata tertib instansi.",
    ],
    tip: "Catat sesi, lokasi, waktu kedatangan, dan aturan pakaian dari pengumuman resmi.",
    avoid:
      "Jangan mengandalkan jadwal yang beredar di grup atau unggahan tanpa tautan pengumuman instansi.",
  },
  {
    title: "Ujian SKD dengan CAT BKN",
    summary: "Materi SKD CPNS meliputi TWK, TIU, dan TKP.",
    icon: Timer,
    documents: [
      "Kartu ujian dan identitas yang dipersyaratkan.",
      "Tata tertib dan ketentuan perangkat dari panitia seleksi.",
    ],
    tip: "Ikuti instruksi panitia dan layar CAT. Gunakan latihan untuk membiasakan diri mengatur waktu.",
    avoid: "Kecurangan atau penggunaan barang yang dilarang dapat menggugurkan peserta.",
  },
  {
    title: "Pengumuman hasil SKD dan pemeringkatan",
    summary: "Hasil mengikuti nilai ambang batas dan peringkat sesuai ketentuan seleksi.",
    icon: BadgeCheck,
    documents: [
      "Hasil SKD yang tampil di portal dan pengumuman resmi instansi.",
      "Rincian kebutuhan jabatan yang dilamar sebagai konteks pemeringkatan.",
    ],
    tip: "Baca ketentuan periode berjalan. Pada aturan CPNS 2024, peserta yang memenuhi nilai ambang batas dapat diumumkan paling banyak tiga kali jumlah kebutuhan jabatan.",
    avoid:
      "Memenuhi nilai ambang batas saja tidak selalu berarti lanjut ke SKB; peringkat dan ketentuan jabatan juga berlaku.",
  },
  {
    title: "Seleksi Kompetensi Bidang (SKB)",
    summary: "Metode dan materi SKB mengikuti ketentuan jabatan serta instansi.",
    icon: BookOpenCheck,
    documents: [
      "Kartu ujian dan identitas sesuai arahan instansi.",
      "Sertifikat, portofolio, atau dokumen tambahan bila diminta dalam pengumuman.",
    ],
    tip: "Periksa apakah jabatan memakai CAT BKN saja atau tes tambahan, seperti wawancara atau praktik kerja, beserta bobot dan kriterianya.",
    avoid: "Jangan menganggap semua instansi memakai bentuk tes dan bobot SKB yang sama.",
  },
  {
    title: "Integrasi nilai akhir dan pengusulan NIP",
    summary: "Instansi mengumumkan hasil akhir dan memproses kelengkapan calon PNS.",
    icon: FileCheck,
    documents: [
      "Pengumuman hasil akhir dan daftar riwayat hidup sesuai arahan instansi.",
      "Dokumen pemberkasan untuk penetapan NIP yang diminta pada tahap tersebut.",
    ],
    tip: "Pantau akun SSCASN dan pengumuman instansi, lalu serahkan dokumen sesuai daftar serta batas waktunya.",
    avoid:
      "Keterlambatan atau dokumen pemberkasan yang tidak sesuai dapat memengaruhi proses pengangkatan.",
  },
];

const formasiSteps = [
  {
    title: "Jenjang pendidikan",
    copy: "Pilih jenjang yang sesuai dengan ijazah dan persyaratan jabatan.",
    icon: GraduationCap,
  },
  {
    title: "Program studi",
    copy: "Cocokkan nama atau kualifikasi program studi dengan pengumuman.",
    icon: BookOpenCheck,
  },
  {
    title: "Instansi dan jabatan",
    copy: "Periksa unit kerja, lokasi penempatan, serta catatan jabatan.",
    icon: Landmark,
  },
  {
    title: "Jenis pengadaan",
    copy: "Contoh: Umum, Cumlaude, atau Disabilitas bila dibuka dan Anda memenuhi syaratnya.",
    icon: ListChecks,
  },
];

const hoaxChecks = [
  {
    title: "Temukan pengumuman sumber pertama",
    copy: "Cari informasi yang sama di SSCASN, BKN, dan situs resmi instansi.",
    icon: FileSearch,
  },
  {
    title: "Cocokkan detail dan tanggal",
    copy: "Pastikan nama seleksi, instansi, periode, syarat, dan ralatnya sesuai.",
    icon: ClipboardCheck,
  },
  {
    title: "Periksa tautan sebelum mengisi data",
    copy: "Buka portal resmi secara langsung. Hindari tautan mencurigakan dan jangan membagikan data pribadi.",
    icon: Link2,
  },
];

const officialLinks = [
  { label: "Portal SSCASN BKN", href: "https://sscasn.bkn.go.id/" },
  {
    label: "Klarifikasi BKN tentang hoaks CPNS 2026",
    href: "https://www.bkn.go.id/karo-komlik-bkn-wisudo-putro-nugroho-poster-pembukaan-cpns-2026-yang-beredar-dipastikan-hoaks/",
  },
  {
    label: "PermenPANRB Nomor 6 Tahun 2024",
    href: "https://jdih.menpan.go.id/dokumen-hukum/peraturan-menteri-pendayagunaan-aparatur-negara-dan-reformasi-birokrasi-nomor-6-tahun-2024-tentang-p-1849",
  },
] as const;

export function ScheduleTracker() {
  return (
    <SiteShell>
      <main>
        <section className="bg-hero relative overflow-hidden text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 md:pb-10 md:pt-8 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-primary-foreground/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="inline-flex min-h-11 items-center hover:text-white">
                    Beranda
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-white">
                  Jadwal CPNS
                </li>
              </ol>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur-md">
              <CalendarDays size={16} aria-hidden="true" />
              Pemantau informasi seleksi
            </p>
            <h1 className="mt-4 max-w-3xl text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
              Jadwal dan tahapan seleksi CPNS
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-primary-foreground/80">
              Pantau pengumuman resmi dan pahami alur umum seleksi. Halaman ini tidak menerbitkan
              tanggal atau formasi yang belum diumumkan instansi.
            </p>

            <div className="mt-5 grid max-w-5xl gap-2.5 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-3.5 backdrop-blur-md">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="relative grid size-2 place-items-center" aria-hidden="true">
                    <span className="absolute size-2 rounded-full bg-emerald-300/40 motion-safe:animate-[ping_1.6s_cubic-bezier(0,0,0.2,1)_2]" />
                    <span className="relative size-1.5 rounded-full bg-emerald-300" />
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Status seleksi: Menunggu pengumuman resmi BKN
                  </p>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">
                  Saat diperiksa, beranda SSCASN menampilkan “Data tahapan belum tersedia” pada
                  linimasa seleksi yang tampil.
                </p>
              </div>
              <div className="flex flex-col items-start justify-between gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-3.5 backdrop-blur-md">
                <div>
                  <p className="text-xs font-semibold text-primary-foreground/65">
                    Data terakhir diperiksa di portal SSCASN
                  </p>
                  <p className="mt-1 text-base font-bold text-white">9 November 2026</p>
                </div>
                <a
                  href="https://sscasn.bkn.go.id/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-primary transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Cek Langsung di SSCASN BKN <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="timeline-heading"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-primary">Roadmap umum, tanpa tanggal rekaan</p>
            <h2
              id="timeline-heading"
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Delapan tahapan yang perlu dipahami
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Buka setiap tahap untuk melihat dokumen, panduan, dan hal yang perlu dihindari.
              Urutan, ketentuan, dan jadwal aktual mengikuti pengumuman resmi periode serta
              instansi.
            </p>
          </div>

          <ol className="relative mt-8 space-y-4 before:absolute before:bottom-8 before:left-4 before:top-8 before:w-px before:bg-border sm:before:left-5">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <li key={stage.title} className="relative pl-10 sm:pl-12">
                  <span className="absolute left-0 top-4 z-10 grid size-8 place-items-center rounded-full border border-border bg-background text-xs font-bold tabular-nums text-primary ring-4 ring-background sm:left-1 sm:size-9">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <details className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow open:shadow-md">
                    <summary className="flex min-h-[52px] cursor-pointer list-none items-center gap-2.5 p-2.5 marker:hidden hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary sm:p-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                        <Icon size={15} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-primary">
                          Tahap {index + 1} · Alur umum
                        </span>
                        <span className="mt-0.5 block font-bold text-foreground">
                          {stage.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground sm:text-sm">
                          {stage.summary}
                        </span>
                      </span>
                      <ChevronDown
                        className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="grid gap-3 border-t border-border bg-background/50 p-3 sm:grid-cols-3">
                      <div>
                        <h3 className="text-xs font-bold text-foreground">Yang disiapkan</h3>
                        <ul className="mt-1 list-disc space-y-1 pl-3.5 text-xs leading-5 text-muted-foreground">
                          {stage.documents.map((document) => (
                            <li key={document}>{document}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-foreground">Panduan</h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{stage.tip}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-foreground">Hindari</h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {stage.avoid}
                        </p>
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>

          <p className="mt-5 max-w-4xl text-xs leading-5 text-muted-foreground">
            Catatan SKD: paket latihan di situs ini berisi 110 soal dengan durasi 100 menit. Angka
            itu adalah konfigurasi demo, bukan penetapan durasi seleksi resmi tahun berjalan.
          </p>
        </section>

        <section aria-labelledby="formasi-heading" className="border-y border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-primary">Panduan mencari formasi</p>
              <h2
                id="formasi-heading"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Periksa formasi langsung di SSCASN
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Alur berikut adalah panduan membaca filter, bukan daftar formasi aktif atau simulasi
                data SSCASN. Pilihan hanya tersedia ketika pengadaan dibuka.
              </p>
            </div>

            <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {formasiSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="relative rounded-lg border border-border bg-background p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-8 place-items-center rounded-md bg-secondary text-primary">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold tabular-nums text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.copy}</p>
                    {index < formasiSteps.length - 1 && (
                      <ArrowRight
                        className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-card p-0.5 text-primary lg:block"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <details className="group rounded-xl border border-border bg-background p-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-foreground marker:hidden">
                  Cara membaca kode formasi dan catatan jabatan
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Cocokkan nama jabatan, kualifikasi pendidikan, jenis kebutuhan, unit kerja,
                  lokasi, dan catatan khusus pada lampiran instansi. Kode serta penjelasannya dapat
                  berbeda; gunakan keterangan yang menyertai formasi tersebut.
                </p>
              </details>
              <a
                href="https://sscasn.bkn.go.id/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Buka portal SSCASN <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="antihoax-heading"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
              <ShieldAlert size={20} aria-hidden="true" />
            </span>
            <div className="max-w-3xl">
              <p className="text-sm font-bold text-destructive">Periksa sebelum percaya</p>
              <h2
                id="antihoax-heading"
                className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Cek keaslian jadwal dan pengumuman
              </h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                BKN meminta masyarakat memverifikasi informasi seleksi lewat kanal pemerintah dan
                SSCASN, serta menghindari tautan mencurigakan dan penyebaran data pribadi.
              </p>
            </div>
          </div>

          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {hoaxChecks.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-secondary text-primary">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold tabular-nums text-muted-foreground">
                      Langkah {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 flex flex-col gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-xs leading-5 text-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
              BKN telah mengklarifikasi poster pembukaan CPNS 2026 yang beredar sebagai hoaks.
            </p>
            <a
              href={officialLinks[1].href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Baca klarifikasi BKN <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          aria-labelledby="sources-heading"
          className="border-t border-border bg-secondary/50"
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h2 id="sources-heading" className="text-lg font-bold text-foreground">
              Rujukan resmi
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {officialLinks.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {source.label} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 max-w-4xl text-xs leading-5 text-muted-foreground">
              Roadmap ini bersifat edukatif. Ketentuan, urutan, dokumen, jumlah peserta yang lanjut,
              durasi ujian, dan jadwal dapat berubah sesuai peraturan serta pengumuman instansi.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
