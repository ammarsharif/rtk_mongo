import {
  addTask,
  updateTask,
  deleteTask,
  toggleComplete,
  setAllTasks,
} from '../features/reducer/taskReducer';
import { apiRequest } from '../utils/axios';

export const fetchTasks = (userId) => (dispatch) => {
  apiRequest(
    `http://localhost:5000/tasks/getAllTasks?userId=${userId}`,
    'get',
    null
  ).then((response) => dispatch(setAllTasks(response.data)));
};

export const addNewTask = (newTask) => (dispatch) => {
  console.log(newTask);
  apiRequest('http://localhost:5000/tasks/createNewTask', 'post', newTask).then(
    (response) => {
      console.log(response);
      dispatch(addTask(response.data));
    }
  );
};

export const updateYourTask = (taskId) => (dispatch) => {
  apiRequest('http://localhost:5000/tasks/updateTask', 'put', taskId).then(
    (response) => dispatch(updateTask(response.data))
  );
};

export const deletedTask = (taskId) => (dispatch) => {
  apiRequest(`http://localhost:5000/tasks/deleteTask/${taskId}`, 'delete').then(
    (response) => dispatch(deleteTask(response.data._id))
  );
};

export const toggleCompleteTask = (taskId) => (dispatch) => {
  apiRequest('http://localhost:5000/tasks/isCompleted', 'put', taskId).then(
    (response) => dispatch(toggleComplete(response.data._id))
  );
};
