/** Строка автора в комментариях/согласованно с POST /api/questions/[id]/comments */
export function authorDisplayFromUser(user: {
  id: number
  login: string | null
  email: string
}): string {
  return user.login?.trim() || user.email || `user-${user.id}`
}
