const bcrypt = require("bcrypt");
const config = require("config");
const errorHandler = require("../helpers/error.handler");
const Admins = require("../models/admins.model");
const { adminsValidation } = require("../validations/admins.validation");
const sendAndCreateTokensToUser = require("../helpers/send.and.create.tokens.to.user");
const somethingNotFoundById = require("../helpers/something.not.found.by.id");
const { verifyRefreshToken } = require("../services/jwt.service");
const passwordValidation = require("../validations/password.validation");

const addNewAdmin = async (req, res) => {
  try {
    const { error, value } = adminsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const hashed_password = bcrypt.hashSync(req.body.hashed_password, 10);
    const newAdmin = await Admins.create({
      ...value,
      hashed_password: hashed_password,
    });

    return res.status(201).send({ message: "A new admin added", newAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admins.findAll();
    if (allAdmins.length === 0) {
      return res.status(404).send({ message: "Admin not found" });
    }

    return res.send(allAdmins);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findByPk(id);
    if (!somethingNotFoundById(res, admin, "Admin")) return;

    return res.send(admin);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findByPk(id);
    if (!somethingNotFoundById(res, admin, "Admin")) return;

    const { error, value } = adminsValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const { hashed_password, ...update_data } = value;
    await admin.update(update_data);

    return res.send({ message: "Admin updated", updatedAdmin: admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admins.findByPk(id);
    if (!somethingNotFoundById(res, admin, "Admin")) return;

    await admin.destroy();

    return res.send({ message: "Admin deleted", adminId: id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const signinAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admins.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }

    const valid_password = bcrypt.compareSync(password, admin.hashed_password);
    if (!valid_password) {
      return res.status(400).send({ message: "Incorrect email or password" });
    }
    sendAndCreateTokensToUser(
      res,
      admin,
      config.get("admin.access_key"),
      config.get("admin.refresh_key")
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const signoutAdmin = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res
        .status(404)
        .send({ message: "Refresh token not found from cookies" });
    }

    const admin = await Admins.findOne({ where: { refresh_token } });
    if (!admin) {
      return res
        .status(404)
        .send({ message: "Admin with this refresh token was not found" });
    }

    admin.refresh_token = "";
    await admin.save();
    res.clearCookie("refreshToken");

    return res.send({ message: "Admin signed out" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshAdminTokens = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res
        .status(404)
        .send({ message: "Refresh token not found from cookies" });
    }

    const decodedData = verifyRefreshToken(
      refresh_token,
      config.get("admin.refresh_key")
    );
    if (!decodedData) {
      return res.status(400).send(decodedData.message);
    }

    const admin = await Admins.findByPk(decodedData.id);
    if (!admin || admin.refresh_token !== refresh_token) {
      return res.status(403).send({ message: "Invalid refresh token" });
    }

    sendAndCreateTokensToUser(
      res,
      admin,
      config.get("admin.access_key"),
      config.get("admin.refresh_key")
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdminPassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;

    const admin = await Admins.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    const valid_password = bcrypt.compareSync(
      old_password,
      admin.hashed_password
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
    admin.hashed_password = new_hashed_password;
    await admin.save();

    return res.send({ message: "Password successfully updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  signinAdmin,
  signoutAdmin,
  refreshAdminTokens,
  updateAdminPassword,
};
