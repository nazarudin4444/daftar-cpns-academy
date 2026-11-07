import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["simulasi-cat-cpns"]!;

export const Route = createFileRoute("/simulasi-cat-cpns")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/simulasi-cat-cpns"),
});
