-- AlterTable: replace integer likes counter with likeList (user ids who liked)
ALTER TABLE "Question" ADD COLUMN "likeList" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "Question" DROP COLUMN "likes";
