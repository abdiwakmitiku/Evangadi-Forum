const express = require("express");
const router = express.Router();

// Authentication Middleware
const authMiddleware = require("../middleware/authMalware.js");

// User Controller
const { LogIn, Register, Check } = require("../controller/userController.js");


// Register Route
router.post("/register", Register);
// Login User
router.post("/login", LogIn);
// Check User
router.get("/check", authMiddleware, Check);


module.exports = router;