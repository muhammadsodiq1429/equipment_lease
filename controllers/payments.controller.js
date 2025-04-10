const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const Contracts = require("../models/contracts.model");
const PaymentStatus = require("../models/payment_status.model");
const Payments = require("../models/payments.model");
const { paymentsValidation } = require("../validations/payments.validation");

const addNewPayment = async (req, res) => {
  try {
    const { error, value } = paymentsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newPayment = await Payments.create(value);

    res.status(201).send({ message: "A new payment added", newPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payments.findAll({
      include: [
        { model: Contracts, as: "contract" },
        { model: PaymentStatus, as: "status" },
      ],
    });
    if (allPayments.length === 0) {
      return res.status(404).send({ message: "Payments not found" });
    }
    return res.send(allPayments);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findByPk(id, {
      include: [
        { model: Contracts, as: "contract" },
        { model: PaymentStatus, as: "payment_status" },
      ],
    });
    if (!somethingNotFoundById(res, payment, "Payment")) return;

    return res.send(payment);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findByPk(id);
    if (!somethingNotFoundById(res, payment, "Payment")) return;

    const { error, value } = paymentsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await payment.update(value);

    return res.send({ message: "Payment updated", payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payments.findByPk(id);
    if (!somethingNotFoundById(res, payment, "Payments")) return;

    await payment.destroy();

    return res.send({ message: "Payment deleted", paymentId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
