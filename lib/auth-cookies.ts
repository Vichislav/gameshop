import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

/** userId из валидного JWT в cookie `token` (не из cookie `userId`, чтобы не подделали). */
export function getCurrentUserIdFromCookies(): string | null {
  const token = cookies().get('token')?.value
  const secret = process.env.JWT_SECRET
  if (!token || !secret) return null
  try {
    const payload = jwt.verify(token, secret) as { userId?: number }
    if (
      typeof payload.userId !== 'number' ||
      !Number.isInteger(payload.userId)
    ) {
      return null
    }
    return String(payload.userId)
  } catch {
    return null
  }
}
