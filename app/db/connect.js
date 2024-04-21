const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

const pool = new Pool({
    connectionString: process.env.DATABASE_CONNECTION,
    ssl: true,
});

const db = drizzle(pool);
module.exports = db;