const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const { user, injuryPreventionTips, blog } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');


const createTip = catchAsync(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw createError(400, 'Provide all fields');
  }

  const newTip = await db.insert(injuryPreventionTips)
    .values({ title, description })
    .returning({
      title: injuryPreventionTips.title,
      description: injuryPreventionTips.description,
    });
  return { message: 'Tip Created successfully', injuryPreventionTips: newTip };
});


const getTips = catchAsync(async (req, res) => {
  const tips = await db.select().from(injuryPreventionTips);
  return { tips };
});

const getTipById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const tip = await db.select().from(injuryPreventionTips).where(eq(injuryPreventionTips.id, id));
  if(tip.length === 0) return createError(404,`Tip with id ${id} not found`);
  return { tip };
});


module.exports = { createTip, getTips, getTipById };