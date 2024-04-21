const bcrypt = require("bcryptjs");
const { eq, lt, gte, ne } = require('drizzle-orm');
const createError = require('http-errors');

const db = require("../db/connect");
const { user } = require("../db/schema");
const catchAsync = require("../utils/catchAsync");



const registerUser = catchAsync(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        throw createError(400, "Provide all fields");
    }

    const userExists = await db.select().from(user).where(eq(user.email, email));
    if (userExists) {
        throw createError(409, "User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
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
    return res.status(201).json({ message: "User registered successfully", user: newUser });
});


// Register a new user
const registerUsers = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).send({ status: 400, message: "Provide all fields" })
    }

    const userExists = await db.select().from(user).where(eq(user.email, email));
    if (userExists) {
        return res.status(409).send({ status: 409, message: "User with email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
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
    return res.status(201).json({ message: "User registered successfully", user: newUser });
};

// Get a user by ID
const getUser = async (id) => {
    const user = await drizzle.select().from(userSchema.users).where(drizzle.eq(userSchema.users.id, id));
    return user;
};

module.exports = { registerUser, getUser };