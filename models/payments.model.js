const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Contracts = require("./contracts.model");
const PaymentStatus = require("./payment_status.model");

const Payments = sequelize.define("payments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contract_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Contracts,
      key: "id",
    },
  },
  status_id: {
    type: DataTypes.INTEGER,
    references: {
      model: PaymentStatus,
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL,
  },
  date: {
    type: DataTypes.DATE,
  },
  method: {
    type: DataTypes.STRING,
  },
});

Payments.belongsTo(Contracts, {
  foreignKey: { name: "contract_id" },
  as: "contract",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Contracts.hasMany(Payments, {
  foreignKey: "contract_id",
  as: "payments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Payments.belongsTo(PaymentStatus, {
  foreignKey: { name: "status_id" },
  as: "status",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PaymentStatus.hasMany(Payments, {
  foreignKey: "status_id",
  as: "payments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Payments;
