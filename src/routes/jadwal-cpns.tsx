import { createFileRoute } from "@tanstack/react-router";
import { ScheduleTracker } from "@/components/schedule-tracker";
import { contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

const page = CONTENT_PAGES["jadwal-cpns"]!;
export const Route = createFileRoute("/jadwal-cpns")({
  component: ScheduleTracker,
  head: () => contentHead(page, "/jadwal-cpns"),
});
