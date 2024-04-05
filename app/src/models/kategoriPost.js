const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db.js");
const postingModel = require("./post.js");
const kategoriModel = require("./category.js");

const kategoriPost = db.define(
  "kategoriPost",
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: postingModel,
        key: "id",
      },
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: kategoriModel,
        key: "id",
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

postingModel.belongsToMany(kategoriModel, {
  through: "kategoriPost",
  foreignKey: "postId",
});

kategoriModel.belongsToMany(postingModel, {
  through: "kategoriPost",
  foreignKey: "kategoriId",
});

module.exports = kategoriPost;
