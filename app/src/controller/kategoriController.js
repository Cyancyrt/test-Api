const kategoriModel = require("../models/category.js");

const getAllKategori = async (req, res) => {
  try {
    const Data = await kategoriModel.findAll();
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
      Message: "get all post success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error,
    });
  }
};

const getOneKategori = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await kategoriModel.findOne({
      include: kategoriModel,
      where: {
        slug: id,
      },
    });
    if (!data) {
      return res.status(404).json({
        Message: "No post data found for the given ID",
      });
    }
    if (data.length === 0) {
      return res.status(404).json({
        Message: "No post data found for the given ID",
      });
    }
    res.status(200).json({
      Message: "get post success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMesssage: error,
    });
  }
};

module.exports = { getAllKategori, getOneKategori };
