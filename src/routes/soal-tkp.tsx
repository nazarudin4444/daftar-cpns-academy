import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["soal-tkp"]!;

export const Route = createFileRoute("/soal-tkp")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/soal-tkp"),
});
