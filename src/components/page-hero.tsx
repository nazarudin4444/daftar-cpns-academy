import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  icon: LucideIcon;
  children?: ReactNode;
  stats?: { value: string; label: string }[];
};

export function PageHero({ eyebrow, title, description, icon: Icon, children, stats }: PageHeroProps) {
  return (
    <section className="bg-hero relative overflow-hidden text-primary-foreground">
      <div aria-hidden="true" className="bg-hero-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-sm font-semibold backdrop-blur">
            <Icon size={16} aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <div className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
            {description}
          </div>
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        {stats ? (
          <dl className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 backdrop-blur lg:min-w-48"
              >
                <dt className="text-xs text-primary-foreground/70">{s.label}</dt>
                <dd className="text-xl font-extrabold tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

export const heroPrimaryLink =
  "inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary-foreground px-4 text-sm font-bold text-primary shadow-lg transition hover:-translate-y-0.5";
export const heroGhostLink =
  "inline-flex min-h-11 items-center gap-2 rounded-xl border border-primary-foreground/25 bg-primary-foreground/5 px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/15";
