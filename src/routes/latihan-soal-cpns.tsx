import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["latihan-soal-cpns"]!;
export const Route = createFileRoute("/latihan-soal-cpns")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/latihan-soal-cpns"),
});
