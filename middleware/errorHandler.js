const logAction = require("./auditLogger");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Log critical server errors to Audit Log if user is authenticated
  if (statusCode === 500 && req.user) {
    logAction(
      req.user.id,
      "SYSTEM_ERROR",
      `Server Error: ${err.message} at ${req.originalUrl}`,
      null,
      "Error",
      req.user.schoolId
    );
  }

  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
