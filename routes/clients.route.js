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
} = require("../controllers/clients.controller");
const userGuard = require("../middleware/guards/user.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", signUpClient);
router.get("/", userGuard([admin_access_key]), getAllClients);
router.post("/refresh_client_tokens", refreshClientTokens);
router.get(
  "/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client"]),
  getClientById
);
router.put(
  "/update_client_password/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client"]),
  updateClientPassword
);
router.put(
  "/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client"]),
  updateClientById
);
router.delete(
  "/:id",
  userGuard([admin_access_key, client_access_key]),
  userSelfGuard(["client"]),
  deleteClientById
);
router.post("/signin", signinClient);
router.post("/signout", signoutClient);

module.exports = router;
