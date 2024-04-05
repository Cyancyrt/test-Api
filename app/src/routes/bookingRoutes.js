const express = require("express");
const {
  getAllBooking,
  getOneBooking,
  createBooking,
} = require("../controller/bookingController.js");

const route = express.Router();

route.get("/", getAllBooking);
route.get("/:id", getOneBooking);
route.post("/", createBooking);

module.exports = route;
