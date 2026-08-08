const Visitor = require("../models/Visitor");

exports.recordVisitor = async (req, res) => {
  try {
    const visitor = new Visitor({ ...req.body, school: req.user.schoolId });
    await visitor.save();
    res.status(201).json({ success: true, visitor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({ school: req.user.schoolId }).sort({ checkIn: -1 });
    res.json({ success: true, visitors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkOutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findOneAndUpdate(
      { _id: req.params.id, school: req.user.schoolId },
      { checkOut: new Date() },
      { new: true }
    );
    res.json({ success: true, visitor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
