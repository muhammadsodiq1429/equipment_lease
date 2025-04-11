const config = require("config");
const admin_access_key = config.get("admin.access_key");
const client_access_key = config.get("client.access_key");
const owner_access_key = config.get("owner.access_key");

const {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");
const userGuard = require("../middleware/guards/auth.guard");
const userSelfGuard = require("../middleware/guards/user.self.guard");

const router = require("express").Router();

router.post("/", userGuard([admin_access_key]), addNewCategory);
router.get("/", userGuard([admin_access_key]), getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", userGuard([admin_access_key]), updateCategoryById);
router.delete("/:id", userGuard([admin_access_key]), deleteCategoryById);

module.exports = router;
