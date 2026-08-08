const express = require("express");
const router = express.Router();
const {
  getCategories, createCategory,
  getBudgets, upsertBudget, deleteBudget
} = require("../controllers/budgetController");
const roleCheck = require("../middleware/role");

router.get("/categories", getCategories);
router.post("/categories", roleCheck("administrator"), createCategory);

router.get("/", getBudgets);
router.post("/", roleCheck("administrator"), upsertBudget);
router.delete("/:id", roleCheck("administrator"), deleteBudget);

module.exports = router;
