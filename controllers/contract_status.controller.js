const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const ContractStatus = require("../models/contract_status.model");
const {
  contractStatusValidation,
} = require("../validations/contract_status.validation");

const addNewContractStatus = async (req, res) => {
  try {
    const { error, value } = contractStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newContractStatus = await ContractStatus.create(value);

    return res
      .status(201)
      .send({ message: "A new contract status added", newContractStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContractStatus = async (req, res) => {
  try {
    const AllContractStatus = await ContractStatus.findAll();
    if (AllContractStatus.length === 0) {
      return res.status(404).send({ message: "Contract status not found" });
    }

    return res.send(AllContractStatus);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract_status = await ContractStatus.findByPk(id);
    if (!somethingNotFoundById(res, contract_status, "Contract status")) return;

    return res.send(contract_status);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract_status = await ContractStatus.findByPk(id);
    if (!somethingNotFoundById(res, contract_status, "Contract status")) return;

    const { error, value } = contractStatusValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await contract_status.update(value);

    return res.send({ message: "Contract status updated", contract_status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const contract_status = await ContractStatus.findByPk(id);
    if (!somethingNotFoundById(res, contract_status, "Contract status")) return;

    await contract_status.destroy();

    return res.send({ message: "Contract status deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContractStatus,
  getAllContractStatus,
  getContractStatusById,
  updateContractStatusById,
  deleteContractStatus,
};
