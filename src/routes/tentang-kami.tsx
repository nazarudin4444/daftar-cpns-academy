import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["tentang-kami"]!;
export const Route = createFileRoute("/tentang-kami")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/tentang-kami"),
});
