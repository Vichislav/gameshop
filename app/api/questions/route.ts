import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { saveQuestionImageUpload } from '@/lib/question-upload'

const QUESTION_TYPES = ['technical', 'hr', 'other'] as const
type QuestionType = (typeof QUESTION_TYPES)[number]

function isQuestionType(s: string): s is QuestionType {
  return QUESTION_TYPES.includes(s as QuestionType)
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

    const imageFiles = formData.getAll('images').filter((f): f is File => f instanceof File)
    const answerImageFiles = formData
      .getAll('answerImages')
      .filter((f): f is File => f instanceof File)

    const imageUrls: string[] = []
    for (const file of imageFiles) {
      const url = await saveQuestionImageUpload(file)
      imageUrls.push(url)
    }

    const answerImageUrls: string[] = []
    for (const file of answerImageFiles) {
      const url = await saveQuestionImageUpload(file)
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
