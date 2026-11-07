import { writeFileSync } from "node:fs";
import { CONTENT_PAGES } from "../src/lib/content-pages";
import { canonicalUrl } from "../src/lib/site-config";
const paths = [
  "/",
  ...Object.entries(CONTENT_PAGES)
    .filter(([, page]) => !page.noIndex)
    .map(([slug]) => `/${slug}`),
];
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  paths.map((path) => `  <url><loc>${canonicalUrl(path)}</loc></url>`).join("\n") +
  "\n</urlset>\n";
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
