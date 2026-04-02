import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { isValidEmailFormat } from '@/lib/email-validation'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
  try {
    const { email, code, mode } = await req.json()
    if (typeof email !== 'string' || !email.trim() || !code) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }
    const emailTrimmed = email.trim()
    if (!isValidEmailFormat(emailTrimmed)) {
      return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 })
    }

    if (mode !== 'login' && mode !== 'register') {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
    }

    // Ищем действующий код
    const validCode = await prisma.verificationCode.findFirst({
      where: {
        email: emailTrimmed,
        code,
        expiresAt: { gt: new Date() },
      },
    })

    if (!validCode) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 },
      )
    }

    // Удаляем использованный код
    await prisma.verificationCode.delete({ where: { id: validCode.id } })

    // Находим пользователя
    let user = await prisma.user.findUnique({ where: { email: emailTrimmed } })

    if (mode === 'login') {
      // Для входа пользователь должен существовать
      if (!user) {
        return NextResponse.json({ error: 'NO_USER' }, { status: 400 })
      }
    }

    if (mode === 'register') {
      // Для регистрации пользователь не должен существовать
      if (user) {
        return NextResponse.json({ error: 'ALREADY_EXISTS' }, { status: 400 })
      }

      user = await prisma.user.create({ data: { email: emailTrimmed } })
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 500 })
    }

    // Создаём JWT
    const token = jwt.sign({ userId: user.id, email: emailTrimmed }, JWT_SECRET, {
      expiresIn: '30d',
    })

    // Возвращаем токен (можно также установить httpOnly cookie)
    return NextResponse.json({ token, user })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
