const router = require("express").Router();

const adminsRouter = require("./admins.route");
const ownersRouter = require("./owners.route");
const clientsRouter = require("./clients.route");
const categoryRouter = require("./category.route");
const paymentsRouter = require("./payments.route");
const contractsRouter = require("./contracts.route");
const equipmentsRouter = require("./equipments.route");
const rentalRatesRouter = require("./rental_rates.route");
const paymentStatusRouter = require("./payment_status.route");
const contractStatusRouter = require("./contract_status.route");
const equipmentItemsRouter = require("./equipment_items.route");
const equipmentImagesRouter = require("./equipment_images.route");
const equipmentStatusRouter = require("./equipment_status.route");
const intelligentInquiryRouter = require("./intelligent.inquiry.route");
const equipmentStatusHistoryRouter = require("./equipment_status_history.route");

router.use("/admins", adminsRouter);
router.use("/owners", ownersRouter);
router.use("/clients", clientsRouter);
router.use("/category", categoryRouter);
router.use("/payments", paymentsRouter);
router.use("/contracts", contractsRouter);
router.use("/equipments", equipmentsRouter);
router.use("/rental_rates", rentalRatesRouter);
router.use("/payment_status", paymentStatusRouter);
router.use("/contract_status", contractStatusRouter);
router.use("/equipment_items", equipmentItemsRouter);
router.use("/equipment_images", equipmentImagesRouter);
router.use("/equipment_status", equipmentStatusRouter);
router.use("/intelligent-inquiry", intelligentInquiryRouter);
router.use("/equipment_status_history", equipmentStatusHistoryRouter);

module.exports = router;
