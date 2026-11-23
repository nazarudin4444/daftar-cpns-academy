import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["soal-tiu-analogi-gambar"]!;
export const Route = createFileRoute("/soal-tiu-analogi-gambar")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/soal-tiu-analogi-gambar"),
});
