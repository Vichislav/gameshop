import { NextRequest, NextResponse } from 'next/server'

import { getUserIdFromRequest } from '@/lib/auth-request'
import prisma from '@/lib/prisma'

interface Params {
  params: {
    userId: string
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const id = Number(params.userId)

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
  }

  const viewerIdStr = getUserIdFromRequest(req)
  if (!viewerIdStr || Number(viewerIdStr) !== id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = (await req.json().catch(() => null)) as { image?: string } | null

  if (!body || typeof body.image !== 'string') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        image: body.image,
      },
    })

    return NextResponse.json({
      id: updated.id,
      image: updated.image ?? null,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to update avatar' },
      { status: 500 },
    )
  }
}
