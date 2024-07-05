const mongoose = require('mongoose');
const deckSchema = require('./deck');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  library: [deckSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
