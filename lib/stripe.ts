import Stripe from "stripe";

/**
 * Stripe-клиент. Ключ читается только на сервере (без NEXT_PUBLIC_),
 * поэтому в бандл фронтенда он не попадает.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY не задан в переменных окружения.");
  }

  cached = new Stripe(key);
  return cached;
}

/**
 * HUF в Stripe передаётся в минорных единицах (филлерах), и сумма должна
 * быть кратна 100. Все цены у нас целые в Ft, поэтому × 100 всегда подходит.
 */
export function toStripeAmount(forints: number): number {
  return Math.round(forints) * 100;
}

/** Базовый URL для success/cancel редиректов. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}
