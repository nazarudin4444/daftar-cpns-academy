import { useRef, useState } from "react";
import {
  checkDocument,
  compressImage,
  createLetterDOCX,
  detectDocumentFormat,
  fillLetter,
  optimizePDF,
  saveLocalFile,
  validSizeRule,
  type DocumentFormat,
  type SizeRule,
} from "@/lib/document-tools";

const presets: { name: string; rule: SizeRule }[] = [
  { name: "KTP", rule: { format: "jpg", minKB: 0, maxKB: 500 } },
  { name: "Ijazah", rule: { format: "pdf", minKB: 0, maxKB: 1000 } },
  { name: "Transkrip", rule: { format: "pdf", minKB: 0, maxKB: 1000 } },
  { name: "Surat lamaran", rule: { format: "pdf", minKB: 0, maxKB: 500 } },
  { name: "Pasfoto", rule: { format: "jpg", minKB: 100, maxKB: 300 } },
];

function DocumentCheck({ name, initialRule }: { name: string; initialRule: SizeRule }) {
  const [rule, setRule] = useState(initialRule);
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<DocumentFormat | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unsigned, setUnsigned] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const revision = useRef(0);
  const report = file ? checkDocument(file.size, format, rule) : null;
  const outputReport = result ? checkDocument(result.size, format, rule) : null;
  function changeRule(next: SizeRule) {
    setRule(next);
    setResult(null);
    setError("");
  }
  async function choose(next: File | null) {
    const current = ++revision.current;
    setFile(null);
    setFormat(null);
    setResult(null);
    setError("");
    setUnsigned(false);
    if (!next) return;
    if (next.size > 20 * 1024 * 1024) {
      setError("Batas pemrosesan lokal 20 MB per file. Pilih berkas yang lebih kecil.");
      return;
    }
    setBusy(true);
    try {
      const detected = await detectDocumentFormat(next);
      if (current !== revision.current) return;
      setFile(next);
      setFormat(detected);
      if (!detected)
        setError("Isi file tidak dikenali sebagai JPG atau PDF. Ekspor ulang dari dokumen asli.");
    } catch {
      if (current === revision.current)
        setError("File tidak dapat dibaca. Pilih ulang berkas dari perangkat Anda.");
    } finally {
      if (current === revision.current) setBusy(false);
    }
  }
  async function compress() {
    if (!file || !format || !validSizeRule(rule)) return;
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const output =
        format === "jpg" ? await compressImage(file, rule.maxKB) : await optimizePDF(file);
      if (output.size >= file.size)
        setError(
          "Ukuran tidak berkurang. Gunakan file asli; untuk PDF hasil pindai, kecilkan gambar pada sumber lalu ekspor ulang.",
        );
      else setResult(output);
    } catch (cause) {
      setError(
        cause instanceof Error && /tanda tangan|32 megapiksel|Browser|Gagal/.test(cause.message)
          ? cause.message
          : "Berkas tidak dapat diproses. PDF mungkin rusak, terenkripsi, atau tidak didukung. Gunakan dokumen asli tanpa kata sandi.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <article className="study-panel" aria-busy={busy}>
      <h3 className="text-xl font-bold">{name}</h3>
      <fieldset disabled={busy} className="mt-3">
        <legend className="sr-only">Aturan dan file {name}</legend>
        <div className="grid grid-cols-2 gap-x-3">
          <label className="study-field col-span-2">
            Format yang dipersyaratkan
            <select
              className="document-select"
              value={rule.format}
              onChange={(e) => changeRule({ ...rule, format: e.target.value as DocumentFormat })}
            >
              <option value="jpg">JPG / JPEG</option>
              <option value="pdf">PDF</option>
            </select>
          </label>
          <label className="study-field">
            Minimum (KB)
            <input
              type="number"
              min="0"
              value={Number.isNaN(rule.minKB) ? "" : rule.minKB}
              onChange={(e) =>
                changeRule({ ...rule, minKB: e.target.value === "" ? NaN : Number(e.target.value) })
              }
            />
          </label>
          <label className="study-field">
            Maksimum (KB)
            <input
              type="number"
              min="1"
              value={Number.isNaN(rule.maxKB) ? "" : rule.maxKB}
              onChange={(e) =>
                changeRule({ ...rule, maxKB: e.target.value === "" ? NaN : Number(e.target.value) })
              }
            />
          </label>
        </div>
        <label className="study-field">
          Pilih file {name}
          <input
            ref={fileInput}
            type="file"
            accept=".jpg,.jpeg,.pdf,image/jpeg,application/pdf"
            onChange={(e) => void choose(e.target.files?.[0] ?? null)}
            className="text-sm file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-secondary file:p-2 file:text-foreground"
          />
        </label>
        {!file && !error && (
          <p className="text-sm text-muted-foreground">
            Belum ada file dipilih. File tidak disimpan oleh situs.
          </p>
        )}
        {file && (
          <div className="mt-3 text-sm leading-6">
            <p className="break-all font-semibold">{file.name}</p>
            <p>
              {(file.size / 1024).toFixed(1)} KB ·{" "}
              {format?.toUpperCase() || "Format tidak dikenali"}
            </p>
            <p
              role="status"
              className={`mt-2 rounded-md border p-3 ${report?.ok ? "border-positive text-foreground" : "border-destructive text-foreground"}`}
            >
              <strong>{report?.ok ? "Sesuai batas pilihan. " : "Perlu diperiksa. "}</strong>
              {report?.message}
            </p>
          </div>
        )}
        {format === "pdf" && (
          <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input
              className="mt-1 size-4 shrink-0"
              type="checkbox"
              checked={unsigned}
              onChange={(e) => setUnsigned(e.target.checked)}
            />
            <span>
              Saya menggunakan PDF asli yang belum ditandatangani digital dan belum diberi
              e-Meterai.
            </span>
          </label>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="study-control"
            disabled={
              !file ||
              !format ||
              format !== rule.format ||
              !validSizeRule(rule) ||
              (format === "pdf" && !unsigned)
            }
            onClick={() => void compress()}
          >
            {rule.format === "pdf" ? "Optimalkan PDF lokal" : "Kompres JPG lokal"}
          </button>
          <button
            type="button"
            className="study-control"
            disabled={!file && !error}
            onClick={() => {
              revision.current++;
              setFile(null);
              setFormat(null);
              setResult(null);
              setError("");
              setUnsigned(false);
              if (fileInput.current) fileInput.current.value = "";
            }}
          >
            Hapus pilihan file
          </button>
        </div>
      </fieldset>
      {busy && (
        <p role="status" className="mt-3 text-sm">
          Memproses di perangkat Anda…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm leading-6">
          {error}
        </p>
      )}
      {result && (
        <div className="study-output mt-4">
          <p className="font-semibold">
            Hasil: {(result.size / 1024).toFixed(1)} KB · berkurang{" "}
            {Math.round((1 - result.size / (file?.size || 1)) * 100)}%
          </p>
          <p className="mt-2 text-sm">{outputReport?.message}</p>
          <p className="mt-2 text-sm">
            Buka hasil unduhan dan periksa teks, foto, serta jumlah halaman.{" "}
            {format === "pdf"
              ? "Optimasi mempertahankan halaman; gambar di dalam PDF tidak diperkecil."
              : "Resolusi dan kualitas JPG dapat berkurang. Ukuran minimum tidak dipenuhi dengan menambahkan data kosong."}
          </p>
          <button
            type="button"
            className="study-control mt-3"
            onClick={() =>
              saveLocalFile(result, `${name.toLowerCase().replaceAll(" ", "-")}-hasil.${format}`)
            }
          >
            Unduh hasil {format?.toUpperCase()}
          </button>
        </div>
      )}
    </article>
  );
}

export function DocumentPreparation() {
  return (
    <section aria-labelledby="documents-heading">
      <div className="mb-6">
        <h2 id="documents-heading" className="text-2xl font-bold">
          Periksa berkas sebelum unggah SSCASN
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Pilih dokumen dari perangkat, sesuaikan batas, lalu periksa atau perkecil ukurannya. Isi
          berkas diproses di browser, tanpa dikirim ke server oleh alat ini dan tanpa disimpan ke
          localStorage.
        </p>
      </div>
      <aside className="study-output mb-6">
        <strong>Preset ini contoh, bukan aturan universal SSCASN.</strong>
        <p className="mt-2 text-sm leading-6">
          Salin batas terbaru dari SSCASN atau pengumuman instansi. 1 KB dihitung sebagai 1.024
          byte. Pemeriksaan ini hanya menilai penanda format dan ukuran, bukan keaslian,
          keterbacaan, kelengkapan, e-Meterai, atau kelulusan administrasi. Kompres sebelum tanda
          tangan atau pembubuhan e-Meterai.
        </p>
        <a
          className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline"
          href="https://sscasn2023.bkn.go.id/faqteknis"
        >
          Rujukan FAQ teknis SSCASN 2023 (arsip)
        </a>
      </aside>
      <div className="grid gap-5 lg:grid-cols-2">
        {presets.map((preset) => (
          <DocumentCheck key={preset.name} name={preset.name} initialRule={preset.rule} />
        ))}
      </div>
    </section>
  );
}

const templates = {
  lamaran: `{{kota}}, {{tanggal}}
Perihal: Lamaran seleksi CASN

Yth. Pimpinan {{instansi}}
di tempat

Saya yang bertanda tangan di bawah ini:
Nama: {{nama}}
Tempat, tanggal lahir: {{lahir}}
Pendidikan: {{pendidikan}}
Alamat: {{alamat}}

Dengan ini mengajukan lamaran untuk mengikuti seleksi CASN pada {{instansi}}, untuk jabatan {{jabatan}}.

Dokumen persyaratan saya lampirkan mengikuti pengumuman seleksi instansi. Saya menyatakan bahwa data yang saya isi dan dokumen yang saya sampaikan sesuai dengan keadaan sebenarnya.

Demikian surat lamaran ini saya buat untuk dipergunakan dalam proses seleksi.

Hormat saya,

[Tempat tanda tangan dan meterai sesuai ketentuan instansi]

{{nama}}`,
  pernyataan: `SURAT PERNYATAAN

Saya yang bertanda tangan di bawah ini:
Nama: {{nama}}
Tempat, tanggal lahir: {{lahir}}
Pendidikan: {{pendidikan}}
Alamat: {{alamat}}
Jabatan yang dilamar: {{jabatan}}
Instansi: {{instansi}}

Untuk keperluan seleksi CASN, saya menyatakan bahwa:
1. Saya tidak memiliki riwayat pidana penjara dua tahun atau lebih berdasarkan putusan pengadilan yang berkekuatan hukum tetap.
2. Saya tidak pernah mengalami pemberhentian dengan hormat yang bukan atas permintaan sendiri atau pemberhentian tidak dengan hormat sebagai PNS, PPPK, prajurit TNI, atau anggota Polri, serta tidak pernah diberhentikan tidak dengan hormat dari pekerjaan swasta.
3. Saat ini saya tidak berstatus sebagai CPNS, PNS, prajurit TNI, atau anggota Polri.
4. Saya tidak menjadi anggota maupun pengurus partai politik dan tidak terlibat dalam politik praktis.
5. Saya bersedia menjalankan penempatan di wilayah Indonesia maupun negara lain sesuai penetapan instansi pemerintah.

Saya membuat pernyataan ini dengan sebenarnya dan bersedia menerima konsekuensi sesuai ketentuan apabila pernyataan saya tidak benar.

{{kota}}, {{tanggal}}
Yang membuat pernyataan,

[Tempat tanda tangan dan meterai sesuai ketentuan instansi]

{{nama}}`,
};
const letterFields = [
  ["nama", "Nama lengkap"],
  ["lahir", "Tempat dan tanggal lahir"],
  ["pendidikan", "Pendidikan terakhir dan program studi"],
  ["alamat", "Alamat"],
  ["jabatan", "Jabatan yang dituju"],
  ["instansi", "Instansi tujuan"],
  ["kota", "Kota penandatanganan"],
  ["tanggal", "Tanggal surat"],
] as const;

export function LetterGenerator() {
  const [kind, setKind] = useState<keyof typeof templates>("lamaran");
  const [template, setTemplate] = useState(templates.lamaran);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const text = fillLetter(template, fields);
  const unresolved = /\{\{[^}]+\}\}/.test(text);
  async function download() {
    setBusy(true);
    setStatus("");
    try {
      const blob = await createLetterDOCX(text);
      saveLocalFile(blob, `draf-surat-${kind}-casn.docx`);
      setStatus(
        "Draf DOCX telah disiapkan untuk diunduh. Periksa tata letak dan sesuaikan dengan lampiran resmi sebelum digunakan.",
      );
    } catch {
      setStatus(
        "Dokumen gagal dibuat. Silakan coba lagi; isian Anda tetap tersedia di halaman ini.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="study-panel" aria-labelledby="letter-heading">
      <h2 id="letter-heading" className="text-2xl font-bold">
        Susun draf surat CASN
      </h2>
      <p className="mt-3 leading-7 text-muted-foreground">
        Isi data, edit redaksi, lalu unduh DOCX ukuran A4 yang bisa disunting di Word. Isian hanya
        berada di memori halaman, tanpa dikirim atau disimpan oleh alat ini. Memuat ulang halaman
        akan menghapus isian.
      </p>
      <aside className="study-output mt-5">
        <strong>Gunakan format lampiran instansi sebagai acuan utama.</strong>
        <p className="mt-2 text-sm leading-6">
          Contoh di bawah adalah draf umum, bukan format resmi yang berlaku untuk semua instansi.
          Ganti redaksi dengan template instansi bila diwajibkan. Alat ini tidak menerbitkan
          e-Meterai atau tanda tangan. Penanda draf tetap dicantumkan dalam DOCX.
        </p>
        <a
          href="https://www.menpan.go.id/site/download/file/6941-3-format-surat-pernyataan-5-poin-cpns-kementerian-panrb-tahun-anggaran-2024"
          className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold underline"
        >
          Lihat contoh resmi Kementerian PANRB tahun 2024
        </a>
      </aside>
      <fieldset disabled={busy} className="mt-5">
        <legend className="sr-only">Isian draf surat</legend>
        <label className="study-field">
          Jenis draf
          <select
            className="document-select"
            value={kind}
            onChange={(e) => {
              const next = e.target.value as keyof typeof templates;
              setKind(next);
              setTemplate(templates[next]);
              setChecked(false);
              setStatus("");
            }}
          >
            <option value="lamaran">Surat lamaran</option>
            <option value="pernyataan">Surat pernyataan 5 poin</option>
          </select>
          <span className="font-normal text-muted-foreground">
            Mengganti jenis surat memuat ulang redaksi contoh; isian data tetap tersedia.
          </span>
        </label>
        <div className="grid gap-x-5 sm:grid-cols-2">
          {letterFields.map(([key, label]) => (
            <label className="study-field" key={key}>
              {label}
              <input
                maxLength={200}
                autoComplete="off"
                value={fields[key] || ""}
                onChange={(e) => {
                  setFields({ ...fields, [key]: e.target.value });
                  setChecked(false);
                  setStatus("");
                }}
              />
            </label>
          ))}
        </div>
        <label className="study-field">
          Redaksi surat (dapat diganti dengan format instansi)
          <textarea
            className="document-textarea"
            rows={15}
            maxLength={20000}
            value={template}
            onChange={(e) => {
              setTemplate(e.target.value);
              setChecked(false);
              setStatus("");
            }}
          />
          <span className="font-normal text-muted-foreground">
            Gunakan penanda: {letterFields.map(([key]) => `{{${key}}}`).join(", ")}. Penanda akan
            diganti dengan isian Anda.
          </span>
        </label>
        <h3 className="mt-5 font-bold">Pratinjau isi surat</h3>
        <div className="letter-preview mt-3 whitespace-pre-wrap break-words border border-border bg-background p-5 leading-7">
          {text || "Redaksi surat masih kosong."}
        </div>
        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>
            Saya memahami dokumen ini berupa draf dan akan mencocokkannya dengan format serta
            persyaratan resmi instansi.
          </span>
        </label>
        <button
          type="button"
          className="study-control mt-4"
          disabled={
            busy ||
            !checked ||
            unresolved ||
            !text.trim() ||
            letterFields.some(([key]) => !fields[key]?.trim())
          }
          onClick={() => void download()}
        >
          Unduh draf DOCX
        </button>
        <p className="mt-2 text-sm text-muted-foreground">
          Lengkapi seluruh isian, pastikan tidak ada penanda tersisa, lalu centang pernyataan untuk
          mengunduh.
        </p>
      </fieldset>
      {busy && (
        <p role="status" className="mt-3">
          Menyusun dokumen di browser…
        </p>
      )}
      {status && (
        <p role="status" className="mt-3 text-sm leading-6">
          {status}
        </p>
      )}
    </section>
  );
}
