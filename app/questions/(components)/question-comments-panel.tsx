'use client'

import { useState } from 'react'

import type { CommentForCard } from '../question-for-card'

import QuestionCommentCard from './question-comment-card'

/** Данные комментария в состоянии (дата с сервера или из JSON). */
export type CommentRow = {
  id: number
  text: string
  author: string
  likeList: string[]
  createdAt: Date | string
  editedAt?: Date | string | null
}

interface QuestionCommentsPanelProps {
  questionId: number
  initialComments: CommentForCard[]
  currentUserId: string | null
  /** Для прав редактирования/удаления комментариев */
  viewerAuthorLabel?: string | null
}

export default function QuestionCommentsPanel({
  questionId,
  initialComments,
  currentUserId,
  viewerAuthorLabel = null,
}: QuestionCommentsPanelProps) {
  const [listOpen, setListOpen] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [comments, setComments] = useState<CommentRow[]>(() =>
    initialComments.map((c) => ({ ...c })),
  )
  const [draft, setDraft] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const count = comments.length

  async function handleCreate() {
    const text = draft.trim()
    if (!text) {
      alert('Введите текст комментария')
      return
    }
    if (currentUserId === null) {
      alert('Войдите, чтобы оставить комментарий')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`/api/questions/${questionId}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const raw = (await res.json().catch(() => null)) as
        | CommentRow
        | { error?: string }
        | null
      if (!res.ok || !raw || typeof raw !== 'object' || !('id' in raw)) {
        throw new Error(
          raw && 'error' in raw && typeof raw.error === 'string'
            ? raw.error
            : 'Request failed',
        )
      }
      const data = raw as CommentRow
      setComments((prev) => [...prev, { ...data }])
      setDraft('')
      setComposerOpen(false)
    } catch (e) {
      console.error(e)
      alert('Не удалось создать комментарий')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-3 border-t border-slate-200 pt-3">
      <button
        type="button"
        onClick={() => setListOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
        aria-expanded={listOpen}
      >
        <span>Комментарии</span>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-800">
          {count}
        </span>
        <span className="text-slate-500" aria-hidden>
          {listOpen ? '▲' : '▼'}
        </span>
      </button>

      {listOpen && (
        <div className="mt-3 flex flex-col gap-3">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-3">
            {!composerOpen ? (
              <button
                type="button"
                onClick={() => {
                  if (currentUserId === null) {
                    alert('Войдите, чтобы оставить комментарий')
                    return
                  }
                  setComposerOpen(true)
                }}
                className="w-full rounded-md border border-indigo-400 bg-indigo-50 py-2 text-xs font-medium text-indigo-800 transition-colors hover:bg-indigo-100"
              >
                + Новый комментарий
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Текст комментария…"
                  className="w-full resize-y rounded-md border border-slate-300 p-2 text-xs text-slate-900"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => void handleCreate()}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {submitting ? 'Отправка…' : 'Создать'}
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setComposerOpen(false)
                      setDraft('')
                    }}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>

          {comments.map((c) => (
            <QuestionCommentCard
              key={c.id}
              id={c.id}
              text={c.text}
              author={c.author}
              likeList={c.likeList}
              createdAt={c.createdAt}
              editedAt={c.editedAt}
              currentUserId={currentUserId}
              canEdit={
                viewerAuthorLabel !== null && viewerAuthorLabel === c.author
              }
              onCommentUpdated={(row) => {
                setComments((prev) =>
                  prev.map((x) =>
                    x.id === row.id
                      ? {
                          ...x,
                          text: row.text,
                          likeList: row.likeList,
                          createdAt: row.createdAt,
                          editedAt: row.editedAt,
                        }
                      : x,
                  ),
                )
              }}
              onCommentDeleted={(commentId) => {
                setComments((prev) => prev.filter((x) => x.id !== commentId))
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
