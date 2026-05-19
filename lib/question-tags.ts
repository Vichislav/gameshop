import prisma from '@/lib/prisma'

const MAX_TAGS = 20
const MAX_TAG_LENGTH = 48

/** Нормализация одного тега для сохранения */
export function normalizeTagName(raw: string): string {
  const name = raw.trim().replace(/\s+/g, ' ')
  if (!name || name.length > MAX_TAG_LENGTH) return ''
  return name
}

/** Уникальные теги (без учёта регистра при дедупликации) */
export function normalizeTagNames(inputs: unknown[]): string[] {
  const result: string[] = []
  const seen = new Set<string>()

  for (const item of inputs) {
    if (typeof item !== 'string') continue
    const name = normalizeTagName(item)
    if (!name) continue
    const key = name.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    result.push(name)
    if (result.length >= MAX_TAGS) break
  }

  return result
}

export function parseTagNamesJson(raw: unknown): string[] {
  if (typeof raw !== 'string' || !raw.trim()) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return normalizeTagNames(parsed)
  } catch {
    return []
  }
}

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

/** Полная замена тегов вопроса (create / edit) */
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
