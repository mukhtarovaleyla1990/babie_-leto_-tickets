import { CONTENT } from "@/config/content";
import { FESTIVAL } from "@/config/festival";

export function Hero() {
  const t = CONTENT.hero;

  return (
    <header className="hero-glow relative overflow-hidden border-b border-border">
      {/* Декоративные листья бабьего лета */}
      <span
        className="drift pointer-events-none absolute -right-6 top-16 select-none text-6xl opacity-40 sm:text-8xl"
        aria-hidden
      >
        {t.leafRight}
      </span>
      <span
        className="drift pointer-events-none absolute left-2 bottom-10 select-none text-5xl opacity-30 sm:text-7xl"
        style={{ animationDelay: "1.4s" }}
        aria-hidden
      >
        {t.leafLeft}
      </span>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="rise text-sm font-semibold uppercase tracking-[0.22em] text-berry">
          {t.eyebrow}
        </p>

        <h1
          className="rise mt-4 font-display text-[clamp(2.4rem,10vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-ink"
          style={{ animationDelay: "0.06s" }}
        >
          {FESTIVAL.name}
          <span className="block text-accent">{FESTIVAL.year}</span>
        </h1>

        <div
          className="rise mt-7 flex flex-wrap gap-2.5 text-sm font-medium"
          style={{ animationDelay: "0.12s" }}
        >
          <span className="rounded-full border border-border bg-surface px-4 py-2 text-ink">
            {FESTIVAL.dateLabel}
          </span>
          <span className="rounded-full border border-border bg-surface px-4 py-2 text-ink">
            {FESTIVAL.venue}
          </span>
          <span className="rounded-full border border-border bg-surface px-4 py-2 text-ink">
            {FESTIVAL.city}
          </span>
        </div>

        <p
          className="rise mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "0.18s" }}
        >
          {t.lead}
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.24s" }}
        >
          <a href="#tickets" className="btn-primary px-7 py-4 text-base sm:text-lg">
            {t.cta}
          </a>
          <span className="text-sm text-muted">{t.ctaNote}</span>
        </div>
      </div>
    </header>
  );
}
