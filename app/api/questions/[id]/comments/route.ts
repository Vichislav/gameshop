import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

import { authorDisplayFromUser } from '@/lib/author-display'
import { getUserIdFromRequest } from '@/lib/auth-request'
import { saveCommentImageUpload } from '@/lib/comment-upload'
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

  const userNumericId = Number(userIdStr)
  if (!Number.isInteger(userNumericId)) {
    return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
  }

  let text = ''
  const imageFiles: File[] = []

  const contentType = req.headers.get('content-type') ?? ''
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData()
    const textRaw = formData.get('text')
    text =
      typeof textRaw === 'string'
        ? textRaw.replace(/\r\n/g, '\n').trim()
        : ''
    for (const entry of formData.getAll('images')) {
      if (entry instanceof File && entry.size > 0) {
        imageFiles.push(entry)
      }
    }
  } else {
    const body = (await req.json().catch(() => null)) as { text?: string } | null
    text =
      typeof body?.text === 'string'
        ? body.text.replace(/\r\n/g, '\n').trim()
        : ''
  }

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
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
      select: { id: true, login: true, email: true },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const author = authorDisplayFromUser(user)

    const imageUrls: string[] = []
    for (const file of imageFiles) {
      imageUrls.push(await saveCommentImageUpload(file))
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        author,
        questionId,
        images: imageUrls,
      } as Prisma.CommentUncheckedCreateInput,
      select: {
        id: true,
        text: true,
        author: true,
        images: true,
        likeList: true,
        createdAt: true,
        editedAt: true,
      } as unknown as Prisma.CommentSelect,
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
