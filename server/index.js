require("dotenv").config();
const express  = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

const cors = require("cors");
app.use(cors());

// db connection
const dbConnection = require("./db/dbConfig.js");

//Routes Middleware File
const userRoutes = require("./routes/userRoute.js");
const answerRoutes = require("./routes/answerRoute.js");
const questionRoutes = require("./routes/questionRoute.js");

// Authentication Middleware
const authMiddleware = require("./middleware/authMalware.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Server checking route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "🚀 Server is up!" });
// });

//Route Middleware
app.use("/api/user/", userRoutes);
app.use("/api/answer/", authMiddleware, answerRoutes);
app.use("/api/question/", authMiddleware, questionRoutes);


async function start() {
  try {
    // await dbConnection.execute("SELECT 1");
    await dbConnection.execute("SELECT 'test'");
    console.log("Database connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    // process.exit(1);
  }
}
start();
