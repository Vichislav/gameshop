const MAX_TAGS = 20
const MAX_TAG_LENGTH = 48

/** Нормализация одного тега (без Prisma — безопасно для client components) */
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
