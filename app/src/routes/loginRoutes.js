const express = require("express");
const { logIn, logOut, reLog } = require("../controller/loginController.js");

const RefreshToken = require("../middleware/refreshToken.js");
const route = express.Router();

route.post("/login", logIn);
route.delete("/logout", logOut);
route.get("/token", RefreshToken, reLog);

module.exports = route;
