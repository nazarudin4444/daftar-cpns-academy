import { useEffect, useState } from "react";
import { integratedScore, requiredSKB, skbCapacity } from "@/lib/selection-tools";

export function ReadingMode() {
  const [night, setNight] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cpns:night") === "true";
      setNight(saved);
      document.documentElement.classList.toggle("dark", saved);
    } catch {
      /* Theme remains available without storage. */
    }
  }, []);
  return (
    <button
      type="button"
      className="study-control"
      aria-pressed={night}
      onClick={() => {
        const next = !night;
        setNight(next);
        document.documentElement.classList.toggle("dark", next);
        try {
          localStorage.setItem("cpns:night", String(next));
        } catch {
          /* Keep the current theme. */
        }
      }}
    >
      {night ? "Mode siang" : "Mode malam"}
    </button>
  );
}

export function ExamControls({ target }: { target: React.RefObject<HTMLDialogElement | null> }) {
  const [sound, setSound] = useState(false);
  const [full, setFull] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const change = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", change);
    return () => {
      document.removeEventListener("fullscreenchange", change);
    };
  }, []);
  useEffect(() => {
    if (!sound) return;
    let context: AudioContext | undefined;
    const click = (event: Event) => {
      if (!(event.target instanceof HTMLInputElement) || event.target.type !== "radio") return;
      try {
        context ??= new AudioContext();
        void context.resume();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = 520;
        gain.gain.setValueAtTime(0.035, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.045);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.05);
      } catch {
        setError("Audio tidak didukung pada browser ini.");
      }
    };
    const node = target.current;
    node?.addEventListener("change", click);
    return () => {
      node?.removeEventListener("change", click);
      void context?.close();
    };
  }, [sound, target]);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ReadingMode />
      <button
        className="study-control"
        type="button"
        aria-pressed={sound}
        onClick={() => setSound(!sound)}
      >
        Suara {sound ? "aktif" : "mati"}
      </button>
      <button
        className="study-control"
        type="button"
        aria-pressed={full}
        onClick={async () => {
          try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else if (target.current?.requestFullscreen) await target.current.requestFullscreen();
            else setError("Layar penuh tidak didukung. Ruang ujian tetap dapat digunakan.");
          } catch {
            setError("Browser tidak mengizinkan layar penuh. Ruang ujian tetap dapat digunakan.");
          }
        }}
      >
        {full ? "Keluar layar penuh" : "Layar penuh"}
      </button>
      {error && (
        <span role="status" className="text-sm">
          {error}
        </span>
      )}
    </div>
  );
}

export function VisualScorecard({
  rows,
  date,
  alias = "",
  onAliasChange,
}: {
  rows: { subject: string; correct: number; total: number }[];
  date: number;
  alias?: string;
  onAliasChange?: (value: string) => void;
}) {
  const subjects = ["TWK", "TIU", "TKP"];
  const values = subjects.map((subject) => {
    const row = rows.find((r) => r.subject === subject);
    return row?.total ? row.correct / row.total : 0;
  });
  const points = (ratios: number[]) =>
    ratios
      .map((r, i) => {
        const angle = -Math.PI / 2 + (i * Math.PI * 2) / 3;
        return `${140 + Math.cos(angle) * 90 * r},${125 + Math.sin(angle) * 90 * r}`;
      })
      .join(" ");
  return (
    <section className="study-panel mt-6">
      <h3 className="text-xl font-bold">Peta kekuatan materi</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Persentase jawaban sesuai kunci, bukan skor resmi SKD.
      </p>
      <div className="grid items-center gap-5 sm:grid-cols-2">
        <svg
          viewBox="0 0 280 240"
          className="mx-auto w-full max-w-80"
          role="img"
          aria-label={subjects
            .map((s, i) => `${s} ${Math.round((values[i] ?? 0) * 100)} persen`)
            .join(", ")}
        >
          {[0.25, 0.5, 0.75, 1].map((r) => (
            <polygon
              key={r}
              points={points([r, r, r])}
              fill="none"
              stroke="currentColor"
              opacity="0.2"
            />
          ))}
          <polygon
            points={points(values)}
            fill="var(--primary)"
            fillOpacity="0.22"
            stroke="var(--primary)"
            strokeWidth="3"
          />
          <g fill="currentColor" textAnchor="middle" fontSize="14" fontWeight="600">
            <text x="140" y="20">
              TWK
            </text>
            <text x="240" y="190">
              TIU
            </text>
            <text x="40" y="190">
              TKP
            </text>
          </g>
        </svg>
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.subject}>
              <p className="flex justify-between gap-3 text-sm font-semibold">
                <span>{r.subject}</span>
                <span>
                  {r.correct} / {r.total} sesuai kunci
                </span>
              </p>
              <progress
                className="mt-2 h-3 w-full accent-primary"
                value={r.correct}
                max={r.total || 1}
                aria-label={`Ketepatan ${r.subject}`}
              />
            </div>
          ))}
        </div>
      </div>
      {onAliasChange && (
        <label className="study-field print:hidden">
          Nama alias pada kartu
          <input
            maxLength={40}
            value={alias}
            onChange={(e) => onAliasChange(e.target.value)}
            placeholder="Peserta latihan"
          />
        </label>
      )}
      <p className="mt-2 font-semibold">
        {alias || "Peserta latihan"} ·{" "}
        {new Date(date).toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta" })}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Gunakan tombol cetak hasil, lalu pilih Simpan sebagai PDF. Alias hanya digunakan di halaman
        ini.
      </p>
    </section>
  );
}

export function SelectionCalculators() {
  const [quota, setQuota] = useState("2");
  const [skd, setSKD] = useState("400");
  const [skb, setSKB] = useState("80");
  const [rivalSKD, setRivalSKD] = useState("420");
  const [rivalSKB, setRivalSKB] = useState("80");
  const capacity = skbCapacity(Number(quota));
  const valid = [skd, skb, rivalSKD, rivalSKB].every(
    (value, i) =>
      value.trim() !== "" &&
      Number.isFinite(Number(value)) &&
      Number(value) >= 0 &&
      Number(value) <= (i % 2 === 0 ? 550 : 100),
  );
  const target = requiredSKB(Number(skd), Number(rivalSKD), Number(rivalSKB));
  return (
    <section className="study-tools" aria-labelledby="selection-heading">
      <h2 id="selection-heading" className="text-2xl font-bold">
        Rencanakan langkah menuju SKB
      </h2>
      <p className="mt-2 text-muted-foreground">
        Simulasi dengan acuan seleksi umum 2024. Cocokkan ketentuan tahun dan instansi yang Anda
        lamar.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="study-panel">
          <h3 className="text-lg font-bold">Aturan 3 × formasi</h3>
          <label className="study-field">
            Kuota jabatan
            <input
              type="number"
              min="1"
              max="1000000"
              step="1"
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
            />
          </label>
          <div role="status" className="study-output">
            {capacity ? (
              <>
                <strong className="text-3xl">{capacity} peserta</strong>
                <p className="mt-2">Batas dasar peserta SKB untuk {quota} kebutuhan jabatan.</p>
              </>
            ) : (
              "Masukkan kuota bilangan bulat lebih dari nol."
            )}
          </div>
          <p className="mt-3 text-sm leading-6">
            Skor SKD Anda: <strong>{skd || "belum diisi"}</strong>. Skor saja belum menentukan
            posisi: Anda perlu memenuhi ambang setiap subtes dan masuk peringkat sesuai jabatan.
            Saat nilai sama, urutan TKP, TIU, lalu TWK menentukan peringkat. Jika tetap sama pada
            batas kuota, jumlah peserta dapat melebihi 3 × formasi.
          </p>
          <p className="mt-3 text-sm leading-6">
            Pantau hasil resmi per jabatan, periksa peringkat Anda, dan mulai latihan kompetensi
            bidang sebelum pengumuman SKB.
          </p>
        </article>
        <article className="study-panel">
          <h3 className="text-lg font-bold">Integrasi SKD 40% + SKB 60%</h3>
          <div className="grid gap-x-4 sm:grid-cols-2">
            {[
              ["Skor SKD Anda (0–550)", skd, setSKD, 550],
              ["Nilai SKB Anda (0–100)", skb, setSKB, 100],
              ["Skor SKD pembanding (0–550)", rivalSKD, setRivalSKD, 550],
              ["Nilai SKB pembanding (0–100)", rivalSKB, setRivalSKB, 100],
            ].map(([label, value, setter, max]) => (
              <label key={String(label)} className="study-field">
                {String(label)}
                <input
                  type="number"
                  min="0"
                  max={Number(max)}
                  step="any"
                  value={String(value)}
                  onChange={(e) => (setter as (v: string) => void)(e.target.value)}
                />
              </label>
            ))}
          </div>
          <div className="study-output" role="status">
            {valid ? (
              <>
                <strong className="text-3xl">
                  {integratedScore(Number(skd), Number(skb)).toFixed(2)} / 100
                </strong>
                <p className="mt-2">
                  Nilai pembanding: {integratedScore(Number(rivalSKD), Number(rivalSKB)).toFixed(2)}
                  .
                </p>
                <p className="mt-2">
                  {target > 100
                    ? "Pembanding tidak dapat dilampaui dengan nilai SKB maksimal 100."
                    : target < 0
                      ? "Nilai SKD Anda sudah memberi keunggulan pada skenario ini."
                      : `Untuk melampaui pembanding, nilai SKB Anda harus lebih dari ${target.toFixed(4)}.`}
                </p>
              </>
            ) : (
              "Isi semua skor dalam rentang yang tertera."
            )}
          </div>
          <p className="mt-3 text-sm leading-6">
            Rumus skala 100: (SKD ÷ 550 × 40) + (SKB × 0,6). Masukkan nilai SKB akhir yang telah
            dinormalisasi, termasuk komponen tambahan instansi. Nilai sama belum memastikan
            kelulusan.
          </p>
        </article>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Acuan:{" "}
        <a
          className="underline"
          href="https://apps-denpasar.bkn.go.id/kms/law%3Apermenpanrb_6_tahun_2024"
        >
          PermenPANRB 6/2024, Pasal 31 dan 45 (BKN)
        </a>
        . Kalkulator ini tidak memperkirakan peringkat tanpa data pesaing.
      </p>
    </section>
  );
}

const glossary = [
  ["NIP", "Nomor Induk Pegawai, identitas kepegawaian PNS."],
  [
    "BKN",
    "Badan Kepegawaian Negara, lembaga yang menyelenggarakan manajemen kepegawaian nasional.",
  ],
  ["SSCASN", "Sistem Seleksi Calon Aparatur Sipil Negara, portal resmi pendaftaran seleksi ASN."],
  ["KemenPAN-RB", "Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi."],
  ["SKD", "Seleksi Kompetensi Dasar yang menguji TWK, TIU, dan TKP pada seleksi CPNS."],
  [
    "SKB CAT dan Non-CAT",
    "Seleksi Kompetensi Bidang. CAT menggunakan komputer; non-CAT dapat berupa praktik kerja, wawancara, atau tes lain sesuai ketentuan instansi.",
  ],
  [
    "Masa sanggah",
    "Waktu untuk menyampaikan keberatan atas hasil seleksi sesuai jadwal dan ketentuan. Periksa alasan dan prosedur pada pengumuman resmi.",
  ],
  ["DRH", "Daftar Riwayat Hidup, dilengkapi pada tahap pemberkasan sesuai petunjuk SSCASN."],
  [
    "Formasi khusus cumlaude",
    "Kebutuhan khusus bagi lulusan berpredikat dengan pujian yang memenuhi syarat seleksi. Periksa persyaratan akreditasi dan ijazah pada pengumuman instansi.",
  ],
  [
    "P1 / P2 / P3 PPPK",
    "Kode prioritas yang digunakan pada periode dan jenis pengadaan PPPK tertentu. Maknanya mengikuti regulasi serta legenda pengumuman tahun terkait, sehingga tidak dapat digunakan sebagai kategori universal.",
  ],
];
export function CASNGlossary() {
  const [query, setQuery] = useState("");
  const matches = glossary.filter((row) =>
    row.join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="study-panel">
      <h2 className="text-2xl font-bold">Kamus CASN</h2>
      <label className="study-field">
        Cari singkatan atau istilah
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: SKB, sanggah, DRH"
        />
      </label>
      <p className="text-sm text-muted-foreground" role="status">
        {matches.length} istilah ditemukan
      </p>
      <div className="mt-3 divide-y divide-border">
        {matches.map(([term, description]) => (
          <details key={term} className="py-3">
            <summary className="cursor-pointer py-2 font-bold">{term}</summary>
            <p className="py-2 leading-7 text-muted-foreground">{description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
