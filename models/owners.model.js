const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Owners = sequelize.define("owners", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: {
      msg: "This phone number is already registered!",
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      msg: "This email is already registered!",
    },
  },
  address: {
    type: DataTypes.TEXT,
  },
  company_name: {
    type: DataTypes.STRING,
  },
  hashed_password: {
    type: DataTypes.STRING,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
  },
  activation_link: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
});

module.exports = Owners;
