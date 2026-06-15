import type { Metadata } from "next";
import { Syne, DM_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// next/font/google скачивает шрифты при сборке и раздаёт с собственного домена —
// Google Fonts CDN не нужен. Работает в России без ограничений.
const syne = Syne({
  subsets: ["latin"],          // Syne — только латиница; кириллица упадёт на Inter
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],          // DM Sans не имеет кириллицы; кириллица → Inter
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"], // Inter — полная кириллица
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"], // Playfair — есть кириллица
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAGIC Group NTS — Шухрат Азизов",
  description: "Международный туризм, страхование и недвижимость. Ваш надёжный партнёр.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-full ${syne.variable} ${dmSans.variable} ${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
