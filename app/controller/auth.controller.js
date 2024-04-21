const { eq, lt, gte, ne } = require('drizzle-orm');
const createError = require('http-errors');

const db = require("../db/connect");
const { user } = require("../db/schema");
const catchAsync = require("../utils/catchAsync");
const { generateToken, hashPassword, comparePassword } = require("../utils/authUtils");



// Register a new user
const registerUser = catchAsync(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        throw createError(400, "Provide all fields");
    }

    const userExists = await db.select().from(user).where(eq(user.email, email));
    if (userExists) {
        throw createError(409, "User with email already exists");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await db.insert(user).values({
        email,
        password: hashedPassword,
        name,
    }).returning({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
    return { message: "User registered successfully", user: newUser };
});


const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw createError(400, "Provide all fields");

    const userExists = await db.select().from(user).where(eq(user.email, email));
    if (!userExists) throw createError(404, "User not found");

    const matched = await comparePassword(password, userExists[0].password);
    if (!matched) throw createError(401, "Incorrect Credentials");

    const token = generateToken(userExists.id);
    return { token: "Bearer " + token };
});



// Get a user by ID
const getUser = async (id) => {
    const user = await drizzle.select().from(userSchema.users).where(drizzle.eq(userSchema.users.id, id));
    return user;
};

module.exports = { registerUser, getUser, login };