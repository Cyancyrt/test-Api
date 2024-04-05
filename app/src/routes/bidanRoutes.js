const express = require("express");
const {
  getAllbidan,
  getOneBIdan,
  createBidan,
} = require("../controller/bidanController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const route = express.Router();

route.get("/", getAllbidan);
route.get("/:id", getOneBIdan);
route.post("/", createBidan);
module.exports = route;
