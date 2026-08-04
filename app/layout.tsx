import type { Metadata } from "next";
import { Syne, DM_Sans, Inter, Jost, Oswald, Playfair_Display } from "next/font/google";
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

// Jost — мягкая геометрическая гротеска для body-текстов
const jost = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
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


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://magic-group-nts.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MAGIC Group NTS — Туризм, Страхование, Недвижимость",
    template: "%s | MAGIC Group NTS",
  },
  description: "Авторские экскурсионные туры в Турцию, Азербайджан, Индию. Туризм, страхование и недвижимость. MAGIC Group NTS.",
  keywords: [
    "туры в Турцию", "авторские экскурсии", "туризм", "Каппадокия тур",
    "русскоязычный гид Турция", "Шухрат Азизов", "MAGIC Group NTS",
    "страхование", "недвижимость за рубежом", "туры из России",
  ],
  authors: [{ name: "MAGIC Group NTS" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "MAGIC Group NTS",
    title: "MAGIC Group NTS — Туризм, Страхование, Недвижимость",
    description: "Авторские экскурсионные туры в Турцию, Азербайджан, Индию. Туризм, страхование и недвижимость. MAGIC Group NTS.",
    images: [{ url: "/images/main.jpg", width: 1200, height: 630, alt: "MAGIC Group NTS" }],
  },
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-full ${syne.variable} ${dmSans.variable} ${inter.variable} ${jost.variable} ${oswald.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
