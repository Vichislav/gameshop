import QuestionCardAnswer from './question-card-answer'

interface QuestionCardProps {
  author: string
  text: string
  images?: string[]
  createdAt?: Date | string
  likes?: number
  answerText?: string | null
  answerImages?: string[]
  footerSlot?: React.ReactNode
}

export default function QuestionCard({
  author,
  text,
  images = [],
  createdAt,
  likes,
  answerText,
  answerImages = [],
  footerSlot,
}: QuestionCardProps) {
  const createdLabel = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : null

  return (
    <article className="w-full max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
      <header className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {author}
          </p>
          {createdLabel && (
            <p className="text-xs text-slate-500">
              {createdLabel}
            </p>
          )}
        </div>
        {typeof likes === 'number' && (
          <p className="text-xs font-medium text-slate-600">
            Likes: {likes}
          </p>
        )}
      </header>

      <p className="mb-3 text-sm text-slate-900 whitespace-pre-line">
        {text}
      </p>

      {images.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative h-24 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-50"
            >
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

      {footerSlot && (
        <footer className="mt-2 flex items-center justify-between">
          {footerSlot}
        </footer>
      )}
    </article>
  )
}