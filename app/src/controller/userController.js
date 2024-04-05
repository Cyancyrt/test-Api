const UsersModel = require("../models/users.js");
const bcrypt = require("bcrypt");

const getUserAll = async (req, res) => {
  try {
    const Data = await UsersModel.findAll({
      attributes: ["uuid", "username", "email"],
    });
    res.status(201).json({
      Message: "get all user success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

const getUserOne = async (req, res) => {
  const id = req.params.id;
  try {
    const Data = await UsersModel.findOne({
      attributes: ["uuid", "username", "email", "umur"],
      where: {
        uuid: id,
      },
    });
    res.status(201).json({
      Message: "get user success",
      data: Data,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const userData = {
    ...req.body,
    password: hashPass,
  };
  try {
    await UsersModel.create(userData);
    res.status(201).json({
      Message: "created new user",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  let hashPassword;
  try {
    const Check = await UsersModel.findOne({
      where: {
        uuid: id,
      },
    });
    if (Check == "" || Check == null) {
      return res.status(404).json({
        Message: "No user data found for the given ID",
      });
    } else {
      if (req.body.password == "" || req.body.password == null) {
        hashPassword = Check.password;
      } else {
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(req.body.password, salt);
      }
      const userData = {
        ...req.body,
        password: hashPassword,
      };
      const Data = await UsersModel.update(userData, {
        where: {
          id: Check.id,
        },
      });
      if (Data.length === 0) {
        return res.status(404).json({
          Message: "No user data found for the given ID",
        });
      }
      res.status(200).json({
        Message: "user data updated",
        data: {
          id: id,
          ...userData,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      Message: "server error",
      serverMessage: err,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const Check = await UsersModel.findOne({
      where: {
        uuid: id,
      },
    });
    if (Check.dataValues == "" || Check == null) {
      return res.status(404).json({
        Message: "No user data found for the given ID",
      });
    } else {
      const Data = await UsersModel.destroy({
        where: {
          id: Check.id,
        },
      });
      if (Data.length === 0) {
        return res.status(404).json({
          Message: "No user data found for the given ID",
        });
      }
    }
    res.json({
      Message: "berhasil menghapus user",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      Message: "server error",
      serverMessage: err,
    });
  }
};

module.exports = { getUserAll, getUserOne, createUser, updateUser, deleteUser };
