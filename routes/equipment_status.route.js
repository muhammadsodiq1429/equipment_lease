const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const {
  addNewEquipmentStatus,
  getAllEquipmentStatus,
  getEquipmentStatusById,
  updateEquipmentStatusById,
  deleteEquipmentStatus,
} = require("../controllers/equipment_status.controller");
const userGuard = require("../middleware/guards/auth.guard");

const router = require("express").Router();

router.post(
  "/",
  userGuard([owner_access_key, admin_access_key]),
  addNewEquipmentStatus
);
router.get("/", getAllEquipmentStatus);
router.get("/:id", getEquipmentStatusById);
router.put(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  updateEquipmentStatusById
);
router.delete(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  deleteEquipmentStatus
);

module.exports = router;
