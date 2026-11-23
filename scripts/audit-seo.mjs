import { readFileSync, writeFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const base = new URL(process.argv[2] ?? "http://127.0.0.1:8080");
const reportPath = process.argv[3];
const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const publicPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
const paths = [...publicPaths, "/dashboard", "/seo-audit-missing-page", "/simulasi"];
const results = [];
let cursor = 0;

async function audit(path) {
  const errors = [];
  const response = await fetch(new URL(path, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(60000),
  });
  if (path === "/simulasi") {
    const location = response.headers.get("location");
    if (
      response.status !== 301 ||
      !location ||
      new URL(location, base).pathname !== "/simulasi-cat-cpns"
    )
      errors.push("Redirect simulasi bukan 301 ke URL kanonis");
    await response.body?.cancel();
    return { path, status: response.status, location, errors };
  }
  const expectedStatus = path === "/seo-audit-missing-page" ? 404 : 200;
  if (response.status !== expectedStatus)
    errors.push(`HTTP ${response.status}, diharapkan ${expectedStatus}`);
  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const title = doc.title.trim();
  const descriptions = [...doc.querySelectorAll('meta[name="description"]')];
  const description = descriptions[0]?.getAttribute("content") ?? "";
  const robots = [...doc.querySelectorAll('meta[name="robots"]')]
    .map((node) => node.getAttribute("content"))
    .join(",");
  const canonical = [...doc.querySelectorAll('link[rel="canonical"]')].map((node) =>
    node.getAttribute("href"),
  );
  const h1 = [...doc.querySelectorAll("h1")].map((node) => node.textContent.trim());
  if (!title || doc.querySelectorAll("title").length !== 1) errors.push("Judul kosong atau ganda");
  if (doc.documentElement.lang !== "id") errors.push("Bahasa halaman bukan id");
  if (publicPaths.includes(path)) {
    if (descriptions.length !== 1 || !description.trim())
      errors.push("Deskripsi kosong atau ganda");
    if (canonical.length !== 1 || canonical[0] !== `https://daftar-cpns.com${path}`)
      errors.push("Canonical tidak sesuai");
    if (/noindex/i.test(robots)) errors.push("Halaman publik noindex");
    if (h1.length !== 1) errors.push(`Jumlah H1 ${h1.length}, diharapkan 1`);
    const scripts = [...doc.querySelectorAll('script[type="application/ld+json"]')];
    if (!scripts.length) errors.push("JSON-LD tidak ada");
    for (const script of scripts) {
      try {
        JSON.parse(script.textContent);
      } catch {
        errors.push("JSON-LD tidak valid");
      }
    }
    if (
      !doc.querySelector('meta[property="og:image"]') ||
      !doc.querySelector('meta[name="twitter:image"]')
    )
      errors.push("Gambar preview tidak ada");
  } else if (path === "/dashboard" && !/noindex/i.test(robots))
    errors.push("Dashboard tidak noindex");
  const links = [
    ...new Set(
      [...doc.querySelectorAll("a[href]")]
        .map((a) => {
          const url = new URL(a.getAttribute("href"), base);
          return [base.origin, "https://daftar-cpns.com"].includes(url.origin)
            ? url.pathname
            : null;
        })
        .filter(Boolean),
    ),
  ];
  dom.window.close();
  return {
    path,
    status: response.status,
    title,
    description,
    canonical,
    robots,
    h1,
    links,
    errors,
  };
}

await Promise.all(
  Array.from({ length: 2 }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      try {
        results.push(await audit(path));
      } catch (error) {
        results.push({ path, errors: [String(error)] });
      }
    }
  }),
);
for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const row of results.filter((row) => publicPaths.includes(row.path))) {
    if (!row[field]) continue;
    if (seen.has(row[field])) row.errors.push(`${field} sama dengan ${seen.get(row[field])}`);
    seen.set(row[field], row.path);
  }
}
const report = {
  base: base.href,
  checkedAt: new Date().toISOString(),
  total: results.length,
  failed: results.filter((row) => row.errors.length).length,
  results: results.sort((a, b) => a.path.localeCompare(b.path)),
};
if (reportPath) writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      base: report.base,
      total: report.total,
      failed: report.failed,
      findings: report.results
        .filter((row) => row.errors.length)
        .map(({ path, errors }) => ({ path, errors })),
    },
    null,
    2,
  ),
);
if (report.failed) process.exitCode = 1;
