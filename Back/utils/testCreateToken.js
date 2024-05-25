require("dotenv").config();
const { createToken } = require("./createToken");

const token = createToken(123); // Replace 123 with the user ID you want to encode in the token
console.log("Generated JWT:", token);