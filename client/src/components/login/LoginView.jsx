import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/reducer/reducer';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const initialState = { email: '', pass: '' };
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const matchingUser = users.find(
      (currentUser) =>
        currentUser.email === user.email && currentUser.password === user.pass
    );
    if (matchingUser) {
      dispatch(
        login({
          name: matchingUser.name,
          email: matchingUser.email,
          userId: matchingUser.userId,
        })
      );
      setUser(initialState);
      navigate('/todo');
    } else {
      alert('Invalid Username or Password');
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
