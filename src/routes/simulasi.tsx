import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/simulasi")({
  beforeLoad: () => {
    throw redirect({ to: "/simulasi-cat-cpns", statusCode: 301, replace: true });
  },
});
