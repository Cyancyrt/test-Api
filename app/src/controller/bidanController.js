const BidanModel = require("../models/bidan.js");

const getAllbidan = async (req, res) => {
  try {
    const Data = await BidanModel.findAll({
      attributes: [
        "uid",
        "name",
        "pengalaman",
        "roles",
        "lokasi",
        "nomor_telepon",
        "kategori",
        "biaya",
        "jamTerbang",
        "rating",
      ],
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

const getOneBIdan = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await BidanModel.findOne({
      attributes: [
        "uid",
        "name",
        "deskripsi",
        "kategori",
        "email",
        "roles",
        "lokasi",
        "biaya",
        "nomor_telepon",
        "jamTerbang",
        "rating",
      ],
      where: {
        uid: id,
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

const createBidan = async (req, res) => {
  const Data = { ...req.body };
  try {
    await BidanModel.create(Data);
    res.status(201).json({
      Message: "created new data",
      data: Data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = { getAllbidan, getOneBIdan, createBidan };
