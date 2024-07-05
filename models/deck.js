const mongoose = require('mongoose');
const flashcardSchema = require('./flashcard');

const deckSchema = new mongoose.Schema({
  deck_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  flashcards: [flashcardSchema]
});

module.exports = deckSchema;
