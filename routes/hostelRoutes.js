const express = require("express");
const router = express.Router();
const { createHostel, getHostels, assignHostel, getHostelAssignments } = require("../controllers/hostelController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getHostels);
router.post("/", roleCheck("administrator"), createHostel);
router.get("/assignments", getHostelAssignments);
router.post("/assign", roleCheck("administrator"), assignHostel);

module.exports = router;
