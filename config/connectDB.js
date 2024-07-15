require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.CONNECTION_URI_PROD);
    } else {
      await mongoose.connect(process.env.CONNECTION_URI_DEV);
    }
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
