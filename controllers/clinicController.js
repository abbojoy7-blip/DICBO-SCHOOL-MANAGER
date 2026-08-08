const MedicalRecord = require("../models/MedicalRecord");

exports.recordVisit = async (req, res) => {
  try {
    const record = new MedicalRecord({ ...req.body, school: req.user.schoolId, prescribedBy: req.user.id });
    await record.save();
    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ school: req.user.schoolId })
      .populate("student", "firstName lastName admissionNumber")
      .sort({ visitDate: -1 });
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
