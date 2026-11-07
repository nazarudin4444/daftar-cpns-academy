import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["tryout-cpns-gratis"]!;

export const Route = createFileRoute("/tryout-cpns-gratis")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/tryout-cpns-gratis"),
});
