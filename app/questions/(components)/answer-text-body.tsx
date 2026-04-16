'use client'

import {
  answerTextHasImageMarkers,
  getUnusedImageIndices,
  getUsedImageSlotNumbers,
  parseAnswerTextWithImageSlots,
} from '@/lib/answer-image-placeholders'

interface AnswerTextBodyProps {
  answerText: string
  answerImages: string[]
}

function InlineImage({ url, label }: { url: string; label: string }) {
  return (
    <div className="relative my-2 w-full max-w-md overflow-hidden rounded-md bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={label}
        className="max-h-72 w-full object-contain"
        loading="lazy"
      />
    </div>
  )
}

export default function AnswerTextBody({
  answerText,
  answerImages,
}: AnswerTextBodyProps) {
  const trimmed = answerText.trim()
  if (!trimmed) return null

  if (!answerTextHasImageMarkers(trimmed)) {
    return (
      <p className="mb-3 whitespace-pre-line text-slate-900">{trimmed}</p>
    )
  }

  const parts = parseAnswerTextWithImageSlots(trimmed)
  const usedSlots = getUsedImageSlotNumbers(trimmed)
  const unusedIndices = getUnusedImageIndices(answerImages.length, usedSlots)

  return (
    <div className="mb-3 text-slate-900">
      <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
        {parts.map((part, i) => {
          if (part.type === 'text') {
            return <span key={`t-${i}`}>{part.text}</span>
          }
          const url = answerImages[part.n - 1]
          if (!url) {
            return (
              <span
                key={`s-${i}`}
                className="inline-block rounded bg-amber-100 px-1 text-amber-900"
                title={`Нет картинки для [[img:${part.n}]]`}
              >
                {`[[img:${part.n}]]`}
              </span>
            )
          }
          return (
            <span key={`s-${i}`} className="block w-full max-w-full">
              <InlineImage url={url} label={`Ответ, фото ${part.n}`} />
            </span>
          )
        })}
      </div>
      {unusedIndices.length > 0 && (
        <div className="mt-3 border-t border-dashed border-slate-200 pt-3">
          <p className="mb-2 text-xs text-slate-500">
            Изображения без метки в тексте:
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {unusedIndices.map((idx) => (
              <div
                key={`unused-${idx}-${answerImages[idx]}`}
                className="flex h-24 w-full min-w-0 items-center justify-center overflow-hidden rounded-md bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={answerImages[idx]}
                  alt={`Answer image ${idx + 1}`}
                  className="h-24 w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
