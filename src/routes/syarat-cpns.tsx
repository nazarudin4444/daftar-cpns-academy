import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["syarat-cpns"]!;
export const Route = createFileRoute("/syarat-cpns")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/syarat-cpns"),
});
