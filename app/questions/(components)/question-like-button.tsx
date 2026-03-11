'use client'

import { useState } from 'react'

interface QuestionLikeButtonProps {
  initialScore?: number
  initiallyLiked?: boolean
  onToggleLike?: (nextLiked: boolean) => Promise<void> | void
}

export default function QuestionLikeButton({
  initialScore = 0,
  initiallyLiked = false,
  onToggleLike,
}: QuestionLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initiallyLiked)
  const [score, setScore] = useState(initialScore)
  const [isBusy, setIsBusy] = useState(false)

  async function handleClick() {
    if (isBusy) return

    const nextLiked = !isLiked
    const delta = nextLiked ? 1 : -1

    setIsBusy(true)
    setIsLiked(nextLiked)
    setScore((prev) => prev + delta)

    try {
      if (onToggleLike) {
        await onToggleLike(nextLiked)
      }
    } catch (err) {
      console.error(err)
      setIsLiked((prev) => !prev)
      setScore((prev) => prev - delta)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isBusy}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        isLiked
          ? 'border-cyan-600 bg-cyan-600 text-white'
          : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-700'
      } ${isBusy ? 'opacity-60 cursor-not-allowed' : ''}`}
      aria-pressed={isLiked}
    >
      <span>{isLiked ? '♥' : '♡'}</span>
      <span>{score}</span>
    </button>
  )
}