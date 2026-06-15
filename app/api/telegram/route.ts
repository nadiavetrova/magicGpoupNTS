import { NextRequest, NextResponse } from "next/server";

// Вставь сюда токены и chat_id своих ботов
const BOTS: Record<string, { token: string; chatId: string }> = {
  tourism: {
    token: process.env.TG_TOKEN_TOURISM || "",
    chatId: process.env.TG_CHAT_TOURISM || "",
  },
  insurance: {
    token: process.env.TG_TOKEN_INSURANCE || "",
    chatId: process.env.TG_CHAT_INSURANCE || "",
  },
  realty: {
    token: process.env.TG_TOKEN_REALTY || "",
    chatId: process.env.TG_CHAT_REALTY || "",
  },
};

const VALID_SECTIONS = ["tourism", "insurance", "realty"];

function validateRequest(section: unknown, name: unknown, phone: unknown, services: unknown) {
  if (!VALID_SECTIONS.includes(section as string))
    return "Неверный раздел";

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100)
    return "Некорректное имя";

  // strip non-digits, expect 11 digits starting with 7
  if (typeof phone !== "string") return "Некорректный телефон";
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 11 || !digits.startsWith("7"))
    return "Некорректный номер телефона";

  if (!Array.isArray(services) || services.length === 0 || services.length > 10)
    return "Не выбраны услуги";
  if (services.some((s) => typeof s !== "string" || s.length > 200))
    return "Некорректные услуги";

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { section, name, phone, services, message } = await req.json();

    const validationError = validateRequest(section, name, phone, services);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const bot = BOTS[section as string];
    if (!bot?.token || !bot?.chatId) {
      // Tokens not yet configured — acknowledge receipt without sending
      console.log("[RequestModal] Telegram not configured for section:", section, { name, phone, services });
      return NextResponse.json({ ok: true });
    }

    const sectionLabels: Record<string, string> = {
      tourism: "✈️ Туризм",
      insurance: "🛡 Страхование",
      realty: "🏠 Недвижимость",
    };

    const text = [
      `🔔 <b>Новая заявка — ${sectionLabels[section]}</b>`,
      ``,
      `👤 <b>Имя:</b> ${name}`,
      `📞 <b>Телефон:</b> ${phone}`,
      `📋 <b>Интересует:</b>`,
      ...(services as string[]).map((s: string) => `  • ${s}`),
      ...(message ? [``, `💬 <b>Сообщение:</b> ${message}`] : []),
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${bot.token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: bot.chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
