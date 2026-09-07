import Link from "next/link";

import { FESTIVAL } from "@/config/festival";

export const metadata = {
  title: `Спасибо за покупку — ${FESTIVAL.name} ${FESTIVAL.year}`,
};

export default function SuccessPage() {
  return (
    <main className="hero-glow flex min-h-screen items-center justify-center px-4 py-16">
      <div className="card rise w-full max-w-md p-8 text-center sm:p-10">
        <span className="text-5xl" aria-hidden>
          🎉
        </span>

        <h1 className="mt-5 font-display text-3xl leading-tight text-ink">
          Спасибо за покупку!
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Подтверждение оплаты и чек отправлены на ваш email.
        </p>

        <div className="mt-6 rounded-2xl bg-surface-2 px-4 py-3 text-sm text-muted">
          <p className="font-medium text-ink">
            {FESTIVAL.name} {FESTIVAL.year}
          </p>
          <p className="mt-1">
            {FESTIVAL.dateLabel} · {FESTIVAL.venue}, {FESTIVAL.city}
          </p>
        </div>

        <Link
          href="/"
          className="btn-primary mt-7 inline-block px-6 py-3 text-base"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
