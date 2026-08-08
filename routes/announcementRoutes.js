const express = require("express");
const router = express.Router();
const { createAnnouncement, getAnnouncements } = require("../controllers/announcementController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getAnnouncements);
router.post("/", roleCheck("administrator", "teacher"), createAnnouncement);

module.exports = router;
