"use client";

import type { Activity } from "@/config/activities";

function placesLabel(activity: Activity): { text: string; tone: string } {
  if (activity.remainingPlaces <= 0) {
    return { text: "Мест нет", tone: "bg-surface-2 text-muted" };
  }
  if (activity.remainingPlaces <= 5) {
    return {
      text: `Осталось ${activity.remainingPlaces}`,
      tone: "bg-[var(--c-berry)]/12 text-berry",
    };
  }
  return {
    text: `Свободно ${activity.remainingPlaces}`,
    tone: "bg-[var(--c-leaf)]/12 text-leaf",
  };
}

function ageLabel(activity: Activity): string | null {
  if (activity.minimumAge !== null && activity.maximumAge !== null) {
    return `${activity.minimumAge}–${activity.maximumAge} лет`;
  }
  if (activity.minimumAge !== null) return `от ${activity.minimumAge} лет`;
  if (activity.maximumAge !== null) return `до ${activity.maximumAge} лет`;
  return null;
}

export function ActivityCard({
  activity,
  selected,
  onToggle,
}: {
  activity: Activity;
  selected: boolean;
  onToggle: () => void;
}) {
  const soldOut = activity.remainingPlaces <= 0;
  const places = placesLabel(activity);
  const age = ageLabel(activity);

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={soldOut}
      aria-pressed={selected}
      className={`card group flex h-full flex-col gap-2 p-4 text-left transition-all duration-200 sm:p-5 ${
        selected ? "card-selected" : ""
      } ${
        soldOut
          ? "cursor-not-allowed opacity-55"
          : "hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-lg leading-snug text-ink">
          {activity.name}
        </h4>
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] transition-colors ${
            selected
              ? "border-accent bg-accent text-accent-ink"
              : "border-border text-transparent"
          }`}
          aria-hidden
        >
          ✓
        </span>
      </div>

      <p className="text-sm text-muted">{activity.description}</p>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2 text-xs font-medium">
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">
          {activity.time}
        </span>
        <span className={`rounded-full px-2.5 py-1 ${places.tone}`}>
          {places.text}
        </span>
        {age && (
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-muted">
            {age}
          </span>
        )}
        {activity.requiresSwimmingInfo && (
          <span className="rounded-full bg-[var(--c-sky)]/12 px-2.5 py-1 text-sky">
            нужна анкета пловца
          </span>
        )}
      </div>
    </button>
  );
}
