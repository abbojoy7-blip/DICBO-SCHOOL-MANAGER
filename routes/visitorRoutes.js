const express = require("express");
const router = express.Router();
const { recordVisitor, getVisitors, checkOutVisitor } = require("../controllers/visitorController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getVisitors);
router.post("/", roleCheck("administrator", "receptionist"), recordVisitor);
router.put("/:id/checkout", roleCheck("administrator", "receptionist"), checkOutVisitor);

module.exports = router;
