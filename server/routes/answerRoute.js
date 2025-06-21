const express = require('express')
const router = express.Router()

// Answer Controller
const { getAnswer, postAnswer} = require("../controller/answerController");

// Post-Answer route
router.post("/:question_id", postAnswer);

// Get-Answer route
router.get("/:question_id", getAnswer);


module.exports = router