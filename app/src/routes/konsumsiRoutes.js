const {
  getKonsumsiAll,
  getKonsumsiOne,
  createKonsumsi,
} = require("../controller/konsumsiController.js");
const express = require("express");

const route = express.Router();

route.get("/", getKonsumsiAll);
route.get("/:id", getKonsumsiOne);
route.post("/", createKonsumsi);

module.exports = route;
