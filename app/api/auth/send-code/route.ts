import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Генерация 6-значного кода
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 минут

    // Удаляем старые коды для этого email
    await prisma.verificationCode.deleteMany({ where: { email } });

    // Сохраняем новый код
    await prisma.verificationCode.create({
      data: { email, code, expiresAt },
    });

    // Отправляем письмо
    await sendVerificationEmail(email, code);

    return NextResponse.json({ message: 'Code sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send code' }, { status: 500 });
  }
}