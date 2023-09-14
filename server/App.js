const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 5000;
const taskRoutes = require('./routes/taskRoutes');
const usersRoutes = require('./routes/userRoutes');
const dataBase = async () => {
  await connectDB();
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/users', usersRoutes);
dataBase();
// module.exports = dataBase;
