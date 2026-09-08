import type { Metadata, Viewport } from "next";

import { CONTENT } from "@/config/content";
import { FESTIVAL } from "@/config/festival";

import "./globals.css";

export const metadata: Metadata = {
  title: `${FESTIVAL.name} ${FESTIVAL.year} — ${CONTENT.meta.titleSuffix}`,
  description: `${FESTIVAL.dateLabel} · ${FESTIVAL.venue}, ${FESTIVAL.city}. ${CONTENT.meta.description}`,
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
