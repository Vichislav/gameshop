'use client'

import { useState } from 'react'

interface QuestionCardAnswerProps {
  answerText?: string | null
  answerImages?: string[]
}

export default function QuestionCardAnswer({
  answerText,
  answerImages = [],
}: QuestionCardAnswerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasAnswer = (answerText?.trim()?.length ?? 0) > 0 || answerImages.length > 0

  return (
    <div className="mt-2 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-fit rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        ответ
      </button>

      {isOpen && (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
          {!hasAnswer ? (
            <p className="text-slate-500">Ответа пока нет.</p>
          ) : (
            <>
              {answerText?.trim() && (
                <p className="mb-3 whitespace-pre-line text-slate-900">
                  {answerText.trim()}
                </p>
              )}
              {answerImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {answerImages.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="relative h-24 w-full overflow-hidden rounded-md border border-slate-200 bg-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Answer image ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
