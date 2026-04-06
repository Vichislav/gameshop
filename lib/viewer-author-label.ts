import { authorDisplayFromUser } from '@/lib/author-display'
import prisma from '@/lib/prisma'

/** Строка автора для текущего пользователя по JWT userId (для сравнения с question.author). */
export async function getViewerAuthorLabel(
  userIdStr: string | null,
): Promise<string | null> {
  if (!userIdStr) return null
  const id = Number(userIdStr)
  if (!Number.isInteger(id)) return null
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, login: true, email: true },
  })
  if (!user) return null
  return authorDisplayFromUser(user)
}
