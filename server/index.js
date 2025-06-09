const express = require("express");
const app = express();
const port = 4500;

// user routes middleware file
const userRoutes = require("./routes/userRoute")
// questions routes middleware file
const questionRoutes = require("./routes/questionRoute")
// answers routes middleware file
const answerRoutes = require("./routes/answerRoute")


// user routes middleware
app.use("/api/users",userRoutes)


// questions routes middleware
app.use("/api/users",questionRoutes)


// answers routes middleware
app.use("/api/users",answerRoutes)



app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`listening on ${port}`);
  }
});
