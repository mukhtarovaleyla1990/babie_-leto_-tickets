import { NextResponse } from "next/server";

import { getActivity } from "@/config/activities";
import { FESTIVAL } from "@/config/festival";
import { getTicketType } from "@/config/tickets";
import {
  emptyParticipant,
  needsGuardian,
  needsSwimmingInfo,
  orderTotal,
  totalParticipants,
  validateOrder,
  type OrderDraft,
  type Participant,
} from "@/lib/order";
import { getStripe, siteUrl, toStripeAmount } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Приводим произвольный JSON из запроса к OrderDraft, ничему не доверяя. */
function parseDraft(body: unknown): OrderDraft {
  const b = (body ?? {}) as Record<string, unknown>;
  const buyer = (b.buyer ?? {}) as Record<string, unknown>;
  const guardian = (b.guardian ?? {}) as Record<string, unknown>;

  const participants: Participant[] = Array.isArray(b.participants)
    ? b.participants.slice(0, 40).map((raw) => {
        const p = (raw ?? {}) as Record<string, unknown>;
        return {
          name: str(p.name).slice(0, 120),
          age: str(p.age).slice(0, 3),
          swimmingLevel: str(p.swimmingLevel).slice(0, 60),
          swimmingNotes: str(p.swimmingNotes).slice(0, 300),
        };
      })
    : [emptyParticipant()];

  return {
    ticketTypeId: str(b.ticketTypeId),
    activityIds: Array.isArray(b.activityIds)
      ? b.activityIds.slice(0, 20).map((id) => str(id))
      : [],
    quantity: Number(b.quantity),
    buyer: {
      name: str(buyer.name).slice(0, 120),
      email: str(buyer.email).slice(0, 160),
      phone: str(buyer.phone).slice(0, 40),
    },
    participants,
    guardian: {
      name: str(guardian.name).slice(0, 120),
      contact: str(guardian.contact).slice(0, 160),
    },
  };
}

/** Stripe ограничивает значение metadata 500 символами. */
function meta(value: string): string {
  return value.slice(0, 500);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос." }, { status: 400 });
  }

  const draft = parseDraft(body);

  // Валидация теми же правилами, что и на клиенте.
  const result = validateOrder(draft);
  if (!result.ok) {
    return NextResponse.json({ error: result.errors[0] }, { status: 400 });
  }

  const ticket = getTicketType(draft.ticketTypeId)!;
  const people = totalParticipants(ticket, draft.quantity);
  const activityNames = draft.activityIds
    .map((id) => getActivity(id)?.name)
    .filter(Boolean)
    .join(", ");

  const participantLines = draft.participants
    .slice(0, people)
    .map((p, i) => {
      const parts = [p.name.trim() || draft.buyer.name.trim()];
      if (p.age) parts.push(`${p.age} лет`);
      if (p.swimmingLevel) parts.push(`плавание: ${p.swimmingLevel}`);
      return `${i + 1}. ${parts.join(", ")}`;
    })
    .join(" | ");

  const swimmingNotes = needsSwimmingInfo(draft.activityIds)
    ? draft.participants
        .slice(0, people)
        .map((p, i) => `${i + 1}: ${p.swimmingNotes.trim()}`)
        .join(" | ")
    : "";

  try {
    const stripe = getStripe();
    const base = siteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Stripe сам отправит покупателю чек на этот адрес.
      customer_email: draft.buyer.email.trim(),
      line_items: [
        {
          quantity: draft.quantity,
          price_data: {
            currency: FESTIVAL.currency,
            unit_amount: toStripeAmount(ticket.price),
            product_data: {
              name: `${FESTIVAL.name} ${FESTIVAL.year} — ${ticket.name}`,
              description:
                activityNames.length > 0
                  ? `${FESTIVAL.dateLabel}, ${FESTIVAL.venue}. Активности: ${activityNames}`
                  : `${FESTIVAL.dateLabel}, ${FESTIVAL.venue}`,
            },
          },
        },
      ],
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cancel`,
      // Единственное место, где хранится состав заказа: своей БД у нас нет.
      metadata: {
        ticket_type: meta(ticket.name),
        ticket_type_id: meta(ticket.id),
        quantity: String(draft.quantity),
        participants_count: String(people),
        total_huf: String(orderTotal(ticket, draft.quantity)),
        activities: meta(activityNames || "—"),
        buyer_name: meta(draft.buyer.name.trim()),
        buyer_phone: meta(draft.buyer.phone.trim()),
        participants: meta(participantLines),
        swimming_notes: meta(swimmingNotes || "—"),
        guardian: needsGuardian(ticket)
          ? meta(`${draft.guardian.name.trim()} — ${draft.guardian.contact.trim()}`)
          : "—",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe не вернул ссылку на оплату." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session failed:", error);
    return NextResponse.json(
      { error: "Не удалось создать оплату. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}
