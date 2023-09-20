const userModel = require('../models/userModels');
const jwtUtils = require('../utils/jwt');

const createNewUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({
        message: 'Email already exists',
      });
    } else {
      const newUser = new userModel({
        userName,
        email,
        password,
      });
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message, request: req });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.json('Invalid Email');
    }
    return res.status(200).send({
      message: 'User authenticated',
      users: {
        email: user.email,
        id: user._id,
        userName: user.userName,
        token: jwtUtils.createAuthorizationToken(user),
      },
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await userModel.findByIdAndDelete(id);
    return res.status(200).send(deletedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createNewUser,
  login,
  deleteUser,
};
