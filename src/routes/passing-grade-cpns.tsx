import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["passing-grade-cpns"]!;
export const Route = createFileRoute("/passing-grade-cpns")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/passing-grade-cpns"),
});
