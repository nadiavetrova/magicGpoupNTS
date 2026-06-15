import { NextRequest, NextResponse } from "next/server";

// Один бот для всех форм — TG_TOKEN + TG_CHAT
// Или раздельные боты — TG_TOKEN_TOURISM, TG_TOKEN_REALTY, TG_TOKEN_INSURANCE
const BOTS: Record<string, { token: string; chatId: string }> = {
  tourism:   { token: process.env.TG_TOKEN_TOURISM   || process.env.TG_TOKEN || "", chatId: process.env.TG_CHAT_TOURISM   || process.env.TG_CHAT || "" },
  insurance: { token: process.env.TG_TOKEN_INSURANCE || process.env.TG_TOKEN || "", chatId: process.env.TG_CHAT_INSURANCE || process.env.TG_CHAT || "" },
  realty:    { token: process.env.TG_TOKEN_REALTY    || process.env.TG_TOKEN || "", chatId: process.env.TG_CHAT_REALTY    || process.env.TG_CHAT || "" },
};

/* ── 1. HTML escape — prevents injection into Telegram HTML mode ── */
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ── 2. Rate limiting — in-memory, per IP ── */
// Vercel serverless instances are short-lived, but this blocks burst spam
// within the same warm instance (typically handles many requests).
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT  = 5;          // max 5 submissions
const RATE_WINDOW = 60_000;     // per 60 seconds per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

/* ── 3. Validation ── */
const VALID_SECTIONS = ["tourism", "insurance", "realty"];

function validateRequest(
  section: unknown, name: unknown, phone: unknown,
  services: unknown, message: unknown,
) {
  if (!VALID_SECTIONS.includes(section as string))
    return "Неверный раздел";

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100)
    return "Некорректное имя";

  if (typeof phone !== "string" || phone.replace(/\D/g, "").length < 5)
    return "Некорректный номер телефона";

  if (!Array.isArray(services) || services.length === 0 || services.length > 10)
    return "Не выбраны услуги";
  if (services.some((s) => typeof s !== "string" || s.length > 200))
    return "Некорректные услуги";

  if (message !== undefined && (typeof message !== "string" || message.length > 1000))
    return "Сообщение слишком длинное";

  return null;
}

/* ── Handler ── */
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Слишком много запросов" }, { status: 429 });
    }

    const { section, name, phone, services, message } = await req.json();

    const validationError = validateRequest(section, name, phone, services, message);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const bot = BOTS[section as string];
    if (!bot?.token || !bot?.chatId) {
      console.log("[Telegram] Bot not configured for section:", section, { name, phone, services });
      return NextResponse.json({ ok: true });
    }

    const sectionLabels: Record<string, string> = {
      tourism:   "✈️ Туризм",
      insurance: "🛡 Страхование",
      realty:    "🏠 Недвижимость",
    };

    // All user input is HTML-escaped before insertion
    const text = [
      `🔔 <b>Новая заявка — ${sectionLabels[section]}</b>`,
      ``,
      `👤 <b>Имя:</b> ${esc(name)}`,
      `📞 <b>Телефон:</b> ${esc(phone)}`,
      `📋 <b>Интересует:</b>`,
      ...(services as string[]).map((s: string) => `  • ${esc(s)}`),
      ...(message ? [``, `💬 <b>Сообщение:</b> ${esc(message)}`] : []),
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${bot.token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: bot.chatId, text, parse_mode: "HTML" }),
      }
    );

    if (!res.ok) {
      // 3. Log full error server-side, return generic to client
      const err = await res.json().catch(() => ({}));
      console.error("[Telegram] API error:", err);
      return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[Telegram] Unexpected error:", e);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
