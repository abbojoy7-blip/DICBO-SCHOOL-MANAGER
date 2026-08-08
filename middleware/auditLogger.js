const AuditLog = require("../models/AuditLog");

const logAction = async (userId, action, details, resourceId = null, resourceType = null, schoolId = null) => {
  try {
    const log = new AuditLog({
      user: userId,
      action,
      details,
      resourceId,
      resourceType,
      school: schoolId
    });
    await log.save();
  } catch (err) {
    console.error("Audit Logging Error:", err);
  }
};

module.exports = logAction;
