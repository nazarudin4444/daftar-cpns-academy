import { createFileRoute } from "@tanstack/react-router";
import { contentHead } from "@/components/site";
import { FormasiExplorer } from "@/components/formasi-explorer";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["formasi-cpns"]!;
export const Route = createFileRoute("/formasi-cpns")({
  component: FormasiExplorer,
  head: () => contentHead(page, "/formasi-cpns"),
});
