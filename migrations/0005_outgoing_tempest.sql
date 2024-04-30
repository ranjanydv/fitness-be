ALTER TABLE "blog" ADD COLUMN "userId" uuid NOT NULL;
DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
