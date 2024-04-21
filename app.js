const { migrate } = require("drizzle-orm/neon-serverless/migrator");
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');

const app = express();

// database
const db = require('./app/db/connect');

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

app.use("/api", require("./app/routes/index"));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
async function main() {
    await migrate(
        db,
        { migrationsFolder: "./migrations" }
    );
}

app.listen(PORT, () => {
    main();
    console.log(`Server is running on port http://localhost:${PORT}.`);
});
