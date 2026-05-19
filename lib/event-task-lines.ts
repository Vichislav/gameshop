/** Токены одной строки или несколько абзацев в одном кликабельном блоке */
export type EventTaskLine = string[] | string[][]

/** Задача: список кликабельных блоков */
export type EventTaskLines = EventTaskLine[]

const span = (className: string, content: string) =>
  `<span className="${className}">${content}</span>`

const y5 = 'text-yellow-500'
const y4 = 'text-yellow-400'
const p7 = 'text-purple-700'

const TOKEN_HTML: Record<string, string> = {
  setTimeout: span(y5, 'setTimeout'),
  console: span('text-blue-500', 'console'),
  log: span(y5, 'log'),
  Promise: span('text-green-800', 'Promise'),
  resolve: span(y5, 'resolve'),
  reject: span(y5, 'reject'),
  catch: span(y5, 'catch'),
  then: span(y5, 'then'),
  '&#40;': span(y4, '&#40;'),
  '&#41;': span(y4, '&#41;'),
  '&#40;purple': span(p7, '&#40;'),
  '&#41;purple': span(p7, '&#41;'),
  '&#123;': span(p7, '&#123;'),
  '&#125;': span(p7, '&#125;'),
  'new &nbsp;': span('text-blue-800', 'new &nbsp;'),
  'resolve &nbsp;': span(y5, 'resolve &nbsp;'),
}

export function wrapEventToken(token: string): string {
  return TOKEN_HTML[token] ?? token
}

/** HTML из БД: className → class для dangerouslySetInnerHTML */
export function prepareTaskLineHtml(html: string): string {
  return html.replace(/\bclassName=/g, 'class=')
}

export function buildLineHtml(tokens: string[]): string {
  return `<p className=" px-2 ">${tokens.map(wrapEventToken).join('')}</p>`
}

const MULTI_P_CLASSES = [' px-2 ', ' pl-4', ' px-2'] as const

export function buildEventLineHtml(line: EventTaskLine): string {
  if (line.length > 0 && Array.isArray(line[0])) {
    return (line as string[][])
      .map((tokens, i) => {
        const pClass = MULTI_P_CLASSES[i] ?? ' px-2 '
        return `<p className="${pClass}">${tokens.map(wrapEventToken).join('')}</p>`
      })
      .join('')
  }
  return buildLineHtml(line as string[])
}

function parseEventTaskLine(line: unknown): EventTaskLine {
  if (!Array.isArray(line)) return []
  if (line.length > 0 && Array.isArray(line[0])) {
    return line.map((paragraph) =>
      Array.isArray(paragraph)
        ? paragraph.filter((t): t is string => typeof t === 'string')
        : [],
    )
  }
  return line.filter((t): t is string => typeof t === 'string')
}

export function parseEventTaskLines(value: unknown): EventTaskLines {
  if (!Array.isArray(value)) return []
  return value.map(parseEventTaskLine)
}
