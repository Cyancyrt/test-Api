const express = require("express");
const {
  getAllKategori,
  getOneKategori,
} = require("../controller/kategoriController.js");

const route = express.Router();

route.get("/", getAllKategori);
route.get("/:id", getOneKategori);

module.exports = route;
