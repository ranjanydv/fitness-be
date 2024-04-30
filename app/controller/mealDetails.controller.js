const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const { meal, mealDetail, ingredient } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');


const createMealDetail = catchAsync(async (req, res) => {
  const { name, description, mealId, ingredientId } = req.body;
  if (!mealId) throw createError(400, 'Create Meal First');
  if (!ingredientId) throw createError(400, 'Create Ingredient First');

  if (!name || !description) {
    throw createError(400, 'Provide all fields');
  }
  // Foreign Key Checks
  const mealExist = await db.select().from(meal).where(eq(meal.id, mealId));
  if (mealExist.length === 0) throw createError(404, `Meal with id ${mealId} does not exist`);
  const ingredientExist = await db.select().from(ingredient).where(eq(ingredient.id, ingredientId));
  if (ingredientExist.length === 0) throw createError(404, `Ingredient with id ${ingredientId} does not exist`);

  const newMealDetail = await db.insert(mealDetail)
    .values(
      {
        name,
        description,
        mealId,
        ingredientId
      }
    )
    .returning({
      id: mealDetail.id,
      name: mealDetail.name,
      description: mealDetail.description,
      mealId: mealDetail.mealId,
      ingredientId: ingredient.id,
    });
  return { message: 'Meal Detail Created successfully', meal: newMealDetail };
});


const getMealDetails = catchAsync(async (req, res) => {
  const mealDetails = await db.select().from(mealDetail);
  return { mealDetails };
});

const getMealDetailById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const mealDetailData = await db.select().from(mealDetail).where(eq(mealDetail.id, id));
  if (mealDetailData.length === 0) return createError(404, `Tip with id ${id} not found`);
  return { mealDetail: mealDetailData };
});


module.exports = { createMealDetail, getMealDetails, getMealDetailById };