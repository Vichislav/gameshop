/** Типы карточки вопроса — без Prisma, для client/server components */

export type CommentForCard = {
  id: number
  text: string
  author: string
  likeList: string[]
  createdAt: Date
  editedAt: Date | null
  images: string[]
}

export type QuestionForCard = {
  id: number
  type: 'technical' | 'hr' | 'other'
  author: string
  authorUserId: number | null
  text: string | null
  images: string[]
  createdAt: Date
  editedAt: Date | null
  likeList: string[]
  answerText: string | null
  answerImages: string[]
  tags: { name: string }[]
  comments: CommentForCard[]
}
