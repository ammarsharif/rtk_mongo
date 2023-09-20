const taskModel = require('../models/taskModels');
const jwtUtils = require('../utils/jwt');
const createNewTask = async (req, res) => {
  const isVerified = jwtUtils.verifyToken(req);
  if (!isVerified) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
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
  const isVerified = jwtUtils.verifyToken(req);
  if (!isVerified) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const { id, description } = req.body;

  try {
    // Assuming `taskModel` is a Mongoose model for tasks
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200).send(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res
      .status(500)
      .send({ error: 'An error occurred while updating the task' });
  }
};

module.exports = { updatedTask };

const deleteTask = async (req, res) => {
  const isVerified = jwtUtils.verifyToken(req);
  if (!isVerified) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
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
    const id = req.body.id;
    const task = await taskModel.findById(id);

    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    task.completed = !task.completed;
    await task.save();

    res.status(200).send(task);
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
};
