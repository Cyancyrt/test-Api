const {
  getAllRs,
  getOneRs,
  createRs,
} = require("../controller/rumahSakitController.js");
const express = require("express");
const { verifyToken } = require("../middleware/verifyToken.js");

const route = express.Router();

route.get("/", getAllRs);
route.get("/:id", getOneRs);
route.post("/", createRs);

module.exports = route;
