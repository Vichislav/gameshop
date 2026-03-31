/** Макс. длина текста до санитизации (совпадает с клиентом и API). */
export const CONTACT_MESSAGE_MAX_LENGTH = 500

/**
 * Серверная санитизация: без HTML, без NUL, без SMTP header injection,
 * нормализация переводов строк. Текст уходит только как text/plain в письме.
 */
export function sanitizeContactMessage(raw: string): string {
  let s = raw.replace(/\0/g, '')
  s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  s = s.replace(/<[^>]*>/g, '')
  s = s.replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  s = s.replace(/\n{4,}/g, '\n\n\n')
  return s.trim()
}

export function validateContactMessageLength(trimmed: string): boolean {
  return trimmed.length > 0 && trimmed.length <= CONTACT_MESSAGE_MAX_LENGTH
}
