const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const RentalRates = require("../models/rental_rates.model");
const {
  rentalRatesValidation,
} = require("../validations/rental_rates.validation");

const addNewRentalRates = async (req, res) => {
  try {
    const { error, value } = rentalRatesValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newRentalRates = await RentalRates.create(value);

    return res
      .status(201)
      .send({ message: "A new rental rate added", newRentalRates });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllRentalRates = async (req, res) => {
  try {
    const AllRentalRates = await RentalRates.findAll({
      include: [
        { model: Category, as: "category" },
        { model: RentalRates, as: "rental_rate" },
        { model: Owners, as: "owner" },
      ],
    });
    if (AllRentalRates.length === 0) {
      return res.status(404).send({ message: "Rental rates not found" });
    }

    return res.send(AllRentalRates);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getRentalRatesById = async (req, res) => {
  try {
    const id = req.params.id;
    const rental_rates = await RentalRates.findByPk(id);
    if (!somethingNotFoundById(res, rental_rates, "Rental rate")) return;

    return res.send(rental_rates);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateRentalRatesById = async (req, res) => {
  try {
    const id = req.params.id;
    const rental_rates = await RentalRates.findByPk(id);
    if (!somethingNotFoundById(res, rental_rates, "Rental rate")) return;

    const { error, value } = rentalRatesValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await rental_rates.update(value);

    return res.send({ message: "Rental rate updated", rental_rates });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteRentalRates = async (req, res) => {
  try {
    const id = req.params.id;
    const rental_rates = await RentalRates.findByPk(id);
    if (!somethingNotFoundById(res, rental_rates, "Rental rate")) return;

    await rental_rates.destroy();

    return res.send({ message: "Rental rate deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewRentalRates,
  getAllRentalRates,
  getRentalRatesById,
  updateRentalRatesById,
  deleteRentalRates,
};
