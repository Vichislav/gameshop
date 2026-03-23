'use client'

import CommentLikeButton from './comment-like-button'

export interface QuestionCommentCardProps {
  id: number
  text: string
  author: string
  likeList: string[]
  createdAt: Date | string
  currentUserId: string | null
}

export default function QuestionCommentCard({
  id,
  text,
  author,
  likeList,
  createdAt,
  currentUserId,
}: QuestionCommentCardProps) {
  const createdLabel = new Date(createdAt).toLocaleString()

  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 shadow-sm">
      <header className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-slate-900">{author}</p>
          <p className="text-[10px] text-slate-500">{createdLabel}</p>
        </div>
        <CommentLikeButton
          commentId={id}
          initialLikeList={likeList}
          currentUserId={currentUserId}
        />
      </header>
      <p className="whitespace-pre-line text-xs text-slate-800">{text}</p>
    </article>
  )
}
