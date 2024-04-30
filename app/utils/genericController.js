// const db = require("../db/connect");
// const { user } = require('../db/schema');
// const { eq } = require('drizzle-orm');
// const createHttpError = require('http-errors');
//
//
// exports.getOrThrow = async (model, filter = {}) => {
//   const response =     await db.select().from(model).where(eq( filter ));
//
//   if (response) {
//     return response
//   } else {
//     throw createHttpError(404, `Not Found`)
//   }
// }