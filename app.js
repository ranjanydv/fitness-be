const { migrate } = require('drizzle-orm/neon-serverless/migrator');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const { eq } = require('drizzle-orm');

const app = express();

// database
const db = require('./app/db/connect');
const { user } = require('./app/db/schema');
const { hashPassword } = require('./app/utils/authUtils');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));

app.use(morgan('dev'));
app.disable('x-powered-by');
app.enable('trust proxy');

app.options('*', cors());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, x-access-token,'
  );
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Pure Motion API.' });
});

app.use('/api', require('./app/routes/index'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;

async function main() {
  await migrate(
    db,
    { migrationsFolder: './migrations' }
  );
}

async function seedAdmin() {
  const adminExists = await db.select().from(user).where(eq(user.email, 'admin@puremotion.com'));
  if (adminExists.length === 0) {
    // await db.delete(user).where(eq(user.email, 'admin@puremotion.com'));
    const hashedPassword = await hashPassword('admin');
    await db.insert(user).values({
      email: 'admin@puremotion.com',
      password: hashedPassword,
      name: 'Pure Motion Admin',
      role:'admin'
    });
    console.log('🚀 ~ Admin User Created');
  }
}

app.listen(PORT, async () => {
  await main();
  await seedAdmin();
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
