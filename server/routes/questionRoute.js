const express = require('express')
const router = express.Router()

// Question Controller
const { postQuestion, getSingleQuestion, getAllQuestion } = require("../controller/questionController");


// Post Question route
router.post("/", postQuestion);



// // Get All Questions route
// router.post("/", getAllQuestion);

// Get Single Question route
router.post("/:question_id", getSingleQuestion);





module.exports = router
