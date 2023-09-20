import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../actions/users';
const Login = () => {
  const initialState = { email: '', pass: '' };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(user));
    navigate('/todo');
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
