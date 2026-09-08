"use client";

import type { Activity } from "@/config/activities";
import { CONTENT } from "@/config/content";
import { formatPrice } from "@/config/festival";
import type { TicketType } from "@/config/tickets";
import { MAX_QUANTITY } from "@/config/tickets";

export type SummaryProps = {
  ticket: TicketType | undefined;
  activities: Activity[];
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  total: number;
  canPay: boolean;
  blockers: string[];
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
};

function QuantityStepper({
  quantity,
  onChange,
  disabled,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={CONTENT.summary.decreaseLabel}
        disabled={disabled || quantity <= 1}
        onClick={() => onChange(quantity - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-lg leading-none text-ink transition-colors hover:border-accent disabled:opacity-40"
      >
        −
      </button>
      <span className="w-8 text-center font-display text-lg font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={CONTENT.summary.increaseLabel}
        disabled={disabled || quantity >= MAX_QUANTITY}
        onClick={() => onChange(quantity + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-lg leading-none text-ink transition-colors hover:border-accent disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export function Summary({
  ticket,
  activities,
  quantity,
  onQuantityChange,
  total,
  canPay,
  blockers,
  submitting,
  error,
  onSubmit,
}: SummaryProps) {
  const t = CONTENT.summary;

  return (
    <div className="card p-5 sm:p-6">
      <h3 className="font-display text-xl text-ink">{t.heading}</h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted">{t.ticket}</dt>
          <dd className="text-right font-medium text-ink">
            {ticket ? ticket.name : t.noTicket}
          </dd>
        </div>

        {activities.length > 0 && (
          <div className="flex items-baseline justify-between gap-4">
            <dt className="shrink-0 text-muted">
              {activities.length === 1 ? t.activityOne : t.activityMany}
            </dt>
            <dd className="text-right font-medium text-ink">
              {activities.map((a) => a.name).join(", ")}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">{t.quantity}</dt>
          <dd>
            <QuantityStepper
              quantity={quantity}
              onChange={onQuantityChange}
              disabled={!ticket}
            />
          </dd>
        </div>

        {ticket && (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{t.pricePerTicket}</dt>
              <dd className="font-medium text-ink">{formatPrice(ticket.price)}</dd>
            </div>
            {ticket.participants > 1 && (
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">{t.participants}</dt>
                <dd className="font-medium text-ink">
                  {ticket.participants * quantity}
                </dd>
              </div>
            )}
          </>
        )}
      </dl>

      <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
        <span className="text-sm font-medium text-muted">{t.total}</span>
        <span className="font-display text-2xl font-semibold text-accent">
          {formatPrice(total)}
        </span>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={!canPay || submitting}
        className="btn-primary mt-5 w-full px-5 py-3.5 text-base"
      >
        {submitting ? t.ctaLoading : t.cta}
      </button>

      {error && (
        <p className="mt-3 rounded-xl bg-[var(--c-berry)]/10 px-3 py-2 text-sm text-berry">
          {error}
        </p>
      )}

      {!canPay && blockers.length > 0 && (
        <div className="mt-3 rounded-xl bg-surface-2 px-3 py-2.5">
          <p className="text-xs font-semibold text-muted">{t.blockersTitle}</p>
          <ul className="mt-1 space-y-1 text-xs text-muted">
            {blockers.slice(0, 4).map((blocker) => (
              <li key={blocker}>· {blocker}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        {t.note}
      </p>
    </div>
  );
}

/** Компактная панель, закреплённая снизу на мобильных. */
export function MobileSummaryBar({
  total,
  canPay,
  submitting,
  onSubmit,
  ticketName,
}: {
  total: number;
  canPay: boolean;
  submitting: boolean;
  onSubmit: () => void;
  ticketName: string;
}) {
  const t = CONTENT.summary;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted">{ticketName}</p>
          <p className="font-display text-lg font-semibold text-accent">
            {formatPrice(total)}
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canPay || submitting}
          className="btn-primary shrink-0 px-5 py-3 text-sm"
        >
          {submitting ? t.mobileCtaLoading : t.mobileCta}
        </button>
      </div>
    </div>
  );
}
