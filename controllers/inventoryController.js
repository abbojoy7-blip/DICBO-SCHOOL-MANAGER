const InventoryItem = require("../models/InventoryItem");
const Asset = require("../models/Asset");

// Inventory
exports.addItem = async (req, res) => {
  try {
    const item = new InventoryItem({ ...req.body, school: req.user.schoolId });
    await item.save();
    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find({ school: req.user.schoolId });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Assets
exports.addAsset = async (req, res) => {
  try {
    const asset = new Asset({ ...req.body, school: req.user.schoolId });
    await asset.save();
    res.status(201).json({ success: true, asset });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ school: req.user.schoolId });
    res.json({ success: true, assets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
