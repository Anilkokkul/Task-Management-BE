const express = require("express");
const {
  createTask,
  getAllTasks,
  editTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/create", createTask);

router.get("/tasks", getAllTasks);

router.put("/edit-task/:id", editTask);

module.exports = router;
