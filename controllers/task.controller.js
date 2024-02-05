const Tasks = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const payload = req.body;

    new Tasks(payload)
      .save()
      .then((data) => {
        res.status(201).send({
          message: "Task added successfully",
          task: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while saving task",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    Tasks.find()
      .then((data) => {
        res.status(200).send({
          message: "Tasks retrieved successfully",
          Tasks: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error in retrieving tasks",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    await Tasks.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        dueDate,
      },
      {
        new: true,
      }
    )
      .then((data) => {
        res.status(200).send({
          message: "The task has been updated.",
          Task: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Failed to update the task.",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.findByIdAndRemove(id);
    res.status(200).send({
      message: "The task has been deleted.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
