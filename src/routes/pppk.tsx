import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["pppk"]!;
export const Route = createFileRoute("/pppk")({
  component: () => <ContentPage page={page} />,
  head: () => contentHead(page, "/pppk"),
});
