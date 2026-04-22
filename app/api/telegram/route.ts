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

export async function POST(req: NextRequest) {
  try {
    const { section, name, phone, services } = await req.json();

    const bot = BOTS[section];
    if (!bot?.token || !bot?.chatId) {
      return NextResponse.json({ error: "Bot not configured" }, { status: 500 });
    }

    const sectionLabels: Record<string, string> = {
      tourism: "✈️ Туризм",
      insurance: "🛡 Страхование",
      realty: "🏠 Недвижимость",
    };

    const text = `
🔔 <b>Новая заявка — ${sectionLabels[section]}</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📋 <b>Интересует:</b>
${(services as string[]).map((s) => `  • ${s}`).join("\n")}
    `.trim();

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
