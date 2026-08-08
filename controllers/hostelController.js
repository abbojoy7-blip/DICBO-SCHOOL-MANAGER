const Hostel = require("../models/Hostel");
const HostelAssignment = require("../models/HostelAssignment");

exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel({ ...req.body, school: req.user.schoolId });
    await hostel.save();
    res.status(201).json({ success: true, hostel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({ school: req.user.schoolId });
    res.json({ success: true, hostels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignHostel = async (req, res) => {
  try {
    const assignment = new HostelAssignment({ ...req.body, school: req.user.schoolId });
    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHostelAssignments = async (req, res) => {
  try {
    const assignments = await HostelAssignment.find({ school: req.user.schoolId })
      .populate("student", "firstName lastName admissionNumber")
      .populate("hostel", "name");
    res.json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
