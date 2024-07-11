const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwtAuth = require('../middleware/jwtAuth');
const confirmUser = require('../middleware/confirmUser')

/* TODO:
    - Implement all endpoints
*/

// Get any user by user ID

// Update any user by user ID

// Delete any user by user ID

// Get any users decks by user ID

// Update any users deck name by user ID and deck ID

// Delete any users deck by user ID and deck ID

// Get any users flashcards given user ID and Deck ID

// Update any users flashcard given user ID, deck ID and flashcard ID

// Delete any users flashcard given user ID, deck ID and flashcard ID


module.exports = router