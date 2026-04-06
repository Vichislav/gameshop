import { Prisma } from '@prisma/client'

/** Поля вопроса для карточки + комментарии (порядок: старые → новые).
 *  Вложенный `select` комментариев задаём inline — так TS не требует отдельного
 *  `CommentSelect` из клиента (избегаем рассинхрона до `prisma generate`).
 */
export const questionForCardSelect = Prisma.validator<Prisma.QuestionSelect>()({
  id: true,
  type: true,
  author: true,
  text: true,
  images: true,
  createdAt: true,
  updatedAt: true,
  likeList: true,
  answerText: true,
  answerImages: true,
  comments: {
    select: {
      id: true,
      text: true,
      author: true,
      likeList: true,
      createdAt: true,
      updatedAt: true,
    } as unknown as Prisma.CommentSelect,
    orderBy: { createdAt: 'asc' },
  },
})

export type QuestionForCard = Prisma.QuestionGetPayload<{
  select: typeof questionForCardSelect
}>

export type CommentForCard = QuestionForCard['comments'][number]
