const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const { workout } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');

const createWorkout = catchAsync(async (req, res) => {
  const { name, date, time } = req.body;
  const { id: userId } = req.user;

  if (!name || !date || !time) {
    throw createError(400, 'Provide all fields');
  }

  const workoutExist = await db.select().from(workout).where(eq(workout.name, name));
  if (workoutExist.length > 0) {
    throw createError(409, `Workout with name ${name} already exists`);
  }
  const newWorkout = await db.insert(workout).values({
    name, date, time, userId: userId.toString()
  });
  return { message: 'Workout Created successfully' };
});


const getWorkouts = catchAsync(async (req, res) => {
  const workouts = await db.select().from(workout);
  return { workouts };
});

const getWorkoutByID = catchAsync(async (req, res) => {
  const { id } = req.params;
  const workoutData = await db.select().from(workout).where(eq(workout.id, id));
  if (workoutData.length === 0) throw createError(404, `Workout with id ${id} not found`);
  return { workout: workoutData };

});

const deleteWorkout = catchAsync(async (req, res) => {
  const { id } = req.params;
  await db.delete(workout).where(eq(workout.id, id));
  return { message: 'Workout Deleted Successfully' };
});


module.exports = { createWorkout, getWorkouts, getWorkoutByID, deleteWorkout };