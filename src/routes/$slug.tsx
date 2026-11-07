import { createFileRoute, notFound } from "@tanstack/react-router";
import { ContentPage, contentHead } from "@/components/site";
import { CONTENT_PAGES } from "@/lib/content-pages";

export const Route = createFileRoute("/$slug")({
  component: ContentBySlug,
  head: ({ params }) => {
    const page = CONTENT_PAGES[params.slug];
    return page
      ? contentHead(page, `/${params.slug}`)
      : {
          meta: [
            { title: "Halaman tidak ditemukan" },
            { name: "robots", content: "noindex, nofollow" },
          ],
        };
  },
});

function ContentBySlug() {
  const { slug } = Route.useParams();
  const page = CONTENT_PAGES[slug];
  if (!page) throw notFound();
  return <ContentPage page={page} />;
}
