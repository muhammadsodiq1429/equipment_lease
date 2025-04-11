const router = require("express").Router();

const {
  getContractsByDateRange,
} = require("../controllers/intelligent.inquiry.controller");

router.get("/getContractsByDateRange", getContractsByDateRange);

module.exports = router;
