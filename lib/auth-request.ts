import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

/** userId из JWT в cookie `token` для route handlers. */
export function getUserIdFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get('token')?.value
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
