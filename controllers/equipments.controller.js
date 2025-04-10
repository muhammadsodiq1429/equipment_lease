const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const Category = require("../models/category.model");
const Contracts = require("../models/contracts.model");
const EquipmentImages = require("../models/equipment_images.model");
const EquipmentItems = require("../models/equipment_items.model");
const EquipmentStatusHistory = require("../models/equipment_status_history.model");
const Equipments = require("../models/equipments.model");
const Owners = require("../models/owners.model");
const RentalRates = require("../models/rental_rates.model");
const {
  equipmentsValidation,
} = require("../validations/equipments.validation");

const addNewEquipment = async (req, res) => {
  try {
    const { error, value } = equipmentsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newEquipment = await Equipments.create(value);

    res.status(201).send({ message: "A new equipment added", newEquipment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEquipments = async (req, res) => {
  try {
    const allEquipments = await Equipments.findAll({
      include: [
        { model: Category, as: "category" },
        { model: RentalRates, as: "rental_rate" },
        { model: Owners, as: "owner" },
        { model: EquipmentItems, as: "items" },
        { model: EquipmentImages, as: "images" },
      ],
    });
    if (allEquipments.length === 0) {
      return res.status(404).send({ message: "Equipments not found" });
    }
    return res.send(allEquipments);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await Equipments.findByPk(id, {
      include: [
        { model: Category, as: "category" },
        { model: RentalRates, as: "rental_rate" },
        { model: Owners, as: "owner" },
        { model: EquipmentItems, as: "items" },
        { model: EquipmentImages, as: "images" },
      ],
    });
    if (!somethingNotFoundById(res, equipment, "Equipment")) return;

    return res.send(equipment);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateEquipmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await Equipments.findByPk(id);
    if (!somethingNotFoundById(res, equipment, "Equipment")) return;

    const { error, value } = equipmentsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await equipment.update(value);

    return res.send({ message: "Equipment updated", equipment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteEquipmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await Equipments.findByPk(id);
    if (!somethingNotFoundById(res, equipment, "Equipments")) return;

    await equipment.destroy();

    return res.send({ message: "Equipment deleted", equipmentId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEquipment,
  getAllEquipments,
  getEquipmentById,
  updateEquipmentById,
  deleteEquipmentById,
};
