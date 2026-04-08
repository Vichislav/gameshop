import { notFound } from 'next/navigation'
import { authorDisplayFromUser } from '@/lib/author-display'
import { formatDateRu } from '@/lib/date-display-ru'
import { getCurrentUserIdFromCookies } from '@/lib/auth-cookies'
import { getViewerAuthorLabel } from '@/lib/viewer-author-label'
import prisma from '@/lib/prisma'
import QuestionCard from '@/app/questions/(components)/question-card'
import {
  fetchQuestionsForCard,
  type QuestionForCard,
} from '@/app/questions/question-for-card'
import ProfilePageClient from './ProfilePageClient'

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const id = Number(params.userId)

  if (!Number.isInteger(id)) {
    notFound()
  }

  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    notFound()
  }

  const authorLabel = authorDisplayFromUser({
    id: user.id,
    login: user.login,
    email: user.email,
  })

  const authoredQuestions = await fetchQuestionsForCard({
    where: { author: authorLabel },
    orderBy: { createdAt: 'desc' },
  })

  const currentUserId = getCurrentUserIdFromCookies()
  const viewerAuthorLabel = await getViewerAuthorLabel(currentUserId)

  return (
    <>
      <ProfilePageClient
        user={{
          id: user.id,
          login: user.login ?? '',
          email: user.email,
          createdAt: user.createdAt.toISOString(),
          registeredAtLabel: formatDateRu(user.createdAt),
          info: user.info ?? '',
          image: user.image ?? null,
        }}
      />

      <section
        className="flex w-full flex-col items-center gap-3 bg-gradient-to-tr from-slate-300 to-slate-100 px-4 pt-2 pb-12"
      >
        <h2 className="text-center text-lg font-semibold text-slate-900">
          Вопросы, где вы автор
        </h2>
        <div className="flex w-full max-w-2xl flex-col gap-4">
          {authoredQuestions.length === 0 ? (
            <p className="text-sm text-slate-700">Таких вопросов пока нет.</p>
          ) : (
            authoredQuestions.map((question: QuestionForCard) => (
              <QuestionCard
                key={question.id}
                author={question.author}
                text={question.text ?? ''}
                images={question.images}
                createdAt={question.createdAt}
                editedAt={question.editedAt}
                questionType={question.type}
                questionId={question.id}
                likeList={question.likeList}
                currentUserId={currentUserId}
                answerText={question.answerText}
                answerImages={question.answerImages}
                comments={question.comments}
                canEdit={
                  viewerAuthorLabel !== null &&
                  viewerAuthorLabel === question.author
                }
                viewerAuthorLabel={viewerAuthorLabel}
              />
            ))
          )}
        </div>
      </section>
    </>
  )
}
