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
    id: "adult-single morning",
    name: "Взрослый · одна активность утреннего лайн апа",
    audience: "adult",
    scope: "single",
    price: 6000,
    participants: 1,
    description: "Вход на фестиваль и участие в одной выбранной утренней активности и свободное посещение опен эйр активностей в Holdudvar  .",
    isActive: true,
  },
  {
    id: "adult-single day",
    name: "Взрослый · одна активность дневного лайн апа",
    audience: "adult",
    scope: "single",
    price: 6000,
    participants: 1,
    description: "Вход на фестиваль и участие в одной выбранной дневной активности и свободное посещение опен эйр активностей в Holdudvar  .",
    isActive: true,
  },
  {
    id: "adult-allday",
    name: "Взрослый · весь день",
    audience: "adult",
    scope: "allday",
    price: 10000,
    participants: 1,
    description: "Полный день: все открытые активности и вся программа фестиваля.",
    isActive: true,
  },
  {
    id: "child-single morning",
    name: "Детский · одна активность утреннего лайн апа",
    audience: "child",
    scope: "single",
    price: 2500,
    participants: 1,
    description: "Для детей. Вход и одна выбранная активность утреннего лайн апа и свободное посещение активносте в Holdudvar.",
    isActive: true,
  },
  {
    id: "child-single day",
    name: "Детский · одна активность дневного лайн апа",
    audience: "child",
    scope: "single",
    price: 2500,
    participants: 1,
    description: "Для детей. Вход и одна выбранная активность дневного лайн апа и свободное посещение активносте в Holdudvar.",
    isActive: true,
  },
  {
    id: "child-allday",
    name: "Детский · весь день",
    audience: "child",
    scope: "allday",
    price: 4000,
    participants: 1,
    description: "Для детей. Полный день и вся программа фестиваля.",
    isActive: true,
  },
  {
    id: "student-single morning",
    name: "Студенческий · одна активность утреннего лайн апа",
    audience: "student",
    scope: "single",
    price: 5000,
    participants: 1,
    description: "Для студентов. Вход и одна выбранная активность утреннего лайн апа и свободное посещение утренних активностей в Holdudvar.",
    notice: "При входе необходимо предъявить действующий студенческий билет.",
    isActive: true,
  },
  {
    id: "student-single day",
    name: "Студенческий · одна активность дневного лайн апа",
    audience: "student",
    scope: "single",
    price: 5000,
    participants: 1,
    description: "Для студентов. Вход и одна выбранная активность дневного лайн апа и свободное посещение дневных активностей в Holdudvar.",
    notice: "При входе необходимо предъявить действующий студенческий билет.",
    isActive: true,
  },
  {
    id: "student-allday",
    name: "Студенческий · весь день",
    audience: "student",
    scope: "allday",
    price: 9000,
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
    price: 15000,
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
