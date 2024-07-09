const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    flashcard_id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
    term: { type: String, required: true },
    definition: { type: String, required: true }
});

module.exports = flashcardSchema;
