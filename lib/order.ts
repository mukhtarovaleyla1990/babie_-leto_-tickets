/**
 * Типы заказа, расчёт суммы и валидация.
 * Используется и на клиенте (блокировка кнопки), и на сервере (перед Stripe).
 */

import { ACTIVE_ACTIVITIES, getActivity, type Activity } from "@/config/activities";
import { SWIMMING_LEVELS } from "@/config/activities";
import { MAX_QUANTITY, getTicketType, type TicketType } from "@/config/tickets";

export type Participant = {
  name: string;
  /** Возраст. Обязателен для детских билетов и для активностей с плаванием. */
  age: string;
  swimmingLevel: string;
  /** Медицинские ограничения, о которых должен знать тренер. */
  swimmingNotes: string;
};

export type Buyer = {
  name: string;
  email: string;
  phone: string;
};

export type Guardian = {
  name: string;
  contact: string;
};

export type OrderDraft = {
  ticketTypeId: string;
  activityIds: string[];
  quantity: number;
  buyer: Buyer;
  participants: Participant[];
  guardian: Guardian;
};

export function emptyParticipant(): Participant {
  return { name: "", age: "", swimmingLevel: "", swimmingNotes: "" };
}

export function emptyOrder(): OrderDraft {
  return {
    ticketTypeId: "",
    activityIds: [],
    quantity: 1,
    buyer: { name: "", email: "", phone: "" },
    participants: [emptyParticipant()],
    guardian: { name: "", contact: "" },
  };
}

/** Сколько человек проходит по заказу целиком. */
export function totalParticipants(ticket: TicketType, quantity: number): number {
  return ticket.participants * quantity;
}

/** Итоговая сумма заказа в Ft. */
export function orderTotal(ticket: TicketType, quantity: number): number {
  return ticket.price * quantity;
}

/** Выбранные активности, которые ещё существуют и активны. */
export function selectedActivities(activityIds: string[]): Activity[] {
  return activityIds
    .map((id) => getActivity(id))
    .filter((a): a is Activity => Boolean(a));
}

/** Нужны ли поля про плавание — зависит только от requiresSwimmingInfo. */
export function needsSwimmingInfo(activityIds: string[]): boolean {
  return selectedActivities(activityIds).some((a) => a.requiresSwimmingInfo);
}

/** Отдельные имена участников спрашиваем, только когда их больше одного или это ребёнок. */
export function needsParticipantNames(ticket: TicketType, quantity: number): boolean {
  return totalParticipants(ticket, quantity) > 1 || ticket.audience === "child";
}

export function needsGuardian(ticket: TicketType): boolean {
  return ticket.audience === "child";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isAge(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed === "") return false;
  const n = Number(trimmed);
  return Number.isInteger(n) && n >= 0 && n <= 120;
}

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

/**
 * Полная проверка заказа. Один источник правды: клиент блокирует кнопку,
 * сервер отказывает в создании Stripe-сессии по тем же правилам.
 */
export function validateOrder(draft: OrderDraft): ValidationResult {
  const errors: string[] = [];

  const ticket = getTicketType(draft.ticketTypeId);
  if (!ticket) {
    return { ok: false, errors: ["Выберите тип билета."] };
  }

  if (
    !Number.isInteger(draft.quantity) ||
    draft.quantity < 1 ||
    draft.quantity > MAX_QUANTITY
  ) {
    errors.push(`Количество билетов должно быть от 1 до ${MAX_QUANTITY}.`);
  }

  // Активности: существуют, активны, подходят аудитории, есть места.
  const activities = draft.activityIds.map((id) => getActivity(id));
  if (activities.some((a) => !a)) {
    errors.push("Одна из выбранных активностей больше недоступна.");
  }
  const valid = activities.filter((a): a is Activity => Boolean(a));

  if (new Set(draft.activityIds).size !== draft.activityIds.length) {
    errors.push("Активность выбрана дважды.");
  }

  for (const a of valid) {
    if (a.remainingPlaces <= 0) {
      errors.push(`«${a.name}»: мест не осталось.`);
    }
    const allowed =
      ticket.audience === "adult"
        ? a.adultAllowed
        : ticket.audience === "child"
          ? a.childAllowed
          : a.studentAllowed;
    if (!allowed) {
      errors.push(`«${a.name}» недоступна для этого типа билета.`);
    }
  }

  if (ticket.scope === "single" && valid.length !== 1) {
    errors.push("Для билета на одну активность выберите ровно одну активность.");
  }

  // Данные покупателя
  if (draft.buyer.name.trim().length < 2) {
    errors.push("Укажите имя и фамилию.");
  }
  if (!isEmail(draft.buyer.email)) {
    errors.push("Укажите корректный email.");
  }
  if (!isPhone(draft.buyer.phone)) {
    errors.push("Укажите корректный телефон.");
  }

  const people = totalParticipants(ticket, draft.quantity);
  const swimming = needsSwimmingInfo(draft.activityIds);
  const wantNames = needsParticipantNames(ticket, draft.quantity);

  if (draft.participants.length !== people) {
    errors.push("Заполните данные всех участников.");
  }

  draft.participants.slice(0, people).forEach((p, i) => {
    const label = `Участник ${i + 1}`;

    if (wantNames && p.name.trim().length < 2) {
      errors.push(`${label}: укажите имя.`);
    }

    const ageRequired = ticket.audience === "child" || swimming;
    if (ageRequired && !isAge(p.age)) {
      errors.push(`${label}: укажите возраст.`);
    }

    // Возрастные рамки активностей
    if (isAge(p.age)) {
      const age = Number(p.age);
      for (const a of valid) {
        if (a.minimumAge !== null && age < a.minimumAge) {
          errors.push(`${label}: для «${a.name}» нужно от ${a.minimumAge} лет.`);
        }
        if (a.maximumAge !== null && age > a.maximumAge) {
          errors.push(`${label}: для «${a.name}» возраст до ${a.maximumAge} лет.`);
        }
      }
    }

    if (swimming) {
      if (!SWIMMING_LEVELS.includes(p.swimmingLevel as (typeof SWIMMING_LEVELS)[number])) {
        errors.push(`${label}: выберите уровень плавания.`);
      }
      if (p.swimmingNotes.trim().length === 0) {
        errors.push(
          `${label}: укажите медицинские ограничения или напишите «нет».`
        );
      }
    }
  });

  if (needsGuardian(ticket)) {
    if (draft.guardian.name.trim().length < 2) {
      errors.push("Укажите имя родителя или сопровождающего.");
    }
    if (draft.guardian.contact.trim().length < 5) {
      errors.push("Укажите контакты родителя или сопровождающего.");
    }
  }

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)) };
}

/** Короткое описание заказа для Stripe (line item description + metadata). */
export function orderSummaryText(draft: OrderDraft): string {
  const names = selectedActivities(draft.activityIds).map((a) => a.name);
  return names.length > 0 ? names.join(", ") : "Без выбранных активностей";
}

export { ACTIVE_ACTIVITIES };
