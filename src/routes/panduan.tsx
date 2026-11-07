import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["panduan"]!;
export const Route = createFileRoute("/panduan")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/panduan"),
});
