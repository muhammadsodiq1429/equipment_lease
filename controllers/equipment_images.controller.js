const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const EquipmentImages = require("../models/equipment_images.model");
const Equipments = require("../models/equipment_images.model");
const {
  equipment_imageImagesValidation,
} = require("../validations/equipment_images.validation");

const addNewEquipmentImage = async (req, res) => {
  try {
    const { error, value } = equipment_imageImagesValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newEquipmentImage = await EquipmentImages.create(value);

    res
      .status(201)
      .send({ message: "A new equipment_image image added", newEquipmentImage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEquipmentImages = async (req, res) => {
  try {
    const allEquipmentImages = await EquipmentImages.findAll({
      include: [{ model: Equipments, as: "equipment_image" }],
    });
    if (allEquipmentImages.length === 0) {
      return res.status(404).send({ message: "Equipment images not found" });
    }
    return res.send(allEquipmentImages);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEquipmentImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_image = await EquipmentImages.findByPk(id, {
      include: [{ model: Equipments, as: "equipment_image" }],
    });
    if (!somethingNotFoundById(res, equipment_image, "Equipment image")) return;

    return res.send(equipment_image);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateEquipmentImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_image = await EquipmentImages.findByPk(id);
    if (!somethingNotFoundById(res, equipment_image, "Equipment image")) return;

    const { error, value } = equipment_imageImagesValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await equipment_image.update(value);

    return res.send({ message: "Equipment image updated", equipment_image });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteEquipmentImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment_image = await EquipmentImages.findByPk(id);
    if (!somethingNotFoundById(res, equipment_image, "Equipment image")) return;

    await equipment_image.destroy();

    return res.send({ message: "Equipment image deleted", equipment_imageId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEquipmentImage,
  getAllEquipmentImages,
  getEquipmentImageById,
  updateEquipmentImageById,
  deleteEquipmentImageById,
};
