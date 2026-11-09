import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const endpoint = "https://api-rekrutmen.bkn.go.id/portal/api/spf";
const outputPath = resolve("public/data/formasi.json");
const maxBytes = 20_000_000;

function text(value) {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function number(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

const response = await fetch(endpoint, {
  headers: {
    accept: "application/json",
    "user-agent": "daftar-cpns-academy-formasi-snapshot/1.0",
  },
  signal: AbortSignal.timeout(30_000),
});

if (!response.ok) throw new Error(`BKN API returned ${response.status}`);

const raw = await response.text();
if (new TextEncoder().encode(raw).byteLength > maxBytes) {
  throw new Error("BKN API response exceeded the expected size");
}

const payload = JSON.parse(raw);
if (payload?.error === true || !Array.isArray(payload?.data)) {
  throw new Error("BKN API returned an unexpected response shape");
}

const data = payload.data
  .map((row, index) => {
    const position = text(row?.nama_jabatan);
    const agency = text(row?.instansi);
    if (!position || !agency) return null;

    return {
      id: text(row.id) || `${text(row.nama_event)}-${agency}-${position}-${index}`,
      eventName: text(row.nama_event),
      agency,
      procurementType: text(row.jenis_pengadaan),
      formationType: text(row.jenis_formasi),
      positionCode: text(row.jabatan_kode),
      position,
      educationGroup: text(row.group_pendidikan),
      educationName: text(row.nama_pendidikan),
      placement: text(row.lokasi_formasi),
      openings: number(row.jumlah),
    };
  })
  .filter(Boolean);

if (data.length === 0) throw new Error("BKN API returned no usable formation rows");

try {
  const previous = JSON.parse(await readFile(outputPath, "utf8"));
  if (JSON.stringify(previous.data) === JSON.stringify(data)) {
    console.log(`Snapshot unchanged (${data.length} rows); keeping the current file.`);
    process.exit(0);
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const snapshot = {
  data,
  fetchedAt: new Date().toISOString(),
  source: "bkn-snapshot",
  isStale: false,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot)}\n`, "utf8");
console.log(`Wrote ${data.length} formation rows to ${outputPath}.`);
