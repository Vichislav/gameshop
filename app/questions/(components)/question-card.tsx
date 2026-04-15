'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import type { CommentForCard } from '../question-for-card'

import Modal from '@/app/component/Modal'
import QuestionForm, {
  type QuestionFormValues,
} from '@/app/questions/(components)/question-form'

import QuestionCardAnswer from './question-card-answer'
import QuestionCommentsPanel from './question-comments-panel'
import QuestionLikeButton from './question-like-button'

import { formatDateRu } from '@/lib/date-display-ru'

const commentBtnClass =
  'inline-flex items-center justify-center rounded-md border border-indigo-400 bg-indigo-50 px-2 py-1.5 text-xs font-medium text-indigo-800 transition-colors hover:bg-indigo-100'

type QuestionType = 'technical' | 'hr' | 'other'

interface QuestionCardProps {
  author: string
  /** Если задан — имя автора ведёт на /profile/[id]. */
  authorUserId?: number | null
  text: string
  images?: string[]
  createdAt?: Date | string
  /** Только после PATCH правки вопроса; лайки не меняют. */
  editedAt?: Date | string | null
  questionType?: QuestionType
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
  /** Текущий пользователь — автор вопроса */
  canEdit?: boolean
  /** Строка автора текущего пользователя (для прав на комментарии) */
  viewerAuthorLabel?: string | null
}

export default function QuestionCard({
  author,
  authorUserId = null,
  text,
  images = [],
  createdAt,
  editedAt,
  questionType = 'other',
  questionId,
  likeList,
  currentUserId = null,
  likes,
  answerText,
  answerImages = [],
  comments,
  footerSlot,
  canEdit = false,
  viewerAuthorLabel = null,
}: QuestionCardProps) {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const dateLine = useMemo(() => {
    if (!createdAt) return null
    if (editedAt) {
      return `${formatDateRu(editedAt)} ред.`
    }
    return formatDateRu(createdAt)
  }, [createdAt, editedAt])

  const handlePatch = useCallback(
    async (values: QuestionFormValues) => {
      if (questionId === undefined) return
      setSubmitting(true)
      try {
        const fd = new FormData()
        fd.set('text', values.text)
        fd.set('answerText', values.answerText?.trim() ?? '')
        if (values.questionType) {
          fd.set('type', values.questionType)
        }
        fd.set('keepImageUrls', JSON.stringify(values.keepImageUrls ?? []))
        fd.set(
          'keepAnswerImageUrls',
          JSON.stringify(values.keepAnswerImageUrls ?? []),
        )
        values.files.forEach((f) => fd.append('images', f))
        values.answerFiles?.forEach((f) => fd.append('answerImages', f))

        const res = await fetch(`/api/questions/${questionId}`, {
          method: 'PATCH',
          credentials: 'include',
          body: fd,
        })
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          alert(data.error ?? 'Не удалось сохранить')
          return
        }
        setEditOpen(false)
        router.refresh()
      } finally {
        setSubmitting(false)
      }
    },
    [questionId, router],
  )

  const handleDelete = useCallback(async () => {
    if (questionId === undefined) return
    if (!confirm('Удалить этот вопрос?')) return
    const res = await fetch(`/api/questions/${questionId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      alert(data.error ?? 'Не удалось удалить')
      return
    }
    router.refresh()
  }, [questionId, router])

  const editActions =
    canEdit && questionId !== undefined ? (
      <>
        <button
          type="button"
          className={commentBtnClass}
          onClick={() => void handleDelete()}
          aria-label="Удалить вопрос"
        >
          &#10006;
        </button>
        <button
          type="button"
          className={commentBtnClass}
          onClick={() => setEditOpen(true)}
          aria-label="Редактировать вопрос"
        >
          &#9998;
        </button>
      </>
    ) : null

  return (
    <>
      <article className="w-full max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
        <header className="mb-2 flex items-center justify-between gap-3">
          <div>
            {authorUserId != null && authorUserId > 0 ? (
              <Link
                href={`/profile/${authorUserId}`}
                className="text-sm font-semibold text-slate-900 no-underline hover:text-cyan-700"
              >
                {author}
              </Link>
            ) : (
              <p className="text-sm font-semibold text-slate-900">{author}</p>
            )}
            {dateLine && (
              <p className="text-xs text-slate-500">{dateLine}</p>
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

        <QuestionCardAnswer
          answerText={answerText}
          answerImages={answerImages}
          endActions={editActions}
        />

        {questionId !== undefined && comments !== undefined && (
          <QuestionCommentsPanel
            questionId={questionId}
            initialComments={comments}
            currentUserId={currentUserId}
            viewerAuthorLabel={viewerAuthorLabel}
          />
        )}

        {footerSlot && (
          <footer className="mt-2 flex items-center justify-between">
            {footerSlot}
          </footer>
        )}
      </article>

      {questionId !== undefined && (
        <Modal tall isOpen={editOpen} onClose={() => setEditOpen(false)}>
          <div className="min-h-0 w-full">
            <QuestionForm
              key={questionId}
              mode="edit"
              isSubmitting={submitting}
              initialData={{
                author,
                text,
                images,
                answerText: answerText ?? undefined,
                answerImages,
                questionType,
              }}
              onSubmit={handlePatch}
              onCancel={() => setEditOpen(false)}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
