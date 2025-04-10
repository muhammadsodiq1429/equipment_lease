const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const Contracts = require("../models/contracts.model");
const EquipmentItems = require("../models/equipment_items.model");
const EquimentStatus = require("../models/equipment_status.model");
const EquipmentStatusHistory = require("../models/equipment_status_history.model");
const Equipments = require("../models/equipments.model");
const {
  equipmentItemsValidation,
} = require("../validations/equipment_itmes.validation");

const addNewEquipmentItem = async (req, res) => {
  try {
    const { error, value } = equipmentItemsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newEquipmentItem = await EquipmentItems.create(value);

    res
      .status(201)
      .send({ message: "A new equipment item added", newEquipmentItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEquipmentItems = async (req, res) => {
  try {
    const allEquipmentItems = await EquipmentItems.findAll({
      include: [
        { model: Equipments, as: "equipment" },
        { model: EquimentStatus, as: "status" },
        { model: Contracts, as: "contracts" },
        { model: EquipmentStatusHistory, as: "equipment_status_history" },
      ],
    });
    if (allEquipmentItems.length === 0) {
      return res.status(404).send({ message: "Equipment items not found" });
    }
    return res.send(allEquipmentItems);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEquipmentItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await EquipmentItems.findByPk(id, {
      include: [
        { model: Equipments, as: "equipment" },
        { model: EquimentStatus, as: "status" },
        { model: Contracts, as: "contracts" },
        { model: EquipmentStatusHistory, as: "equipment_status_history" },
      ],
    });
    if (!somethingNotFoundById(res, equipment, "Equipment item")) return;

    return res.send(equipment);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateEquipmentItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await EquipmentItems.findByPk(id);
    if (!somethingNotFoundById(res, equipment, "Equipment item")) return;

    const { error, value } = equipmentItemsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await equipment.update(value);

    return res.send({ message: "Equipment item updated", equipment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteEquipmentItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = await EquipmentItems.findByPk(id);
    if (!somethingNotFoundById(res, equipment, "Equipment item")) return;

    await equipment.destroy();

    return res.send({ message: "Equipment item deleted", equipmentId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEquipmentItem,
  getAllEquipmentItems,
  getEquipmentItemById,
  updateEquipmentItemById,
  deleteEquipmentItemById,
};
