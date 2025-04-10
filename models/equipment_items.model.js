const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Equipments = require("./equipments.model");
const EquimentStatus = require("./equipment_status.model");

const EquipmentItems = sequelize.define("equipment_items", {
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
  serial_number: {
    type: DataTypes.STRING,
    unique: {
      msg: "Serial number already exists!",
    },
  },
  status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: EquimentStatus,
      key: "id",
    },
  },
});

EquipmentItems.belongsTo(Equipments, {
  foreignKey: { name: "equipment_id" },
  as: "equipment",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Equipments.hasMany(EquipmentItems, {
  foreignKey: "equipment_id",
  as: "items",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EquipmentItems.belongsTo(EquimentStatus, {
  foreignKey: { name: "status_id" },
  as: "status",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
EquimentStatus.hasMany(EquipmentItems, {
  foreignKey: "status_id",
  as: "items",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = EquipmentItems;
