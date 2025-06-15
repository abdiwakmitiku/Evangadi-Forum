const express = require('express')
const router = express.Router()

// Answer Controller
const { getAnswers, postAnswer} = require("../controller/answerController");

// Post-Answer route
router.post("/", postAnswer);

// Get-Answer route
router.get("/", getAnswers);





module.exports = router