import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import type { Question } from "@/lib/exam";

export function QuestionIllustration({ question }: { question: Question }) {
  const [expanded, setExpanded] = useState(false);
  if (!question.diagram) return null;
  const width = Number(question.diagram.svg.match(/\bwidth="(\d+)"/)?.[1] ?? 600);
  const height = Number(question.diagram.svg.match(/\bheight="(\d+)"/)?.[1] ?? 300);
  return (
    <figure className="my-4 min-w-0 overflow-hidden rounded-xl border border-border bg-secondary/40">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
        <span className="text-sm font-semibold text-foreground">Diagram soal</span>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-pressed={expanded}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-semibold text-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {expanded ? (
            <ZoomOut className="size-4" aria-hidden="true" />
          ) : (
            <ZoomIn className="size-4" aria-hidden="true" />
          )}
          {expanded ? "Ukuran normal" : "Perbesar gambar"}
        </button>
      </div>
      <div
        className="overflow-x-auto bg-slate-50 p-3 sm:p-5"
        tabIndex={expanded ? 0 : undefined}
        role={expanded ? "region" : undefined}
        aria-label={expanded ? "Gambar diperbesar, geser untuk melihat seluruh diagram" : undefined}
      >
        <img
          src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(question.diagram.svg)}`}
          alt={question.diagram.alt}
          width={width}
          height={height}
          loading="lazy"
          className="mx-auto h-auto w-full"
          style={expanded ? { minWidth: Math.max(width, 900) } : { maxWidth: width }}
        />
      </div>
      <figcaption className="px-4 py-3 text-xs leading-5 text-muted-foreground">
        {expanded
          ? "Geser gambar untuk melihat detail. Pilih ukuran normal untuk kembali."
          : "Gunakan arah dan petunjuk pada soal sebagai acuan."}
      </figcaption>
    </figure>
  );
}
