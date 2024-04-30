const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const { meal, ingredient } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');


const createIngredient = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw createError(400, 'Provide all fields');
  }

  const newIngredient = await db.insert(ingredient)
    .values(
      {
        name,
        description,
      }
    )
    .returning({
      id:ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
    });
  return { message: 'Ingredient Created successfully', ingredient: newIngredient };
});


const getIngredients = catchAsync(async (req, res) => {
  const ingredients = await db.select().from(ingredient);
  return { ingredients };
});

const getIngredientById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const ingredientData = await db.select().from(ingredient).where(eq(ingredient.id, id));
  if (ingredientData.length === 0) return createError(404, `Ingredient with id ${id} not found`);
  return { meal: ingredientData };
});


module.exports = { createIngredient, getIngredients, getIngredientById };