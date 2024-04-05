const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.js");

const kategoriModel = db.define(
  "kategori",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 25],
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = kategoriModel;
