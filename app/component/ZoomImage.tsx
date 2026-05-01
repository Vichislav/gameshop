'use client'

import React, { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

type AnyImgProps = React.ImgHTMLAttributes<HTMLImageElement>

interface ZoomImageProps {
  children: React.ReactElement<AnyImgProps>
  /** Если не задано — берётся из children.props.alt */
  alt?: string
  /** Отключить зум (например для декоративных картинок) */
  disabled?: boolean
}

function getPortalRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  return document.getElementById('modal-root') ?? document.body
}

export default function ZoomImage({ children, alt, disabled }: ZoomImageProps) {
  const [open, setOpen] = useState(false)

  const src = children.props.src
  const finalAlt = alt ?? children.props.alt ?? 'image'

  const canOpen = !disabled && typeof src === 'string' && src.length > 0

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const wrapped = useMemo(() => {
    if (!React.isValidElement(children)) return children
    const nextClassName = [
      children.props.className ?? '',
      canOpen ? 'cursor-pointer' : '',
    ]
      .join(' ')
      .trim()

    const onClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
      children.props.onClick?.(e)
      if (e.defaultPrevented) return
      if (canOpen) setOpen(true)
    }

    return React.cloneElement(children, {
      className: nextClassName || undefined,
      onClick,
    })
  }, [children, canOpen])

  const portalRoot = getPortalRoot()

  return (
    <>
      {wrapped}
      {open && canOpen && portalRoot
        ? ReactDOM.createPortal(
            <div
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
              onClick={() => setOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Image preview"
            >
              <div
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute -top-6 -right-6 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white/90 text-slate-900 shadow hover:bg-white"
                  aria-label="Close"
                >
                  ×
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={finalAlt}
                  className="max-h-[90vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
                />
              </div>
            </div>,
            portalRoot,
          )
        : null}
    </>
  )
}

