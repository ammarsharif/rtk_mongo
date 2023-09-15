const express = require('express');
const router = express.Router();
const {
  createNewTask,
  getAllTask,
  updatedTask,
  deleteTask,
  isCompleted,
  isIncomplete,
} = require('../controllers/taskControllers');

router.post('/createNewTask', createNewTask);
router.delete('/deleteTask/:id', deleteTask);
router.put('/completedTask', isCompleted);
router.put('/iscompletedTask', isIncomplete);
router.put('/updateTask', updatedTask);
router.get('/getAllTasks', getAllTask);

module.exports = router;
