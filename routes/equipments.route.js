const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const router = require("express").Router();
const {
  addNewEquipment,
  getAllEquipments,
  getEquipmentById,
  updateEquipmentById,
  deleteEquipmentById,
} = require("../controllers/equipments.controller");
const userGuard = require("../middleware/guards/user.guard");

router.post(
  "/",
  userGuard([owner_access_key, admin_access_key]),
  addNewEquipment
);
router.get("/", getAllEquipments);
router.get("/:id", getEquipmentById);
router.put(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  updateEquipmentById
);
router.delete(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  deleteEquipmentById
);

module.exports = router;
