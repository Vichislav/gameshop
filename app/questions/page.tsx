'use server'

import Link from 'next/link'

import prisma from '@/lib/prisma'
import QuestionCard from './(components)/question-card'

async function getQuestions() {
  return prisma.question.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function Questions() {
  const questions = await getQuestions()

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100
        p-4"
    >
      <h1 className="text-center">Вопросы с собеседований</h1>

      {questions.length === 0 ? (
        <p className="mt-4 text-sm text-slate-700">Вопросов пока нет</p>
      ) : (
        <div className="mt-4 flex w-full max-w-2xl flex-col gap-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              author={question.author}
              text={question.text ?? ''}
              images={question.images}
              createdAt={question.createdAt}
              likes={question.likes}
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link href="/questions/new?type=other">
          <button
            type="button"
            className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
          >
            add
          </button>
        </Link>
      </div>
    </section>
  )
}
