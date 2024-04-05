const express = require("express");
const {
  getPenyakitAll,
  getPenyakitOne,
  createPenyakit,
} = require("../controller/penyakitController.js");

const route = express.Router();

route.get("/", getPenyakitAll);
route.get("/:id", getPenyakitOne);
route.post("/", createPenyakit);

module.exports = route;
