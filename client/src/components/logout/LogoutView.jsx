import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, deleteUser } from '../../features/reducer/reducer';
import { useNavigate } from 'react-router-dom';
const LogoutView = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };
  console.log(user, 'userId');
  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser(user.userId));
    alert(`User ${user.email} is deleted`);
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="text-center">
            <h4>Logged in as {user.name}</h4>
            <button className="btn btn-danger" onClick={logoutHandler}>
              Log Out
            </button>
            <button className="btn btn-secondary mx-2" onClick={deleteHandler}>
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutView;
