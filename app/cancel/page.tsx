import Link from "next/link";

import { CONTENT } from "@/config/content";
import { FESTIVAL } from "@/config/festival";

const t = CONTENT.cancel;

export const metadata = {
  title: `${t.pageTitle} — ${FESTIVAL.name} ${FESTIVAL.year}`,
};

export default function CancelPage() {
  return (
    <main className="hero-glow flex min-h-screen items-center justify-center px-4 py-16">
      <div className="card rise w-full max-w-md p-8 text-center sm:p-10">
        <span className="text-5xl" aria-hidden>
          {t.emoji}
        </span>

        <h1 className="mt-5 font-display text-3xl leading-tight text-ink">
          {t.heading}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">{t.text}</p>

        <Link
          href="/#tickets"
          className="btn-primary mt-7 inline-block px-6 py-3 text-base"
        >
          {t.back}
        </Link>
      </div>
    </main>
  );
}
