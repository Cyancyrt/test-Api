const ObatModel = require("../models/obat.js");

const getObatAll = async (req, res) => {
  try {
    const Data = await ObatModel.findAll({
      attributes: ["jenis_obat", "nama_obat", "deskripsi", "saran"],
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

const getObatOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await ObatModel.findOne({
      attributes: ["jenis_obat", "nama_obat", "deskripsi", "saran"],
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

const createObat = async (req, res) => {
  const Data = { ...req.body };
  try {
    await ObatModel.create(Data);
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

module.exports = { getObatAll, getObatOne, createObat };
