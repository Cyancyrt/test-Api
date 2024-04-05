const bookingModel = require("../models/booking.js");
const DokterModel = require("../models/dokter.js");
const UsersModel = require("../models/users.js");

const getAllBooking = async (req, res) => {
  try {
    const Data = await bookingModel.findAll({
      include: [{ model: DokterModel }, { model: UsersModel }],
    });
    if (!Data) {
      return res.status(404).json({
        Message: "No post Data found for the given ID",
      });
    }
    if (Data.length === 0) {
      return res.status(404).json({
        Message: "No post Data found for the given ID",
      });
    }
    res.status(200).json({
      Message: "get all data success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error,
    });
  }
};

const getOneBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await bookingModel.findOne({
      where: {
        id: id,
      },
    });
    if (!Data) {
      return res.status(404).json({
        Message: "No post Data found for the given ID",
      });
    }
    if (Data.length === 0) {
      return res.status(404).json({
        Message: "No post Data found for the given ID",
      });
    }
  } catch (error) {
    res.status(500).json({
      serverMesssage: "server error",
      error: error,
    });
  }
};

const createBooking = async (req, res) => {
  const body = { ...req.body };
  try {
    const Data = await bookingModel.create(body);
    res.status(200).json({
      Message: "create success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      serverMesssage: "server error",
      error: error,
    });
  }
};

module.exports = { getAllBooking, getOneBooking, createBooking };
