import type { Metadata, Viewport } from "next";

import { FESTIVAL } from "@/config/festival";

import "./globals.css";

export const metadata: Metadata = {
  title: `${FESTIVAL.name} ${FESTIVAL.year} — билеты`,
  description: `${FESTIVAL.dateLabel} · ${FESTIVAL.venue}, ${FESTIVAL.city}. Спорт, танцы, мастер-классы и квиз на одном фестивале.`,
};

export const viewport: Viewport = {
  themeColor: "#fbf5ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
