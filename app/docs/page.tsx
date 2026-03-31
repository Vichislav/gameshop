import type { Metadata } from 'next'
import Link from 'next/link'
import ContactDeveloperTrigger from './ContactDeveloperTrigger'

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
              СУБД задаётся окружением (хостинг).
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

      <section className="space-y-2 rounded-lg border border-dashed border-slate-400/60 bg-slate-100/50 p-4 text-sm text-slate-600">
        <p className="mb-2">Информация о разработчике сайта:</p>
        <ul className="list-inside list-disc space-y-2 pl-1">
          <li>имя: Вячеслав</li>
          <li>
            Email: <ContactDeveloperTrigger />
          </li>
          <li>
            GitHub:{' '}
            <a
              href="https://github.com/Vichislav"
              className="font-medium text-indigo-700 underline"
            >
              Vichislav
            </a>
          </li>
          <li>
            hh.ru:{' '}
            <a
              href="https://omsk.hh.ru/resume/18965610ff0e34064e0039ed1f635974323168"
              className="font-medium text-indigo-700 underline"
            >
              Frontend-разработчик
            </a>
          </li>
        </ul>
      </section>
    </article>
  )
}
