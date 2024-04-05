const express = require("express");
const {
  getAllPost,
  getOnePost,
  createPost,
} = require("../controller/postingController.js");

const route = express.Router();

route.get("/", getAllPost);
route.get("/:id", getOnePost);
route.post("/", createPost);

module.exports = route;
