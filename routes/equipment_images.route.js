const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const router = require("express").Router();
const {
  addNewEquipmentImage,
  getAllEquipmentImages,
  getEquipmentImageById,
  updateEquipmentImageById,
  deleteEquipmentImageById,
} = require("../controllers/equipment_images.controller");
const userGuard = require("../middleware/guards/user.guard");

router.post(
  "/",
  userGuard([owner_access_key, admin_access_key]),
  addNewEquipmentImage
);
router.get("/", getAllEquipmentImages);
router.get("/:id", getEquipmentImageById);
router.put(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  updateEquipmentImageById
);
router.delete(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  deleteEquipmentImageById
);

module.exports = router;
