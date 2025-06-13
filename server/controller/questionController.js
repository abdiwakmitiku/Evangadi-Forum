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

    // Generate a UUID
  const questionid = uuidv4()

  try {
     await dbConnection.execute(
      'INSERT INTO questions (questionid,userid, title, description, tag) VALUES (?, ?, ?, ?, ?)',
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



//  async function getAllQuestion(req, res) {
//   const userId = req.user?.user_id || null;

//   const query = `
//     SELECT 
//       q.question_id,
//       q.title,
//       q.description,
//       q.tag,
//       q.time,
//       q.views,
//       u.user_id,
//       u.username,
//       u.first_name,
//       u.last_name,
//       (SELECT COUNT(*) FROM likes WHERE question_id = q.question_id) AS likes_count,
//       ${
//         userId
//           ? `(SELECT COUNT(*) FROM likes WHERE question_id = q.question_id AND user_id = ?) AS liked_by_user`
//           : `0 AS liked_by_user`
//       }
//     FROM questions q
//     JOIN users u ON q.user_id = u.user_id
//     ORDER BY q.time DESC
//   `;

//   try {
//     const [rows] = userId
//       ? await connection.execute(query, [userId])
//       : await connection.query(query);

//     res.status(200).json({ questions: rows });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Failed to fetch questions',
//       error: error.message
//     });
//   }
// }

 async function getSingleQuestion(req, res) {
  const { qid } = req.params;
  const query = `
    SELECT q.*, u.username, u.first_name, u.last_name
    FROM questions q
    JOIN users u ON q.user_id = u.user_id
    WHERE q.question_id = ?
  `;

  try {
    const [result] = await connection.execute(query, [qid]);
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Question not found' });
    }
    res.status(StatusCodes.OK).json({ question: result[0] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal (Database error) occurred',
      error: error.message
    });
  }
}





module.exports = { postQuestion, getSingleQuestion,  };
// getAllQuestion