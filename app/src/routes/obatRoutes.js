const express = require("express");
const {
  getObatAll,
  getObatOne,
  createObat,
} = require("../controller/obatController.js");

const route = express.Router();

route.get("/", getObatAll);
route.get("/:id", getObatOne);
route.post("/", createObat);

module.exports = route;
