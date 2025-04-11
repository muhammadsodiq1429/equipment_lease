const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Clients = require("./clients.model");
const Owners = require("./owners.model");
const EquipmentItems = require("./equipment_items.model");
const ContractStatus = require("./contract_status.model");

const Contracts = sequelize.define("contracts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Clients,
      key: "id",
    },
  },
  equipment_item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: EquipmentItems,
      key: "id",
    },
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Owners,
      key: "id",
    },
  },
  status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ContractStatus,
      key: "id",
    },
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  total_amount: {
    type: DataTypes.DECIMAL,
  },
  terms_and_conditions: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Contracts.belongsTo(EquipmentItems, {
  foreignKey: { name: "equipment_item_id" },
  as: "equipment_item",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
EquipmentItems.hasMany(Contracts, {
  foreignKey: "equipment_item_id",
  as: "contracts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Contracts.belongsTo(Clients, {
  foreignKey: { name: "client_id" },
  as: "client",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Clients.hasMany(Contracts, {
  foreignKey: "client_id",
  as: "contracts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Contracts.belongsTo(Owners, {
  foreignKey: { name: "owner_id" },
  as: "owner",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Owners.hasMany(Contracts, {
  foreignKey: "owner_id",
  as: "contracts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Contracts.belongsTo(ContractStatus, {
  foreignKey: { name: "status_id" },
  as: "status",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ContractStatus.hasMany(Contracts, {
  foreignKey: "status_id",
  as: "contracts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Contracts;
