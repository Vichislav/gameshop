import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

import { getUploadsBaseDir } from '@/lib/upload-base-path'

const UPLOAD_SUBDIR = 'comments'

export function getCommentUploadDir(): string {
  return path.join(getUploadsBaseDir(), UPLOAD_SUBDIR)
}

function sanitizeFileName(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9.-]/g, '_')
  return base.slice(0, 100) || 'image'
}

export async function saveCommentImageUpload(file: File): Promise<string> {
  const dir = getCommentUploadDir()
  await mkdir(dir, { recursive: true })
  const bytes = await file.arrayBuffer()
  const ext = path.extname(file.name) || '.jpg'
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${sanitizeFileName(file.name)}`
  const filename = safeName.endsWith(ext) ? safeName : `${safeName}${ext}`
  const filePath = path.join(dir, filename)
  await writeFile(filePath, new Uint8Array(bytes))
  return `/uploads/${UPLOAD_SUBDIR}/${filename}`
}
