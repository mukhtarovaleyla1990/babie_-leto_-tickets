/**
 * Типы билетов. Единственный источник правды по ценам.
 * price — в Ft (целое число, без копеек: HUF — zero-decimal валюта в Stripe).
 */

export type Audience = "adult" | "child" | "student";
export type Scope = "single" | "allday";

export type TicketType = {
  id: string;
  name: string;
  audience: Audience;
  scope: Scope;
  /** Цена за 1 билет в Ft */
  price: number;
  /** Сколько участников проходит по одному билету */
  participants: number;
  description: string;
  /** Доп. предупреждение под карточкой (например, про студенческий) */
  notice?: string;
  isActive: boolean;
};

export const TICKET_TYPES: TicketType[] = [
  {
    id: "adult-single",
    name: "Взрослый · одна активность",
    audience: "adult",
    scope: "single",
    price: 7000,
    participants: 1,
    description: "Вход на фестиваль и участие в одной выбранной активности.",
    isActive: true,
  },
  {
    id: "adult-allday",
    name: "Взрослый · весь день",
    audience: "adult",
    scope: "allday",
    price: 12000,
    participants: 1,
    description: "Полный день: все открытые активности и вся программа фестиваля.",
    isActive: true,
  },
  {
    id: "child-single",
    name: "Детский · одна активность",
    audience: "child",
    scope: "single",
    price: 3500,
    participants: 1,
    description: "Для детей. Вход и одна выбранная активность.",
    isActive: true,
  },
  {
    id: "child-allday",
    name: "Детский · весь день",
    audience: "child",
    scope: "allday",
    price: 6000,
    participants: 1,
    description: "Для детей. Полный день и вся детская программа.",
    isActive: true,
  },
  {
    id: "student-single",
    name: "Студенческий · одна активность",
    audience: "student",
    scope: "single",
    price: 6300,
    participants: 1,
    description: "Для студентов. Вход и одна выбранная активность.",
    notice: "При входе необходимо предъявить действующий студенческий билет.",
    isActive: true,
  },
  {
    id: "student-allday",
    name: "Студенческий · весь день",
    audience: "student",
    scope: "allday",
    price: 11000,
    participants: 1,
    description: "Для студентов. Полный день и вся программа фестиваля.",
    notice: "При входе необходимо предъявить действующий студенческий билет.",
    isActive: true,
  },
  {
    id: "couple-allday",
    name: "Парный · весь день",
    audience: "adult",
    scope: "allday",
    price: 20000,
    participants: 2,
    description: "Один билет на двоих. Полный день для обоих участников.",
    isActive: true,
  },
];

export const ACTIVE_TICKET_TYPES = TICKET_TYPES.filter((t) => t.isActive);

export function getTicketType(id: string): TicketType | undefined {
  return ACTIVE_TICKET_TYPES.find((t) => t.id === id);
}

/** Максимальное количество билетов одного типа в одном заказе */
export const MAX_QUANTITY = 10;
