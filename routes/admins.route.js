const config = require("config");
const admin_access_key = config.get("admin.access_key");
const {
  addNewAdmin,
  getAllAdmins,
  refreshAdminTokens,
  getAdminById,
  updateAdminPassword,
  updateAdminById,
  deleteAdminById,
  signinAdmin,
  signoutAdmin,
} = require("../controllers/admins.controller");
const userGuard = require("../middleware/guards/user.guard");
const superAdminGuard = require("../middleware/guards/super.admin.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");
const adminSelfGuard = require("../middleware/guards/admin.self.guard");

const router = require("express").Router();

router.post("/", userGuard([admin_access_key]), superAdminGuard, addNewAdmin);
router.get("/", userGuard([admin_access_key]), superAdminGuard, getAllAdmins);
router.post("/refresh_admin_tokens", refreshAdminTokens);
router.get("/:id", userGuard([admin_access_key]), adminSelfGuard, getAdminById);
router.put(
  "/update_admin_password/:id",
  userGuard([admin_access_key]),
  userSelfGuard,
  updateAdminPassword
);
router.put(
  "/:id",
  userGuard([admin_access_key]),
  userSelfGuard,
  updateAdminById
);
router.post("/signin", signinAdmin);
router.post("/signout", signoutAdmin);
router.delete(
  "/:id",
  userGuard([admin_access_key]),
  userSelfGuard,
  deleteAdminById
);

module.exports = router;
