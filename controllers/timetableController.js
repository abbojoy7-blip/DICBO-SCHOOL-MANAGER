const Timetable = require("../models/Timetable");

exports.createEntry = async (req, res) => {
  try {
    const entry = new Timetable({ ...req.body, school: req.user.schoolId });
    await entry.save();
    res.status(201).json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTimetable = async (req, res) => {
  try {
    const { studentClass } = req.query;
    const filter = { school: req.user.schoolId };
    if (studentClass) filter.studentClass = studentClass;

    const entries = await Timetable.find(filter)
      .populate("subject", "name")
      .populate("teacher", "name")
      .sort({ day: 1, startTime: 1 });

    res.json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
