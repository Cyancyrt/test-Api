const DokterModel = require("../models/dokter.js");
const RumahSakitModel = require("../models/rumahSakit.js");

const getDokterAll = async (req, res) => {
  try {
    const Data = await DokterModel.findAll({
      attributes: [
        "uid",
        "name",
        "roles",
        "pengalaman",
        "lokasi",
        "nomor_telepon",
        "biaya",
        "jamTerbang",
        "kategori",
        "rating",
        "jadwalHari",
      ],
      include: RumahSakitModel,
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

const getDokterOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await DokterModel.findOne({
      attributes: [
        "name",
        "nomor_telepon",
        "deskripsi",
        "email",
        "roles",
        "pengalaman",
        "lokasi",
        "biaya",
        "jamTerbang",
        "kategori",
        "jadwalHari",
        "rating",
      ],
      include: RumahSakitModel,
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

const createDokter = async (req, res) => {
  const Data = { ...req.body };
  try {
    await DokterModel.create(Data);
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

module.exports = { getDokterAll, getDokterOne, createDokter };
