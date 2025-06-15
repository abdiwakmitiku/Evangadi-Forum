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
  const { question_id } = req.params;

  try {
    // Check if the question exists
    const [checkQuestion] = await dbConnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [question_id]
    );

    if (checkQuestion.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The Requested Question Could Not Be Found.",
      });
    }

    // fetch all answers for that question
    const [answers] = await dbConnection.query(
      `SELECT 
         answers.answerid AS answer_id,
         answers.answer AS content,
         users.username AS user_name,
         answers.created_at
       FROM answers
       JOIN users ON answers.userid = users.userid
       WHERE answers.questionid = ?
       ORDER BY answers.created_at ASC`,// ASC is for sorting oldest first
      [question_id]
    );

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An Unexpected Error Occurred.",
    });
  }
};


module.exports = { postAnswer, getAnswers };
