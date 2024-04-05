const express = require("express");
const {
  getDokterAll,
  getDokterOne,
  createDokter,
} = require("../controller/dokterController.js");

const route = express.Router();

route.get("/", getDokterAll);
route.get("/:id", getDokterOne);
route.post("/", createDokter);

module.exports = route;
