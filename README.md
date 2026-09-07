# BABIE LETO FEST 2026 — продажа билетов

Лендинг фестиваля с покупкой билетов через Stripe Checkout.
12 сентября 2026 · Holdudvar, Margitsziget, Budapest · валюта HUF (Ft).

Next.js (App Router) + TypeScript + Tailwind. Отдельного backend-сервера нет:
единственный API — Route Handler `app/api/checkout/route.ts`.
Аккаунтов, авторизации, QR-кодов и своей базы билетов нет — заказ живёт
в metadata Stripe Checkout Session, чек покупателю отправляет сам Stripe.

## Запуск локально

```bash
npm install
```

Скопируйте `.env.example` в `.env.local` и впишите свой Stripe test key:

```bash
cp .env.example .env.local
```

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
npm run dev
```

Откройте http://localhost:3000

Сборка продакшена — `npm run build`, запуск собранного — `npm start`.

## Настройка Stripe

1. Зарегистрируйтесь на https://dashboard.stripe.com и включите **Test mode**.
2. Developers → API keys → скопируйте **Secret key** (`sk_test_...`).
   Публичный ключ не нужен: форма карты не своя, покупатель уходит на
   страницу Stripe Checkout.
3. Положите ключ в `.env.local` (локально) и в Environment Variables Vercel
   (продакшен). В код и в git ключ не попадает: `.env*` в `.gitignore`,
   переменная читается только на сервере в `lib/stripe.ts`.
4. Чтобы Stripe сам слал покупателю чек, включите
   **Settings → Payments → Customer emails → Successful payments**.
   Email покупателя уходит в сессию как `customer_email`, так что чек
   придёт на указанный в форме адрес. Своего email-сервиса в проекте нет.
5. Для приёма HUF убедитесь, что валюта включена в вашем аккаунте Stripe.
6. Тестовая карта: `4242 4242 4242 4242`, любой будущий срок, любой CVC.

После оплаты Stripe возвращает покупателя на `/success`, при отмене — на `/cancel`.

## Vercel Environment Variables

Project → Settings → Environment Variables:

| Переменная             | Значение                          | Окружение                        |
| ---------------------- | --------------------------------- | -------------------------------- |
| `STRIPE_SECRET_KEY`    | `sk_live_...` (или `sk_test_...`) | Production / Preview / Development |
| `NEXT_PUBLIC_SITE_URL` | `https://ваш-домен.vercel.app`    | Production / Preview / Development |

`NEXT_PUBLIC_SITE_URL` обязателен: из него строятся `success_url` и
`cancel_url`. Если указать неверный домен, после оплаты покупателя
перебросит не туда. Для Preview удобно держать отдельное значение.

`STRIPE_SECRET_KEY` — только серверная переменная, без префикса
`NEXT_PUBLIC_`. Никогда не добавляйте к ней этот префикс: он делает
переменную публичной и утечёт в браузер.

## Деплой на Vercel

```bash
npm i -g vercel
vercel
```

Либо через сайт: New Project → импорт репозитория → framework Next.js
определится сам → добавьте переменные окружения выше → Deploy.

После первого деплоя пропишите реальный домен в `NEXT_PUBLIC_SITE_URL`
и сделайте redeploy, чтобы редиректы Stripe вели на боевой сайт.
Когда будете переключаться на приём реальных платежей, замените
`sk_test_...` на `sk_live_...` и выключите Test mode в Stripe.

## Что где менять

Вся изменяемая часть — в `config/`, править UI и логику не нужно:

- **`config/tickets.ts`** — типы билетов, цены (в Ft), сколько участников
  проходит по одному билету (`participants: 2` у парного), тексты, `notice`
  (например, про студенческий билет), `isActive`, максимум билетов в заказе.
- **`config/activities.ts`** — активности: время, описание, `capacity`,
  `remainingPlaces`, `isActive`, для кого доступна
  (`adultAllowed` / `childAllowed` / `studentAllowed`), возрастные рамки
  (`minimumAge` / `maximumAge`, `null` — без ограничения) и
  `requiresSwimmingInfo`. Там же список уровней плавания.
- **`config/festival.ts`** — название, дата, площадка, валюта, формат цены.
- **`app/globals.css`** — палитра и радиусы в CSS-переменных (`:root`).

Правила, которые работают сами по этим данным:

- показываются только `isActive: true`;
- после выбора билета остаются только подходящие по аудитории активности;
- `remainingPlaces <= 0` → карточка неактивна, выбрать нельзя;
- билет «одна активность» требует ровно одной активности,
  «весь день» — активности необязательны;
- поля про плавание (возраст, уровень, медицинские ограничения) появляются
  только из-за флага `requiresSwimmingInfo`, а не по названию активности;
- у детского билета дополнительно спрашиваются имя и возраст ребёнка
  и контакты родителя / сопровождающего;
- у парного билета — данные обоих участников.

## Структура

```txt
app/
  page.tsx              лендинг
  layout.tsx
  globals.css           CSS-переменные и базовые стили
  success/page.tsx      после оплаты
  cancel/page.tsx       оплата отменена
  api/checkout/route.ts создание Stripe Checkout Session

components/
  Hero.tsx
  BookingForm.tsx       состояние заказа и все шаги
  TicketCard.tsx
  ActivityCard.tsx
  Summary.tsx           итог: сайдбар на desktop, панель снизу на mobile
  Field.tsx             инпуты формы

config/
  festival.ts
  tickets.ts
  activities.ts

lib/
  order.ts              расчёт суммы и валидация (клиент + сервер)
  stripe.ts             Stripe-клиент, сумма в минорных единицах HUF
```

Валидация в `lib/order.ts` одна на всех: на клиенте она блокирует кнопку
«Перейти к оплате», на сервере — отказывает в создании сессии. Запрос
к API не доверяет клиенту и проверяет всё заново, включая наличие мест
и доступность активности для типа билета.

Суммы в HUF уходят в Stripe в минорных единицах (× 100) — так требует API.
