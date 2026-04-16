'use client'

import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from 'react'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(';').shift() || '')
  }
  return null
}

interface QuestionFormImagesPreview {
  id: string
  url: string
  file?: File
}

type QuestionTypeValue = 'technical' | 'hr' | 'other'

interface QuestionFormInitialData {
  author?: string
  text?: string
  images?: string[]
  answerText?: string
  answerImages?: string[]
  /** Только для mode=edit — для PATCH */
  questionType?: QuestionTypeValue
}

export interface QuestionFormValues {
  author: string
  text: string
  files: File[]
  answerText?: string
  answerFiles?: File[]
  /** Редактирование: URL картинок, которые оставляем */
  keepImageUrls?: string[]
  keepAnswerImageUrls?: string[]
  questionType?: QuestionTypeValue
}

interface QuestionFormProps {
  mode?: 'create' | 'edit'
  initialData?: QuestionFormInitialData
  isSubmitting?: boolean
  onSubmit: (_values: QuestionFormValues) => Promise<void> | void
  /** Отмена (например возврат на список вопросов); кнопка показывается только если передано */
  onCancel?: () => void
}

export default function QuestionForm({
  mode = 'create',
  initialData,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: QuestionFormProps) {
  const [author, setAuthor] = useState(initialData?.author ?? '')
  const [text, setText] = useState(initialData?.text ?? '')

  useEffect(() => {
    if (mode === 'edit') return
    const userId = getCookie('userId')
    if (!userId) return
    fetch(`/api/profile/${userId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const value = data.login ?? data.email ?? ''
          setAuthor(value)
        }
      })
      .catch(() => {})
  }, [mode])
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<QuestionFormImagesPreview[]>(
    (initialData?.images ?? []).map((url, index) => ({
      id: `existing-${index}`,
      url,
    })),
  )
  const [answerText, setAnswerText] = useState(initialData?.answerText ?? '')
  const [answerFiles, setAnswerFiles] = useState<File[]>([])
  const [answerPreviews, setAnswerPreviews] = useState<QuestionFormImagesPreview[]>(
    (initialData?.answerImages ?? []).map((url, index) => ({
      id: `answer-existing-${index}`,
      url,
    })),
  )
  const [error, setError] = useState<string | null>(null)
  const answerTextareaRef = useRef<HTMLTextAreaElement>(null)

  function insertAnswerImageMarker(slot: number) {
    const marker = `[[img:${slot}]]`
    const el = answerTextareaRef.current
    if (!el) {
      setAnswerText((prev) => prev + marker)
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    const value = answerText
    const next = value.slice(0, start) + marker + value.slice(end)
    setAnswerText(next)
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + marker.length
      el.setSelectionRange(pos, pos)
    })
  }

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(event.target.files ?? [])
    if (!newFiles.length) return

    const nextFiles = [...files, ...newFiles]
    setFiles(nextFiles)

    const newPreviews = newFiles.map((file, index) => {
      const id = `file-${Date.now()}-${index}`
      const url = URL.createObjectURL(file)
      return { id, url, file }
    })

    setPreviews((prev) => [...prev, ...newPreviews])
  }

  function handleRemovePreview(id: string) {
    setPreviews((prev) => prev.filter((item) => item.id !== id))
    setFiles((prev) =>
      prev.filter((file) => {
        return !previews.find(
          (p) => p.id === id && p.file && p.file === file,
        )
      }),
    )
  }

  function handleAnswerFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(event.target.files ?? [])
    if (!newFiles.length) return
    const nextFiles = [...answerFiles, ...newFiles]
    setAnswerFiles(nextFiles)
    const newPreviews = newFiles.map((file, index) => {
      const id = `answer-file-${Date.now()}-${index}`
      const url = URL.createObjectURL(file)
      return { id, url, file }
    })
    setAnswerPreviews((prev) => [...prev, ...newPreviews])
  }

  function handleRemoveAnswerPreview(id: string) {
    setAnswerPreviews((prev) => prev.filter((item) => item.id !== id))
    setAnswerFiles((prev) =>
      prev.filter((file) => {
        return !answerPreviews.find(
          (p) => p.id === id && p.file && p.file === file,
        )
      }),
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!author.trim()) {
      setError('Author is required')
      return
    }

    if (!text.trim()) {
      setError('Text is required')
      return
    }

    try {
      const keepImageUrls = previews
        .filter((p) => !p.file)
        .map((p) => p.url)
      const keepAnswerImageUrls = answerPreviews
        .filter((p) => !p.file)
        .map((p) => p.url)

      await onSubmit({
        author: author.trim(),
        text: text.trim(),
        files,
        ...(answerText.trim() ? { answerText: answerText.trim() } : {}),
        ...(answerFiles.length > 0 ? { answerFiles } : {}),
        ...(mode === 'edit'
          ? {
              keepImageUrls,
              keepAnswerImageUrls,
              ...(initialData?.questionType
                ? { questionType: initialData.questionType }
                : {}),
            }
          : {}),
      })
    } catch (err) {
      console.error(err)
      setError('Failed to submit question. Please try again.')
    }
  }

  const title = mode === 'create' ? 'Create question' : 'Edit question'
  const submitLabel = mode === 'create' ? 'Create' : 'Save changes'

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4 rounded-lg bg-white shadow-md"
    >
      <h2 className="text-lg font-semibold text-slate-900 text-center">
        {title}
      </h2>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <p className="text-sm text-slate-800">
        Author: {author || '…'}
      </p>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-800">Question text</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="w-full min-h-[120px] rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
          placeholder="Write the question, context, notes..."
        />
      </label>

      <div className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-slate-800">
          Attach images (optional)
        </span>

        <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-700">
          Choose files
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFilesChange}
          />
        </label>

        {previews.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {previews.map((preview) => (
              <div
                key={preview.id}
                className="relative flex h-24 w-full min-w-0 items-center justify-center overflow-hidden rounded-md bg-slate-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview.url}
                  alt="Preview"
                  className="h-24 w-auto max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePreview(preview.id)}
                  className="absolute right-1 top-1 rounded-full bg-slate-900/70 px-1.5 text-xs text-slate-50"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-800">
          Ответ (необязательно)
        </span>
        <p className="text-xs text-slate-600">
          Чтобы вставить фото внутри текста, загрузите картинки ниже, затем
          вставьте маркеры{' '}
          <code className="rounded bg-slate-100 px-1">[[img:1]]</code>,{' '}
          <code className="rounded bg-slate-100 px-1">[[img:2]]</code> … —
          номер совпадает с порядком изображений ответа (первая = 1).
        </p>
        <textarea
          ref={answerTextareaRef}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          className="w-full min-h-[120px] rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
          placeholder="Введите ответ..."
        />
      </label>

      <div className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-slate-800">
          Изображения ответа (необязательно)
        </span>

        <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-700">
          Choose files
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleAnswerFilesChange}
          />
        </label>

        {answerPreviews.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {answerPreviews.map((preview) => (
              <div
                key={preview.id}
                className="relative flex h-24 w-full min-w-0 items-center justify-center overflow-hidden rounded-md bg-slate-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview.url}
                  alt="Answer preview"
                  className="h-24 w-auto max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnswerPreview(preview.id)}
                  className="absolute right-1 top-1 rounded-full bg-slate-900/70 px-1.5 text-xs text-slate-50"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {answerPreviews.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-600">Вставить в ответ:</span>
            {answerPreviews.map((p, index) => (
              <button
                key={p.id}
                type="button"
                onClick={() => insertAnswerImageMarker(index + 1)}
                className="rounded border border-cyan-600 bg-cyan-50 px-2 py-0.5 font-mono text-xs text-cyan-900 hover:bg-cyan-100"
              >
                {`[[img:${index + 1}]]`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-w-[140px] rounded-md border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Отмена
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[140px] rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  )
}