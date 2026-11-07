import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { CONTENT_PAGES } from "@/lib/content-pages";
import { contentHead } from "@/components/site";
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
});
