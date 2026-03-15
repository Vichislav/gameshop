import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

import prisma from '@/lib/prisma'

const QUESTION_TYPES = ['technical', 'hr', 'other'] as const
type QuestionType = (typeof QUESTION_TYPES)[number]

function isQuestionType(s: string): s is QuestionType {
  return QUESTION_TYPES.includes(s as QuestionType)
}

function sanitizeFileName(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9.-]/g, '_')
  return base.slice(0, 100) || 'image'
}

async function saveUpload(
  file: File,
  dir: string
): Promise<string> {
  await mkdir(dir, { recursive: true })
  const bytes = await file.arrayBuffer()
  const ext = path.extname(file.name) || '.jpg'
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${sanitizeFileName(file.name)}`
  const filename = safeName.endsWith(ext) ? safeName : `${safeName}${ext}`
  const filePath = path.join(dir, filename)
  await writeFile(filePath, new Uint8Array(bytes))
  return `/uploads/questions/${filename}`
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const typeRaw = formData.get('type')
    const author = formData.get('author')
    const text = formData.get('text')
    const answerText = formData.get('answerText')

    if (typeof typeRaw !== 'string' || !isQuestionType(typeRaw)) {
      return NextResponse.json(
        { error: 'Invalid or missing type (technical | hr | other)' },
        { status: 400 }
      )
    }
    if (typeof author !== 'string' || !author.trim()) {
      return NextResponse.json({ error: 'Author is required' }, { status: 400 })
    }
    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'questions')

    const imageFiles = formData.getAll('images').filter((f): f is File => f instanceof File)
    const answerImageFiles = formData
      .getAll('answerImages')
      .filter((f): f is File => f instanceof File)

    const imageUrls: string[] = []
    for (const file of imageFiles) {
      const url = await saveUpload(file, uploadDir)
      imageUrls.push(url)
    }

    const answerImageUrls: string[] = []
    for (const file of answerImageFiles) {
      const url = await saveUpload(file, uploadDir)
      answerImageUrls.push(url)
    }

    const question = await prisma.question.create({
      data: {
        type: typeRaw,
        author: author.trim(),
        text: text.trim(),
        images: imageUrls,
        answerText:
          typeof answerText === 'string' && answerText.trim()
            ? answerText.trim()
            : null,
        answerImages: answerImageUrls,
      },
    })

    return NextResponse.json({ id: question.id, type: question.type })
  } catch (err) {
    console.error('POST /api/questions error:', err)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
}
