const express = require("express");
const router = express.Router();
const { createEntry, getTimetable } = require("../controllers/timetableController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getTimetable);
router.post("/", roleCheck("administrator"), createEntry);

module.exports = router;
