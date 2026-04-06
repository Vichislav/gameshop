import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const UPLOAD_SUBDIR = 'questions'

export function getQuestionUploadDir(): string {
  return path.join(process.cwd(), 'public', 'uploads', UPLOAD_SUBDIR)
}

function sanitizeFileName(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9.-]/g, '_')
  return base.slice(0, 100) || 'image'
}

export async function saveQuestionImageUpload(file: File): Promise<string> {
  const dir = getQuestionUploadDir()
  await mkdir(dir, { recursive: true })
  const bytes = await file.arrayBuffer()
  const ext = path.extname(file.name) || '.jpg'
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${sanitizeFileName(file.name)}`
  const filename = safeName.endsWith(ext) ? safeName : `${safeName}${ext}`
  const filePath = path.join(dir, filename)
  await writeFile(filePath, new Uint8Array(bytes))
  return `/uploads/${UPLOAD_SUBDIR}/${filename}`
}

/** Разрешённые URL уже загруженных картинок вопроса (относительные пути). */
export function isAllowedQuestionImageUrl(url: string): boolean {
  return url.startsWith(`/uploads/${UPLOAD_SUBDIR}/`)
}
