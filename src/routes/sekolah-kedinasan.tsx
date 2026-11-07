import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["sekolah-kedinasan"]!;
export const Route = createFileRoute("/sekolah-kedinasan")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/sekolah-kedinasan"),
});
