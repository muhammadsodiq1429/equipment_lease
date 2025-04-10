const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RentalRates = sequelize.define(
  "rental_rates",
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
    price: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = RentalRates;
