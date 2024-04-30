ALTER TABLE "weather_data" RENAME COLUMN "content" TO "description";
ALTER TABLE "weather_data" ALTER COLUMN "location" SET DATA TYPE text;