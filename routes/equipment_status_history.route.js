const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const {
  addNewEquipmentStatusHistory,
  getAllEquipmentStatusHistory,
  getEquipmentStatusHistoryById,
  updateEquipmentStatusHistoryById,
  deleteEquipmentStatusHistoryById,
} = require("../controllers/equipment_status_history.controller");
const userGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post(
  "/",
  userGuard([owner_access_key, admin_access_key]),
  addNewEquipmentStatusHistory
);
router.get("/", getAllEquipmentStatusHistory);
router.get("/:id", getEquipmentStatusHistoryById);
router.put(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  updateEquipmentStatusHistoryById
);
router.delete(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  deleteEquipmentStatusHistoryById
);

module.exports = router;
