'use client'

import { useState, type ReactNode } from 'react'

interface QuestionCardAnswerProps {
  answerText?: string | null
  answerImages?: string[]
  /** Кнопки справа на одной линии с «ответ» (удалить, редактировать) */
  endActions?: ReactNode
}

export default function QuestionCardAnswer({
  answerText,
  answerImages = [],
  endActions,
}: QuestionCardAnswerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hasAnswer = (answerText?.trim()?.length ?? 0) > 0 || answerImages.length > 0

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-fit shrink-0 rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            ответ
          </button>
          <span
            className="shrink-0 text-base font-medium leading-none text-slate-600"
            title={hasAnswer ? 'Есть ответ' : 'Ответа нет'}
            aria-label={hasAnswer ? 'Есть ответ' : 'Ответа нет'}
          >
            {hasAnswer ? '✓' : '—'}
          </span>
        </div>
        {endActions ? (
          <div className="flex shrink-0 items-center gap-2">{endActions}</div>
        ) : null}
      </div>

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
