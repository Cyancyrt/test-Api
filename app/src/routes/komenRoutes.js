const express = require("express");
const {
  getAllKomen,
  getOneKomen,
  createKomen,
} = require("../controller/komentarController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const routes = express.Router();

routes.get("/", getAllKomen);
routes.get("/:id", getOneKomen);
routes.post("/", verifyToken, createKomen);

module.exports = routes;
