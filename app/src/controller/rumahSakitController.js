const RumahSakitModel = require("../models/rumahSakit.js");

const getAllRs = async (req, res) => {
  try {
    const Data = await RumahSakitModel.findAll({
      attributes: ["id", "name", "email", "nomor_telepon", "lokasi", "rating"],
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
    res.status(201).json({
      Message: "get all data success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

const getOneRs = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await RumahSakitModel.findOne({
      attributes: ["id", "name", "lokasi", "rating", "deskripsi"],
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
    res.status(201).json({
      Message: "get data success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

const createRs = async (req, res) => {
  const Data = { ...req.body };
  try {
    await RumahSakitModel.create(Data);
    res.status(201).json({
      Message: "created new data",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = { getAllRs, getOneRs, createRs };
