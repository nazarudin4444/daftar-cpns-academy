import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  CalendarClock,
  GraduationCap,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SiteShell } from "@/components/site";
import type { FormasiFeed, FormasiRecord } from "@/lib/formasi-types";

const SSCASN_URL = "https://sscasn.bkn.go.id/daftar-formasi/";
const BROWSER_CACHE_KEY = "daftar-cpns-formasi-cache-v1";
const PAGE_SIZE = 12;
const MAX_SNAPSHOT_AGE_MS = 72 * 60 * 60 * 1000;

type Filters = {
  query: string;
  event: string;
  procurement: string;
  formation: string;
  education: string;
  educationPreset: string;
};
const initialFilters: Filters = {
  query: "",
  event: "",
  procurement: "",
  formation: "",
  education: "",
  educationPreset: "",
};

function educationLevel(value: string): string {
  const normalized = value.toUpperCase().replaceAll(" ", "");
  if (/SMA|SMK|SLTA|PaketC/.test(normalized)) return "SMA/SMK";
  if (/D-I|D1|D-II|D2|D-III|D3|D-IV|D4|DIPLOMA/.test(normalized)) return "Diploma";
  if (/S-1|S1|SARJANA|STRATA1/.test(normalized)) return "S1";
  if (/S-2|S2|MAGISTER|STRATA2/.test(normalized)) return "S2";
  if (/S-3|S3|DOKTOR|STRATA3/.test(normalized)) return "S3";
  return "";
}

function pretty(value: string) {
  return value.toLowerCase().replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
}

function formatDate(value: string | null) {
  if (!value) return "belum tersedia";
  return (
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(value)) + " WIB"
  );
}

function recordText(row: FormasiRecord) {
  return [
    row.position,
    row.positionCode,
    row.agency,
    row.educationGroup,
    row.educationName,
    row.placement,
    row.eventName,
  ]
    .join(" ")
    .toLocaleLowerCase("id-ID");
}

async function requestFeed(force = false): Promise<FormasiFeed> {
  const response = await fetch(`/data/formasi.json${force ? `?refresh=${Date.now()}` : ""}`, {
    headers: { accept: "application/json" },
    cache: force ? "no-cache" : "default",
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const feed = (await response.json()) as FormasiFeed;
  const age = feed.fetchedAt ? Date.now() - new Date(feed.fetchedAt).getTime() : Infinity;
  if (age > MAX_SNAPSHOT_AGE_MS) {
    return {
      ...feed,
      isStale: true,
      message:
        "Snapshot belum diperbarui dalam lebih dari 3 hari. Verifikasi data terbaru di SSCASN.",
    };
  }
  return feed;
}

function readBrowserCache(): FormasiFeed | null {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(BROWSER_CACHE_KEY) ?? "null",
    ) as FormasiFeed | null;
    if (parsed && Array.isArray(parsed.data) && parsed.fetchedAt) {
      return {
        ...parsed,
        source: "browser-cache",
        isStale: true,
        message: "Snapshot dari situs belum tersedia. Cache lokal ditampilkan sebagai data lama.",
      };
    }
  } catch {
    // Ignore malformed or unavailable browser storage.
  }
  return null;
}

function saveBrowserCache(feed: FormasiFeed) {
  if (feed.data.length === 0 || !feed.fetchedAt || feed.isStale) return;
  try {
    localStorage.setItem(BROWSER_CACHE_KEY, JSON.stringify(feed));
  } catch {
    // Storage can be disabled or full; the page still works without it.
  }
}

export function FormasiExplorer() {
  const [feed, setFeed] = useState<FormasiFeed | null>(null);
  const [filters, setFilters] = useState(initialFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load(force = false) {
    setLoading(true);
    try {
      const next = await requestFeed(force);
      if (next.source === "unavailable" || (next.data.length === 0 && next.isStale)) {
        setFeed(readBrowserCache() ?? next);
      } else {
        setFeed(next);
        saveBrowserCache(next);
      }
    } catch {
      setFeed(
        readBrowserCache() ?? {
          data: [],
          fetchedAt: null,
          source: "unavailable",
          isStale: true,
          message: "Snapshot belum dapat dimuat. Periksa kembali melalui portal SSCASN.",
        },
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const events = useMemo(
    () => [...new Set((feed?.data ?? []).map((row) => row.eventName).filter(Boolean))].sort(),
    [feed],
  );
  const procurements = useMemo(
    () => [...new Set((feed?.data ?? []).map((row) => row.procurementType).filter(Boolean))].sort(),
    [feed],
  );
  const formationTypes = useMemo(
    () => [...new Set((feed?.data ?? []).map((row) => row.formationType).filter(Boolean))].sort(),
    [feed],
  );
  const educationLevels = useMemo(
    () =>
      [
        ...new Set(
          (feed?.data ?? [])
            .flatMap((row) => [row.educationGroup, row.educationName])
            .map(educationLevel)
            .filter(Boolean),
        ),
      ].sort(),
    [feed],
  );
  const filtered = useMemo(() => {
    const term = filters.query.trim().toLocaleLowerCase("id-ID");
    return (feed?.data ?? []).filter((row) => {
      const isPPPK = row.procurementType.toUpperCase().includes("PPPK");
      const procurement = isPPPK
        ? "PPPK"
        : row.procurementType.toUpperCase().includes("CPNS")
          ? "CPNS"
          : row.procurementType;
      const level = educationLevel(`${row.educationGroup} ${row.educationName}`);
      const educationDetail = `${row.educationGroup} ${row.educationName}`.toLocaleLowerCase("id-ID");
      const quickEducationMatches =
        !filters.educationPreset ||
        (filters.educationPreset === "s1-all" && level === "S1" && /semua jurusan|segala jurusan/.test(educationDetail)) ||
        (filters.educationPreset === "d3-management" && level === "Diploma" && /manajemen/.test(educationDetail)) ||
        (filters.educationPreset === "sma" && level === "SMA/SMK");
      return (
        (!term || recordText(row).includes(term)) &&
        (!filters.event || row.eventName === filters.event) &&
        (!filters.procurement || procurement === filters.procurement) &&
        (!filters.formation || row.formationType === filters.formation) &&
        (!filters.education || level === filters.education) &&
        quickEducationMatches
      );
    });
  }, [feed, filters]);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisibleCount(PAGE_SIZE);
  }

  const successful = !!feed && !feed.isStale && feed.source !== "unavailable";
  const shown = filtered.slice(0, visibleCount);

  return (
    <SiteShell>
      <main className="min-h-screen bg-muted/30 pb-16">
        <section className="bg-hero border-b border-border/70">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1.5 text-xs font-semibold text-primary">
                <ShieldCheck className="size-4" aria-hidden="true" /> Snapshot formasi dari API BKN
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Pencarian Formasi ASN
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/85">
                Telusuri jabatan, instansi, jenis pengadaan, dan kualifikasi dari data formasi BKN.
                Pastikan kembali syarat lengkap di pengumuman instansi.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span
                  className={`inline-flex items-center gap-2 font-medium ${successful ? "text-white" : "text-white/75"}`}
                >
                  <span
                    className={`size-2 rounded-full ${successful ? "bg-positive" : "bg-muted-foreground/50"}`}
                  />
                  {loading
                    ? "Menghubungkan ke sumber data…"
                    : feed?.source === "bkn-snapshot"
                      ? "Snapshot data formasi dari API BKN"
                      : "Menampilkan snapshot lokal terakhir"}
                </span>
                <span className="text-white/85">
                  Diperbarui: {formatDate(feed?.fetchedAt ?? null)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRefreshing(true);
                    void load(true);
                  }}
                  disabled={loading || refreshing}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-semibold text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <RefreshCw
                    className={`size-4 ${refreshing ? "animate-spin" : ""}`}
                    aria-hidden="true"
                  />
                  Muat ulang snapshot
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          {feed?.isStale && (
            <div
              role="status"
              className="flex flex-col gap-3 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm text-amber-950 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>
                {feed.message ?? "Data cache ditampilkan; cek SSCASN untuk perubahan terbaru."}{" "}
                {feed.fetchedAt ? `Terakhir diperbarui ${formatDate(feed.fetchedAt)}.` : ""}
              </p>
              <a
                href={SSCASN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold underline underline-offset-4"
              >
                Buka SSCASN <ArrowUpRight className="size-4" />
              </a>
            </div>
          )}

          <section
            aria-labelledby="filter-heading"
            className="rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6"
          >
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="filter-heading" className="text-xl font-bold">
                  Temukan formasi
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cari dari data yang tersedia. Filter pendidikan memakai kualifikasi terstruktur
                  dari BKN.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilters(initialFilters);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="min-h-11 self-start text-sm font-semibold text-primary sm:self-auto"
              >
                Atur ulang filter
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="sm:col-span-2 lg:col-span-4">
                <span className="mb-1.5 block text-sm font-semibold">
                  Cari jabatan, instansi, jurusan, atau lokasi
                </span>
                <span className="flex min-h-12 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
                  <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <input
                    value={filters.query}
                    onChange={(event) => updateFilter("query", event.target.value)}
                    placeholder="Contoh: Guru, Kementerian, Pendidikan…"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </span>
              </label>
              <label className="block text-sm font-semibold">
                Periode seleksi
                <select
                  value={filters.event}
                  onChange={(event) => updateFilter("event", event.target.value)}
                  className="mt-1.5 min-h-12 w-full rounded-lg border border-input bg-background px-3 font-normal"
                >
                  <option value="">Semua periode</option>
                  {events.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                Jenis pengadaan
                <select
                  value={filters.procurement}
                  onChange={(event) => updateFilter("procurement", event.target.value)}
                  className="mt-1.5 min-h-12 w-full rounded-lg border border-input bg-background px-3 font-normal"
                >
                  <option value="">Semua jenis</option>
                  <option value="CPNS">CPNS</option>
                  <option value="PPPK">PPPK</option>
                  {procurements
                    .filter((item) => !/CPNS|PPPK/i.test(item))
                    .map((item) => (
                      <option key={item} value={item}>
                        {pretty(item)}
                      </option>
                    ))}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                Jenis formasi
                <select
                  value={filters.formation}
                  onChange={(event) => updateFilter("formation", event.target.value)}
                  className="mt-1.5 min-h-12 w-full rounded-lg border border-input bg-background px-3 font-normal"
                >
                  <option value="">Semua formasi</option>
                  {formationTypes.map((item) => (
                    <option key={item} value={item}>
                      {pretty(item)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                Pendidikan
                <select
                  value={filters.education}
                  onChange={(event) => updateFilter("education", event.target.value)}
                  disabled={!educationLevels.length}
                  className="mt-1.5 min-h-12 w-full rounded-lg border border-input bg-background px-3 font-normal disabled:text-muted-foreground"
                >
                  <option value="">
                    {educationLevels.length ? "Semua jenjang" : "Belum tersedia di data"}
                  </option>
                  {educationLevels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Filter pendidikan populer">
              <span className="mr-1 text-xs font-semibold text-muted-foreground">Pencarian cepat:</span>
              {([["s1-all", "Semua jurusan · S1"], ["d3-management", "D-III Manajemen"], ["sma", "SLTA / sederajat"]] as const).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={filters.educationPreset === value} onClick={() => { setFilters((current) => ({ ...current, educationPreset: current.educationPreset === value ? "" : value })); setVisibleCount(PAGE_SIZE); }} className={`min-h-10 rounded-full border px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${filters.educationPreset === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"}`}>
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-sm">
              <p aria-live="polite" className="font-semibold">
                {loading
                  ? "Memuat daftar formasi…"
                  : `${filtered.length.toLocaleString("id-ID")} formasi ditemukan`}
              </p>
              <p className="text-muted-foreground">
                {feed?.data.length
                  ? `${feed.data.length.toLocaleString("id-ID")} data tersedia`
                  : "Menunggu data dari sumber resmi"}
              </p>
            </div>
          </section>

          <section aria-label="Daftar formasi">
            {loading && !feed ? (
              <div className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground">
                Mengambil daftar formasi dari sumber resmi…
              </div>
            ) : shown.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {shown.map((row) => (
                  <FormasiCard key={row.id} row={row} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-background px-5 py-12 text-center">
                <Search className="mx-auto size-8 text-muted-foreground/70" aria-hidden="true" />
                <h2 className="mt-3 text-lg font-bold">
                  {feed?.data.length
                    ? "Tidak ada hasil yang cocok"
                    : "Data formasi belum dapat dimuat"}
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                  {feed?.data.length
                    ? "Coba ubah kata kunci atau hapus beberapa filter."
                    : "Periksa daftar terbaru langsung melalui portal SSCASN. Halaman ini tidak mengganti pendaftaran resmi."}
                </p>
                {!feed?.data.length && (
                  <a
                    href={SSCASN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 font-semibold text-primary-foreground"
                  >
                    Cek di SSCASN <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            )}
            {visibleCount < filtered.length && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background px-5 font-semibold hover:bg-muted"
                >
                  <ArrowDownToLine className="size-4" /> Tampilkan{" "}
                  {Math.min(PAGE_SIZE, filtered.length - visibleCount)} berikutnya
                </button>
              </div>
            )}
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <BookOpenCheck className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">Cocokkan kualifikasi sebelum memilih</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Nama jabatan saja belum cukup untuk memastikan Anda memenuhi syarat.
                  </p>
                </div>
              </div>
              <ol className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <li className="rounded-lg bg-muted/60 p-4">
                  <strong>1. Cek ijazah dan prodi</strong>
                  <p className="mt-1 text-muted-foreground">
                    Samakan jenjang, nama program studi, dan rumpun pendidikan dengan lampiran
                    resmi.
                  </p>
                </li>
                <li className="rounded-lg bg-muted/60 p-4">
                  <strong>2. Baca unit penempatan</strong>
                  <p className="mt-1 text-muted-foreground">
                    Pastikan lokasi, unit kerja, serta kode jabatan sesuai pilihan Anda.
                  </p>
                </li>
                <li className="rounded-lg bg-muted/60 p-4">
                  <strong>3. Periksa syarat tambahan</strong>
                  <p className="mt-1 text-muted-foreground">
                    Cek sertifikat, STR, pengalaman, atau ketentuan khusus pada pengumuman instansi.
                  </p>
                </li>
                <li className="rounded-lg bg-muted/60 p-4">
                  <strong>4. Verifikasi sumber</strong>
                  <p className="mt-1 text-muted-foreground">
                    Cocokkan kembali jumlah dan kualifikasi di SSCASN serta dokumen resmi instansi.
                  </p>
                </li>
              </ol>
            </div>
            <aside className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 sm:p-6">
              <GraduationCap className="size-6 text-primary" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold">Tentang data pendidikan</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Kualifikasi hanya ditampilkan ketika dicantumkan pada data API. Jika tertulis belum
                tersedia, buka detail di SSCASN atau lampiran instansi sebelum mengambil keputusan.
              </p>
              <a
                href={SSCASN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
              >
                Buka portal formasi BKN <ArrowUpRight className="size-4" />
              </a>
            </aside>
          </section>
          <p className="text-xs leading-5 text-muted-foreground">
            Daftar ini membantu pencarian awal. Pendaftaran dan pemeriksaan akhir persyaratan
            dilakukan di portal SSCASN dan pengumuman resmi instansi.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}

function FormasiCard({ row }: { row: FormasiRecord }) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
          {pretty(row.procurementType || "Pengadaan")}
        </span>
        {row.formationType && (
          <span className="rounded-full bg-muted px-2.5 py-1 text-foreground">
            {pretty(row.formationType)}
          </span>
        )}
        {row.eventName && (
          <span className="ml-auto max-w-full text-right text-muted-foreground">
            {row.eventName}
          </span>
        )}
      </div>
      <h2 className="mt-4 break-words text-lg font-bold leading-snug">{row.position}</h2>
      {row.positionCode && (
        <p className="mt-1 text-xs text-muted-foreground">Kode jabatan: {row.positionCode}</p>
      )}
      <div className="mt-4 flex items-start gap-2 text-sm">
        <Building2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="min-w-0 font-medium">{row.agency}</span>
      </div>
      <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
        <InfoItem
          icon={<Users className="size-4" />}
          label="Jumlah kebutuhan"
          value={
            row.openings === null
              ? "Tidak dicantumkan"
              : `${row.openings.toLocaleString("id-ID")} formasi`
          }
        />
        <InfoItem
          icon={<GraduationCap className="size-4" />}
          label="Kualifikasi pendidikan"
          value={
            row.educationGroup || row.educationName
              ? [row.educationGroup, row.educationName].filter(Boolean).join(" · ")
              : "Belum dicantumkan di data API; periksa portal SSCASN"
          }
        />
        <InfoItem
          icon={<MapPin className="size-4" />}
          label="Lokasi / unit penempatan"
          value={row.placement || "Periksa rincian di SSCASN"}
        />
        <InfoItem
          icon={<CalendarClock className="size-4" />}
          label="Periode"
          value={row.eventName || "Periksa portal resmi"}
        />
      </div>
      <a
        href={SSCASN_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Cek detail di SSCASN <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-w-0 gap-2.5">
      <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="mt-1 break-words text-sm leading-5">{value}</p>
      </div>
    </div>
  );
}
