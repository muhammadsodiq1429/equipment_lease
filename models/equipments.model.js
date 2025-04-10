const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Owners = require("./owners.model");
const Category = require("./category.model");
const RentalRates = require("./rental_rates.model");

const Equipments = sequelize.define("equipments", {
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
  model: {
    type: DataTypes.STRING,
    unique: {
      msg: "Name already exists!",
    },
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  description: {
    type: DataTypes.TEXT,
  },
  instruction: {
    type: DataTypes.TEXT,
  },
  address: {
    type: DataTypes.TEXT,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Owners,
      key: "id",
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
  },
  rental_rate_id: {
    type: DataTypes.INTEGER,
    references: {
      model: RentalRates,
      key: "id",
    },
  },
});

Equipments.belongsTo(Category, {
  foreignKey: { name: "category_id" },
  as: "category",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Category.hasMany(Equipments, {
  foreignKey: "category_id",
  as: "equipments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Equipments.belongsTo(RentalRates, {
  foreignKey: { name: "rental_rate_id" },
  as: "rental_rate",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
RentalRates.hasMany(Equipments, {
  foreignKey: "rental_rate_id",
  as: "equipments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",  
});

Equipments.belongsTo(Owners, {
  foreignKey: { name: "owner_id" }, 
  as: "owner",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Owners.hasMany(Equipments, {
  foreignKey: "owner_id",
  as: "equipments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Equipments;
