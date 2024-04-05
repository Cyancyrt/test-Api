const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.js");
const UsersModel = require("./users.js");

const KomentarModel = db.define(
  "komentar",
  {
    isi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

UsersModel.hasMany(KomentarModel);
KomentarModel.belongsTo(UsersModel, { foreignKey: "userId" });

module.exports = KomentarModel;
