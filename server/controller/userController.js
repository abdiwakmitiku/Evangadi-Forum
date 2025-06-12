// db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

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
        .status(StatusCodes.CONFLICT)
        .json({ msg: "User Already Existed" });
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
      .json({ msg: "An Unexpected Error Occurred" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please Enter All Required Fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid Credential" });
    }
    // Compare Password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid Credential" });
    }

    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "User Login Successfully", token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An Unexpected Error Occurred" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg: "Valid User", username, userid });
}

module.exports = { register, login, checkUser };
