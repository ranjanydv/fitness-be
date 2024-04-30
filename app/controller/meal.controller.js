const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const { meal } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');


const createMeal = catchAsync(async (req, res) => {
  const { name, description, image } = req.body;
  const { id: userId } = req.user;

  if (!name || !description) {
    throw createError(400, 'Provide all fields');
  }

  const newMeal = await db.insert(meal)
    .values(
      {
        name,
        description,
        image: image ? image : '/uploads/puremotion.jpg',
        userId:userId.toString()
      }
    )
    .returning({
      name: meal.name,
      description: meal.description,
      image: meal.image,
      userId: meal.userId
    });
  return { message: 'Meal Created successfully', meal: newMeal };
});


const getMeals = catchAsync(async (req, res) => {
  const meals = await db.select().from(meal);
  return { meals };
});

const getMealById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const mealData = await db.select().from(meal).where(eq(meal.id, id));
  if (mealData.length === 0) return createError(404, `Tip with id ${id} not found`);
  return { meal: mealData };
});


module.exports = { createMeal, getMeals, getMealById };