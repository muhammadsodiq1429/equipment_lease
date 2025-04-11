const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const {
  signUpOwner,
  getAllOwners,
  refreshOwnerTokens,
  getOwnerById,
  updateOwnerPassword,
  updateOwnerById,
  deleteOwnerById,
  signinOwner,
  signoutOwner,
  getAllOwnerContracts,
} = require("../controllers/owners.controller");
const userGuard = require("../middleware/guards/auth.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");
const activeUserController = require("../helpers/active.user");
const Owners = require("../models/owners.model");

const router = require("express").Router();

router.post("/", signUpOwner);
router.get("/", userGuard([admin_access_key, owner_access_key]), getAllOwners);
router.get("/activate/:link", activeUserController(Owners, "Owner"));
router.post("/refresh_owner_tokens", refreshOwnerTokens);
router.get(
  "/:id/contracts",
  userGuard([admin_access_key, owner_access_key]),
  userSelfGuard(["owner", "admin"]),
  getAllOwnerContracts
);
router.get(
  "/:id",
  userGuard([admin_access_key, owner_access_key]),
  userSelfGuard(["owner",  "admin"]),
  getOwnerById
);
router.put("/update_owner_password/:id", updateOwnerPassword);
router.put(
  "/:id",
  userGuard([admin_access_key, owner_access_key]),
  userSelfGuard(["owner",  "admin"]),
  updateOwnerById
);
router.delete(
  "/:id",
  userGuard([admin_access_key, owner_access_key]),
  userSelfGuard(["owner",  "admin"]),
  deleteOwnerById
);
router.post("/signin", signinOwner);
router.post("/signout", signoutOwner);

module.exports = router;
