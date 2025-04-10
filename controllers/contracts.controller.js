const errorHandler = require("../helpers/error.handler");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const Clients = require("../models/clients.model");
const ContractStatus = require("../models/contract_status.model");
const Contracts = require("../models/contracts.model");
const EquipmentItems = require("../models/equipment_items.model");
const Owners = require("../models/owners.model");
const Payments = require("../models/payments.model");
const { contractsValidation } = require("../validations/contracts.validation");

const addNewContract = async (req, res) => {
  try {
    const { error, value } = contractsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const newContract = await Contracts.create(value);

    res.status(201).send({ message: "A new contract added", newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContracts = async (req, res) => {
  try {
    const allContracts = await Contracts.findAll({
      include: [
        { model: EquipmentItems, as: "equipment_item" },
        { model: Clients, as: "client" },
        { model: Owners, as: "owner" },
        { model: ContractStatus, as: "status" },
        { model: Payments, as: "payments" },
      ],
    });
    if (allContracts.length === 0) {
      return res.status(404).send({ message: "Contracts not found" });
    }
    return res.send(allContracts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contracts.findByPk(id, {
      include: [
        { model: EquipmentItems, as: "equipment_item" },
        { model: Clients, as: "client" },
        { model: Owners, as: "owner" },
        { model: ContractStatus, as: "status" },
        { model: Payments, as: "payments" },
      ],
    });
    if (!somethingNotFoundById(res, contract, "Contract")) return;

    return res.send(contract);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contracts.findByPk(id);
    if (!somethingNotFoundById(res, contract, "Contract")) return;

    const { error, value } = contractsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    await contract.update(value);

    return res.send({ message: "Contract updated", contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contracts.findByPk(id);
    if (!somethingNotFoundById(res, contract, "Contracts")) return;

    await contract.destroy();

    return res.send({ message: "Contract deleted", contractId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
};
