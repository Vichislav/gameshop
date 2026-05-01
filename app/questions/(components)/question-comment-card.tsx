'use client'

import { useEffect, useMemo, useState } from 'react'

import Modal from '@/app/component/Modal'
import ZoomImage from '@/app/component/ZoomImage'

import CommentLikeButton from './comment-like-button'

import { formatDateTimeRu } from '@/lib/date-display-ru'

const commentBtnClass =
  'inline-flex items-center justify-center rounded-md border border-indigo-400 bg-indigo-50 px-2 py-1.5 text-xs font-medium text-indigo-800 transition-colors hover:bg-indigo-100'

export interface QuestionCommentCardProps {
  id: number
  text: string
  author: string
  images?: string[]
  likeList: string[]
  createdAt: Date | string
  editedAt?: Date | string | null
  currentUserId: string | null
  canEdit?: boolean
  onCommentUpdated?: (row: {
    id: number
    text: string
    author: string
    images: string[]
    likeList: string[]
    createdAt: Date | string
    editedAt: Date | string | null
  }) => void
  onCommentDeleted?: (id: number) => void
}

export default function QuestionCommentCard({
  id,
  text,
  author,
  images = [],
  likeList,
  createdAt,
  editedAt,
  currentUserId,
  canEdit = false,
  onCommentUpdated,
  onCommentDeleted,
}: QuestionCommentCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [editText, setEditText] = useState(text)
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<
    { id: string; url: string; file?: File }[]
  >(() =>
    (images ?? []).map((url, index) => ({
      id: `existing-${index}`,
      url,
    })),
  )
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setEditText(text)
    setNewFiles([])
    setImagePreviews(
      (images ?? []).map((url, index) => ({
        id: `existing-${index}`,
        url,
      })),
    )
  }, [text])

  const dateLine = useMemo(() => {
    if (editedAt) {
      return `${formatDateTimeRu(editedAt)} ред.`
    }
    return formatDateTimeRu(createdAt)
  }, [createdAt, editedAt])

  async function handlePatch() {
    const body = editText.replace(/\r\n/g, '\n').trim()
    if (!body) {
      alert('Введите текст комментария')
      return
    }
    setSubmitting(true)
    try {
      const keepImageUrls = imagePreviews.filter((p) => !p.file).map((p) => p.url)
      const fd = new FormData()
      fd.set('text', body)
      fd.set('keepImageUrls', JSON.stringify(keepImageUrls))
      newFiles.forEach((f) => fd.append('images', f))

      const res = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: fd,
      })
      const raw = (await res.json().catch(() => null)) as
        | {
            id: number
            text: string
            author: string
            images: string[]
            likeList: string[]
            createdAt: string
            editedAt: string | null
          }
        | { error?: string }
        | null
      if (!res.ok || !raw || typeof raw !== 'object' || !('id' in raw)) {
        alert(
          raw && 'error' in raw && typeof raw.error === 'string'
            ? raw.error
            : 'Не удалось сохранить',
        )
        return
      }
      const data = raw as {
        id: number
        text: string
        author: string
        images: string[]
        likeList: string[]
        createdAt: string
        editedAt: string | null
      }
      onCommentUpdated?.({
        id: data.id,
        text: data.text,
        author: data.author,
        images: data.images ?? [],
        likeList: data.likeList,
        createdAt: data.createdAt,
        editedAt: data.editedAt,
      })
      setEditOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  function handleCancelEdit() {
    setEditText(text)
    setEditOpen(false)
  }

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const added = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (!added.length) return
    setNewFiles((prev) => [...prev, ...added])
    const nextPreviews = added.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file,
    }))
    setImagePreviews((prev) => [...prev, ...nextPreviews])
  }

  function handleRemovePreview(previewId: string) {
    setImagePreviews((prev) => {
      const item = prev.find((p) => p.id === previewId)
      if (item?.file) URL.revokeObjectURL(item.url)
      return prev.filter((p) => p.id !== previewId)
    })
    setNewFiles((prev) =>
      prev.filter((f) => {
        const p = imagePreviews.find((x) => x.id === previewId)
        return !(p?.file && p.file === f)
      }),
    )
  }

  async function handleDelete() {
    if (!confirm('Удалить этот комментарий?')) return
    const res = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      alert(data.error ?? 'Не удалось удалить')
      return
    }
    onCommentDeleted?.(id)
  }

  return (
    <>
      <article className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 shadow-sm">
        <header className="mb-2 flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-slate-900">{author}</p>
            <p className="text-[10px] text-slate-500">{dateLine}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <CommentLikeButton
              commentId={id}
              initialLikeList={likeList}
              currentUserId={currentUserId}
            />
            {canEdit && (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  className={commentBtnClass}
                  onClick={() => void handleDelete()}
                  aria-label="Удалить комментарий"
                >
                  &#10006;
                </button>
                <button
                  type="button"
                  className={commentBtnClass}
                  onClick={() => setEditOpen(true)}
                  aria-label="Редактировать комментарий"
                >
                  &#9998;
                </button>
              </div>
            )}
          </div>
        </header>
        <p className="whitespace-pre-line text-xs text-slate-800">{text}</p>
        {images.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="flex h-24 w-full min-w-0 items-center justify-center overflow-hidden rounded-md bg-white"
              >
                <ZoomImage>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Комментарий, изображение ${index + 1}`}
                    className="h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                  />
                </ZoomImage>
              </div>
            ))}
          </div>
        )}
      </article>

      <Modal isOpen={editOpen} onClose={handleCancelEdit}>
        <div className="flex h-full min-h-[200px] flex-col gap-3 p-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-800">
            Текст комментария
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={5}
              className="w-full resize-y rounded-md border border-slate-300 p-2 text-xs text-slate-900"
            />
          </label>

          <div className="flex flex-col gap-2 text-xs">
            <span className="font-medium text-slate-700">
              Изображения (необязательно)
            </span>
            <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-md bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-50 hover:bg-slate-700">
              Choose files
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFilesChange}
              />
            </label>

            {imagePreviews.length > 0 && (
              <div className="mt-1 grid grid-cols-3 gap-2">
                {imagePreviews.map((preview) => (
                  <div
                    key={preview.id}
                    className="relative flex h-24 w-full min-w-0 items-center justify-center overflow-hidden rounded-md bg-slate-50"
                  >
                    <ZoomImage>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview.url}
                        alt=""
                        className="h-24 w-auto max-w-full object-contain"
                      />
                    </ZoomImage>
                    <button
                      type="button"
                      onClick={() => handleRemovePreview(preview.id)}
                      className="absolute right-1 top-1 rounded-full bg-slate-900/70 px-1.5 text-[10px] text-slate-50"
                      aria-label="Убрать изображение"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-wrap justify-end gap-2">
            <button
              type="button"
              disabled={submitting}
              onClick={handleCancelEdit}
              className="rounded-md border border-slate-400 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-60"
            >
              Отмена
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => void handlePatch()}
              className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? 'Сохранение…' : 'Сохранить'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
