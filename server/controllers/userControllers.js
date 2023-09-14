const userModel = require('../models/userModels');
const createNewUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log('Name', userName);
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({
        message: 'Email already exists',
      });
    }
    const newUser = new userModel({
      userName,
      email,
      password,
    });
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message, request: req });
  }
};
const login = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await userModel.findOne({
      email,
    });
    console.log(users);
    return res.status(200).send(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message });
  }
};
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userName, email, password } = req.body;
//     const updatedUser = await userModel.findByIdAndUpdate(
//       id,
//       { userName, email, password },
//       { new: true }
//     );
//     return res.status(200).send(updatedUser);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send({ message: error.message });
//   }
// };
const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
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
