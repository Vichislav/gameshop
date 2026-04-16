/** Маркер `[[img:N]]` в тексте ответа: N с 1, картинка = `answerImages[N - 1]`. */
export const ANSWER_IMAGE_MARKER_PATTERN = /\[\[img:(\d+)\]\]/g

export type AnswerTextPart =
  | { type: 'text'; text: string }
  | { type: 'slot'; n: number }

/** Разбор текста ответа на фрагменты текста и слоты изображений (1-based). */
export function parseAnswerTextWithImageSlots(text: string): AnswerTextPart[] {
  const re = /\[\[img:(\d+)\]\]/g
  const parts: AnswerTextPart[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push({ type: 'text', text: text.slice(last, m.index) })
    }
    const n = Number(m[1])
    if (Number.isInteger(n) && n >= 1) {
      parts.push({ type: 'slot', n })
    }
    last = m.index + m[0].length
  }
  if (last < text.length) {
    parts.push({ type: 'text', text: text.slice(last) })
  }
  return parts
}

export function answerTextHasImageMarkers(text: string | null | undefined): boolean {
  if (!text) return false
  return /\[\[img:\d+\]\]/.test(text)
}

/** Какие номера слотов (1-based) встречаются в тексте. */
export function getUsedImageSlotNumbers(text: string): Set<number> {
  const set = new Set<number>()
  const re = /\[\[img:(\d+)\]\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    const n = Number(m[1])
    if (Number.isInteger(n) && n >= 1) set.add(n)
  }
  return set
}

/** Индексы картинок (0-based), не упомянутые ни одним маркером. */
export function getUnusedImageIndices(
  answerImagesLength: number,
  usedSlots: Set<number>,
): number[] {
  const out: number[] = []
  for (let i = 0; i < answerImagesLength; i++) {
    if (!usedSlots.has(i + 1)) out.push(i)
  }
  return out
}
