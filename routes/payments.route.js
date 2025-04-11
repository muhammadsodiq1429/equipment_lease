const config = require("config");
const admin_access_key = config.get("admin.access_key");

const router = require("express").Router();
const {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/payments.controller");
const userGuard = require("../middleware/guards/auth.guard");

router.post("/", userGuard([admin_access_key]), addNewPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", userGuard([admin_access_key]), updatePaymentById);
router.delete("/:id", userGuard([admin_access_key]), deletePaymentById);

module.exports = router;
