const {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  time,
} = require('drizzle-orm/pg-core');

const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  role: varchar('role', { length: 256 }).default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const workout = pgTable('workout', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  date: timestamp('date', { mode: 'string' }).notNull(),
  time: time('time').notNull(),
  userId: uuid('user_id')
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
const blog = pgTable('blog', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('name', { length: 256 }).notNull(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  content: text('content').notNull(),
  featuredImage: text('featuredImage'),
  // userId: uuid('userId').references(() => user.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
const meal = pgTable('meal', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('content').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: uuid('userId').references(() => user.id).notNull(),
});
const mealDetail = pgTable('meal_detail', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('content').notNull(),
  mealId: uuid('mealId').references(() => meal.id).notNull(),
  ingredientId: uuid('ingredientId').references(() => ingredient.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
const ingredient = pgTable('ingredient', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
const weatherData = pgTable('weather_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
const injuryPreventionTips = pgTable('injury_prevention_tips', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('name', { length: 256 }).notNull(),
  description: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

module.exports = { user, workout, blog, meal, mealDetail, ingredient, weatherData, injuryPreventionTips };