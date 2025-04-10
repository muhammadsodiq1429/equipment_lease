const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
const EquipmentItems = require("./equipment_items.model");
const EquipmentStatus = require("./equipment_status.model");

const EquipmentStatusHistory = sequelize.define(
  "equipment_status_history",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipment_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: EquipmentItems,
        key: "id",
      },
    },
    old_status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: EquipmentStatus,
        key: "id",
      },
    },
    new_status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: EquipmentStatus,
        key: "id",
      },
    },
    changed_by_user_id: {
      type: DataTypes.INTEGER,
    },
    changed_by_role: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

EquipmentStatusHistory.belongsTo(EquipmentItems, {
  foreignKey: { name: "equipment_item_id" },
  as: "equipment_item",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",  
}); 
EquipmentItems.hasMany(EquipmentStatusHistory, {
  foreignKey: "equipment_item_id",
  as: "equipment_status_history",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EquipmentStatusHistory.belongsTo(EquipmentStatus, {
  foreignKey: { name: "old_status_id" },
  as: "old_status",
});
EquipmentStatus.hasMany(EquipmentStatusHistory, {
  foreignKey: "old_status_id",
  as: "old_status_history",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EquipmentStatusHistory.belongsTo(EquipmentStatus, {
  foreignKey: { name: "new_status_id" },
  as: "new_status",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EquipmentStatus.hasMany(EquipmentStatusHistory, {
  foreignKey: "new_status_id",
  as: "new_status_history",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = EquipmentStatusHistory;
