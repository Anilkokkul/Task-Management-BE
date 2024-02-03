const express = require("express");
const app = express();
const { db } = require("./db/db");
require("dotenv").config();
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

db();
app.use(express.json());
app.use(taskRoutes);
app.use(userRoutes);

const port = process.env.PORT || 8080;

// Serve static files from the `public` folder.

app.get("/", (req, res) => {
  res.send({
    message: "Hello World! this is the Task management API",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhot:${port}`);
});
