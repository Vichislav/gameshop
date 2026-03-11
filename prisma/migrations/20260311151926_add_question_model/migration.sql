-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
