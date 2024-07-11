const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwtAuth = require('../middleware/jwtAuth');
const confirmUser = require('../middleware/confirmUser')
const isAdmin = require('../middleware/isAdmin');

/* TODO:
    - Implement all endpoints
*/

// Get all users
router.get('/',jwtAuth, confirmUser, isAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Register user or admin
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, is_admin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, password_hash: hashedPassword, email, is_admin });

        await user.save();

        let regMessage
        if (is_admin === true) {
            regMessage = "Admin registered"
        } else {
            regMessage = "User registered"
        }

        res.status(201).json({ message: regMessage });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
})

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