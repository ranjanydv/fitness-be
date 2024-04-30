const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id,role) => {
    return jwt.sign({ id: id,role:role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const hashPassword = async (password) => await bcrypt.hash(password, 12);

const comparePassword = async (password, dbPassword) => await bcrypt.compare(password, dbPassword);

module.exports = { generateToken, hashPassword, comparePassword }