
const mongoose = require("mongoose");
const validator = require("validator");
const { type } = require("os");

const userRoles = require("../utils/userRoles");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: [validator.isEmail, "must be a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.EMPLOYEE, userRoles.MANAGER],
    default : userRoles.EMPLOYEE
  },
  resetToken: String,
  resetTokenExpiry: Date

});


module.exports = mongoose.model("Employee", employeeSchema);
