const jwt = require("jsonwebtoken");
const UsersModel = require("../models/users.js");

const RefreshToken = async (req, res, next) => {
  res.setHeader("Content-type", "application/json");
  try {
    if (req.session.userId) {
      const refresh_token = req.cookies.refreshToken;
      if (!refresh_token) return res.sendStatus(401).json();
      const user = await UsersModel.findOne({
        where: {
          refresh_token: refresh_token,
        },
      });
      delete user.dataValues.password;
      delete user.dataValues.uuid;
      delete user.dataValues.refresh_token;
      if (!user.dataValues) return res.sendStatus(403);
      const verify = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN,
        (err, token) => {
          if (err) {
            return res.status(401).json({ error: "unauthorized" });
          }
          const accessToken = jwt.sign(
            user.dataValues,
            process.env.SCRT_TOKEN,
            {
              expiresIn: "7d",
            }
          );
          res.json({
            accessToken,
            session: req.session.userId,
          });
        }
      );
      verify;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "server error",
      serverMessage: error,
    });
  }
};

module.exports = RefreshToken;
