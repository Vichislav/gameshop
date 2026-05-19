import prisma from '@/lib/prisma'

import { normalizeTagNames } from '@/lib/question-tag-utils'

async function findOrCreateTag(name: string) {
  const existing = await prisma.tag.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
    select: { id: true, name: true },
  })
  if (existing) return existing

  return prisma.tag.create({
    data: { name },
    select: { id: true, name: true },
  })
}

/** Полная замена тегов вопроса (только server / API routes) */
export async function syncQuestionTags(
  questionId: number,
  tagNames: string[],
): Promise<void> {
  const names = normalizeTagNames(tagNames)
  const tags = await Promise.all(names.map((name) => findOrCreateTag(name)))

  await prisma.question.update({
    where: { id: questionId },
    data: {
      tags: {
        set: tags.map((t) => ({ id: t.id })),
      },
    },
  })
}
