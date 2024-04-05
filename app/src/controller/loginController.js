const UsersModel = require("../models/users.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const Check = await UsersModel.findOne({
      where: {
        email: email,
      },
    });
    if (Check && (await bcrypt.compare(password, Check.password))) {
      req.session.userId = Check.uuid;
      const session = req.session.uuid;
      delete Check.dataValues.password;
      delete Check.dataValues.uuid;
      delete Check.dataValues.refresh_token;
      const accessToken = jwt.sign(Check.dataValues, process.env.SCRT_TOKEN, {
        expiresIn: "1d",
      });
      const refreshToken = jwt.sign(
        Check.dataValues,
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      await UsersModel.update(
        { refresh_token: refreshToken },
        {
          where: {
            id: Check.id,
          },
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        Message: "login berhasil",
        accessToken,
        session,
        roles: Check.dataValues.roles,
      });
    } else {
      res.status(500).json({
        Message: "Wrong pass or account",
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

const logOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204).json({ Message: "no token" });
    const user = await UsersModel.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    user.update({ refresh_token: null });
    res.clearCookie("refreshToken");
    res.clearCookie("userId");
    req.session.destroy((err) => {
      if (err)
        return res.sendStatus(400).json({ Message: "tidak dapat logout" });
      res.status(200).json({
        Message: "anda telah logout",
      });
    });
  } catch (error) {
    res.status(500).json({
      Message: null,
      serverMessage: error,
    });
  }
};

const reLog = async (req, res) => {
  if (!req.session.userId) {
    return res.status(200).json({
      login: false,
      Message: "anda belum login",
    });
  }
  const user = await UsersModel.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.sendStatus(400).json({ Message: "user tidak ditemukan" });
  }
};

module.exports = { logIn, logOut, reLog };
