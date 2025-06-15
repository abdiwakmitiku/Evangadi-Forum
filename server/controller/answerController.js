// db connection
const dbConnection = require("../db/dbConfig");

const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  const { answer, questionid } = req.body;
  const userid = req.user?.userid;
  // const { questionid } = req.params;

  // console.log(questionid)
  // console.log(userid)
  // console.log(answer)
  if (!answer || !questionid || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Bad Request", message: "Please Provide Answer." });
  }
  if (answer.length < 10 || !isNaN(answer)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Bad Request", message: "Very short or Invalid input" });
  }
  try {
    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Answer Posted Successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: "Internal Server Error",
        message: "An Unexpected Error Occurred",
      });
  }
}

async function getAnswers(req, res) {
  try {
    const { questionid } = req.params;

    // Validate question_id is provided and is a number
    if (!questionid || isNaN(questionid)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Valid question_id is required",
      });
    }

    // // Check if the question exists first
    // const [question] = await dbConnection.query(
    //   'SELECT 1 FROM questions WHERE id = ? LIMIT 1',
    //   [questionid]
    // );

    if (!questionid.length) {
      return res.status(404).json({
        error: "Not Found",
        message: "The requested question could not be found",
      });
    }

    // Get all answers for the question
    const [answers] = await dbConnection.query(
      `SELECT 
        a.answerid as answer_id,
        a.content,
        u.username as user_name,
        a.created_at
       FROM answers a
       JOIN users u ON a.user_id = u.id
       WHERE a.question_id = ?
       ORDER BY a.created_at DESC`,
      [questionid]
    );

    // Format the response
    const formattedAnswers = answers.map((answer) => ({
      answer_id: answer.answer_id,
      content: answer.content,
      user_name: answer.user_name,
      created_at: new Date(answer.created_at).toISOString(),
    }));

    return res.status(200).json({ formattedAnswers });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

module.exports = { postAnswer, getAnswers };
