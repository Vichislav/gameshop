"use client";

import { useState, DragEvent, ChangeEvent } from "react";
import Modal from "@/app/component/Modal";

interface ProfileUser {
  id: number;
  login: string;
  email: string;
  createdAt: string;
  info: string;
  image: string | null;
}

interface ProfilePageClientProps {
  user: ProfileUser;
}

export default function ProfilePageClient({ user: initialUser }: ProfilePageClientProps) {
  const [user, setUser] = useState<ProfileUser>(initialUser);
  const [infoDraft, setInfoDraft] = useState<string>(initialUser.info || "");
  const [loginDraft, setLoginDraft] = useState<string>(initialUser.login || "");
  const [isSaving, setIsSaving] = useState(false);

  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUser.image);
  const [isUploading, setIsUploading] = useState(false);

  const openAvatarModal = () => setAvatarModalOpen(true);
  const closeAvatarModal = () => {
    setAvatarModalOpen(false);
    setSelectedFile(null);
  };

  const handleSaveInfo = async () => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/profile/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          info: infoDraft,
          login: loginDraft,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save info failed:", text);
        alert("Не удалось сохранить данные профиля");
        return;
      }

      const updated = await res.json();
      setUser((prev) => ({
        ...prev,
        info: updated.info ?? prev.info,
        login: updated.login ?? prev.login,
      }));
      alert("Данные профиля сохранены");
    } catch (e) {
      console.error(e);
      alert("Ошибка сети при сохранении профиля");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) {
      alert("Выберите файл изображения");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string;
          const res = await fetch(`/api/profile/${user.id}/avatar`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64 }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Upload avatar failed:", text);
            alert("Не удалось загрузить аватар");
            return;
          }

          const updated = await res.json();
          setUser((prev) => ({
            ...prev,
            image: updated.image ?? base64,
          }));
          setPreview(updated.image ?? base64);
          closeAvatarModal();
        } catch (err) {
          console.error(err);
          alert("Ошибка при сохранении аватара");
        } finally {
          setIsUploading(false);
        }
      };

      reader.readAsDataURL(selectedFile);
    } catch (err) {
      console.error(err);
      alert("Ошибка при чтении файла");
      setIsUploading(false);
    }
  };

  const created = new Date(user.createdAt);
  const day = String(created.getDate()).padStart(2, "0");
  const month = String(created.getMonth() + 1).padStart(2, "0");
  const year = created.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-10 px-4 gap-8 bg-slate-900 text-slate-100">
      <section className="w-full max-w-2xl bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">Профиль пользователя</h1>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <button
            type="button"
            onClick={openAvatarModal}
            className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-400 flex items-center justify-center bg-slate-700 hover:border-cyan-300 transition-colors"
          >
            {user.image ? (
              <img
                src={user.image}
                alt="Аватар"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-center px-2">
                Нажмите, чтобы добавить аватар
              </span>
            )}
          </button>

          <div className="flex-1 flex flex-col gap-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Логин</label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={loginDraft}
                onChange={(e) => setLoginDraft(e.target.value)}
                placeholder="Введите логин"
              />
            </div>
            <div>
              <p className="text-sm">
                <span className="text-slate-400">Email:</span>{" "}
                <span className="font-medium">{user.email}</span>
              </p>
              <p className="text-sm">
                <span className="text-slate-400">Дата регистрации:</span>{" "}
                <span className="font-medium">{formattedDate}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm text-slate-300">
            Информация о пользователе
          </label>
          <textarea
            className="w-full min-h-[120px] rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
            placeholder="Расскажите о себе, интересах, любимых играх и т.п."
            value={infoDraft}
            onChange={(e) => setInfoDraft(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSaveInfo}
            disabled={isSaving}
            className="self-end mt-2 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium"
          >
            {isSaving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </section>

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
              <img
                src={preview}
                alt="Превью"
                className="mt-3 max-h-40 rounded-md object-contain"
              />
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
              {isUploading ? "Загрузка..." : "Загрузить"}
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

