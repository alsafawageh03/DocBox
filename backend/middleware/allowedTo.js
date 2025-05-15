const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");


module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentEmployee.role)) {
      const error = appError.create(
        "You do not have permission to perform this action",
        403,
        httpStatusText.FAIL
      );
      return next(error);
    }
    next();
  };
};
