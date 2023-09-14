const mongodb = require('mongodb');
const mongoose = require('mongoose');
const url =
  'mongodb+srv://rtkmongo:rtkmongo@cluster0.3ylrwdt.mongodb.net/?retryWrites=true&w=majority';
const connectDB = () => {
  console.log('Connected');
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
