import React, { useState } from 'react';
import {
  addTask,
  toggleComplete,
  updateTask,
} from '../../features/reducer/taskReducer';
import { logout, deleteUser } from '../../features/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AllListView from './AllListView';
import { v4 as uuidv4 } from 'uuid';

const ListView = () => {
  const [task, setTask] = useState({
    description: '',
    id: '',
  });
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uuid = uuidv4();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser(user.userId));
    alert(`User ${user.email} is deleted`);
    dispatch(logout());
    navigate('/');
  };
  const data = useSelector((state) =>
    state.UserTask.tasks.filter((task) => task.userId === user.userId)
  );
  const clickHandler = (e) => {
    e.preventDefault();
    const inputAsString = task.description.toString();
    if (inputAsString.length > 0 && inputAsString.trim().length > 0) {
      if (task.id) {
        dispatch(updateTask({ description: inputAsString, id: task.id }));
      } else {
        dispatch(
          addTask({
            description: inputAsString,
            id: uuid,
            userId: user.userId,
            completed: false,
          })
        );
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
      <h4>{user.name.toUpperCase()}</h4>
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
            <form onSubmit={clickHandler} className=" d-flex col-12">
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
                      id={todo?.id}
                      input={task.description}
                      setInput={() => setTask(todo)}
                    />

                    {todo.completed ? (
                      <button
                        className="badge bg-success rounded-pill"
                        onClick={() => handleComplete(todo.id)}
                      >
                        Complete
                      </button>
                    ) : (
                      <button
                        className="badge bg-primary rounded-pill"
                        onClick={() => handleComplete(todo.id)}
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
