const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const taskModel = mongoose.model('Task', taskSchema);
module.exports = taskModel;
