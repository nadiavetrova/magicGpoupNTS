export interface Destination {
  id: string;
  name: string;
  image: string;
  price: string;
  tags: string[];
  days: string;
  description: string;
}

export interface HotTour {
  id: string;
  title: string;
  image: string;
  discount: number;
  originalPrice: string;
  price: string;
  departureDate: string;
  duration: string;
  hotelStars: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  tour: string;
  comment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const representative = {
  name: "Шухрат Азизов",
  title: "Персональный тревел-эксперт · MAGIC Group NTS",
  bio: "В 18 лет — первый раз за границей. Турция, море, пальмы. Начинал с экскурсий, вырос до отельного гида в одной из крупнейших туроператорских компаний мира. Турция, Индия, ОАЭ — я знаю эти направления изнутри. Не по каталогам, а по реальному опыту: где лучшие пляжи, какой отель не обманет, что стоит посмотреть за пределами туристических троп.",
  photo: "/images/turAgent.jpg",
  stats: [
    { label: "Лет опыта", value: "15" },
    { label: "Стран", value: "5+" },
    { label: "Туристов", value: "∞" },
    { label: "Направления", value: "3" },
  ],
};

export const advantages = [
  {
    id: "adv-1",
    title: "Знаю изнутри",
    subtitle: "Турция, Индия, ОАЭ — не по каталогам. Работал гидом на этих направлениях и знаю каждую деталь.",
    iconName: "Compass",
  },
  {
    id: "adv-2",
    title: "Лучшие цены",
    subtitle: "Прямой доступ к туроператорам и закрытым тарифам. Без наценок посредников.",
    iconName: "BadgePercent",
  },
  {
    id: "adv-3",
    title: "Поддержка 24/7",
    subtitle: "На связи на всём протяжении поездки. Решу любой вопрос — от смены рейса до выбора ресторана.",
    iconName: "PhoneCall",
  },
  {
    id: "adv-4",
    title: "Проверенные маршруты",
    subtitle: "Рекомендую только те места, где был сам. Никаких «туристических ловушек».",
    iconName: "Map",
  },
  {
    id: "adv-5",
    title: "Официальное оформление",
    subtitle: "Договор, документы, страховка — всё прозрачно и официально.",
    iconName: "ShieldCheck",
  },
  {
    id: "adv-6",
    title: "Авторские маршруты",
    subtitle: "Составлю индивидуальный план под ваш запрос — от пляжного отдыха до экзотических приключений.",
    iconName: "Sparkles",
  },
];

export const destinations: Destination[] = [
  {
    id: "dest-turkey",
    name: "Турция",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    price: "от 65 000 ₽",
    tags: ["Пляж", "All Inclusive", "Семейный"],
    days: "7–14 ночей",
    description: "Анталья, Бодрум, Мармарис — знаю каждый курорт лично. Подберу отель под ваш запрос и бюджет, без переплат.",
  },
  {
    id: "dest-uae",
    name: "ОАЭ · Дубай",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    price: "от 78 000 ₽",
    tags: ["Luxury", "Шопинг", "Экскурсии"],
    days: "5–10 ночей",
    description: "Дубай, Абу-Даби, сафари в пустыне. Отели с видом на Бурдж-Халифу, пляжи Джумейры и незабываемые закаты.",
  },
  {
    id: "dest-india",
    name: "Индия · Гоа",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    price: "от 55 000 ₽",
    tags: ["Экзотика", "Океан", "Йога"],
    days: "10–14 ночей",
    description: "Северный и Южный Гоа, пляжи Аравийского моря. Знаю, где жить, где есть и что точно не стоит пропускать.",
  },
  {
    id: "dest-thailand",
    name: "Таиланд · Пхукет",
    image: "https://images.unsplash.com/photo-1528181304800-2f1258bb9f35?auto=format&fit=crop&w=1200&q=80",
    price: "от 95 000 ₽",
    tags: ["Тропики", "Пляж", "Экскурсии"],
    days: "10–14 ночей",
    description: "Бирюзовые лагуны Андаманского моря, острова Пи-Пи, слоновьи парки. Свежие морепродукты и колоритный Таиланд.",
  },
  {
    id: "dest-maldives",
    name: "Мальдивы",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
    price: "от 180 000 ₽",
    tags: ["Luxury", "Романтика", "Снорклинг"],
    days: "7–10 ночей",
    description: "Виллы на воде, кристальный океан, ни одного лишнего человека рядом. Идеально для медового месяца.",
  },
  {
    id: "dest-egypt",
    name: "Египет · Хургада",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=80",
    price: "от 48 000 ₽",
    tags: ["Пляж", "All Inclusive", "Дайвинг"],
    days: "7–14 ночей",
    description: "Красное море, лучший коралловый риф для дайвинга. Тёплое море круглый год и проверенные отели 5*.",
  },
];

export const hotTours: HotTour[] = [
  {
    id: "hot-1",
    title: "Rixos Premium Antalya",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    discount: 30,
    originalPrice: "145 000 ₽",
    price: "101 000 ₽",
    departureDate: "15 июля",
    duration: "7 дней / 6 ночей",
    hotelStars: 5,
  },
  {
    id: "hot-2",
    title: "Atlantis The Palm · Дубай",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    discount: 25,
    originalPrice: "210 000 ₽",
    price: "157 500 ₽",
    departureDate: "20 июля",
    duration: "6 дней / 5 ночей",
    hotelStars: 5,
  },
  {
    id: "hot-3",
    title: "Four Seasons Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    discount: 35,
    originalPrice: "138 000 ₽",
    price: "89 700 ₽",
    departureDate: "18 июля",
    duration: "9 дней / 8 ночей",
    hotelStars: 5,
  },
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Анна и Сергей",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Медовый месяц · Мальдивы",
    comment: "Шухрат организовал нам идеальный медовый месяц. Вилла на воде, сюрприз от отеля, трансфер на гидроплане — каждая деталь была продумана. Просто сказка!",
  },
  {
    id: "rev-2",
    name: "Михаил Карпов",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Деловая поездка · ОАЭ",
    comment: "Летал в Дубай по работе. Шухрат нашёл отличный отель рядом с DIFC за разумные деньги, всё оформил быстро. Теперь только через него.",
  },
  {
    id: "rev-3",
    name: "Ирина Соколова",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Семейный отдых · Турция",
    comment: "Летели втроём с ребёнком. Шухрат подобрал отель с аквапарком, анимацией и детским меню. Ребёнок в восторге, мы тоже! Цена оказалась ниже чем на сайтах агрегаторов.",
  },
  {
    id: "rev-4",
    name: "Дмитрий Волков",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Гоа · 2 недели",
    comment: "Хотел нестандартный маршрут по Индии — Гоа, Мумбаи, Хампи. Шухрат составил программу, нашёл транспорт и отели. Всё прошло без единого сбоя.",
  },
  {
    id: "rev-5",
    name: "Екатерина Лебедева",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Таиланд · Острова",
    comment: "Острова Пи-Пи, Краби, Ко Лан — Шухрат знает все эти места лично и дал такие советы, которых нет ни в одном путеводителе. Лучшая поездка в жизни!",
  },
  {
    id: "rev-6",
    name: "Алексей и Ольга",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Египет · Хургада",
    comment: "Первый раз в Египте. Шухрат порекомендовал отель прямо на пляже, подсказал лучшие экскурсии и предупредил о нюансах. Всё прошло идеально!",
  },
];

export const timelineSteps = [
  {
    number: 1,
    title: "Оставляете заявку",
    description: "Расскажите куда хотите, на сколько дней и какой бюджет. Можно просто написать «не знаю куда» — разберёмся вместе.",
  },
  {
    number: 2,
    title: "Получаете подборку",
    description: "Через 2–3 часа пришлю в Telegram или WhatsApp несколько вариантов с ценами, фото и описанием отелей.",
  },
  {
    number: 3,
    title: "Выбираете и оформляем",
    description: "Выбираете понравившийся вариант, подписываем договор онлайн и оплачиваете удобным способом.",
  },
  {
    number: 4,
    title: "Едете и отдыхаете",
    description: "Все документы вышлю заранее. Буду на связи на весь период поездки — от вылета до возвращения домой.",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Как происходит процесс бронирования?",
    answer: "Оставляете заявку или пишете в мессенджер. Я уточняю пожелания и бюджет, после чего готовлю подборку туров. Когда определились — оформляем договор онлайн, вы оплачиваете, я высылаю все документы.",
  },
  {
    id: "faq-2",
    question: "Можно ли забронировать тур в рассрочку?",
    answer: "Да, для большинства туров доступна предоплата 30%, остаток — за 2–3 недели до вылета. Также есть варианты рассрочки через банк-партнёр без процентов.",
  },
  {
    id: "faq-3",
    question: "Нужна ли виза в Турцию, ОАЭ, Индию?",
    answer: "Турция — виза не нужна для граждан РФ. ОАЭ — виза оформляется онлайн, помогу с оформлением. Индия (Гоа) — электронная виза e-Visa, оформляется за 3–5 дней, всё сделаем вместе.",
  },
  {
    id: "faq-4",
    question: "Что входит в стоимость тура?",
    answer: "Стандартный пакет включает: авиаперелёт туда-обратно, трансфер аэропорт–отель–аэропорт, проживание с выбранным питанием (от завтраков до Ultra All Inclusive), медицинскую страховку. Экскурсии добавляются по желанию.",
  },
  {
    id: "faq-5",
    question: "Что делать, если нужно изменить или отменить тур?",
    answer: "Рекомендую оформлять страховку от невыезда — она покрывает отмену из-за болезни или форс-мажора. При переносе дат помогу согласовать с оператором с минимальными потерями.",
  },
];
