const PenyakitModel = require("../models/penyakit.js");

const getPenyakitAll = async (req, res) => {
  try {
    const Data = await PenyakitModel.findAll({
      attributes: ["nama_penyakit", "deskripsi"],
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

const getPenyakitOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await PenyakitModel.findOne({
      attributes: ["nama_penyakit", "deskripsi"],
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

const createPenyakit = async (req, res) => {
  const Data = { ...req.body };
  try {
    await PenyakitModel.create(Data);
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

module.exports = { getPenyakitAll, getPenyakitOne, createPenyakit };
