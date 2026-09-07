"use client";

import { formatPrice } from "@/config/festival";
import type { TicketType } from "@/config/tickets";

const AUDIENCE_LABEL: Record<TicketType["audience"], string> = {
  adult: "Взрослый",
  child: "Детский",
  student: "Студенческий",
};

const SCOPE_LABEL: Record<TicketType["scope"], string> = {
  single: "Одна активность",
  allday: "Весь день",
};

export function TicketCard({
  ticket,
  selected,
  onSelect,
}: {
  ticket: TicketType;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`card group relative flex h-full flex-col gap-3 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-6 ${
        selected ? "card-selected" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          {AUDIENCE_LABEL[ticket.audience]}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            ticket.scope === "allday"
              ? "bg-[var(--c-leaf)]/12 text-leaf"
              : "bg-[var(--c-sky)]/12 text-sky"
          }`}
        >
          {SCOPE_LABEL[ticket.scope]}
        </span>
        {ticket.participants > 1 && (
          <span className="rounded-full bg-[var(--c-berry)]/12 px-2.5 py-1 text-xs font-semibold text-berry">
            на {ticket.participants} человек
          </span>
        )}
      </div>

      <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
        {ticket.name}
      </h3>

      <p className="text-sm leading-relaxed text-muted">{ticket.description}</p>

      {ticket.notice && (
        <p className="rounded-xl bg-surface-2 px-3 py-2 text-xs leading-relaxed text-muted">
          {ticket.notice}
        </p>
      )}

      <div className="mt-auto flex items-end justify-between pt-2">
        <span className="font-display text-2xl font-semibold text-accent sm:text-3xl">
          {formatPrice(ticket.price)}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs transition-colors ${
            selected
              ? "border-accent bg-accent text-accent-ink"
              : "border-border text-transparent group-hover:border-accent"
          }`}
          aria-hidden
        >
          ✓
        </span>
      </div>
    </button>
  );
}
