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
} = require("../controllers/owners.controller");
const userGuard = require("../middleware/guards/user.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", signUpOwner);
router.get("/", userGuard([admin_access_key, owner_access_key]), getAllOwners);
router.post("/refresh_owner_tokens", refreshOwnerTokens);
router.get(
  "/:id",
  userGuard([admin_access_key, owner_access_key]),
  userSelfGuard(["owner"]),
  getOwnerById
);
router.put("/update_owner_password/:id", updateOwnerPassword);
router.put("/:id", updateOwnerById);
router.delete("/:id", deleteOwnerById);
router.post("/signin", signinOwner);
router.post("/signout", signoutOwner);

module.exports = router;
