const express = require('express')
const router = express.Router()

// Question Controller
const { getSingleQuestion, myQuestions, postQuestion, getAllQuestion, likeQuestion, viewCount, UnLike } = require('../controller/questionController.js');

// Post Question route
router.post('/', postQuestion)
// Get All Questions route
router.get('/', getAllQuestion)
// Get Single Question route
router.get('/:question_id', getSingleQuestion)


// Get My Questions route
router.get('/myquestions', myQuestions)
// View Counter route
router.post('/:question_id/view', viewCount)
// Unlike route
router.delete('/:question_id/unlike', UnLike)
// Like route
router.post('/:question_id/like', likeQuestion)

module.exports = router