'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react';

type Props = {
  fallback?: string;
};

export default function BackButton({ fallback = '/' }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  // не показываем на корневой странице
  if (pathname === '/') return null

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button type="button" onClick={handleBack} aria-label="Назад" className='flex justify-center items-center pb-[3px] w-[24px] h-[24px] border-2 border-white text-white rounded-[12px]'>
      &#8656;
    </button>
  );
}