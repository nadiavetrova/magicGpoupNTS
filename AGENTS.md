<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.

Read the relevant guide in `node_modules/next/dist/docs/` before writing code.

Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Agent Rules

Всегда отвечай на русском языке.

Перед изменением кода:

1. Кратко объясни план изменений.
2. Перечисли файлы, которые будут изменены.
3. Не начинай крупный рефакторинг без подтверждения.

Работа с кодом:

* Анализируй существующую архитектуру проекта.
* Переиспользуй существующие компоненты.
* Используй shadcn/ui прежде чем создавать новый компонент.
* Используй Tailwind CSS вместо больших CSS-файлов.
* Не добавляй большие блоки в globals.css.
* Следуй существующим паттернам проекта.

Работа с Next.js:

* Учитывай особенности Next.js 16.
* Используй App Router.
* Используй Server Components там, где это оправдано.
* Не используй устаревшие API.

Качество кода:

* TypeScript без any.
* Понятные имена компонентов и функций.
* Разделяй большие компоненты на небольшие.
* Соблюдай mobile-first подход.
* Не оставляй неиспользуемый код.

Дизайн:

* Стиль Apple, Airbnb, Stripe, Linear.
* Современный premium UI.
* Качественная типографика.
* Большие отступы.
* Плавные анимации через Motion.
* Высокая визуальная консистентность.

При выполнении задач сначала оцени текущее решение, затем предложи улучшения.
