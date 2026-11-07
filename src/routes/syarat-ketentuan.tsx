import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["syarat-ketentuan"]!;
export const Route = createFileRoute("/syarat-ketentuan")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/syarat-ketentuan"),
});
