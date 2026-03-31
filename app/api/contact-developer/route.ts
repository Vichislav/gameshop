import { NextResponse } from 'next/server'
import { sendDeveloperContactEmail } from '@/lib/email'
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  sanitizeContactMessage,
  validateContactMessageLength,
} from '@/lib/contact-message'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('message' in body) ||
    typeof (body as { message: unknown }).message !== 'string'
  ) {
    return NextResponse.json({ error: 'Ожидается поле message (строка)' }, { status: 400 })
  }

  const raw = (body as { message: string }).message
  const trimmed = raw.trim()

  if (!validateContactMessageLength(trimmed)) {
    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: 'Сообщение не может быть пустым' },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: `Не более ${CONTACT_MESSAGE_MAX_LENGTH} символов` },
      { status: 400 },
    )
  }

  const safe = sanitizeContactMessage(trimmed)
  if (safe.length === 0) {
    return NextResponse.json(
      { error: 'Сообщение не может быть пустым после проверки' },
      { status: 400 },
    )
  }

  try {
    await sendDeveloperContactEmail(safe)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('contact-developer:', e)
    return NextResponse.json({ error: 'Не удалось отправить сообщение' }, { status: 500 })
  }
}
