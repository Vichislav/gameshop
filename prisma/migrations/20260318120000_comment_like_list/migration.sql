-- Comment: replace likes counter with likeList (user ids), same as Question
ALTER TABLE "Comment" ADD COLUMN "likeList" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "Comment" DROP COLUMN "likes";
