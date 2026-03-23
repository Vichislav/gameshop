import { NextRequest, NextResponse } from 'next/server'

import { getUserIdFromRequest } from '@/lib/auth-request'
import prisma from '@/lib/prisma'

type Params = { params: { id: string } }

export async function POST(req: NextRequest, { params }: Params) {
  const userIdStr = getUserIdFromRequest(req)
  if (!userIdStr) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const questionId = Number(params.id)
  if (!Number.isInteger(questionId) || questionId < 1) {
    return NextResponse.json({ error: 'Invalid question id' }, { status: 400 })
  }

  const body = (await req.json().catch(() => null)) as { text?: string } | null
  const text =
    typeof body?.text === 'string' ? body.text.trim().replace(/\s+/g, ' ') : ''
  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
  }

  const userNumericId = Number(userIdStr)
  if (!Number.isInteger(userNumericId)) {
    return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true },
    })
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userNumericId },
      select: { login: true, email: true },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const author =
      user.login?.trim() ||
      user.email ||
      `user-${userNumericId}`

    const comment = await prisma.comment.create({
      data: {
        text,
        author,
        questionId,
      },
      select: {
        id: true,
        text: true,
        author: true,
        likeList: true,
        createdAt: true,
      },
    })

    return NextResponse.json(comment)
  } catch (e) {
    console.error('POST /api/questions/[id]/comments', e)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 },
    )
  }
}
