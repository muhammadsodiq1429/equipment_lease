const bcrypt = require("bcrypt");
const config = require("config");
const errorHandler = require("../helpers/error.handler");
const Owners = require("../models/owners.model");
const { ownerValidation } = require("../validations/owners.validation");
const mailService = require("../services/mail.service");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const sendAndCreateTokensToUser = require("../helpers/send.and.create.tokens.to.user");
const { verifyRefreshToken } = require("../services/jwt.service");
const passwordValidation = require("../validations/password.validation");
const Contracts = require("../models/contracts.model");
const Equipments = require("../models/equipments.model");

const signUpOwner = async (req, res) => {
  try {
    const { error, value } = ownerValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const hashed_password = await bcrypt.hash(value.password, 10);
    const newOwner = await Owners.create({ ...value, hashed_password });

    const activation_link = `${config.get("api_url")}/api/owners/activate/${newOwner.activation_link}`;
    await mailService.sendActivationMail(newOwner.email, activation_link);
    return res
      .status(201)
      .send({ message: `You successfully signed up`, newOwnerId: newOwner.id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllOwners = async (req, res) => {
  try {
    const allOwners = await Owners.findAll({
      include: [
        { model: Contracts, as: "contracts" },
        { model: Equipments, as: "equipments" },
      ],
    });
    if (allOwners.length === 0) {
      return res.status(404).send({ message: "Owner not found" });
    }
    return res.send(allOwners);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOwnerById = async (req, res) => {
  try {
    console.log("getOwnerById");
    const id = req.params.id;
    const owner = await Owners.findByPk(id, {
      include: [
        { model: Contracts, as: "contracts" },
        { model: Equipments, as: "equipments" },
      ],
    });
    if (!somethingNotFoundById(res, owner, "Owner")) return;

    res.send(owner);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllOwnerContracts = async (req, res) => {
  try {
    const owner = await Owners.findByPk(req.params.id, {
      include: [
        { model: Contracts, as: "contracts" },
        { model: Equipments, as: "equipments" },
      ],
    });
    console.log(owner);
    if (!somethingNotFoundById(res, owner, "Owner")) return;

    if (!owner.contracts) {
      return res.status(404).send({ message: "Owner contracts not found" });
    }
    res.send({ allContracts: owner.contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owners.findByPk(id);
    if (!somethingNotFoundById(res, owner, "Owner")) return;

    const { error, value } = ownerValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const { password, ...update_data } = value;
    await owner.update(update_data);

    return res.send({ message: "Owner updated", updatedOwnerId: owner.id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owners.findByPk(id);
    if (!somethingNotFoundById(res, owner, "Owner")) return;

    await owner.destroy();

    return res.send({ message: "Owner deleted", deletedOwnerId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwnerPassword = async (req, res) => {
  try {
    const { email, old_password, new_password, confirm_password } = req.body;
    const owner = await Owners.findOne({ where: { email } });
    if (!owner) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const valid_password = bcrypt.compareSync(
      old_password,
      owner.hashed_password
    );
    if (!valid_password) {
      return res.status(400).send({ message: "Incorrect email or password" });
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

    const new_hashed_hassword = bcrypt.hashSync(value.password, 10);
    owner.hashed_password = new_hashed_hassword;
    await owner.save();

    return res.send({ message: "Password successfully updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const signinOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owners.findOne({ where: { email } });
    if (!owner) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const valid_password = bcrypt.compareSync(password, owner.hashed_password);
    if (!valid_password) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    sendAndCreateTokensToUser(
      res,
      owner,
      config.get("owner.access_key"),
      config.get("owner.refresh_key")
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const signoutOwner = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res
        .status(404)
        .send({ message: "Refresh token not found from cookies" });
    }

    const owner = await Owners.findOne({ where: { refresh_token } });
    if (!owner) {
      return res
        .status(404)
        .send({ message: "Owner with this refresh token was not found" });
    }

    owner.refresh_token = "";
    await owner.save();
    res.clearCookie("refreshToken");

    return res.send({ message: "Owner signed out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshOwnerTokens = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res
        .status(404)
        .send({ message: "Refresh token not found from cookies" });
    }

    const decodedData = verifyRefreshToken(
      refresh_token,
      config.get("owner.refresh_key")
    );
    if (!decodedData) {
      return res.status(400).send(decodedData.message);
    }

    const owner = await Owners.findByPk(decodedData.id);
    if (!owner || owner.refresh_token !== refresh_token) {
      return res.status(403).send({ message: "Invalid refresh token" });
    }

    sendAndCreateTokensToUser(
      res,
      owner,
      config.get("owner.access_key"),
      config.get("owner.refresh_key")
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  signUpOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  updateOwnerPassword,
  signinOwner,
  signoutOwner,
  refreshOwnerTokens,
  getAllOwnerContracts,
};
