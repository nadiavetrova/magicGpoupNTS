import type { Metadata } from "next";
import { Syne, DM_Sans, Inter, Cormorant_Garamond, Jost, Manrope, Oswald, Playfair_Display, Barlow_Condensed } from "next/font/google";
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

// Cormorant Garamond — ультраутончённый editorial серифный с кириллицей
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Jost — мягкая геометрическая гротеска для body-текстов
const jost = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

// Manrope — современная геометрическая гротеска для заголовков недвижимости
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Oswald — condensed industrial для лофт-стиля секции недвижимости
const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAGIC Group NTS — Шухрат Азизов",
  description: "Международный туризм, страхование и недвижимость. Ваш надёжный партнёр.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", rel: "shortcut icon" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/favicon/site.webmanifest",
  appleWebApp: { title: "MAGIC Group NTS" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-full ${syne.variable} ${dmSans.variable} ${inter.variable} ${cormorant.variable} ${jost.variable} ${manrope.variable} ${oswald.variable} ${playfair.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
