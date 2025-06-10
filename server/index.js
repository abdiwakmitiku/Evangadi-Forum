const express = require("express");
const app = express();
const port = 4500;

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");
// questions routes middleware file
const questionRoutes = require("./routes/questionRoute");
// answers routes middleware file
const answerRoutes = require("./routes/answerRoute");



// json middleware to extract our json data
 app.use(express.json())

// user routes middleware
app.use("/api/users", userRoutes);

// questions routes middleware
app.use("/api/users", questionRoutes);

// answers routes middleware
app.use("/api/users", answerRoutes);

// async function start() {
//   try {
//     const result = await dbConnection.execute("select 'test'");
//     app.listen(port);
//     console.log("database connection established");
//     console.log(`listining on ${port}`);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// start();


async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

start();
