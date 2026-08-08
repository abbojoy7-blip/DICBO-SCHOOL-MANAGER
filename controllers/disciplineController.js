const DisciplineRecord = require("../models/DisciplineRecord");

exports.recordIncident = async (req, res) => {
  try {
    const record = new DisciplineRecord({ ...req.body, school: req.user.schoolId, reportedBy: req.user.id });
    await record.save();
    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDisciplineRecords = async (req, res) => {
  try {
    const records = await DisciplineRecord.find({ school: req.user.schoolId })
      .populate("student", "firstName lastName admissionNumber")
      .sort({ incidentDate: -1 });
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
