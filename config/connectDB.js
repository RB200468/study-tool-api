require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    if (process.env.NODE_ENV !== 'test') {
      console.log('Database connected');
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Database connection error', err);
      process.exit(1); 
    }
    throw err;
  }
};

module.exports = connectDB;
