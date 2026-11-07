import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["kontak"]!;
export const Route = createFileRoute("/kontak")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/kontak"),
});
