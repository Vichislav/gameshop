import type { CommentForCard } from '../question-for-card'

import QuestionCardAnswer from './question-card-answer'
import QuestionCommentsPanel from './question-comments-panel'
import QuestionLikeButton from './question-like-button'

interface QuestionCardProps {
  author: string
  text: string
  images?: string[]
  createdAt?: Date | string
  /** Лайки: кнопка с likeList (предпочтительно) */
  questionId?: number
  likeList?: string[]
  currentUserId?: string | null
  /** Статичный счётчик, если нет questionId/likeList */
  likes?: number
  answerText?: string | null
  answerImages?: string[]
  /** Комментарии к вопросу (длина массива = счётчик) */
  comments?: CommentForCard[]
  footerSlot?: React.ReactNode
}

export default function QuestionCard({
  author,
  text,
  images = [],
  createdAt,
  questionId,
  likeList,
  currentUserId = null,
  likes,
  answerText,
  answerImages = [],
  comments,
  footerSlot,
}: QuestionCardProps) {
  const createdLabel = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : null

  return (
    <article className="w-full max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <header className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{author}</p>
          {createdLabel && (
            <p className="text-xs text-slate-500">{createdLabel}</p>
          )}
        </div>
        {questionId !== undefined && likeList !== undefined ? (
          <QuestionLikeButton
            questionId={questionId}
            initialLikeList={likeList}
            currentUserId={currentUserId}
          />
        ) : (
          typeof likes === 'number' && (
            <p className="text-xs font-medium text-slate-600">Likes: {likes}</p>
          )
        )}
      </header>

      <p className="mb-3 text-sm text-slate-900 whitespace-pre-line">{text}</p>

      {images.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative h-24 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Question image ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      <QuestionCardAnswer answerText={answerText} answerImages={answerImages} />

      {questionId !== undefined && comments !== undefined && (
        <QuestionCommentsPanel
          questionId={questionId}
          initialComments={comments}
          currentUserId={currentUserId}
        />
      )}

      {footerSlot && (
        <footer className="mt-2 flex items-center justify-between">
          {footerSlot}
        </footer>
      )}
    </article>
  )
}
