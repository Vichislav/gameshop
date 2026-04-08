import { getCurrentUserIdFromCookies } from '@/lib/auth-cookies'
import { getViewerAuthorLabel } from '@/lib/viewer-author-label'
import prisma from '@/lib/prisma'
import AddQuestionButton from '../(components)/add-question-button'
import QuestionCard from '../(components)/question-card'
import {
  questionForCardSelect,
  type QuestionForCard,
} from '../question-for-card'

export const dynamic = 'force-dynamic'

async function getTechnicalQuestions() {
  return prisma.question.findMany({
    select: questionForCardSelect,
    where: { type: 'technical' },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function Technical() {
  const questions = await getTechnicalQuestions()
  const currentUserId = getCurrentUserIdFromCookies()
  const viewerAuthorLabel = await getViewerAuthorLabel(currentUserId)

  return (
    <section
      className="flex flex-col w-[100%] gap-[20px] justify-start items-center 
        min-h-screen min-w-[100%] bg-gradient-to-tr from-slate-300 to-slate-100
        p-4"
    >
      <h1 className="text-center">Технические вопросы</h1>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-3">
          <AddQuestionButton questionType="technical" />
        </div>

        {questions.length === 0 ? (
          <p className="text-sm text-slate-700">Вопросов пока нет</p>
        ) : (
          questions.map((question: QuestionForCard) => (
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
  )
}
