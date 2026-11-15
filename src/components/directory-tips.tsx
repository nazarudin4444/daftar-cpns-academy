import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Lightbulb } from "lucide-react";

const topics = ["Semua", "TWK", "TIU", "TKP", "Dokumen", "Strategi ujian"] as const;
type Topic = (typeof topics)[number];
const tips = [
  {
    id: "deret",
    topic: "TIU",
    title: "Cari selisih sebelum menebak pola",
    action:
      "Tulis selisih antarangka. Jika selisihnya berubah, periksa selisih berikutnya; pola perkalian atau selang-seling juga bisa menjadi kemungkinan.",
    example:
      "3, 6, 11, 18 → selisih 3, 5, 7. Jika pola ini berlanjut, selisih berikutnya 9 dan angkanya 27.",
    href: "/soal-tiu",
    cta: "Latihan TIU",
  },
  {
    id: "silogisme",
    topic: "TIU",
    title: "Bedakan ‘semua’ dengan ‘sebagian’",
    action:
      "Ubah kalimat menjadi hubungan kelompok. Ambil kesimpulan hanya dari informasi yang diberikan, bukan asumsi sehari-hari.",
    example:
      "Semua A adalah B. Sebagian B adalah C. Belum tentu ada A yang merupakan C: bagian B yang menjadi C bisa berada di luar A.",
    href: "/soal-tiu",
    cta: "Latihan penalaran TIU",
  },
  {
    id: "twk",
    topic: "TWK",
    title: "Hubungkan nilai dengan tindakan",
    action:
      "Saat membaca soal situasi, tentukan nilai yang diuji lalu cocokkan dengan tindakan tokoh. Buat catatan alasan, bukan hanya huruf jawaban.",
    example:
      "Tokoh melaporkan kesalahan pekerjaannya sendiri. Catat kaitannya dengan kejujuran dan tanggung jawab; periksa lagi konteks pertanyaan sebelum memilih.",
    href: "/soal-twk",
    cta: "Latihan TWK",
  },
  {
    id: "tkp",
    topic: "TKP",
    title: "Baca peran dan batas kewenangan",
    action:
      "Kenali masalah, pihak yang terdampak, serta kewenangan tokoh. Bandingkan opsi dari sisi pelayanan, kerja sama, dan prosedur yang disebutkan dalam soal.",
    example:
      "Saat warga mengeluhkan layanan, membantu menjelaskan langkah penyelesaian dapat lebih berguna daripada sekadar meminta mereka menunggu. Tetap sesuaikan dengan kondisi dalam soal.",
    href: "/soal-tkp",
    cta: "Latihan TKP",
  },
  {
    id: "dokumen",
    topic: "Dokumen",
    title: "Buat daftar berkas dari pengumuman instansi",
    action:
      "Catat nama dokumen, format, batas ukuran, dan ketentuan tanda tangan atau meterai dari pengumuman yang Anda ikuti. Periksa keterbacaan setiap halaman sebelum mengunggah.",
    example:
      "Buat kolom: dokumen · syarat dari instansi · sudah diperiksa. Jangan menganggap batas ukuran satu dokumen berlaku untuk semua berkas.",
    href: "/persiapan-dokumen",
    cta: "Buka alat persiapan dokumen",
  },
  {
    id: "evaluasi",
    topic: "Strategi ujian",
    title: "Ulangi alasan salah, bukan hanya soalnya",
    action:
      "Setelah latihan, kelompokkan kesalahan: belum paham konsep, salah membaca, atau kurang waktu. Pilih satu kelompok untuk diperbaiki pada sesi berikutnya.",
    example:
      "Jika tiga kesalahan berasal dari kata ‘kecuali’ yang terlewat, biasakan membaca ulang kalimat pertanyaan sebelum memutuskan jawaban.",
    href: "/simulasi-cat-cpns",
    cta: "Mulai sesi latihan",
  },
] as const;

function TipContent({ tip }: { tip: (typeof tips)[number] }) {
  return (
    <>
      <p className="text-xs font-bold text-primary">{tip.topic}</p>
      <h3 className="mt-1 text-lg font-bold leading-snug">{tip.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{tip.action}</p>
      <details className="mt-3 rounded-lg border border-border bg-background/70 px-3">
        <summary className="min-h-[44px] cursor-pointer py-3 text-sm font-semibold">
          Lihat contoh singkat
        </summary>
        <p className="pb-3 text-sm leading-6 text-muted-foreground">{tip.example}</p>
      </details>
      <Link
        to={tip.href}
        className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-md text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        {tip.cta}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </>
  );
}

export function DirectoryTips() {
  const [featured, setFeatured] = useState(0);
  const [topic, setTopic] = useState<Topic>("Semua");
  useEffect(() => {
    const update = () => {
      const date = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      const rank = [...date].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 0);
      setFeatured(rank % tips.length);
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const visible = tips.filter((tip) => topic === "Semua" || tip.topic === topic);
  return (
    <section
      aria-labelledby="directory-tips-heading"
      className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-5"
    >
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold text-positive">
            <Lightbulb size={17} aria-hidden="true" /> Tips Hari Ini
          </p>
          <h2 id="directory-tips-heading" className="mt-2 text-xl font-bold">
            Satu langkah untuk belajar lebih terarah
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Pilihan berganti setiap hari menurut waktu Jakarta. Tips disusun oleh tim Daftar CPNS
            sebagai panduan latihan.
          </p>
        </div>
        <div className="min-w-0 border-l-2 border-primary/30 pl-4">
          <TipContent tip={tips[featured]} />
        </div>
      </div>
      <details className="group mt-3 border-t border-border pt-2">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold marker:hidden">
          Jelajahi semua tips · {tips.length} bacaan
          <ChevronDown
            size={17}
            className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Topik tips">
          {topics.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={topic === item}
              onClick={() => setTopic(item)}
              className={`min-h-[44px] rounded-lg border px-3 text-sm font-semibold ${topic === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <p role="status" className="mt-3 text-xs text-muted-foreground">
          {visible.length} tips ditampilkan
        </p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {visible.map((tip) => (
            <article key={tip.id} className="rounded-lg border border-border p-4">
              <TipContent tip={tip} />
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Tips merupakan materi editorial, bukan ketentuan seleksi. Untuk persyaratan dokumen dan
          aturan ujian, ikuti pengumuman resmi instansi serta SSCASN pada direktori di bawah.
        </p>
      </details>
    </section>
  );
}
