import { NextRequest, NextResponse } from 'next/server'

import { requireAuthorUser } from '@/lib/require-author-user'
import {
  isAllowedQuestionImageUrl,
  saveQuestionImageUpload,
} from '@/lib/question-upload'
import prisma from '@/lib/prisma'

const QUESTION_TYPES = ['technical', 'hr', 'other'] as const
type QuestionType = (typeof QUESTION_TYPES)[number]

function isQuestionType(s: string): s is QuestionType {
  return QUESTION_TYPES.includes(s as QuestionType)
}

type Params = { params: { id: string } }

function parseJsonUrlArray(raw: unknown): string[] {
  if (typeof raw !== 'string' || !raw.trim()) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (u): u is string =>
        typeof u === 'string' && isAllowedQuestionImageUrl(u),
    )
  } catch {
    return []
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAuthorUser(req)
  if (auth instanceof NextResponse) return auth

  const questionId = Number(params.id)
  if (!Number.isInteger(questionId) || questionId < 1) {
    return NextResponse.json({ error: 'Invalid question id' }, { status: 400 })
  }

  const contentType = req.headers.get('content-type') ?? ''
  if (contentType.includes('multipart/form-data')) {
    return patchMultipart(req, questionId, auth.authorLabel)
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const hasText = 'text' in body
  const hasAnswer = 'answerText' in body
  const hasType = 'type' in body

  if (!hasText && !hasAnswer && !hasType) {
    return NextResponse.json(
      { error: 'Provide at least one of: text, answerText, type' },
      { status: 400 },
    )
  }

  const data: {
    text?: string | null
    answerText?: string | null
    type?: QuestionType
  } = {}

  if (hasText) {
    if (typeof body.text !== 'string') {
      return NextResponse.json({ error: 'text must be a string' }, { status: 400 })
    }
    const t = body.text.trim()
    if (!t) {
      return NextResponse.json({ error: 'text cannot be empty' }, { status: 400 })
    }
    data.text = t
  }

  if (hasAnswer) {
    if (body.answerText === null || body.answerText === undefined) {
      data.answerText = null
    } else if (typeof body.answerText === 'string') {
      const a = body.answerText.trim()
      data.answerText = a.length ? a : null
    } else {
      return NextResponse.json(
        { error: 'answerText must be string or null' },
        { status: 400 },
      )
    }
  }

  if (hasType) {
    if (typeof body.type !== 'string' || !isQuestionType(body.type)) {
      return NextResponse.json(
        { error: 'Invalid type (technical | hr | other)' },
        { status: 400 },
      )
    }
    data.type = body.type
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true, author: true },
    })

    if (!question) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (question.author !== auth.authorLabel) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.question.update({
      where: { id: questionId },
      data: { ...data, editedAt: new Date() },
      select: {
        id: true,
        type: true,
        author: true,
        text: true,
        images: true,
        answerText: true,
        answerImages: true,
        likeList: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return NextResponse.json(updated)
  } catch (e) {
    console.error('PATCH /api/questions/[id]', e)
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 },
    )
  }
}

async function patchMultipart(
  req: NextRequest,
  questionId: number,
  authorLabel: string,
) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const textRaw = formData.get('text')
  if (typeof textRaw !== 'string' || !textRaw.trim()) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 })
  }
  const text = textRaw.trim()

  const answerTextRaw = formData.get('answerText')
  let answerText: string | null = null
  if (typeof answerTextRaw === 'string') {
    const a = answerTextRaw.trim()
    answerText = a.length ? a : null
  }

  const typeRaw = formData.get('type')
  let type: QuestionType | undefined
  if (typeof typeRaw === 'string' && typeRaw.trim()) {
    if (!isQuestionType(typeRaw)) {
      return NextResponse.json(
        { error: 'Invalid type (technical | hr | other)' },
        { status: 400 },
      )
    }
    type = typeRaw
  }

  const keepImageUrls = parseJsonUrlArray(formData.get('keepImageUrls'))
  const keepAnswerUrls = parseJsonUrlArray(formData.get('keepAnswerImageUrls'))

  const imageFiles = formData
    .getAll('images')
    .filter((f): f is File => f instanceof File && f.size > 0)
  const answerImageFiles = formData
    .getAll('answerImages')
    .filter((f): f is File => f instanceof File && f.size > 0)

  const newImageUrls: string[] = []
  for (const file of imageFiles) {
    newImageUrls.push(await saveQuestionImageUpload(file))
  }
  const newAnswerUrls: string[] = []
  for (const file of answerImageFiles) {
    newAnswerUrls.push(await saveQuestionImageUpload(file))
  }

  const images = [...keepImageUrls, ...newImageUrls]
  const answerImages = [...keepAnswerUrls, ...newAnswerUrls]

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true, author: true },
    })

    if (!question) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (question.author !== authorLabel) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.question.update({
      where: { id: questionId },
      data: {
        text,
        answerText,
        images,
        answerImages,
        editedAt: new Date(),
        ...(type !== undefined ? { type } : {}),
      },
      select: {
        id: true,
        type: true,
        author: true,
        text: true,
        images: true,
        answerText: true,
        answerImages: true,
        likeList: true,
        createdAt: true,
        editedAt: true,
      },
    })

    return NextResponse.json(updated)
  } catch (e) {
    console.error('PATCH multipart /api/questions/[id]', e)
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAuthorUser(req)
  if (auth instanceof NextResponse) return auth

  const questionId = Number(params.id)
  if (!Number.isInteger(questionId) || questionId < 1) {
    return NextResponse.json({ error: 'Invalid question id' }, { status: 400 })
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true, author: true },
    })

    if (!question) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    if (question.author !== auth.authorLabel) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { questionId } }),
      prisma.question.delete({ where: { id: questionId } }),
    ])

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('DELETE /api/questions/[id]', e)
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 },
    )
  }
}
