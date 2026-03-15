'use server'

import prisma from '@/lib/prisma'
import AddQuestionButton from '../(components)/add-question-button'
import QuestionCard from '../(components)/question-card'

async function getTechnicalQuestions() {
  return prisma.question.findMany({
    where: { type: 'technical' },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function Technical() {
  const questions = await getTechnicalQuestions()

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100
        p-4"
    >
      <h1 className="text-center">Технические вопросы</h1>

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
              answerText={question.answerText}
              answerImages={question.answerImages}
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <AddQuestionButton questionType="technical" />
      </div>
    </section>
  )
}
