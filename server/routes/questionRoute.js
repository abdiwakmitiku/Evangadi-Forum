const express = require('express')
const router = express.Router()

// Question Controller
const { postQuestion, getSingleQuestion, getAllQuestion } = require("../controller/questionController");


// Post Question route
router.post("/", postQuestion);


// Get All Questions route
router.get("/", getAllQuestion);


// Get Single Question route
router.get("/:question_id", getSingleQuestion);





module.exports = router
