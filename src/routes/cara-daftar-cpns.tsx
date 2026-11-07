import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["cara-daftar-cpns"]!;
export const Route = createFileRoute("/cara-daftar-cpns")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/cara-daftar-cpns"),
});
