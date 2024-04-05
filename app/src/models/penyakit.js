const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.js");
const ObatModel = require("./obat.js");

const PenyakitModel = db.define(
  "penyakit",
  {
    obatId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "obat",
        key: "uid",
      },
      validate: {
        notEmpty: true,
      },
    },
    nama_penyakit: {
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
module.exports = PenyakitModel;
