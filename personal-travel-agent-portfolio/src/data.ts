/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Advantage {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

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

export interface Excursion {
  id: string;
  title: string;
  image: string;
  description: string;
  cost: string;
  duration: string;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  tour: string;
  comment: string;
}

export interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Representative info
export const representative = {
  name: "Мария Воронцова",
  title: "Персональный тревел-эксперт & дизайнер путешествий",
  bio: "Я помогаю людям организовывать идеальные путешествия уже более 5 лет. Подбираю лучшие направления, проверенные отели и интересные экскурсии. Каждая деталь вашей поездки планируется с заботой об уюте и ярких эмоциях — от VIP-трансферов до уединенных панорамных террас.",
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", // Premium business travel portrait
  stats: [
    { label: "Туристов", value: "1000+" },
    { label: "Стран", value: "50+" },
    { label: "Опыта", value: "5 лет" },
    { label: "Отзывов 5*", value: "98%" }
  ]
};

// Advantages Data
export const advantages: Advantage[] = [
  {
    id: "adv-1",
    title: "Индивидуальный подбор",
    subtitle: "Составляю программу под ваш темп, интересы, особые требования и семейные пожелания.",
    iconName: "Compass"
  },
  {
    id: "adv-2",
    title: "Лучшие цены от туроператоров",
    subtitle: "Эксклюзивный доступ к тарифам крупных партнеров и закрытым распродажам пятизвездочных отелей.",
    iconName: "BadgePercent"
  },
  {
    id: "adv-3",
    title: "Поддержка 24/7",
    subtitle: "Я всегда на связи на протяжении всего пути. Помогу с любым экстренным вопросом или изменением в планах.",
    iconName: "PhoneCall"
  },
  {
    id: "adv-4",
    title: "Проверенные экскурсии",
    subtitle: "Рекомендую только аккредитованных гидов и интересные авторские маршруты, пройденные мною лично.",
    iconName: "Map"
  },
  {
    id: "adv-5",
    title: "Безопасная оплата",
    subtitle: "Официальный договор, фискальные чеки, мгновенное зачисление и возможность рассрочки.",
    iconName: "ShieldCheck"
  },
  {
    id: "adv-6",
    title: "Экспертные рекомендации",
    subtitle: "Поделюсь тайными ресторанчиками, лучшими видовыми точками и подскажу лайфхаки экономии.",
    iconName: "Sparkles"
  }
];

// Popular Destinations
export const destinations: Destination[] = [
  {
    id: "dest-bali",
    name: "Бали, Индонезия",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    price: "от 125 000 ₽",
    tags: ["Экзотика", "Релакс", "Океан"],
    days: "9 ночей",
    description: "Райский остров духов, бескрайних рисовых террас Ubud, песчаных пляжей Uluwatu и атмосферных океанских закатов."
  },
  {
    id: "dest-turkey",
    name: "Каппадокия, Турция",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    price: "от 65 000 ₽",
    tags: ["Романтика", "Экскурсии", "Balloons"],
    days: "7 ночей",
    description: "Космические ландшафты, подземные города, пещерные отели премиум-класса и утреннее небо в сотнях воздушных шаров."
  },
  {
    id: "dest-thailand",
    name: "Пхукет, Таиланд",
    image: "https://images.unsplash.com/photo-1528181304800-2f1258bb9f35?auto=format&fit=crop&w=1200&q=80",
    price: "от 95 000 ₽",
    tags: ["Тропики", "Пляж", "Фрукты"],
    days: "10 ночей",
    description: "Бирюзовые лагуны Андаманского моря, пышная зелень джунглей, свежайшие морепродукты и легендарное колоритное гостеприимство."
  },
  {
    id: "dest-japan",
    name: "Киото, Япония",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    price: "от 185 000 ₽",
    tags: ["Культура", "Премиум", "Сакура"],
    days: "8 ночей",
    description: "Древние бамбуковые рощи Сагано, таинственные святилища, цветущие сады сакуры, изысканные чайные церемонии и футуризм."
  },
  {
    id: "dest-uae",
    name: "Дубай, ОАЭ",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    price: "от 78 000 ₽",
    tags: ["Luxury", "Шопинг", "Небоскребы"],
    days: "6 ночей",
    description: "Ультрасовременные отели, искусственные острова, гигантские шопинг-моллы, сафари на джипах по пустыне и пляжи Персидского залива."
  },
  {
    id: "dest-italy",
    name: "Амальфи, Италия",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    price: "от 140 000 ₽",
    tags: ["Эстетика", "Гастрономия", "Европа"],
    days: "7 ночей",
    description: "Живописные разноцветные домики, прилепившиеся к скалам, панорамные серпантины, ароматные лимонные рощи и неспешная dolce vita."
  }
];

// Hot Tours
export const hotTours: HotTour[] = [
  {
    id: "hot-1",
    title: "Rixos Premium Saadiyat Island",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80",
    discount: 35,
    originalPrice: "340 000 ₽",
    price: "220 000 ₽",
    departureDate: "15 июня",
    duration: "7 дней / 6 ночей",
    hotelStars: 5
  },
  {
    id: "hot-2",
    title: "Ayada Maldives Luxury Resort",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    discount: 40,
    originalPrice: "560 000 ₽",
    price: "336 000 ₽",
    departureDate: "18 июня",
    duration: "9 дней / 8 ночей",
    hotelStars: 5
  },
  {
    id: "hot-3",
    title: "The Land of Legends Kingdom Hotel",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    discount: 25,
    originalPrice: "180 000 ₽",
    price: "135 000 ₽",
    departureDate: "14 июня",
    duration: "8 дней / 7 ночей",
    hotelStars: 5
  }
];

// Author Excursions
export const excursions: Excursion[] = [
  {
    id: "exc-1",
    title: "Секреты храмов Улувату и ужин на закате в Джимбаране",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
    description: "Завораживающий древний храм на вершине отвесной скалы, традиционный танец Кечак в лучах уходящего солнца и роскошный пир из свежих лобстеров у самой кромки прибоя.",
    cost: "9 500 ₽ / чел",
    duration: "8 часов",
    rating: 4.9
  },
  {
    id: "exc-2",
    title: "Прогулка на приватной яхте вдоль побережья Амальфи",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80",
    description: "Индивидуальный круиз на скоростном катере Riva из Позитано в Капри. Купание в лазурных гротах, свежее Prosecco с фруктами на борту и лучшие ракурсы для премиальных фотосессий.",
    cost: "18 000 ₽ / чел",
    duration: "6 часов",
    rating: 5.0
  },
  {
    id: "exc-3",
    title: "Гастрономический тур по улочкам старого Киото",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    description: "Исследуйте аутентичные таверны в историческом квартале Гион, загляните в закрытые лавки саке, оцените ужин в стиле кайсэки от шефа со звездой Мишлен и узнайте легенды о гейшах.",
    cost: "14 500 ₽ / чел",
    duration: "4.5 часа",
    rating: 4.85
  },
  {
    id: "exc-4",
    title: "Конный подъем по склону вулкана Батур к рассвету",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description: "Забудьте об изнурительном пешем подъеме. Комфортное VIP-восхождение на ухоженных скакунах, горячий какао на вершине и панорамный рассвет над спящим кальдерным озером.",
    cost: "11 000 ₽ / чел",
    duration: "5 часов",
    rating: 4.95
  }
];

// Why Tourists Return - Reviews
export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Александра Новикова",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Тур на Мальдивы, 9 ночей",
    comment: "Мария организовала наше свадебное путешествие просто изумительно! Пакет со скидкой 40% на пятизвездочную виллу на воде — это сказка. Все трансферы минута в минуту, роскошное меню и сюрприз от отеля по её личной просьбе. Теперь летаем только через неё!"
  },
  {
    id: "rev-2",
    name: "Дмитрий Савельев",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Каппадокия премиум, 7 ночей",
    comment: "Очень понравился индивидуальный подход. Я не хотел стандартной программы — Мария составила уникальный маршрут с лучшим пещерным люксом, забронировала нам полет в корзине первого класса на 8 человек (вместо толпы из 28) и порекомендовала потрясающие нетуристические ресторанчики."
  },
  {
    id: "rev-3",
    name: "Ирина Ковалева",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Семейный отдых в Дубае",
    comment: "Были трудности со сменой рейса из-за погоды. Я была в панике с двумя маленькими детьми на руках, но Мария решила все проблемы за 20 минут: переоформила билеты на более удобное время и согласовала поздний выезд из отеля без доплат. Это настоящая поддержка 24/7!"
  },
  {
    id: "rev-4",
    name: "Владислав и Анна",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Индивидуальный тур в Италию",
    comment: "Мария помогла воплотить мечту об Амальфийском побережье. Все отели стояли в фантастических локациях, виды захватывали дух. Аренда кабриолета, гиды, бронь столиков — все было готово заранее. Абсолютная беззаботность в пути. Огромная благодарность!"
  },
  {
    id: "rev-5",
    name: "Елизавета Петрова",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Тур в Японию, 8 ночей",
    comment: "Поездка в Токио и Киото превзошла все ожидания. Сами мы никогда бы не построили такую безупречную логистику на поездах синкансэн. Рекомендованные Марией места поразили аутентичностью. Каждая потраченная копейка оправдала себя на 200%!"
  },
  {
    id: "rev-6",
    name: "Артем Климов",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tour: "Йога-ретрит, Бали",
    comment: "Шикарно подобранная вилла в центре Убуда с видом на джунгли. Мария нашла специального проводника для духовных очищений и посоветовала уединенные пляжи, о которых не знают обычные туроператоры. Высочайший уровень профессионализма!"
  }
];

// How It Works - Timeline steps
export const timelineSteps: TimelineStep[] = [
  {
    number: 1,
    title: "Оставляете заявку",
    description: "Вы делитесь вашими мечтами о поездке, озвучиваете даты, состав путешественников и предполагаемый комфортный бюджет."
  },
  {
    number: 2,
    title: "Получаете подборку туров",
    description: "Через 2-3 часа я отправляю в Telegram/WhatsApp 3 ювелирно подобранных концепции с детальным разбором плюсов каждого отеля."
  },
  {
    number: 3,
    title: "Выбираете идеальный вариант",
    description: "Мы дорабатываем мелкие детали, подписываем официальный удаленный договор, и вы оплачиваете тур удобным и безопасным способом."
  },
  {
    number: 4,
    title: "Отправляетесь в путешествие",
    description: "Я готовлю полный пакет документов, высылаю чек-лист подготовки, круглосуточно курирую полет и заселение. Вам остается только отдыхать!"
  }
];

// FAQ Items
export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Как происходит процесс выбора и бронирования?",
    answer: "Сначала мы проводим короткую консультацию онлайн, где я собираю ваши пожелания по климату, отелю, питанию и бюджету. Затем я готовлю подборку туров с ценами, фото и особенностями. Когда идеальный вариант найден, мы заключаем договор (все полностью официально, имеем все гос. лицензии туроператоров), вы совершаете безопасную оплату, после чего я выставляю подтверждение бронирования авиабилетов и ваучера."
  },
  {
    id: "faq-2",
    question: "Можно ли оплатить поездку частями или оформить рассрочку?",
    answer: "Да, конечно. Для многих предложений раннего бронирования действует гибкая рассрочка: предоплата составляет всего 10-30%, а остаток вносится за 2-3 недели до даты вылета. Также я сотрудничаю с надежными финансовыми партнерами, предоставляющими рассрочку без процентов на 4-6 месяцев."
  },
  {
    id: "faq-3",
    question: "Какие документы необходимы для бронирования зарубежного тура?",
    answer: "Базово требуются фотографии или сканы загранпаспортов всех вылетающих гостей со сроком действия не менее 6 месяцев на момент окончания тура. В зависимости от выбранного направления я полностью беру на себя подготовку документов для визы, въездных анкет, медицинских страховок и деклараций здоровья."
  },
  {
    id: "faq-4",
    question: "Что конкретно входит в стоимость тура?",
    answer: "Обычно стандартный пакет включает в себя: авиаперелет туда-обратно (авторизованные чартеры или регулярные рейсы), групповой или премиальный трансфер аэропорт-отель-аэропорт, проживание в отеле с выбранным типом питания (от завтраков до «Ультра Всё Включено»), а также медицинскую страховку на весь срок поездки. Индивидуальные экскурсии и VIP-залы в аэропортах можно подключить по вашему желанию."
  },
  {
    id: "faq-5",
    question: "Что делать, если у меня изменятся даты или мне придется отменить поездку?",
    answer: "Если вы переживаете о возможных форс-мажорах, я настоятельно советую подключать страховку от невыезда по минимальному тарифу — она покроет расходы на вынужденную отмену из-за болезни или визовых задержек. В случае добровольного переноса дат мы оперативно согласуем новые даты с авиакомпанией и отелем с минимизацией возможных штрафов и переплат."
  }
];

// Figma Layer tree helper info for the Dev Mode Inspector
export const figmaLayerTree = [
  {
    id: "navbar",
    name: "❖ Frame: Navbar & Branding",
    type: "Component / Autolayout",
    desc: "Header with brand logo, quick anchors, dynamic 'Figma Mode' toggle button, and primary interactive CTA button."
  },
  {
    id: "hero",
    name: "❖ Section: Hero Container",
    type: "Section Layout (1440px / Responsive)",
    desc: "Main presentation area with large typography, social proof stars, interactive slider indicators, and a dual-photo card with responsive parallax."
  },
  {
    id: "advantages",
    name: "❖ Section: Brand Advantages Grid",
    type: "Auto-layout grid (3-Columns)",
    desc: "Feature cards highlighting personalized booking, 24/7 support, safe gateway, and verified excursion programs. Leverages Glassmorphism."
  },
  {
    id: "about",
    name: "❖ Section: Biography & Expert Credentials",
    type: "2-Column Split Component",
    desc: "Biography block of Maria Vorontsova (5+ years experience) featuring a grid of numerical variable counters with elegant dark backgrounds."
  },
  {
    id: "destinations",
    name: "❖ Section: Popular Destinations Showcase",
    type: "Dynamic Card Gallery (6 Items)",
    desc: "High-resolution travel grid with tag arrays, minimal prices, zoom-on-hover scale animations, and detailed individual info modal previews."
  },
  {
    id: "hot",
    name: "❖ Section: Trending Hot Deals",
    type: "Grid / High-Conversion Target",
    desc: "Promotional section with direct percentage discount badges, countdown-themed elements, and simulator for outward booking."
  },
  {
    id: "excursions",
    name: "❖ Section: Custom Excursion Slider",
    type: "Horizontal Frame / Scroll Container",
    desc: "Smooth sliding cards focusing on VIP experiences such as boat tours, food trails, and horse-riding sunrise climbs."
  },
  {
    id: "reviews",
    name: "❖ Section: Testimonials Masonry",
    type: "Pinterest CSS Masonry Gallery",
    desc: "6 organic customer satisfaction cards complete with 5-star rating vectors, direct trip metadata, and real avatar assets."
  },
  {
    id: "howitworks",
    name: "❖ Section: Operational Flow Timeline",
    type: "Line Node Navigation (4 Phases)",
    desc: "Interactive step-by-step progress tracking illustrating the proposal, selection, and departure pipeline."
  },
  {
    id: "faq",
    name: "❖ Section: Accordion Help Center",
    type: "Dynamic Collapsible List",
    desc: "Stateful FAQ list with micro-animations managing rotation indicators and smooth height expansions."
  },
  {
    id: "cta",
    name: "❖ Section: Bottom Final Conversion CTA",
    type: "Media-Overlay Cover Panel",
    desc: "Immersive action board using premium visual travel media overlay, high-contrast title, and dual active triggers."
  },
  {
    id: "footer",
    name: "❖ Frame: Global Footer",
    type: "Component Footer (4-Columns)",
    desc: "Standard copyright information, structured sitemap links, instant messenger shortcut anchors, and compliance disclaimers."
  }
];
