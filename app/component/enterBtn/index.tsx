'use client'
import Modal from '../Modal'
import { useEffect, useState } from 'react'

type AuthMode = 'login' | 'register'

interface HeaderUser {
  id: number
  login: string | null
  image: string | null
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(';').shift() || '')
  }
  return null
}

export default function EnterBtn() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [suggestedAction, setSuggestedAction] = useState<AuthMode | null>(null)
  const [headerUser, setHeaderUser] = useState<HeaderUser | null>(null)

  const openModal = () => {
    if (headerUser) {
      window.location.href = `/profile/${headerUser.id}`
      return
    }

    setModalOpen(true)
    setStep('email')
    setEmail('')
    setCode('')
    setAuthMode(null)
    setMessage(null)
    setSuggestedAction(null)
  }
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    const token = getCookie('token')
    const userId = getCookie('userId')

    if (!token || !userId) {
      setHeaderUser(null)
      return
    }

    fetch(`/api/profile/${userId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setHeaderUser({
            id: data.id,
            login: data.login ?? null,
            image: data.image ?? null,
          })
        } else {
          setHeaderUser(null)
        }
      })
      .catch(() => {
        setHeaderUser(null)
      })
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ mode?: AuthMode }>).detail
      setModalOpen(true)
      setStep('email')
      setEmail('')
      setCode('')
      setAuthMode(detail?.mode ?? null)
      setMessage(null)
      setSuggestedAction(null)
    }
    window.addEventListener('openAuthModal', handler)
    return () => window.removeEventListener('openAuthModal', handler)
  }, [])

  const sendCode = async (mode: AuthMode) => {
    try {
      setMessage(null)
      setSuggestedAction(null)

      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        body: JSON.stringify({ email, mode }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (res.ok) {
        setAuthMode(mode)
        setStep('code')
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('Send code failed:', data)

        if (data?.error === 'NO_USER' && mode === 'login') {
          setMessage(
            'На такой email нет зарегистрированных пользователей. Желаете зарегистрироваться?',
          )
          setSuggestedAction('register')
        } else if (data?.error === 'ALREADY_EXISTS' && mode === 'register') {
          setMessage(
            'По этому email уже есть зарегистрированный пользователь. Желаете войти по этой почте?',
          )
          setSuggestedAction('login')
        } else {
          alert('Ошибка отправки кода. Попробуйте позже.')
        }
      }
    } catch (err) {
      console.error('Network error:', err)
      alert('Сетевая ошибка')
    }
  }

  const verifyCode = async () => {
    if (!authMode) {
      alert('Неизвестный режим авторизации. Попробуйте заново.')
      return
    }

    const res = await fetch('/api/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code, mode: authMode }),
    })
    const data = await res.json()
    if (res.ok) {
      const userId = data.user?.id

      // Сохраняем токен и id пользователя в cookies
      const maxAgeSeconds = 60 * 60 * 24 * 30 // 30 дней
      document.cookie = `token=${encodeURIComponent(
        data.token,
      )}; path=/; max-age=${maxAgeSeconds}`

      if (userId) {
        document.cookie = `userId=${encodeURIComponent(
          String(userId),
        )}; path=/; max-age=${maxAgeSeconds}`
      }

      // Перенаправляем пользователя на страницу его профиля
      if (userId) {
        window.location.href = `/profile/${userId}`
      } else {
        // fallback, если по какой‑то причине id нет
        window.location.href = '/'
      }
      closeModal() //закрывваем модальное окно
    } else {
      if (data?.error === 'NO_USER') {
        alert(
          'На такой email нет зарегистрированных пользователей. Попробуйте зарегистрироваться.',
        )
      } else if (data?.error === 'ALREADY_EXISTS') {
        alert(
          'По этому email уже есть зарегистрированный пользователь. Попробуйте войти.',
        )
      } else {
        alert('Неверный код')
      }
    }
  }

  const initials = headerUser?.login
    ? headerUser.login.slice(0, 2).toUpperCase()
    : null

  return (
    <>
      <button
        className="group w-6 h-6 rounded-full border border-cyan-300 flex items-center justify-center bg-cyan-100 text-slate-900 text-[10px] smmb:text-[12px] md:text-sm hover:bg-cyan-200 transition-colors"
        onClick={openModal}
      >
        {headerUser ? (
          headerUser.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={headerUser.image}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-semibold">
              {initials ?? 'U'}
            </div>
          )
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 smmb:w-6 smmb:h-6 text-gray-300 group-hover:text-slate-900 transition-colors"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path
                d="M4 20a8 8 0 0116 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form className="flex flex-col justify-center items-center gap-8">
          {step === 'email' ? (
            <>
              <h1>Registration / Login</h1>
              <label className="w-[80%] flex flex-col gap-1 items-centr justify-start">
                <h2 className="text-[14px] smmb:text-[18px]">email</h2>
                <input
                  type="text"
                  className="w-[100%] border-2 h-8 p-2 rounded-md"
                  placeholder="enter the email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-[10px] smmb:text-[12px]">
                  the email must not contain unprintable characters
                </p>
              </label>

              {message && (
                <div className="w-[80%] text-center text-sm">
                  <p className="mb-2">{message}</p>
                  {suggestedAction === 'register' && (
                    <button
                      type="button"
                      onClick={() => sendCode('register')}
                      className="w-[60%] h-[30px] border-2 border-blue-500 mx-auto my-2 flex justify-center items-center rounded no-parent-hover active:border-4"
                    >
                      Registration
                    </button>
                  )}
                  {suggestedAction === 'login' && (
                    <button
                      type="button"
                      onClick={() => sendCode('login')}
                      className="w-[60%] h-[30px] border-2 border-blue-500 mx-auto my-2 flex justify-center items-center rounded no-parent-hover active:border-4"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}

              {!message && (
                <>
                  <button
                    type="button"
                    onClick={() => sendCode('register')}
                    className="w-[60%] h-[30px] border-2 border-blue-500 m-2 flex justify-center items-center rounded no-parent-hover active:border-4"
                  >
                    Registration
                  </button>
                  <button
                    type="button"
                    onClick={() => sendCode('login')}
                    className="w-[60%] h-[30px] border-2 border-blue-500 m-2 flex justify-center items-center rounded no-parent-hover active:border-4"
                  >
                    Login
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="email code"
                className="w-[80%] border-2 h-8 p-2 rounded-md"
              />
              <button
                type="button"
                onClick={verifyCode}
                className="w-[60%] h-[30px] border-2 border-blue-500 m-2 flex justify-center items-center rounded no-parent-hover active:border-4"
              >
                Enter
              </button>
            </div>
          )}
        </form>
      </Modal>
    </>
  )
}
