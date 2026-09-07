import Link from "next/link";

import { FESTIVAL } from "@/config/festival";

export const metadata = {
  title: `Оплата отменена — ${FESTIVAL.name} ${FESTIVAL.year}`,
};

export default function CancelPage() {
  return (
    <main className="hero-glow flex min-h-screen items-center justify-center px-4 py-16">
      <div className="card rise w-full max-w-md p-8 text-center sm:p-10">
        <span className="text-5xl" aria-hidden>
          🍂
        </span>

        <h1 className="mt-5 font-display text-3xl leading-tight text-ink">
          Оплата отменена
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Деньги не списаны. Вы можете вернуться и оформить билет заново —
          выбранные данные нужно будет указать ещё раз.
        </p>

        <Link
          href="/#tickets"
          className="btn-primary mt-7 inline-block px-6 py-3 text-base"
        >
          Вернуться к билетам
        </Link>
      </div>
    </main>
  );
}
