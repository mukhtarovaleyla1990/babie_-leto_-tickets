import { BookingForm } from "@/components/BookingForm";
import { Hero } from "@/components/Hero";
import { FESTIVAL } from "@/config/festival";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BookingForm />

      <footer className="border-t border-border px-4 py-10 text-center text-sm text-muted sm:px-6">
        <p className="font-display text-base text-ink">
          {FESTIVAL.name} {FESTIVAL.year}
        </p>
        <p className="mt-1">
          {FESTIVAL.dateLabel} · {FESTIVAL.venue}, {FESTIVAL.city}
        </p>
      </footer>
    </main>
  );
}
