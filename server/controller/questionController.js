// db connection
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require('uuid');


async function postQuestion(req, res) {
  const { username, userid } = req.user;
  const { title, description, tag } = req.body.question;

  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please Provide All Required Fields!"
    });
  }

  if (title.length < 10 || description.length < 15) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please Make sure You Insert Valid Amount!"
    });
  }

    // Generate UUID
  const questionid = uuidv4()

  try {
     await dbConnection.query(
      "INSERT INTO questions (questionid,userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag || null]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: 'Question created successfully',
      questionid,
      title,
      description,
      tag: tag || null,
      created_by: { userid, username },
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      msg: "An unexpected error occurred."
    });
  }
}



async function getAllQuestion(req, res) {
  
  try {
    const [questions] = await dbConnection.query(
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
       ORDER BY q.created_at DESC` // DESC for newest first
    );
    if (questions.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No Questions Found." });
  }
    return res.status(StatusCodes.OK).json(questions)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error",msg: "An Unexpected Error Occurred" });
  }
}


async function getSingleQuestion(req, res) {
  const questionid = req.params.questionid;
  
  try {
    const [question] = await dbConnection.query(
  `SELECT 
    q.questionid,
    q.title,
    q.description,
    q.created_at,
    u.userid,
    u.username
   FROM questions q
   JOIN users u ON q.userid = u.userid
   WHERE q.questionid = ?`,  // This line is crucial
  [questionid]  // This binds the parameter
);
    
    if (!question.length) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





module.exports = { postQuestion, getSingleQuestion,getAllQuestion  };
