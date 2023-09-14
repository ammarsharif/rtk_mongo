const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
