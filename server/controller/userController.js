// db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please Provide All Required Fields!" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email=?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User Already Registered" });
    }
    if (password.length <= 7) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password Must be Atleast 8 characters" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User Registered Successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something Went Wrong, Please Try again Later" });
  }
}

async function login(req, res) {
  res.send("login");
}

async function checkUser(req, res) {
  res.send("check user");
}

module.exports = { register, login, checkUser };
