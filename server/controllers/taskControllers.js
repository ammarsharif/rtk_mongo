const taskModel = require('../models/taskModels');
const createNewTask = async (req, res) => {
  try {
    const newTask = await taskModel.create(req.body);
    res.status(201).send(newTask);
  } catch (err) {
    res.status(500).send(err);
  }
};
const getAllTask = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userTasks = await taskModel.find({ userId });
    res.status(200).send(userTasks);
  } catch (err) {
    res.status(500).send(err);
  }
};
const updatedTask = async (req, res) => {
  try {
    const id = req.body.id;
    const updatedTask = await taskModel.findByIdAndUpdate(id, req.body);
    res.status(200).send(updatedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await taskModel.findByIdAndDelete(id);
    res.status(200).send(deletedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};
const isCompleted = async (req, res) => {
  try {
    const id = req.params.id;
    const completedTask = await taskModel.findByIdAndUpdate(id, {
      isCompleted: true,
    });
    res.status(200).send(completedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};
const isIncomplete = async (req, res) => {
  try {
    const id = req.params.id;
    const incompletedTask = await taskModel.findByIdAndUpdate(id, {
      isCompleted: false,
    });
    res.status(200).send(incompletedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  createNewTask,
  getAllTask,
  updatedTask,
  deleteTask,
  isCompleted,
  isIncomplete,
};
