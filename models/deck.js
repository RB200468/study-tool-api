const mongoose = require('mongoose');
const flashcardSchema = require('./flashcard');

const deckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flashcards: [flashcardSchema]
});

module.exports = deckSchema;
