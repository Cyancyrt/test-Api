const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.js");

const KonsumsiModel = db.define(
  "konsumsi",
  {
    tipe_konsumsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_konsumsi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = KonsumsiModel;
