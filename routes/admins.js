const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtAuth = require('../middleware/jwtAuth');
const confirmUser = require('../middleware/confirmUser')
const isAdmin = require('../middleware/isAdmin');
const getUser = require('../middleware/getUser');
const checkReqBody = require('../middleware/checkReqBody')

/* TODO:
    - Implement all endpoints
*/

// Get all users
router.get('/users',jwtAuth, confirmUser, isAdmin, async (req, res) => {
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
router.get('/users/:id',jwtAuth, confirmUser, isAdmin, getUser, (req, res) => {
    try {
        const user = res.user
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update any user by user ID
router.patch('/users/:id', checkReqBody, jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {
        const { username, email, password, is_admin } = req.body
        const user = res.user;

        if (username !== undefined) { user.username = username }
        if (email !== undefined) { user.email = email }
        if (is_admin !== undefined) { user.is_admin = is_admin }
        if (password !== undefined) {
            const password_hash = await bcrypt.hash(password, 10);
            user.password_hash = password_hash
        }

        await user.save();

        res.status(200).json({ message: "User credentials patched" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete any user by user ID

// Get any users decks by user ID

// Update any users deck name by user ID and deck ID

// Delete any users deck by user ID and deck ID

// Get any users flashcards given user ID and Deck ID

// Update any users flashcard given user ID, deck ID and flashcard ID

// Delete any users flashcard given user ID, deck ID and flashcard ID


module.exports = router