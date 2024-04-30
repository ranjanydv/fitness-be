const db = require('../db/connect');
const { user } = require('../db/schema');
const { eq } = require('drizzle-orm');


// Get a user by ID
const getUser = async (id) => {
  await db.select().from(user).where(eq(user.id, id));
  return user;
};
// Get a user by ID
const getUserByEmail = async (email) => {
  await db.select().from(user).where(eq(user.email, email));
  return user;
};
module.exports = { getUser, getUserByEmail };