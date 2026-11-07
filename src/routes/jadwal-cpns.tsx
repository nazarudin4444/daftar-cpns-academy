import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["jadwal-cpns"]!;
export const Route = createFileRoute("/jadwal-cpns")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/jadwal-cpns"),
});
