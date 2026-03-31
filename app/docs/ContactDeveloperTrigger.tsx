'use client'

import { useState } from 'react'
import ContactDeveloperModal from './ContactDeveloperModal'

export default function ContactDeveloperTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded border border-indigo-500 bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-800 underline-offset-2 hover:bg-indigo-100 hover:underline"
      >
        Написать письмо разработчику
      </button>
      <ContactDeveloperModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
