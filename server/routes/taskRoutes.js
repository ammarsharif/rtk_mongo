const express = require('express');
const router = express.Router();
const {
  createNewTask,
  getAllTask,
  updatedTask,
  deleteTask,
  isCompleted,
} = require('../controllers/taskControllers');

router.post('/createNewTask', createNewTask);
router.delete('/deleteTask/:id', deleteTask);
router.put('/isCompleted', isCompleted);
router.put('/updateTask', updatedTask);
router.get('/getAllTasks', getAllTask);

module.exports = router;
