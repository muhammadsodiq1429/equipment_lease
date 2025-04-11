const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const router = require("express").Router();
const {
  addNewEquipmentItem,
  getAllEquipmentItems,
  getEquipmentItemById,
  updateEquipmentItemById,
  deleteEquipmentItemById,
} = require("../controllers/equipment_items.controller");
const userGuard = require("../middleware/guards/auth.guard");

router.post(
  "/",
  userGuard([owner_access_key, admin_access_key]),
  addNewEquipmentItem
);
router.get("/", getAllEquipmentItems);
router.get("/:id", getEquipmentItemById);
router.put(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  updateEquipmentItemById
);
router.delete(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  deleteEquipmentItemById
);

module.exports = router;
