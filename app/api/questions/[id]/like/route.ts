import { NextRequest, NextResponse } from 'next/server'

import { getUserIdFromRequest } from '@/lib/auth-request'
import prisma from '@/lib/prisma'

type Params = { params: { id: string } }

export async function POST(req: NextRequest, { params }: Params) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const questionId = Number(params.id)
  if (!Number.isInteger(questionId) || questionId < 1) {
    return NextResponse.json({ error: 'Invalid question id' }, { status: 400 })
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { likeList: true },
    })

    if (!question) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const nextList = [...question.likeList]
    const idx = nextList.indexOf(userId)
    if (idx === -1) {
      nextList.push(userId)
    } else {
      nextList.splice(idx, 1)
    }

    const updated = await prisma.question.update({
      where: { id: questionId },
      data: { likeList: nextList },
      select: { likeList: true },
    })

    const liked = updated.likeList.includes(userId)

    return NextResponse.json({
      likeList: updated.likeList,
      count: updated.likeList.length,
      liked,
    })
  } catch (e) {
    console.error('POST /api/questions/[id]/like', e)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 },
    )
  }
}
