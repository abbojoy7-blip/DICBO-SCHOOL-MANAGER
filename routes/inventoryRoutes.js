const express = require("express");
const router = express.Router();
const { addItem, getInventory, addAsset, getAssets } = require("../controllers/inventoryController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getInventory);
router.post("/", roleCheck("administrator"), addItem);
router.get("/assets", getAssets);
router.post("/assets", roleCheck("administrator"), addAsset);

module.exports = router;
