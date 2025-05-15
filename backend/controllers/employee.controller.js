require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const httpStatusText = require("../utils/httpStatusText");
const Employee = require("../models/Employee");
const appError = require("../utils/appError");
const asyncWrapper = require("../utils/asyncWrapper");

// // // ###Set up nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

// GET all assets
const getEmployees = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  console.log(query);

  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;
  const allEmployees = await Employee.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { Employees: allEmployees },
  });
});

//=======================================================================================================================
//aProfile

const profile = async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const employee = await Employee.findById(decoded.id).select('-password') 
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: employee,
    });
  } catch (err) {
    res.status(401).json({status: httpStatusText.FAIL, message: 'Invalid token' })
  }
}


//=======================================================================================================================
// signup
const signup = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  // ckeck validation inputs
  if (firstName.length < 2 || lastName < 2) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "Name must be at least 2 characters long",
    });
  }

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, message: "Missing Details" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "Password must be at least 6 characters long",
    });
  }

  if (password.toLowerCase().includes("password")) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      message: "Password should not contain the word 'password'",
    });
  }

  // check about the email
  const existingUser = await Employee.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, message: "User already exists" });
  }

  // add the new user to database
  const hashedPassword = await bcrypt.hash(password, 10);

  const newEmployee = await Employee.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "User created successfully",
    data: newEmployee,
  });
});

//=======================================================================================================================
// login
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "Email and password are required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const employee = await Employee.findOne({ email });

  if (!employee) {
    const error = appError.create(
      "Invalid email or password",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    const error = appError.create(
      "Invalid email or password",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const token = jwt.sign(
    { id: employee._id, role: employee.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  employee.token = token;
  await employee.save();

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Login successful",
    token,
    user: {
      id: employee._id,
      name: employee.firstName + " " + employee.lastName,
      email: employee.email,
      role: employee.role,
    },
  });
});


//=======================================================================================================================
// logout
const logout = asyncWrapper(async (req, res) => {
  res.clearCookie("token", {

    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Logged out successfully",
  });
});

// //=======================================================================================================================
// // forgetPassword
// const forgetPassword = asyncWrapper(async (req, res) => {
//   const { email } = req.body;

//   const employee = await Employee.findOne({ email });
//   if (!employee) return res.status(404).json({ message: 'Employee not found' });

//   const token = crypto.randomBytes(32).toString('hex');
//   employee.resetToken = token;
//   employee.resetTokenExpiry = Date.now() + 1000*60*60; // 1 hour
//   await employee.save();

//   const resetUrl = `http://localhost:${process.env.PORT}/reset-password/${token}`;
//   await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: email,
//     subject: 'Password Reset',
//     html: `<p>Click this link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`
//   });

//   res.json({ message: 'Password reset email sent' });

// });

// //=======================================================================================================================
// // resetPassword
// const resetPassword = asyncWrapper(async (req, res) => {
//   const { password } = req.body;
//   const { token } = req.params;
//   const employee = await Employee.findOne({
//     resetToken: token,
//     resetTokenExpiry: { $gt: Date.now() }
//   });

//   if (!employee) return res.status(400).json({ message: 'Invalid or expired token' });

//   employee.password = await bcrypt.hash(password, 12);
//   employee.resetToken = undefined;
//   employee.resetTokenExpiry = undefined;
//   await employee.save();

//   res.json({ message: 'Password has been reset' });
// });

// module.exports = { getEmployees, signup, login, logout, forgetPassword, resetPassword };

module.exports = { getEmployees, signup, login, logout, profile };
