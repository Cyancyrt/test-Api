const KonsumsiModel = require("../models/konsumsi.js");

const getKonsumsiAll = async (req, res) => {
  try {
    const Data = await KonsumsiModel.findAll({
      attributes: ["nama_konsumsi", "tipe_konsumsi", "deskripsi"],
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

const getKonsumsiOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await KonsumsiModel.findOne({
      attributes: ["nama_konsumsi", "tipe_konsumsi", "deskripsi"],
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

const createKonsumsi = async (req, res) => {
  const Data = { ...req.body };
  try {
    await KonsumsiModel.create(Data);
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

module.exports = { getKonsumsiAll, getKonsumsiOne, createKonsumsi };
