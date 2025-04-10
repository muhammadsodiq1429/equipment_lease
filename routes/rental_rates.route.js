const config = require("config");
const admin_access_key = config.get("admin.access_key");
const owner_access_key = config.get("owner.access_key");

const {
  addNewRentalRates,
  getAllRentalRates,
  getRentalRatesById,
  updateRentalRatesById,
  deleteRentalRates,
} = require("../controllers/rental_rates.controller");
const userGuard = require("../middleware/guards/user.guard");

const router = require("express").Router();

router.post(
  "/",
  userGuard([admin_access_key, owner_access_key]),
  addNewRentalRates
);
router.get("/", getAllRentalRates);
router.get("/:id", getRentalRatesById);
router.put(
  "/:id",
  userGuard([admin_access_key, owner_access_key]),
  updateRentalRatesById
);
router.delete(
  "/:id",
  userGuard([admin_access_key, owner_access_key]),
  deleteRentalRates
);

module.exports = router;
