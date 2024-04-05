const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.js");
const UsersModel = require("./users.js");
const DokterModel = require("./dokter.js");

const bookingModel = db.define(
  "booking",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UsersModel,
        key: "id",
      },
      validate: {
        notEmpty: true,
      },
    },
    dokterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DokterModel,
        key: "id",
      },
      validate: {
        notEmpty: true,
      },
    },
    waktu: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    biaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    history: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);
bookingModel.belongsTo(UsersModel, { foreignKey: "userId" });
bookingModel.belongsTo(DokterModel, { foreignKey: "dokterId" });

module.exports = bookingModel;
