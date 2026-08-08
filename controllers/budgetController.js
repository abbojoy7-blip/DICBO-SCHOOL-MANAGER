const Budget = require("../models/Budget");
const BudgetCategory = require("../models/BudgetCategory");
const logAction = require("../middleware/auditLogger");

// Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await BudgetCategory.find();
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new BudgetCategory({ ...req.body, createdBy: req.user.id });
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Budget
exports.getBudgets = async (req, res) => {
  try {
    const { year } = req.query;
    const filter = year ? { year } : {};
    const budgets = await Budget.find(filter).populate("category");

    const summary = {
      totalPlanned: budgets.reduce((sum, b) => sum + b.plannedAmount, 0),
      totalActual: budgets.reduce((sum, b) => sum + b.actualSpending, 0)
    };

    res.json({ success: true, summary, budgets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.upsertBudget = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    let budget;

    if (id) {
      budget = await Budget.findByIdAndUpdate(id, { ...data, updatedBy: req.user.id }, { new: true });
    } else {
      budget = new Budget({ ...data, createdBy: req.user.id });
      await budget.save();
    }

    await logAction(
      req.user.id,
      "MANAGE_BUDGET",
      `Managed budget item for ${data.year}`,
      budget._id,
      "Budget"
    );

    res.json({ success: true, budget });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Budget item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
