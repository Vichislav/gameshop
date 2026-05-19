import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

/** Список существующих тегов (для подсказок при вводе) */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''

  try {
    const tags = await prisma.tag.findMany({
      where: q
        ? { name: { contains: q, mode: 'insensitive' } }
        : undefined,
      orderBy: { name: 'asc' },
      take: 15,
      select: { name: true },
    })

    return NextResponse.json(tags.map((t) => t.name))
  } catch (e) {
    console.error('GET /api/tags', e)
    return NextResponse.json({ error: 'Failed to load tags' }, { status: 500 })
  }
}
