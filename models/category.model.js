const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: {
        msg: "Name already exists!",
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Category;
