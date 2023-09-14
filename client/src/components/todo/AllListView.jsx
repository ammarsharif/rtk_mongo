import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/reducer/taskReducer';
import { AiOutlineReload } from 'react-icons/ai';
import axios from 'axios';
const AllListView = (props) => {
  const dispatch = useDispatch();
  const deleteTaskHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/tasks/deleteTask/:id={props.id}',
        {
          id: props.id,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(props.id);
  };
  const updateHandler = () => {
    props.setInput();
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <span>{props.description}</span>
      <div className="d-flex">
        <button
          className="btn btn-sm btn-outline-danger mt-1"
          onClick={deleteTaskHandler}
        >
          Delete
        </button>
        <button
          className="btn btn-outline-secondary btn-sm mt-1 mx-1"
          onClick={updateHandler}
        >
          <AiOutlineReload />
        </button>
      </div>
    </div>
  );
};

export default AllListView;
