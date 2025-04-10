const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Equipments = require("./equipments.model");

const EquipmentImages = sequelize.define("equipment_images", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  equipment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Equipments,
      key: "id",
    },
  },
  image_url: {
    type: DataTypes.STRING,
    unique: {
      msg: "Image URL already exists!",
    },
  },
  is_main: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  descreption: {
    type: DataTypes.TEXT,
  },
});

EquipmentImages.belongsTo(Equipments, {
  foreignKey: { name: "equipment_id" },
  as: "equipment",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Equipments.hasMany(EquipmentImages, {
  foreignKey: "equipment_id",
  as: "images",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = EquipmentImages;
