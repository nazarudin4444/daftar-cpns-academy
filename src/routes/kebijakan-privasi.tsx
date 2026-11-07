import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["kebijakan-privasi"]!;

export const Route = createFileRoute("/kebijakan-privasi")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/kebijakan-privasi"),
});
