'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  fallback?: string
}

export default function BackButton({ fallback = '/' }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  // не показываем на корневой странице
  if (pathname === '/') return null

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }
  //px-2 smmb:px-4 text-cyan-100 text-[10px] smmb:text-[12px] md:text-sm
  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Назад"
      className="flex justify-center items-center pb-[3px] w-[20px] h-[20px] border-2 border-white text-white rounded-[10px] smmb:w-[24px] smmb:h-[24px] smmb:rounded-[12px] hover:bg-white hover:text-slate-900 transition-colors"
    >
      &#8656;
    </button>
  )
}
