ALTER TABLE "weather_data" ADD COLUMN "date" timestamp NOT NULL;
ALTER TABLE "weather_data" ADD COLUMN "location" varchar(256) NOT NULL;
ALTER TABLE "weather_data" ADD COLUMN "temperature" varchar(256) NOT NULL;