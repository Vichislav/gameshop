'use client'

import { useState, DragEvent, ChangeEvent, useMemo } from 'react'
import Modal from '@/app/component/Modal'

interface ProfileUser {
  id: number
  login: string
  email: string
  createdAt: string
  /** Дата регистрации, строка с сервера (без гидратации по locale). */
  registeredAtLabel: string
  info: string
  image: string | null
}

interface ProfilePageClientProps {
  /** Только владелец профиля может редактировать данные и аватар. */
  isOwner: boolean
  user: ProfileUser
}

function hasProfileContent(u: ProfileUser): boolean {
  return Boolean(u.login.trim() || u.info.trim())
}

export default function ProfilePageClient({
  isOwner,
  user: initialUser,
}: ProfilePageClientProps) {
  const [user, setUser] = useState<ProfileUser>(initialUser)
  const [infoDraft, setInfoDraft] = useState<string>(initialUser.info || '')
  const [loginDraft, setLoginDraft] = useState<string>(initialUser.login || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(
    () => isOwner && !hasProfileContent(initialUser),
  )

  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(initialUser.image)
  const [isUploading, setIsUploading] = useState(false)

  const storedFilled = useMemo(() => hasProfileContent(user), [user])

  const showInputs = isOwner && (!storedFilled || isEditing)

  const openAvatarModal = () => setAvatarModalOpen(true)
  const closeAvatarModal = () => {
    setAvatarModalOpen(false)
    setSelectedFile(null)
  }

  const handleSaveInfo = async () => {
    try {
      setIsSaving(true)
      const res = await fetch(`/api/profile/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          info: infoDraft,
          login: loginDraft,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.error('Save info failed:', text)
        alert('Не удалось сохранить данные профиля')
        return
      }

      const updated = await res.json()
      setUser((prev) => ({
        ...prev,
        info: updated.info ?? prev.info,
        login: updated.login ?? prev.login,
      }))
      if (typeof updated.info === 'string') {
        setInfoDraft(updated.info)
      }
      if (typeof updated.login === 'string') {
        setLoginDraft(updated.login)
      }
      setIsEditing(false)
      alert('Данные профиля сохранены')
    } catch (e) {
      console.error(e)
      alert('Ошибка сети при сохранении профиля')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setLoginDraft(user.login || '')
    setInfoDraft(user.info || '')
    setIsEditing(false)
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
      alert('Выберите файл изображения')
      return
    }

    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string
          const res = await fetch(`/api/profile/${user.id}/avatar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64 }),
          })

          if (!res.ok) {
            const text = await res.text()
            console.error('Upload avatar failed:', text)
            alert('Не удалось загрузить аватар')
            return
          }

          const updated = await res.json()
          setUser((prev) => ({
            ...prev,
            image: updated.image ?? base64,
          }))
          setPreview(updated.image ?? base64)
          closeAvatarModal()
        } catch (err) {
          console.error(err)
          alert('Ошибка при сохранении аватара')
        } finally {
          setIsUploading(false)
        }
      }

      reader.readAsDataURL(selectedFile)
    } catch (err) {
      console.error(err)
      alert('Ошибка при чтении файла')
      setIsUploading(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0'
    document.cookie = 'userId=; path=/; max-age=0'
    window.location.href = '/'
  }

  return (
    <main className="flex w-full flex-col items-center justify-start py-8 px-4">
      <section className="w-full max-w-2xl rounded-lg border border-slate-300 bg-white p-4 shadow-sm flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center text-slate-900">
          Профиль пользователя
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {isOwner ? (
            <button
              type="button"
              onClick={openAvatarModal}
              className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-slate-300 bg-slate-50 transition-colors hover:border-slate-400"
            >
              {user.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image}
                    alt="Аватар"
                    className="h-full w-full object-cover"
                  />
                </>
              ) : (
                <span className="px-2 text-center text-xs text-slate-600">
                  Нажмите, чтобы добавить аватар
                </span>
              )}
            </button>
          ) : (
            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-slate-300 bg-slate-50">
              {user.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image}
                    alt="Аватар"
                    className="h-full w-full object-cover"
                  />
                </>
              ) : (
                <span className="px-2 text-center text-xs text-slate-600">
                  Нет аватара
                </span>
              )}
            </div>
          )}

          <div className="flex-1 flex flex-col gap-3 w-full min-w-0">
            <div className="flex flex-col gap-1">
              <span className="block text-sm font-medium text-slate-800">
                Логин
              </span>
              {showInputs ? (
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={loginDraft}
                  onChange={(e) => setLoginDraft(e.target.value)}
                  placeholder="Введите логин"
                />
              ) : (
                <p className="text-sm font-medium text-slate-900">
                  {user.login.trim() ? user.login : 'Не указан'}
                </p>
              )}
            </div>
            <div>
              {/* <p className="text-sm text-slate-800">
                <span className="text-slate-600">Email:</span>{' '}
                <span className="font-medium text-slate-900">{user.email}</span>
              </p> */}
              <p className="text-sm text-slate-800">
                <span className="text-slate-600">Дата регистрации:</span>{' '}
                <span className="font-medium text-slate-900">
                  {user.registeredAtLabel}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="block text-sm font-medium text-slate-800">
            Информация о пользователе
          </span>
          {showInputs ? (
            <textarea
              className="w-full min-h-[120px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
              placeholder="Расскажите о себе, интересах, любимых играх и т.п."
              value={infoDraft}
              onChange={(e) => setInfoDraft(e.target.value)}
            />
          ) : (
            <p className="text-sm text-slate-800 whitespace-pre-line min-h-[1.5rem]">
              {user.info.trim() ? user.info : '—'}
            </p>
          )}
          {isOwner && (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleLogout}
                className="min-w-[140px] rounded-md border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Выйти
              </button>
              <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
                {storedFilled && !isEditing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setLoginDraft(user.login || '')
                      setInfoDraft(user.info || '')
                      setIsEditing(true)
                    }}
                    className="min-w-[140px] rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
                  >
                    Редактировать
                  </button>
                ) : (
                  <>
                    {storedFilled && isEditing && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="min-w-[140px] rounded-md border border-slate-400 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-60"
                      >
                        Отмена
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => void handleSaveInfo()}
                      disabled={isSaving}
                      className="min-w-[140px] rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {isOwner && (
      <Modal isOpen={isAvatarModalOpen} onClose={closeAvatarModal}>
        <div className="w-full max-w-md flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-center mb-2">
            Загрузка аватара
          </h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-slate-500 rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-slate-900 text-center cursor-pointer"
          >
            <p className="text-sm text-slate-200">
              Перетащите изображение сюда
            </p>
            <p className="text-xs text-slate-400">
              или нажмите кнопку ниже, чтобы выбрать файл
            </p>
            {preview && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Превью"
                  className="mt-3 max-h-40 rounded-md object-contain"
                />
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sm cursor-pointer">
              Выбрать файл
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>

            <button
              type="button"
              onClick={handleUploadAvatar}
              disabled={isUploading || !selectedFile}
              className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isUploading ? 'Загрузка...' : 'Загрузить'}
            </button>
          </div>
        </div>
      </Modal>
      )}
    </main>
  )
}
