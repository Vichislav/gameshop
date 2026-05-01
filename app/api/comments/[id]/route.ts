import { NextRequest, NextResponse } from 'next/server'

import { requireAuthorUser } from '@/lib/require-author-user'
import {
  isAllowedCommentImageUrl,
  saveCommentImageUpload,
} from '@/lib/comment-upload'
import prisma from '@/lib/prisma'

type Params = { params: { id: string } }

function parseJsonUrlArray(raw: unknown): string[] {
  if (typeof raw !== 'string' || !raw.trim()) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (u): u is string =>
        typeof u === 'string' && isAllowedCommentImageUrl(u),
    )
  } catch {
    return []
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAuthorUser(req)
  if (auth instanceof NextResponse) return auth

  const commentId = Number(params.id)
  if (!Number.isInteger(commentId) || commentId < 1) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 })
  }

  const contentType = req.headers.get('content-type') ?? ''
  if (contentType.includes('multipart/form-data')) {
    return patchMultipart(req, commentId, auth.authorLabel)
  }

  try {
    const body = (await req.json().catch(() => null)) as
      | { text?: unknown }
      | null
    const text =
      typeof body?.text === 'string'
        ? body.text.replace(/\r\n/g, '\n').trim()
        : ''
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

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
      data: { text, editedAt: new Date() },
      select: {
        id: true,
        text: true,
        author: true,
        images: true,
        likeList: true,
        createdAt: true,
        editedAt: true,
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

async function patchMultipart(
  req: NextRequest,
  commentId: number,
  authorLabel: string,
) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const textRaw = formData.get('text')
  const text =
    typeof textRaw === 'string' ? textRaw.replace(/\r\n/g, '\n').trim() : ''
  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
  }

  const keepImageUrls = parseJsonUrlArray(formData.get('keepImageUrls'))
  const newFiles = formData
    .getAll('images')
    .filter((f): f is File => f instanceof File && f.size > 0)

  const newImageUrls: string[] = []
  for (const file of newFiles) {
    newImageUrls.push(await saveCommentImageUpload(file))
  }
  const images = [...keepImageUrls, ...newImageUrls]

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true, author: true },
    })

    if (!comment) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (comment.author !== authorLabel) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { text, images, editedAt: new Date() },
      select: {
        id: true,
        text: true,
        author: true,
        images: true,
        likeList: true,
        createdAt: true,
        editedAt: true,
        questionId: true,
      },
    })

    return NextResponse.json(updated)
  } catch (e) {
    console.error('PATCH multipart /api/comments/[id]', e)
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
