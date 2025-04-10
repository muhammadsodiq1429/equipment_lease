const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const PaymentStatus = require("../models/payment_status.model");
const {
  paymentStatusValidation,
} = require("../validations/payment_status.validation");

const addNewPaymentStatus = async (req, res) => {
  try {
    const { error, value } = paymentStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newPaymentStatus = await PaymentStatus.create(value);

    return res
      .status(201)
      .send({ message: "A new payment status added", newPaymentStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPaymentStatus = async (req, res) => {
  try {
    const AllPaymentStatus = await PaymentStatus.findAll();
    if (AllPaymentStatus.length === 0) {
      return res.status(404).send({ message: "Payment status not found" });
    }

    return res.send(AllPaymentStatus);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPaymentStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment_status = await PaymentStatus.findByPk(id);
    if (!somethingNotFoundById(res, payment_status, "Payment status")) return;

    return res.send(payment_status);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment_status = await PaymentStatus.findByPk(id);
    if (!somethingNotFoundById(res, payment_status, "Payment status")) return;

    const { error, value } = paymentStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await payment_status.update(value);

    return res.send({ message: "Payment status updated", payment_status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const payment_status = await PaymentStatus.findByPk(id);
    if (!somethingNotFoundById(res, payment_status, "Payment status")) return;

    await payment_status.destroy();

    return res.send({ message: "Payment status deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPaymentStatus,
  getAllPaymentStatus,
  getPaymentStatusById,
  updatePaymentStatusById,
  deletePaymentStatus,
};
