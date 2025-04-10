const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const Category = require("../models/category.model");
const { categoryValidation } = require("../validations/category.validation");

const addNewCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newCategory = await Category.create(value);

    return res
      .status(201)
      .send({ message: "A new category added", newCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const AllCategory = await Category.findAll();
    if (AllCategory.length === 0) {
      return res.status(404).send({ message: "Category not found" });
    }

    return res.send(AllCategory);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!somethingNotFoundById(res, category, "Category")) return;

    return res.send(category);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!somethingNotFoundById(res, category, "Category")) return;

    const { error, value } = categoryValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await category.update(value);

    return res.send({ message: "Category updated", category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!somethingNotFoundById(res, category, "Category")) return;

    await category.destroy({});

    return res.send({ message: "Category deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
