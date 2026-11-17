import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, contentHead, contentStructuredData } from "@/components/site";
import { PPPKHub } from "@/components/pppk-hub";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["pppk"]!;
export const Route = createFileRoute("/pppk")({
  component: () => (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contentStructuredData(page)).replace(/</g, "\\u003c"),
        }}
      />
      <PPPKHub />
    </SiteShell>
  ),
  head: () => contentHead(page, "/pppk"),
});
