const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const EquipmentStatus = require("../models/equipment_status.model");
const {
  equipmentStatusValidation,
} = require("../validations/equipment_status.validation");

const addNewEquipmentStatus = async (req, res) => {
  try {
    const { error, value } = equipmentStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newEquipmentStatus = await EquipmentStatus.create(value);

    return res
      .status(201)
      .send({ message: "A new equipment status added", newEquipmentStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEquipmentStatus = async (req, res) => {
  try {
    const AllEquipmentStatus = await EquipmentStatus.findAll();
    if (AllEquipmentStatus.length === 0) {
      return res.status(404).send({ message: "Equipment status not found" });
    }

    return res.send(AllEquipmentStatus);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEquipmentStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_status = await EquipmentStatus.findByPk(id);
    if (!somethingNotFoundById(res, equipment_status, "Equipment status"))
      return;

    return res.send(equipment_status);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateEquipmentStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_status = await EquipmentStatus.findByPk(id);
    if (!somethingNotFoundById(res, equipment_status, "Equipment status"))
      return;

    const { error, value } = equipmentStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await equipment_status.update(value);

    return res.send({ message: "Equipment status updated", equipment_status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteEquipmentStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_status = await EquipmentStatus.findByPk(id);
    if (!somethingNotFoundById(res, equipment_status, "Equipment status"))
      return;

    await equipment_status.destroy();

    return res.send({ message: "Equipment status deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEquipmentStatus,
  getAllEquipmentStatus,
  getEquipmentStatusById,
  updateEquipmentStatusById,
  deleteEquipmentStatus,
};
