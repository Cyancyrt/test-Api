const KomentarModel = require("../models/komentar.js");
const UsersModel = require("../models/users.js");

const getAllKomen = async (req, res) => {
  try {
    const Data = await KomentarModel.findAll({
      attributes: ["isi", "userId"],
      include: {
        model: UsersModel,
        key: "id",
      },
    });
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

const getOneKomen = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await KomentarModel.findAll({
      attributes: ["isi", "userId"],
      include: UsersModel,
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

const createKomen = async (req, res) => {
  try {
    const body = { ...req.body };
    const data = await KomentarModel.create(body);
    res.status(200).json({
      Message: "create success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error,
    });
  }
};

module.exports = { getAllKomen, getOneKomen, createKomen };
