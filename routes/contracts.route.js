const config = require("config");
const client_access_key = config.get("client.access_key");
const admin_access_key = config.get("admin.access_key");
const router = require("express").Router();
const {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
} = require("../controllers/contracts.controller");
const userGuard = require("../middleware/guards/auth.guard");

router.post(
  "/",
  userGuard([admin_access_key, client_access_key]),
  addNewContract
);
router.get("/", userGuard([admin_access_key]), getAllContracts);
router.get("/:id", userGuard([admin_access_key]), getContractById);
router.put("/:id", userGuard([admin_access_key]), updateContractById);
router.delete("/:id", userGuard([admin_access_key]), deleteContractById);

module.exports = router;
