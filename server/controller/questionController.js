// db connection
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function postQuestion(req, res) {
  const { userid } = req.user;
  const { title, description, tag } = req.body.question;

  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please Provide All Required Fields!",
    });
  }

  if (title.length < 5 || description.length < 10) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Make sure You Insert Valid Amount!",
    });
  }

  // Generate UUID random strings for question ID
  const questionid = uuidv4();

  try {
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag || null]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Question Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function getAllQuestion(req, res) {
  try {
    const [allQuestions] = await dbConnection.query(
      `SELECT 
        q.questionid,
        q.title,
        q.description,
        q.tag,
        q.created_at,
        u.userid,
        u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       ORDER BY q.created_at DESC` // DESC is for sorting newest first
    );

    const Questions = allQuestions.map((question) => ({
      question_id: question.questionid,
      title: question.title,
      content: question.description,
      user_name: question.username,
      created_At: new Date(question.created_at).toISOString(),
    }));

    if (Questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Not Found", message: "No Questions Found." });
    }

    return res.status(StatusCodes.OK).json({ Questions });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An Unexpected Error Occurred",
    });
  }
}

async function getSingleQuestion(req, res) {
  try {
    const questionid = req.params.question_id;

    const [question] = await dbConnection.query(
      `SELECT 
        q.questionid,
        q.title,
        q.description,
        q.tag,
        q.created_at,
        u.userid,
        u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
      [questionid]
    );

    if (!question || question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The Requested Question Could Not Be Found",
      });
    }

    const Response = {
      Question: {
        question_id: question[0].questionid,
        title: question[0].title,
        content: question[0].description,
        user_id: question[0].userid,
        created_at: new Date(question[0].created_at).toISOString(),
      },
    };

    return res.status(StatusCodes.OK).json(Response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

module.exports = { postQuestion, getSingleQuestion, getAllQuestion };
