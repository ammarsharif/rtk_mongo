import React, { useEffect, useState } from 'react';
import {
  addTask,
  setAllTasks,
  toggleComplete,
  updateTask,
} from '../../features/reducer/taskReducer';
import { logout } from '../../features/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AllListView from './AllListView';
import axios from 'axios';

const ListView = () => {
  const [task, setTask] = useState({
    description: '',
    id: '',
  });
  const getTasks = async () => {
    try {
      const userId = user._id;
      const response = await axios.get(
        `http://localhost:5000/tasks/getAllTasks?userId=${userId}`
      );
      dispatch(setAllTasks(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/delete?id=${user._id}`
      );
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while finding user');
    }
    alert(`User ${user.email} is deleted`);
    dispatch(logout());
    navigate('/');
  };
  // const data = useSelector((state) =>
  //   state.UserTask.tasks.filter((task) => task.userId === user._id)
  // );
  const data = useSelector((state) => state.UserTask.tasks);
  const submitHandler = async (e) => {
    e.preventDefault();
    const inputAsString = task.description.toString();
    if (inputAsString.length > 0 && inputAsString.trim().length > 0) {
      if (task._id) {
        const response = await axios.put(
          'http://localhost:5000/tasks/updateTask',
          {
            id: task._id,
            description: inputAsString,
          }
        );
        console.log(response);
        // dispatch(updateTask({ description : inputAsString, id: task.id }));
      } else {
        const newTask = {
          description: inputAsString,
          userId: user._id,
          completed: false,
        };
        try {
          const response = await axios.post(
            'http://localhost:5000/tasks/createNewTask',
            newTask
          );
          if (response.status === 201) {
            console.log(response.data);
          } else {
            console.error('Unexpected status code:', response.status);
            alert('Error occurred while creating the task');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while creating the task');
        }
      }
      setTask({
        description: '',
        id: '',
      });
    } else {
      alert('Please enter a valid input');
    }
  };
  const handleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  return (
    <div className="container mt-5">
      <h4>{user?.userName?.toUpperCase()}</h4>
      <nav className="navbar navbar-light bg-light">
        <form className="container-fluid justify-content-start">
          <button className="btn btn-danger" onClick={logoutHandler}>
            Log Out
          </button>
          <button className="btn btn-secondary mx-2" onClick={deleteHandler}>
            Delete User
          </button>
        </form>
      </nav>
      <h1 className="text-center">Todo List</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <form onSubmit={submitHandler} className=" d-flex col-12">
              <input
                type="text"
                value={task.description}
                className="form-control"
                placeholder="Add a new task..."
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
              <button className="btn btn-outline-secondary mx-1" type="submit">
                {task.userId ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
          <div>
            <ul className="list-group">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((todo, key) => (
                  <li className="list-group-item" key={key}>
                    <AllListView
                      description={todo?.description}
                      id={todo?._id}
                      input={task.description}
                      setInput={() => setTask(todo)}
                    />

                    {todo.completed ? (
                      <button
                        className="badge bg-success rounded-pill"
                        onClick={() => handleComplete(todo._id)}
                      >
                        Complete
                      </button>
                    ) : (
                      <button
                        className="badge bg-primary rounded-pill"
                        onClick={() => handleComplete(todo._id)}
                      >
                        Incomplete
                      </button>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No data available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
