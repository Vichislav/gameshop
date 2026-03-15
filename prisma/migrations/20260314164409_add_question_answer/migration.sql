-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answerImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "answerText" TEXT;
