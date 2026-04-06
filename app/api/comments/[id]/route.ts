import { NextRequest, NextResponse } from 'next/server'

import { requireAuthorUser } from '@/lib/require-author-user'
import prisma from '@/lib/prisma'

type Params = { params: { id: string } }

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAuthorUser(req)
  if (auth instanceof NextResponse) return auth

  const commentId = Number(params.id)
  if (!Number.isInteger(commentId) || commentId < 1) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 })
  }

  const body = (await req.json().catch(() => null)) as { text?: unknown } | null
  const text =
    typeof body?.text === 'string' ? body.text.trim().replace(/\s+/g, ' ') : ''
  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (comment.author !== auth.authorLabel) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { text },
      select: {
        id: true,
        text: true,
        author: true,
        likeList: true,
        createdAt: true,
        updatedAt: true,
        questionId: true,
      },
    })

    return NextResponse.json(updated)
  } catch (e) {
    console.error('PATCH /api/comments/[id]', e)
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAuthorUser(req)
  if (auth instanceof NextResponse) return auth

  const commentId = Number(params.id)
  if (!Number.isInteger(commentId) || commentId < 1) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 })
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, author: true },
    })

    if (!comment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (comment.author !== auth.authorLabel) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.comment.delete({ where: { id: commentId } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('DELETE /api/comments/[id]', e)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 },
    )
  }
}
