'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import Modal from '@/app/component/Modal'

/** Как у «+ Новый комментарий» в question-comments-panel */
const ADD_QUESTION_BTN_CLASS =
  'w-full rounded-md border border-indigo-400 bg-indigo-50 py-2 text-xs font-medium text-indigo-800 transition-colors hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(';').shift() || '')
  }
  return null
}

type QuestionType = 'technical' | 'hr' | 'other'

interface AddQuestionButtonProps {
  questionType: QuestionType
}

export default function AddQuestionButton({ questionType }: AddQuestionButtonProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const [showAuthRequiredModal, setShowAuthRequiredModal] = useState(false)

  useEffect(() => {
    const token = getCookie('token')
    const userId = getCookie('userId')

    if (!token || !userId) {
      setIsAuth(false)
      return
    }

    fetch(`/api/profile/${userId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setIsAuth(!!data)
      })
      .catch(() => {
        setIsAuth(false)
      })
  }, [])

  const openAuthModalRegister = () => {
    setShowAuthRequiredModal(false)
    window.dispatchEvent(
      new CustomEvent('openAuthModal', { detail: { mode: 'register' as const } }),
    )
  }

  const label = '+ Новый вопрос'

  if (isAuth === null) {
    return (
      <button type="button" className={ADD_QUESTION_BTN_CLASS} disabled>
        {label}
      </button>
    )
  }

  if (isAuth) {
    return (
      <Link href={`/questions/new?type=${questionType}`} className="block w-full">
        <button type="button" className={ADD_QUESTION_BTN_CLASS}>
          {label}
        </button>
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className={ADD_QUESTION_BTN_CLASS}
        onClick={() => setShowAuthRequiredModal(true)}
      >
        {label}
      </button>
      <Modal
        isOpen={showAuthRequiredModal}
        onClose={() => setShowAuthRequiredModal(false)}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center">
          <p className="text-sm text-slate-800">
            Данный функционал доступен только для зарегистрированных пользователей.
            Желаете{' '}
            <button
              type="button"
              onClick={openAuthModalRegister}
              className="cursor-pointer border-b border-cyan-600 font-medium text-cyan-600 hover:border-cyan-500 hover:text-cyan-500"
            >
              зарегистрироваться
            </button>
            ?
          </p>
        </div>
      </Modal>
    </>
  )
}
