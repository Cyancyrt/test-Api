const UsersModel = require("../models/users.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = async (req, res, next) => {
  const sessionUser = req.session.userId;
  const token = req.headers.authorization;
  console.log("token : ", token);
  res.setHeader("Content-Type", "application/json");
  try {
    if (!token || (token == null && !sessionUser)) {
      return res.status(403).json({ Message: "token not found" });
    }
    const accToken = token.split(" ").pop();
    const verify = jwt.verify(accToken, process.env.SCRT_TOKEN);
    const user = await UsersModel.findOne({
      where: {
        [Op.and]: [{ id: verify.id }, { uuid: sessionUser }],
      },
    });
    if (!user.dataValues)
      return res.sendStatus(404).json({
        Message: "user not found",
      });
    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({
      Message: "token not found",
      serverMessage: error,
    });
  }
};
