import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

    // Ищем действующий код
    const validCode = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        expiresAt: { gt: new Date() },
      },
    });

    if (!validCode) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    // Удаляем использованный код
    await prisma.verificationCode.delete({ where: { id: validCode.id } });

    // Находим или создаём пользователя
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    // Создаём JWT
    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '30d' });

    // Возвращаем токен (можно также установить httpOnly cookie)
    return NextResponse.json({ token, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}