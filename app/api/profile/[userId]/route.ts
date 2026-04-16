import { NextRequest, NextResponse } from 'next/server'

import { getUserIdFromRequest } from '@/lib/auth-request'
import prisma from '@/lib/prisma'

interface Params {
  params: {
    userId: string
  }
}

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.userId)

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: user.id,
    login: user.login ?? null,
    email: user.email,
    info: user.info ?? null,
    image: user.image ?? null,
  })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const id = Number(params.userId)

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
  }

  const viewerIdStr = getUserIdFromRequest(req)
  if (!viewerIdStr || Number(viewerIdStr) !== id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = (await req.json().catch(() => null)) as {
    login?: string
    info?: string
  } | null

  if (!body) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { login, info } = body

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(typeof login === 'string' ? { login } : {}),
        ...(typeof info === 'string' ? { info } : {}),
      },
    })

    return NextResponse.json({
      id: updated.id,
      login: updated.login ?? null,
      email: updated.email,
      info: updated.info ?? null,
      image: updated.image ?? null,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 },
    )
  }
}
