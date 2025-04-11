const config = require("config");
const admin_access_key = config.get("admin.access_key");
const client_access_key = config.get("client.access_key");

const {
  signUpClient,
  getAllClients,
  refreshClientTokens,
  getClientById,
  updateClientPassword,
  updateClientById,
  deleteClientById,
  signinClient,
  signoutClient,
  getAllClientContracts,
} = require("../controllers/clients.controller");
const userGuard = require("../middleware/guards/auth.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");
const Clients = require("../models/clients.model");
const activeUserController = require("../helpers/active.user");

const router = require("express").Router();

router.post("/", signUpClient);
router.get("/", userGuard([admin_access_key]), getAllClients);
router.get(
  "/:id/contracts",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client", "admin"]),
  getAllClientContracts
);
router.post("/refresh_client_tokens", refreshClientTokens);
router.get("/activate/:link", activeUserController(Clients, "Client"));
router.get(
  "/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client", "admin"]),
  getClientById
);
router.put(
  "/update_client_password/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client", "admin"]),
  updateClientPassword
);
router.put(
  "/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client", "admin"]),
  updateClientById
);
router.delete(
  "/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client", "admin"]),
  deleteClientById
);
router.post("/signin", signinClient);
router.post("/signout", signoutClient);

module.exports = router;
