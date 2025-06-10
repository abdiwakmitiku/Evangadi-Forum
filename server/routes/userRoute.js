const express = require("express");
const router = express.Router();


// Authentication Middleware
const authMiddleware = require('../middleware/authMalware')

// User Controller
const { register, login, checkUser } =
  require("../controller/userController");

  
// register route
router.post("/register", register);

// login user
router.post("/login", login);

// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
