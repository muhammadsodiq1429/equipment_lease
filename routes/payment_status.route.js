const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const {
  getAllPaymentStatus,
  addNewPaymentStatus,
  getPaymentStatusById,
  updatePaymentStatusById,
  deletePaymentStatus,
} = require("../controllers/payment_status.controller");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post(
  "/",
  userGuard([owner_access_key, admin_access_key]),
  addNewPaymentStatus
);
router.get("/", getAllPaymentStatus);
router.get("/:id", getPaymentStatusById);
router.put(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  updatePaymentStatusById
);
router.delete(
  "/:id",
  userGuard([owner_access_key, admin_access_key]),
  deletePaymentStatus
);

module.exports = router;
