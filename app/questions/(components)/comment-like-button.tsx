'use client'

import { useState } from 'react'

interface CommentLikeButtonProps {
  commentId: number
  initialLikeList: string[]
  currentUserId: string | null
}

export default function CommentLikeButton({
  commentId,
  initialLikeList,
  currentUserId,
}: CommentLikeButtonProps) {
  const [likeList, setLikeList] = useState<string[]>(() => [...initialLikeList])
  const [isBusy, setIsBusy] = useState(false)

  const isLiked =
    currentUserId !== null && likeList.includes(currentUserId)
  const score = likeList.length

  async function handleClick() {
    if (isBusy) return
    if (currentUserId === null) {
      alert('Войдите, чтобы ставить лайки')
      return
    }

    const prevList = likeList
    const hasId = prevList.includes(currentUserId)
    const optimistic = hasId
      ? prevList.filter((id) => id !== currentUserId)
      : [...prevList, currentUserId]

    setLikeList(optimistic)
    setIsBusy(true)

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
        credentials: 'include',
      })
      const data = (await res.json().catch(() => null)) as {
        likeList?: string[]
        error?: string
      } | null

      if (!res.ok || !data?.likeList) {
        throw new Error(data?.error ?? 'Request failed')
      }
      setLikeList(data.likeList)
    } catch (err) {
      console.error(err)
      setLikeList(prevList)
      alert('Не удалось обновить лайк')
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={isBusy}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
        isLiked
          ? 'border-cyan-600 bg-cyan-600 text-white'
          : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-700'
      } ${isBusy ? 'cursor-not-allowed opacity-60' : ''}`}
      aria-pressed={isLiked}
    >
      <span>{isLiked ? '♥' : '♡'}</span>
      <span>{score}</span>
    </button>
  )
}
