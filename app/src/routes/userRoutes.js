const {
  getUserAll,
  getUserOne,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/userController.js");
const express = require("express");

const route = express.Router();

route.get("/", getUserAll);
route.get("/:id", getUserOne);
route.post("/", createUser);
route.patch("/:id", updateUser);
route.delete("/:id", deleteUser);

module.exports = route;
