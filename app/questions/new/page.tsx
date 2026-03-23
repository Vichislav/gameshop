'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import QuestionForm from '../(components)/question-form'

const typeTitles: Record<string, string> = {
  technical: 'Создание технического вопроса',
  hr: 'Создание HR вопроса',
  other: 'Создание вопроса',
}

function NewQuestionForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false)

  const type = searchParams.get('type') ?? 'other'
  const title = typeTitles[type] ?? typeTitles.other
  const listPath = type === 'other' ? '/questions' : `/questions/${type}`

  async function handleSubmit(values: {
    author: string
    text: string
    files: File[]
    answerText?: string
    answerFiles?: File[]
  }) {
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.set('type', type)
      formData.set('author', values.author)
      formData.set('text', values.text)
      if (values.answerText?.trim()) {
        formData.set('answerText', values.answerText.trim())
      }
      values.files.forEach((file) => formData.append('images', file))
      values.answerFiles?.forEach((file) => formData.append('answerImages', file))

      const res = await fetch('/api/questions', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data?.error as string) ?? 'Не удалось создать вопрос')
      }

      router.push(listPath)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100
        p-4"
    >
      <h1 className="text-center">{title}</h1>

      <QuestionForm
        mode="create"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={() => router.push(listPath)}
      />
    </section>
  )
}

export default function NewQuestionPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center p-4">Загрузка...</div>}>
      <NewQuestionForm />
    </Suspense>
  )
}

