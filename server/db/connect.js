import mongoose from 'mongoose';

const url =
  'mongodb+srv://rtkmongo:rtkmongo@cluster0.3ylrwdt.mongodb.net/?retryWrites=true&w=majority';
const connectDB = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default connectDB;
