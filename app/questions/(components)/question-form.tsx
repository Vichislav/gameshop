'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

interface QuestionFormImagesPreview {
  id: string
  url: string
  file?: File
}

interface QuestionFormInitialData {
  author?: string
  text?: string
  images?: string[]
}

interface QuestionFormValues {
  author: string
  text: string
  files: File[]
}

interface QuestionFormProps {
  mode?: 'create' | 'edit'
  initialData?: QuestionFormInitialData
  isSubmitting?: boolean
  onSubmit: (values: QuestionFormValues) => Promise<void> | void
}

export default function QuestionForm({
  mode = 'create',
  initialData,
  isSubmitting = false,
  onSubmit,
}: QuestionFormProps) {
  const [author, setAuthor] = useState(initialData?.author ?? '')
  const [text, setText] = useState(initialData?.text ?? '')
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<QuestionFormImagesPreview[]>(
    (initialData?.images ?? []).map((url, index) => ({
      id: `existing-${index}`,
      url,
    })),
  )
  const [error, setError] = useState<string | null>(null)

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
      await onSubmit({
        author: author.trim(),
        text: text.trim(),
        files,
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

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-800">Author</span>
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Your name or nickname"
        />
      </label>

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
                className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-md border border-slate-300 bg-slate-50"
              >
                <img
                  src={preview.url}
                  alt="Preview"
                  className="h-full w-full object-cover"
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

      <div className="mt-2 flex justify-center">
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