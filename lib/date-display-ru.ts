/** Единый вывод дат для SSR/клиента (без расхождения locale как у toLocaleString). */

const dateOnlyFmt = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const dateTimeFmt = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

export function formatDateRu(d: Date | string): string {
  const x = typeof d === 'string' ? new Date(d) : d
  return dateOnlyFmt.format(x)
}

export function formatDateTimeRu(d: Date | string): string {
  const x = typeof d === 'string' ? new Date(d) : d
  return dateTimeFmt.format(x)
}
