import React, { useEffect, useState } from 'react';
import { logout } from '../../features/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AllListView from './AllListView';
import {
  addNewTask,
  fetchTasks,
  toggleCompleteTask,
  updateYourTask,
} from '../../actions/todolist';
import { userDelete } from '../../actions/users';

const ListView = () => {
  const [task, setTask] = useState({
    description: '',
    id: '',
    completed: false,
  });
  const userId = useSelector((state) => state.user.loggedInUser?.id);
  const getallTasks = () => {
    dispatch(fetchTasks(userId));
  };
  useEffect(() => {
    getallTasks();
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
    alert(`User ${user.email} is deleted`);
    dispatch(userDelete(user.id));
    navigate('/');
  };
  const data = useSelector((state) => state.UserTask.tasks);
  const submitHandler = async (e) => {
    e.preventDefault();
    const inputAsString = task.description.toString();
    if (inputAsString.length > 0 && inputAsString.trim().length > 0) {
      if (task._id) {
        dispatch(updateYourTask({ id: task._id, description: inputAsString }));
      } else {
        const newTask = {
          description: inputAsString,
          userId: user.id,
          completed: false,
        };
        dispatch(addNewTask({ ...newTask, userId }));
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
    dispatch(toggleCompleteTask({ id }));
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

                    {todo?.completed ? (
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
