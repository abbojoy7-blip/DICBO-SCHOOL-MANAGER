const express = require("express");
const router = express.Router();
const { getStaff, createStaff, updateStaff } = require("../controllers/staffController");
const roleCheck = require("../middleware/role");

router.get("/", roleCheck("administrator"), getStaff);
router.post("/", roleCheck("administrator"), createStaff);
router.put("/:id", roleCheck("administrator"), updateStaff);

module.exports = router;
