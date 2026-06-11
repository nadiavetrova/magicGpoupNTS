import { Shield, Heart, Home, Car, Plane, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface InsuranceType {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  coverage: string[];
  badge?: string;
}

export interface ComparisonRow {
  feature: string;
  minimal: boolean | string;
  proper: boolean | string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const insuranceTypes: InsuranceType[] = [
  {
    id: "travel",
    icon: Plane,
    title: "Туристическая",
    subtitle: "Для поездок за рубеж",
    description: "Медицинская помощь, эвакуация, отмена поездки, потеря багажа. Покрытие, которое реально работает за границей.",
    coverage: ["Медицина до $100 000", "Отмена рейса", "Потеря багажа", "Задержка рейса"],
    badge: "Хит",
  },
  {
    id: "life",
    icon: Heart,
    title: "Жизнь и здоровье",
    subtitle: "Несчастные случаи, болезни",
    description: "Защита на случай НС, критических заболеваний, временной нетрудоспособности. Выплата от дня события.",
    coverage: ["Несчастный случай", "Критические болезни", "Инвалидность", "Госпитализация"],
  },
  {
    id: "property",
    icon: Home,
    title: "Имущество",
    subtitle: "Квартира, дом, ипотека",
    description: "Защита жилья от пожара, затопления, кражи. Отдельные программы для ипотечных объектов.",
    coverage: ["Пожар и затопление", "Кража", "Ипотека", "Гражданская ответственность"],
  },
  {
    id: "auto",
    icon: Car,
    title: "КАСКО и ОСАГО",
    subtitle: "Автострахование под ключ",
    description: "Подберу условия от лучших страховщиков. ОСАГО без очередей, КАСКО с франшизой под ваш бюджет.",
    coverage: ["ОСАГО онлайн", "КАСКО с франшизой", "GAP страхование", "Помощь на дороге"],
  },
];

export const comparisonRows: ComparisonRow[] = [
  { feature: "Медицина за рубежом", minimal: "До $30 000", proper: "До $100 000+" },
  { feature: "Экстренная эвакуация", minimal: false, proper: true },
  { feature: "Отмена поездки", minimal: false, proper: true },
  { feature: "Потеря/задержка багажа", minimal: false, proper: true },
  { feature: "Спортивные активности", minimal: false, proper: true },
  { feature: "COVID-19 покрытие", minimal: false, proper: true },
  { feature: "Помощь 24/7 на русском", minimal: false, proper: true },
  { feature: "Юридическая помощь", minimal: false, proper: true },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Расскажите о поездке",
    description: "Напишите в мессенджер или оставьте заявку. Куда едете, на сколько дней, какие активности планируете.",
  },
  {
    number: "02",
    title: "Получите подборку",
    description: "Пришлю 2–3 варианта страховок с разными покрытиями и ценами. Без скрытых исключений — объясню каждый пункт.",
  },
  {
    number: "03",
    title: "Оформим онлайн",
    description: "Полис выпускается моментально и приходит на email. Никаких офисов и очередей.",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Почему туристическая страховка от агента лучше, чем купить самому?",
    answer: "Страховки от агрегаторов часто имеют скрытые исключения мелким шрифтом. Я 15 лет работал гидом и видел отказы в выплатах. Подбираю полис, который реально покроет ваш случай — с учётом страны, активностей и рисков.",
  },
  {
    id: "faq-2",
    question: "Что делать, если страховой случай произошёл за границей?",
    answer: "Позвоните на номер ассистанса, указанный в полисе. Я всегда на связи и помогу разобраться с процедурой. Главное — не платите за лечение из своих денег до обращения в ассистанс.",
  },
  {
    id: "faq-3",
    question: "Сколько стоит туристическая страховка?",
    answer: "Зависит от страны, длительности и набора рисков. Базовый полис в Турцию на 14 дней — от 800–1200 ₽. Полное покрытие в США/Европу — от 2000–4000 ₽. Всегда покажу несколько вариантов.",
  },
  {
    id: "faq-4",
    question: "Можно ли застраховаться уже находясь за границей?",
    answer: "Да, но не все компании это разрешают, и обычно действует период ожидания 3–5 дней. Лучше оформлять до вылета — это дешевле и надёжнее.",
  },
  {
    id: "faq-5",
    question: "Нужна ли страховка, если карта уже даёт покрытие?",
    answer: "Банковские страховки по картам обычно имеют лимиты $20 000–30 000 и массу исключений. Для большинства стран этого недостаточно. Рекомендую проверить вашу карту и при необходимости дооформить полис.",
  },
];
