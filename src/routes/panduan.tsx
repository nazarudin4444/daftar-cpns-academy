import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, contentHead } from "@/components/site";
import { StudyGuide } from "@/components/study-guide";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["panduan"]!;
export const Route = createFileRoute("/panduan")({
  component: () => (
    <SiteShell>
      <StudyGuide />
    </SiteShell>
  ),
  head: () => contentHead(page, "/panduan"),
});
