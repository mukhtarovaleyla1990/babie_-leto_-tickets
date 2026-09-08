"use client";

import { useMemo, useState } from "react";

import {
  SWIMMING_LEVELS,
  activitiesForAudience,
  getActivity,
  type Activity,
} from "@/config/activities";
import { CONTENT } from "@/config/content";
import { ACTIVE_TICKET_TYPES, MAX_QUANTITY, getTicketType } from "@/config/tickets";
import {
  emptyParticipant,
  needsGuardian,
  needsParticipantNames,
  needsSwimmingInfo,
  orderTotal,
  selectedActivities,
  totalParticipants,
  validateOrder,
  type OrderDraft,
  type Participant,
} from "@/lib/order";

import { ActivityCard } from "./ActivityCard";
import { SelectField, TextAreaField, TextField } from "./Field";
import { MobileSummaryBar, Summary } from "./Summary";
import { TicketCard } from "./TicketCard";

function Section({
  step,
  title,
  subtitle,
  children,
  id,
}: {
  step: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rise scroll-mt-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-ink">
          {step}
        </span>
        <div>
          <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm leading-relaxed text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

/** Подгоняем длину массива участников под нужное количество. */
function resizeParticipants(current: Participant[], size: number): Participant[] {
  const next = current.slice(0, size);
  while (next.length < size) next.push(emptyParticipant());
  return next;
}

export function BookingForm() {
  const [draft, setDraft] = useState<OrderDraft>({
    ticketTypeId: "",
    activityIds: [],
    quantity: 1,
    buyer: { name: "", email: "", phone: "" },
    participants: [emptyParticipant()],
    guardian: { name: "", contact: "" },
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ticket = getTicketType(draft.ticketTypeId);

  const availableActivities: Activity[] = useMemo(
    () => (ticket ? activitiesForAudience(ticket.audience) : []),
    [ticket]
  );

  const chosenActivities = useMemo(
    () => selectedActivities(draft.activityIds),
    [draft.activityIds]
  );

  const people = ticket ? totalParticipants(ticket, draft.quantity) : 0;
  const total = ticket ? orderTotal(ticket, draft.quantity) : 0;
  const swimming = needsSwimmingInfo(draft.activityIds);
  const showNames = ticket ? needsParticipantNames(ticket, draft.quantity) : false;
  const showGuardian = ticket ? needsGuardian(ticket) : false;

  const validation = useMemo(() => validateOrder(draft), [draft]);

  function selectTicket(ticketTypeId: string) {
    setError(null);
    setDraft((prev) => {
      const next = getTicketType(ticketTypeId);
      if (!next) return prev;

      // Оставляем только те активности, что подходят новому билету.
      const allowed = new Set(
        activitiesForAudience(next.audience)
          .filter((a) => a.remainingPlaces > 0)
          .map((a) => a.id)
      );
      let activityIds = prev.activityIds.filter((id) => allowed.has(id));
      if (next.scope === "single") activityIds = activityIds.slice(0, 1);

      return {
        ...prev,
        ticketTypeId,
        activityIds,
        participants: resizeParticipants(
          prev.participants,
          totalParticipants(next, prev.quantity)
        ),
      };
    });
  }

  function toggleActivity(activityId: string) {
    setError(null);
    setDraft((prev) => {
      const current = getTicketType(prev.ticketTypeId);
      if (!current) return prev;

      const activity = getActivity(activityId);
      if (!activity || activity.remainingPlaces <= 0) return prev;

      if (current.scope === "single") {
        // Ровно одна активность: повторное нажатие снимает выбор.
        return {
          ...prev,
          activityIds: prev.activityIds[0] === activityId ? [] : [activityId],
        };
      }

      return {
        ...prev,
        activityIds: prev.activityIds.includes(activityId)
          ? prev.activityIds.filter((id) => id !== activityId)
          : [...prev.activityIds, activityId],
      };
    });
  }

  function setQuantity(quantity: number) {
    setError(null);
    setDraft((prev) => {
      const current = getTicketType(prev.ticketTypeId);
      if (!current) return prev;
      const clamped = Math.min(Math.max(quantity, 1), MAX_QUANTITY);
      return {
        ...prev,
        quantity: clamped,
        participants: resizeParticipants(
          prev.participants,
          totalParticipants(current, clamped)
        ),
      };
    });
  }

  function updateParticipant(
    index: number,
    field: keyof Participant,
    value: string
  ) {
    setDraft((prev) => ({
      ...prev,
      participants: prev.participants.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      ),
    }));
  }

  async function submit() {
    if (!validation.ok || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? CONTENT.errors.checkoutFailed);
        setSubmitting(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError(CONTENT.errors.network);
      setSubmitting(false);
    }
  }

  const summaryProps = {
    ticket,
    activities: chosenActivities,
    quantity: draft.quantity,
    onQuantityChange: setQuantity,
    total,
    canPay: validation.ok,
    blockers: validation.errors,
    submitting,
    error,
    onSubmit: submit,
  };

  const steps = CONTENT.steps;
  const form = CONTENT.form;
  const activityStep =
    ticket?.scope === "single" ? steps.activitiesSingle : steps.activitiesAllday;

  return (
    <>
      <div
        id="tickets"
        className="mx-auto grid max-w-6xl gap-10 px-4 pb-28 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-12 lg:pb-20"
      >
        <div className="space-y-12">
          {/* 1 — Билет */}
          <Section
            step={1}
            title={steps.tickets.title}
            subtitle={steps.tickets.subtitle}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {ACTIVE_TICKET_TYPES.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  selected={draft.ticketTypeId === t.id}
                  onSelect={() => selectTicket(t.id)}
                />
              ))}
            </div>
          </Section>

          {/* 2 — Активности */}
          {ticket && (
            <Section
              step={2}
              title={activityStep.title}
              subtitle={activityStep.subtitle}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {availableActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    selected={draft.activityIds.includes(activity.id)}
                    onToggle={() => toggleActivity(activity.id)}
                  />
                ))}
              </div>
              {availableActivities.length === 0 && (
                <p className="text-sm text-muted">{steps.noActivities}</p>
              )}
            </Section>
          )}

          {/* 3 — Данные */}
          {ticket && (
            <Section
              step={3}
              title={steps.details.title}
              subtitle={steps.details.subtitle}
            >
              <div className="card space-y-4 p-5 sm:p-6">
                <TextField
                  label={form.buyerName.label}
                  required
                  value={draft.buyer.name}
                  autoComplete="name"
                  placeholder={form.buyerName.placeholder}
                  onChange={(name) =>
                    setDraft((prev) => ({
                      ...prev,
                      buyer: { ...prev.buyer, name },
                    }))
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label={form.buyerEmail.label}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder={form.buyerEmail.placeholder}
                    value={draft.buyer.email}
                    onChange={(email) =>
                      setDraft((prev) => ({
                        ...prev,
                        buyer: { ...prev.buyer, email },
                      }))
                    }
                  />
                  <TextField
                    label={form.buyerPhone.label}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder={form.buyerPhone.placeholder}
                    value={draft.buyer.phone}
                    onChange={(phone) =>
                      setDraft((prev) => ({
                        ...prev,
                        buyer: { ...prev.buyer, phone },
                      }))
                    }
                  />
                </div>
              </div>

              {/* Участники */}
              {(showNames || swimming) && (
                <div className="mt-4 space-y-4">
                  {Array.from({ length: people }).map((_, index) => {
                    const participant =
                      draft.participants[index] ?? emptyParticipant();
                    const isChild = ticket.audience === "child";
                    const nameField = isChild ? form.childName : form.participantName;

                    return (
                      <div key={index} className="card space-y-4 p-5 sm:p-6">
                        <h3 className="font-display text-lg text-ink">
                          {isChild ? form.childHeading : form.participantHeading}
                          {people > 1 ? ` ${index + 1}` : ""}
                        </h3>

                        {showNames && (
                          <TextField
                            label={nameField.label}
                            required
                            value={participant.name}
                            placeholder={nameField.placeholder}
                            onChange={(value) =>
                              updateParticipant(index, "name", value)
                            }
                          />
                        )}

                        {(isChild || swimming) && (
                          <TextField
                            label={form.age.label}
                            type="number"
                            inputMode="numeric"
                            required
                            placeholder={form.age.placeholder}
                            value={participant.age}
                            onChange={(value) =>
                              updateParticipant(index, "age", value)
                            }
                          />
                        )}

                        {swimming && (
                          <>
                            <SelectField
                              label={form.swimmingLevel.label}
                              required
                              value={participant.swimmingLevel}
                              options={SWIMMING_LEVELS}
                              placeholder={form.selectPlaceholder}
                              onChange={(value) =>
                                updateParticipant(index, "swimmingLevel", value)
                              }
                            />
                            <TextAreaField
                              label={form.swimmingNotes.label}
                              required
                              hint={form.swimmingNotes.hint}
                              placeholder={form.swimmingNotes.placeholder}
                              value={participant.swimmingNotes}
                              onChange={(value) =>
                                updateParticipant(index, "swimmingNotes", value)
                              }
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Родитель / сопровождающий */}
              {showGuardian && (
                <div className="card mt-4 space-y-4 p-5 sm:p-6">
                  <h3 className="font-display text-lg text-ink">
                    {form.guardianHeading}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label={form.guardianName.label}
                      required
                      placeholder={form.guardianName.placeholder}
                      value={draft.guardian.name}
                      onChange={(name) =>
                        setDraft((prev) => ({
                          ...prev,
                          guardian: { ...prev.guardian, name },
                        }))
                      }
                    />
                    <TextField
                      label={form.guardianContact.label}
                      required
                      placeholder={form.guardianContact.placeholder}
                      hint={form.guardianContact.hint}
                      value={draft.guardian.contact}
                      onChange={(contact) =>
                        setDraft((prev) => ({
                          ...prev,
                          guardian: { ...prev.guardian, contact },
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              {ticket.notice && (
                <p className="mt-4 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted">
                  {ticket.notice}
                </p>
              )}
            </Section>
          )}

          {/* Итог на мобильных — под формой, полной карточкой */}
          <div className="lg:hidden">
            <Summary {...summaryProps} />
          </div>
        </div>

        {/* Итог на desktop — липкая колонка справа */}
        <aside className="hidden lg:sticky lg:top-6 lg:block">
          <Summary {...summaryProps} />
        </aside>
      </div>

      <MobileSummaryBar
        total={total}
        canPay={validation.ok}
        submitting={submitting}
        onSubmit={submit}
        ticketName={ticket ? ticket.name : CONTENT.summary.mobileNoTicket}
      />
    </>
  );
}
