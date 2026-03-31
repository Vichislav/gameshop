'use client'

import { useCallback, useState } from 'react'
import Modal from '@/app/component/Modal'
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  sanitizeContactMessage,
} from '@/lib/contact-message'

type ContactDeveloperModalProps = {
  isOpen: boolean
  onClose: () => void
}

function validateClientMessage(raw: string): string | null {
  const t = raw.trim()
  if (t.length === 0) return 'Сообщение не может быть пустым'
  if (t.length > CONTACT_MESSAGE_MAX_LENGTH) {
    return `Не более ${CONTACT_MESSAGE_MAX_LENGTH} символов`
  }
  const safe = sanitizeContactMessage(t)
  if (safe.length === 0) return 'Текст не прошёл проверку безопасности'
  return null
}

export default function ContactDeveloperModal({
  isOpen,
  onClose,
}: ContactDeveloperModalProps) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const resetAndClose = useCallback(() => {
    setText('')
    setError(null)
    setPending(false)
    onClose()
  }, [onClose])

  const handleSubmit = async () => {
    setError(null)
    const err = validateClientMessage(text)
    if (err) {
      setError(err)
      return
    }
    const payload = sanitizeContactMessage(text.trim())
    setPending(true)
    try {
      const res = await fetch('/api/contact-developer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: payload }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Ошибка отправки')
        return
      }
      resetAndClose()
    } catch {
      setError('Сеть недоступна. Попробуйте позже.')
    } finally {
      setPending(false)
    }
  }

  const trimmedLen = text.trim().length

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose}>
      <div className="flex h-full min-h-0 flex-col gap-3 px-1 pb-2 lg:px-2">
        <h2 className="text-center text-base font-semibold text-slate-800 md:text-lg">
          Отправить сообщение на почту разработчику
        </h2>

        <label htmlFor="contact-dev-message" className="text-sm text-slate-600">
          Текст сообщения
        </label>
        <div className="flex min-h-0 flex-col [height:calc(0.55*var(--modal-height))]">
          <textarea
            id="contact-dev-message"
            name="message"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setError(null)
            }}
            maxLength={CONTACT_MESSAGE_MAX_LENGTH}
            disabled={pending}
            className="h-full min-h-0 w-full resize-none rounded-md border border-slate-300 p-2 text-sm text-slate-900 outline-none ring-slate-400 focus:border-indigo-500 focus:ring-1 disabled:opacity-60"
            placeholder="Введите текст…"
            autoComplete="off"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{error ? <span className="text-red-600">{error}</span> : '\u00a0'}</span>
          <span>
            {trimmedLen > CONTACT_MESSAGE_MAX_LENGTH ? (
              <span className="text-red-600">{trimmedLen}</span>
            ) : (
              trimmedLen
            )}
            /{CONTACT_MESSAGE_MAX_LENGTH}
          </span>
        </div>

        <div className="mt-auto flex flex-row justify-between gap-3 border-t border-slate-200 pt-3">
          <button
            type="button"
            onClick={resetAndClose}
            disabled={pending}
            className="rounded-md border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 disabled:opacity-50"
          >
            Отменить
          </button>
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={pending}
            className="rounded-md border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            {pending ? 'Отправка…' : 'Отправить'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
