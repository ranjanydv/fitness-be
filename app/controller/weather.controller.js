const { eq } = require('drizzle-orm');
const createError = require('http-errors');

const db = require('../db/connect');
const {  weatherData } = require('../db/schema');
const catchAsync = require('../utils/catchAsync');

const createWeather = catchAsync(async (req, res) => {
  const { name, description, date, location, temperature } = req.body;
  if (!name || !description || !location || !temperature) {
    throw createError(400, 'Provide all fields');
  }

  const weatherExists = await db.select().from(weatherData).where(eq(weatherData.name, name));
  if (weatherExists.length > 0) {
    throw createError(409, `Weather with name ${name} already exists`);
  }
  const newWeather = await db.insert(weatherData)
    .values({ name, description, date, location, temperature })
    .returning({
      id: weatherData.id,
      name: weatherData.name,
      description: weatherData.description,
      location: weatherData.location,
      temperature: weatherData.temperature,
    });
  return { message: 'Workout Created successfully' };
});


const getWeatherData = catchAsync(async (req, res) => {
  const weather = await db.select().from(weatherData);
  return { weather };
});

const getWeatherDataById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const weather = await db.select().from(weatherData).where(eq(weatherData.id, id));
  if (weather.length === 0) throw createError(404, `Weather with id ${id} not found`);
  return { weather };

});

const deleteWeatherData = catchAsync(async (req, res) => {
  const { id } = req.params;
  await db.delete(weatherData).where(eq(weatherData.id, id));
  return { message: 'WeatherData Deleted Successfully' };
});


module.exports = { createWeather, getWeatherData, getWeatherDataById, deleteWeatherData };