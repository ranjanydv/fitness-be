ALTER TABLE "blog" DROP CONSTRAINT "blog_userId_user_id_fk";

ALTER TABLE "blog" DROP COLUMN IF EXISTS "userId";