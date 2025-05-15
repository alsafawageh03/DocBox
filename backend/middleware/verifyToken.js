const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const { httpStatusText } = require("../utils/httpStatusText");
const Employee = require("../models/Employee");
const asyncWrapper = require("../utils/asyncWrapper");

const verifyToken = asyncWrapper(async (req, res, next) => {
  // 1.extract the token :
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    const error = appError.create(
      "Not authorized: Token missing",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }
  
  // 2.Verify and decode it:
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3.Use the decoded ID to fetch the user’s info from the database (minus the password):
  const currentEmployee = await Employee.findById(decoded.id).select(
    "-password"
  );
  if (!currentEmployee) {
    const error = appError.create(
      "Not authorized: User no longer exists",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }
  req.currentEmployee = currentEmployee;
  next();
});

module.exports = verifyToken;
