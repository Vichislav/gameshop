import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'

import type { CommentForCard, QuestionForCard } from './question-for-card.types'

export type { CommentForCard, QuestionForCard } from './question-for-card.types'

/** Поля вопроса для карточки + комментарии (порядок: старые → новые). */
export const questionForCardSelect = Prisma.validator<Prisma.QuestionSelect>()({
  id: true,
  type: true,
  author: true,
  authorUserId: true,
  text: true,
  images: true,
  createdAt: true,
  editedAt: true,
  likeList: true,
  answerText: true,
  answerImages: true,
  tags: {
    select: { name: true },
    orderBy: { name: 'asc' },
  },
  comments: {
    select: {
      id: true,
      text: true,
      author: true,
      likeList: true,
      createdAt: true,
      editedAt: true,
    } as unknown as Prisma.CommentSelect,
    orderBy: { createdAt: 'asc' },
  },
})

/** Список вопросов для карточек; подгружает `images` комментариев одним raw-запросом. */
export async function fetchQuestionsForCard(
  args: Omit<Prisma.QuestionFindManyArgs, 'select'>,
): Promise<QuestionForCard[]> {
  const questions = await prisma.question.findMany({
    ...args,
    select: questionForCardSelect,
  })

  const commentIds = questions.flatMap((q) => q.comments.map((c) => c.id))
  if (commentIds.length === 0) {
    return questions.map((q) => ({
      ...q,
      comments: q.comments.map((c) => ({ ...c, images: [] as string[] })),
    })) as QuestionForCard[]
  }

  const rows = await prisma.$queryRaw<Array<{ id: number; images: string[] }>>`
    SELECT id, images FROM "Comment" WHERE id IN (${Prisma.join(commentIds)})
  `

  const imgMap = new Map(
    rows.map((r) => [r.id, Array.isArray(r.images) ? r.images : []] as const),
  )

  return questions.map((q) => ({
    ...q,
    comments: q.comments.map((c) => ({
      ...c,
      images: imgMap.get(c.id) ?? [],
    })),
  })) as QuestionForCard[]
}
