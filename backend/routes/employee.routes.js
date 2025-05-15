const express = require("express");
const Controller = require("../controllers/employee.controller")
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo")
const userRoles = require("../utils/userRoles")

const router = express.Router();

// // get all
router.get("/", Controller.getEmployees);

router.get('/profile',Controller.profile)

// // signup
router.post("/signup", Controller.signup);

// // Login
router.post("/login", Controller.login);

// // logout
router.post("/logout",verifyToken, Controller.logout)

// // // forget Password
// router.post('/forgot-password', Controller.forgetPassword)

// // // reset Password
// router.post('/reset-password/:token', Controller.resetPassword)


module.exports = router;
