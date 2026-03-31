import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Документация | JS study',
  description:
    'Назначение сайта, карта разделов, авторизация и технологический стек',
}

export default function DocsPage() {
  return (
    <article
      className="mx-auto flex min-h-[calc(100vh-116px)] w-full max-w-3xl flex-col gap-8 bg-gradient-to-tr from-slate-300 to-slate-100 px-4 py-8 text-slate-900"
    >
      <header className="space-y-2">
        <h1 className="text-center text-xl font-semibold md:text-2xl">
          Информация о сайте JS study
        </h1>
      </header>

      <section className="space-y-3 rounded-lg border border-slate-400/40 bg-white/80 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Карта разделов</h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed">
          <li>
            <strong>Главная</strong> (<code className="rounded bg-slate-200 px-1">/</code>) —
            обзор и переходы в разделы.
          </li>
          <li>
            <strong>Задачи</strong> (<code className="rounded bg-slate-200 px-1">/tasks</code>,
            подстраницы operators и eventloop) — краткая теория и практические задания.
          </li>
          <li>
            <strong>Вопросы</strong> (<code className="rounded bg-slate-200 px-1">/questions</code>,
            вкладки HR / Technical) — списки вопросов из базы; добавление нового вопроса:{' '}
            <code className="rounded bg-slate-200 px-1">/questions/new</code> (тип можно задать
            параметром <code className="rounded bg-slate-200 px-1">?type=</code>).
          </li>
          <li>
            <strong>Посты и авторы (демо)</strong> —{' '}
            <code className="rounded bg-slate-200 px-1">/posts</code>,{' '}
            <code className="rounded bg-slate-200 px-1">/author/[id]</code> — данные с публичного
            API JSONPlaceholder, не связаны с вашей учётной записью на сайте.
          </li>
          <li>
            <strong>Профиль</strong> (<code className="rounded bg-slate-200 px-1">
              /profile/[userId]
            </code>
            ) — данные пользователя из приложения после входа.
          </li>
          <li>
            <strong>Об авторе</strong> — отдельная страница{' '}
            <Link href="/about" className="font-medium text-indigo-700 underline">
              /about
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3 rounded-lg border border-slate-400/40 bg-white/80 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">
          Учётная запись и безопасность
        </h2>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed">
          <li>
            Вход по коду на email: отправка кода и проверка через API (серверные маршруты{' '}
            <code className="rounded bg-slate-200 px-1">/api/auth/send-code</code> и{' '}
            <code className="rounded bg-slate-200 px-1">/api/auth/verify-code</code>).
          </li>
          <li>
            После успешной проверки выдаётся JWT; проверка на сервере выполняется библиотекой{' '}
            <strong>jsonwebtoken</strong>, токен передаётся в cookie (чтение через{' '}
            <code className="rounded bg-slate-200 px-1">next/headers</code>).
          </li>
          <li>
            Создание вопросов, лайки, комментарии и профиль рассчитаны на работу с авторизованным
            пользователем; сценарии зависят от UI конкретных страниц.
          </li>
        </ul>
      </section>

      <section className="space-y-3 rounded-lg border border-slate-400/40 bg-white/80 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Раздел «Вопросы»</h2>
        <p className="text-sm leading-relaxed">
          Вопросы хранятся в базе <strong>PostgreSQL</strong>, доступ через ORM{' '}
          <strong>Prisma</strong> (клиент и миграции в репозитории). Типы вопросов: technical, hr,
          other. Серверные страницы списков настроены на актуальные данные при запросе.
        </p>
      </section>

      <section className="space-y-4 rounded-lg border border-slate-400/40 bg-white/80 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Технологический стек</h2>
        <dl className="space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-medium text-slate-800">Frontend</dt>
            <dd className="mt-1 pl-0 text-slate-700">
              Next.js 14.2 (App Router), React 18, TypeScript 5; стили — Tailwind CSS 3.4 + PostCSS;
              оптимизация изображений и шрифтов — встроенные{' '}
              <code className="rounded bg-slate-200 px-1">next/image</code>,{' '}
              <code className="rounded bg-slate-200 px-1">next/font</code>.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-800">Состояние в браузере</dt>
            <dd className="mt-1 text-slate-700">
              Redux Toolkit 2.2 и react-redux 9 (глобальное состояние через провайдер в корне
              приложения).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-800">Backend в рамках Next.js</dt>
            <dd className="mt-1 text-slate-700">
              Route Handlers в <code className="rounded bg-slate-200 px-1">app/api/.../route.ts</code>{' '}
              — вопросы, лайки, комментарии, профиль, авторизация.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-800">База данных</dt>
            <dd className="mt-1 text-slate-700">
              PostgreSQL; подключение и схема через Prisma 5.22 (
              <code className="rounded bg-slate-200 px-1">@prisma/client</code>). Конкретная версия
              СУБД задаётся окружением (хостинг, Docker и т.д.).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-800">Авторизация и почта</dt>
            <dd className="mt-1 text-slate-700">
              JWT — пакет <strong>jsonwebtoken</strong> ^9; отправка писем с кодом —{' '}
              <strong>nodemailer</strong> ^8 (настройки SMTP через переменные окружения на сервере).
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-800">Утилиты и качество кода</dt>
            <dd className="mt-1 text-slate-700">
              clsx для условных классов; ESLint (в т.ч. eslint-config-next), Prettier 3.8.
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-2 rounded-lg border border-dashed border-slate-400/60 bg-slate-100/50 p-4 text-sm text-slate-600">
        <p>
          Внутренние секреты (ключи JWT, строка подключения к БД, SMTP) в документации не
          публикуются и задаются только в окружении сервера.
        </p>
      </section>
    </article>
  )
}
