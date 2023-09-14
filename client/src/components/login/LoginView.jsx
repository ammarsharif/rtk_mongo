import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../features/reducer/reducer';
const Login = () => {
  const users = useSelector((state) => state.user.users);
  const initialState = { email: '', pass: '' };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.pass) {
      alert('Please enter both email and password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: user.email,
        password: user.pass,
      });
      if (response.status === 200) {
        const usersFromServer = response.data;
        console.log(usersFromServer);
        if (usersFromServer) {
          dispatch(login(usersFromServer));
          navigate('/todo');
        } else {
          alert('Invalid Username or Password');
        }
      } else {
        console.error('Unexpected status code:', response.status);
        alert('Error occurred while retrieving user data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while finding user');
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="loginContainer">
          <h4>Login Page</h4>
          <form>
            <div className="mb-3 col-4">
              <input
                type="email"
                value={user.email}
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-4">
              <input
                type="password"
                value={user.pass}
                name="pass"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary " onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
