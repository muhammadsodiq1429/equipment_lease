const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admins = sequelize.define("admins", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    // unique: true
    unique: {
      msg:"Username is already in use!"
    },
  },
  email: {
    type: DataTypes.STRING,
    // unique: true
    unique: {
      msg: "Email is already in use!"
    }
  },
  full_name: {
    type: DataTypes.STRING,
  },
  hashed_password: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
  },
  is_creator: {
    type: DataTypes.BOOLEAN,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
  // activation_link: {
    //   type: DataTypes.UUID,
    //   defaultValue: UUIDV4(),
    // },
  });
  
module.exports = Admins;
