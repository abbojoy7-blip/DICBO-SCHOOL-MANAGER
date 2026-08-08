const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const roleCheck = require("../middleware/role");

router.post("/student-photo", roleCheck("administrator", "receptionist"), upload.single("photo"), (req, res) => {
  if (req.file) {
    res.json({
      success: true,
      message: "Photo uploaded successfully",
      filePath: `/uploads/${req.file.filename}`
    });
  } else {
    res.status(400).json({ success: false, message: "No file uploaded" });
  }
});

module.exports = router;
