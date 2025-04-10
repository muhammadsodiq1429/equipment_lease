const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const EquipmentItems = require("../models/equipment_items.model");
const EquimentStatus = require("../models/equipment_status.model");
const EquipmentStatusHistory = require("../models/equipment_status_history.model");
const {
  equipmentStatusHistoryValidation,
} = require("../validations/equipment_status_history.validation");

const addNewEquipmentStatusHistory = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ message: "Request body is missing or empty" });
    }
    const { error, value } = equipmentStatusHistoryValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newEquipmentStatusHistory =
      await EquipmentStatusHistory.create(value);

    return res.status(201).send({
      message: "A new equipment status added",
      newEquipmentStatusHistory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEquipmentStatusHistory = async (req, res) => {
  try {
    const AllEquipmentStatusHistory = await EquipmentStatusHistory.findAll({
      include: [
        { model: EquipmentItems, as: "equipment_item" },
        { model: EquimentStatus, as: "old_status" },
        { model: EquimentStatus, as: "new_status" },
      ],
    });
    if (AllEquipmentStatusHistory.length === 0) {
      return res
        .status(404)
        .send({ message: "Equipment status history not found" });
    }

    return res.send(AllEquipmentStatusHistory);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEquipmentStatusHistoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_status_history = await EquipmentStatusHistory.findByPk(id, {
      include: [
        { model: EquipmentItems, as: "equipment_item" },
        { model: EquimentStatus, as: "old_status" },
        { model: EquimentStatus, as: "new_status" },
      ],
    });
    if (
      !somethingNotFoundById(
        res,
        equipment_status_history,
        "Equipment status history"
      )
    )
      return;

    return res.send(equipment_status_history);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateEquipmentStatusHistoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_status_history = await EquipmentStatusHistory.findByPk(id);
    if (
      !somethingNotFoundById(
        res,
        equipment_status_history,
        "Equipment status history"
      )
    )
      return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ message: "Request body is missing or empty" });
    }
    const { error, value } = equipmentStatusHistoryValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await equipment_status_history.update(value);

    return res.send({
      message: "Equipment status history updated",
      equipment_status_history,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteEquipmentStatusHistoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_status_history = await EquipmentStatusHistory.findByPk(id);
    if (
      !somethingNotFoundById(
        res,
        equipment_status_history,
        "Equipment status history"
      )
    )
      return;

    await equipment_status_history.destroy();

    return res.send({ message: "Equipment status history deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEquipmentStatusHistory,
  getAllEquipmentStatusHistory,
  getEquipmentStatusHistoryById,
  updateEquipmentStatusHistoryById,
  deleteEquipmentStatusHistoryById,
};
