import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { CONTENT_PAGES } from "@/lib/content-pages";
import { contentHead, contentStructuredData } from "@/components/site";
import { routeTree } from "@/routeTree.gen";
import { canonicalUrl } from "@/lib/site-config";

describe("Route dan metadata konten", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  it("memiliki judul dan deskripsi unik", () => {
    const pages = Object.values(CONTENT_PAGES);
    expect(new Set(pages.map((p) => p.metaTitle)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
  });
  for (const [slug, page] of Object.entries(CONTENT_PAGES)) {
    it(`/${slug} memakai route khusus dan metadata sendiri`, () => {
      expect(router.matchRoutes(`/${slug}`).at(-1)?.routeId).toBe(`/${slug}`);
      const head = contentHead(page, `/${slug}`);
      expect(head.meta).toContainEqual({ title: page.metaTitle });
      expect(head.links).toContainEqual({ rel: "canonical", href: canonicalUrl(`/${slug}`) });
      if (page.noIndex)
        expect(head.meta).toContainEqual({ name: "robots", content: "noindex, nofollow" });
    });
  }
  it("menghasilkan graph JSON-LD dengan breadcrumb dan identitas aplikasi yang konsisten", () => {
    const simulator = CONTENT_PAGES["simulasi-cat-cpns"]!;
    const jsonLd = contentStructuredData(simulator);
    expect(() => JSON.parse(JSON.stringify(jsonLd))).not.toThrow();
    expect(jsonLd["@context"]).toBe("https://schema.org");
    const graph = jsonLd["@graph"] as Array<Record<string, unknown>>;
    const page = graph.find((node) => node["@type"] === "WebPage");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const application = graph.find((node) => node["@type"] === "WebApplication");
    expect(page?.["url"]).toBe(canonicalUrl("/simulasi-cat-cpns"));
    expect(breadcrumb?.["itemListElement"]).toEqual([
      { "@type": "ListItem", position: 1, name: "Beranda", item: canonicalUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: simulator.title,
        item: canonicalUrl("/simulasi-cat-cpns"),
      },
    ]);
    expect(application).toMatchObject({
      name: "Simulasi CAT CPNS Daftar CPNS",
      applicationCategory: "EducationalApplication",
      isAccessibleForFree: true,
    });
  });
  it("hanya mencantumkan URL kanonis yang dapat diindeks di sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const [slug, page] of Object.entries(CONTENT_PAGES)) {
      expect(sitemap.includes(canonicalUrl(`/${slug}`))).toBe(!page.noIndex);
    }
    expect(sitemap).toContain(`<loc>${canonicalUrl("/")}</loc>`);
    expect(sitemap).not.toContain(`<loc>${canonicalUrl("/simulasi")}</loc>`);
  });
});
