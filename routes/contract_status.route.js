const config = require("config");
const admin_access_key = config.get("admin.access_key");

const {
  getAllContractStatus,
  addNewContractStatus,
  getContractStatusById,
  updateContractStatusById,
  deleteContractStatus,
} = require("../controllers/contract_status.controller");
const userGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post("/", userGuard([admin_access_key]), addNewContractStatus);
router.get("/", getAllContractStatus);
router.get("/:id", getContractStatusById);
router.put("/:id", userGuard([admin_access_key]), updateContractStatusById);
router.delete("/:id", userGuard([admin_access_key]), deleteContractStatus);

module.exports = router;
