/** Общие данные фестиваля. Меняются здесь, без правок UI. */
export const FESTIVAL = {
  name: "BABIE LETO FEST",
  year: "2026",
  dateLabel: "20 сентября 2026",
  venue: "Holdudvar, Margitsziget",
  city: "Budapest",
  currency: "huf",
  currencyLabel: "Ft",
} as const;

/** 7 000 Ft -> "7 000 Ft" */
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("ru-RU").replace(/\u00A0/g, " ")} ${FESTIVAL.currencyLabel}`;
}
