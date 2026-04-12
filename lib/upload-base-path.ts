import path from 'path'

/**
 * Базовый каталог для файлов, отдаваемых по URL `/uploads/...`.
 * `UPLOAD_ROOT` — абсолютный путь на проде (например `/var/www/tvjs-uploads`), без `public`.
 * Если не задан — `<cwd>/public/uploads` (локальная разработка).
 */
export function getUploadsBaseDir(): string {
  const raw = process.env.UPLOAD_ROOT
  if (typeof raw === 'string' && raw.trim()) {
    return path.resolve(raw.trim())
  }
  return path.join(process.cwd(), 'public', 'uploads')
}
