const bcrypt = require("bcrypt");
const config = require("config");
const errorHandler = require("../helpers/error.handler");
const Clients = require("../models/clients.model");
const { clientsValidation } = require("../validations/clients.validation");
const mailService = require("../services/mail.service");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const sendAndCreateTokensToUser = require("../helpers/send.and.create.tokens.to.user");
const { verifyRefreshToken } = require("../services/jwt.service");
const passwordValidation = require("../validations/password.validation");
const Contracts = require("../models/contracts.model");

const signUpClient = async (req, res) => {
  try {
    const { error, value } = clientsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const hashed_password = await bcrypt.hash(value.password, 10);
    const newClient = await Clients.create({ ...value, hashed_password });

    const activation_link = `${config.get("api_url")}/api/clients/activate/${newClient.activation_link}`;
    await mailService.sendActivationMail(newClient.email, activation_link);
    return res.status(201).send({
      message: `You successfully signed up`,
      newClientId: newClient.id,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllClients = async (req, res) => {
  try {
    const allClients = await Clients.findAll({
      include: { model: Contracts, as: "contracts" },
    });
    if (allClients.length === 0) {
      return res.status(404).send({ message: "Client not found" });
    }
    return res.send(allClients);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findByPk(id, {
      include: { model: Contracts, as: "contracts" },
    });
    if (!somethingNotFoundById(res, client, "Client")) return;

    res.send(client);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllClientContracts = async (req, res) => {
  try {
    const clients = await Clients.findByPk(req.params.id, {
      include: [{ model: Contracts, as: "contracts" }],
    });
    console.log(clients);
    if (!somethingNotFoundById(res, clients, "Client")) return;

    if (!clients.contracts) {
      return res.status(404).send({ message: "Client contracts not found" });
    }
    res.send({ allContracts: clients.contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findByPk(id);
    if (!somethingNotFoundById(res, client, "Client")) return;
    const { error, value } = clientsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const { password, ...update_data } = value;
    await client.update(update_data);

    return res.send({ message: "Client updated", updatedClientId: client.id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Clients.findByPk(id);
    if (!somethingNotFoundById(res, client, "Client")) return;

    await client.destroy();

    return res.send({ message: "Client deleted", deletedClientId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClientPassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    const client = await Clients.findByPk(req.params.id);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const valid_password = bcrypt.compareSync(
      old_password,
      client.hashed_password
    );
    if (!valid_password) {
      return res.status(400).send({ message: "Incorrect old password" });
    }

    const { error, value } = passwordValidation({ password: new_password });
    if (error) {
      return errorHandler(error, res);
    }

    if (value.password !== confirm_password) {
      return res
        .status(400)
        .send({ message: "New password and confirm password do not match" });
    }

    const new_hashed_password = bcrypt.hashSync(value.password, 10);
    client.hashed_password = new_hashed_password;
    await client.save();

    return res.send({ message: "Password successfully updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const signinClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Clients.findOne({ where: { email } });
    if (!client) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const valid_password = bcrypt.compareSync(password, client.hashed_password);
    if (!valid_password) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    sendAndCreateTokensToUser(
      res,
      client,
      config.get("client.access_key"),
      config.get("client.refresh_key")
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const signoutClient = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res
        .status(404)
        .send({ message: "Refresh token not found from cookies" });
    }

    const client = await Clients.findOne({ where: { refresh_token } });
    if (!client) {
      return res
        .status(404)
        .send({ message: "Client with this refresh token was not found" });
    }

    client.refresh_token = "";
    await client.save();
    res.clearCookie("refreshToken");

    return res.send({ message: "Client signed out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshClientTokens = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res
        .status(404)
        .send({ message: "Refresh token not found from cookies" });
    }

    const decodedData = verifyRefreshToken(
      refresh_token,
      config.get("client.refresh_key")
    );
    if (!decodedData) {
      return res.status(400).send(decodedData.message);
    }

    const client = await Clients.findByPk(decodedData.id);
    if (!client || client.refresh_token !== refresh_token) {
      return res.status(403).send({ message: "Invalid refresh token" });
    }

    sendAndCreateTokensToUser(
      res,
      client,
      config.get("client.access_key"),
      config.get("client.refresh_key")
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  signUpClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  updateClientPassword,
  signinClient,
  signoutClient,
  refreshClientTokens,
  getAllClientContracts
};
