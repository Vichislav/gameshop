import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getUserIdFromRequest } from '@/lib/auth-request'
import { authorDisplayFromUser } from '@/lib/author-display'
import prisma from '@/lib/prisma'

export type AuthorUserContext = {
  user: { id: number; login: string | null; email: string }
  authorLabel: string
}

/** JWT + пользователь из БД + строка автора для сравнения с comment.author / question.author */
export async function requireAuthorUser(
  req: NextRequest,
): Promise<AuthorUserContext | NextResponse> {
  const userIdStr = getUserIdFromRequest(req)
  if (!userIdStr) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userNumericId = Number(userIdStr)
  if (!Number.isInteger(userNumericId)) {
    return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: userNumericId },
    select: { id: true, login: true, email: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return {
    user,
    authorLabel: authorDisplayFromUser(user),
  }
}
