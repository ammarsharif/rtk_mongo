import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signUp } from '../../features/reducer/reducer';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SignupView = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const initialState = { userName: '', email: '', pass: '' };
  const [user, setUser] = useState(initialState);
  const uuid = uuidv4();

  const navigate = useNavigate();
  const validateForm = () => {
    const validationErrors = {};

    if (!user.userName.trim()) {
      validationErrors.value = alert('Please Enter A Valid UserName');
    }

    if (!user.email.trim()) {
      validationErrors.email = alert('Email Is Not Perfectly Defined');
    }

    if (user.pass.length < 1) {
      validationErrors.password = alert(
        'Password Contains At Least 6 Characters'
      );
    }

    return validationErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      const matchingUser = users.find(
        (currentUser) => currentUser.email === user.email
      );
      const newUser = {
        name: user.userName,
        password: user.pass,
        email: user.email,
        userId: uuid,
      };
      if (!matchingUser) {
        dispatch(signUp(newUser));
        setUser(initialState);
        navigate('/login');
      } else {
        alert('User Already exists');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="loginContainer">
          <h4>User SignUp</h4>
          <form>
            <div className="mb-3 col-4">
              <input
                value={user.userName}
                className="form-control"
                placeholder="Username"
                name="userName"
                onChange={handleChange}
              />
            </div>
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
                className="form-control"
                placeholder="Password"
                name="pass"
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary " onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
