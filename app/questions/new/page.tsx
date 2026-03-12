/* eslint-disable no-console */
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import QuestionForm from '../(components)/question-form'

const typeTitles: Record<string, string> = {
  technical: 'Создание технического вопроса',
  hr: 'Создание HR вопроса',
  other: 'Создание вопроса',
}

export default function NewQuestionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const type = searchParams.get('type') ?? 'other'
  const title = typeTitles[type] ?? typeTitles.other

  async function handleSubmit(values: {
    author: string
    text: string
    files: File[]
  }) {
    console.log('Submit question (not implemented yet)', {
      type,
      ...values,
    })
    router.back()
  }

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100
        p-4"
    >
      <h1 className="text-center">{title}</h1>

      <QuestionForm mode="create" onSubmit={handleSubmit} />
    </section>
  )
}

