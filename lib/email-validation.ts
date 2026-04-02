/** Макс. длина email по RFC 5321 (общепринятое ограничение). */
export const MAX_EMAIL_LENGTH = 254

/**
 * Проверка формата email (без DNS/MX; для UX и защиты API от мусора).
 * Локальная и доменная часть — практичное подмножество ASCII.
 */
export function isValidEmailFormat(email: string): boolean {
  const t = email.trim()
  if (t.length === 0 || t.length > MAX_EMAIL_LENGTH) return false
  // Одна @, не в начале/конце, домен с точкой TLD ≥ 2 символов
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  return re.test(t)
}
