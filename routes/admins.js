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

// Register user or admin
router.post('/register', jwtAuth, confirmUser, isAdmin, async (req, res) => {
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

// Get all users
router.get('/users',jwtAuth, confirmUser, isAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
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
router.delete('/users/:id', jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get any users decks by user ID
router.get('/users/:id/decks', jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {

        const decks = res.user.library.map(deck => ({
            id: deck.id,
            name: deck.name
        }))

        res.status(200).json(decks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create a deck for any user by user ID
router.post('/users/:id/decks', checkReqBody, jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {
        const deckName = req.body.name;
    

        const newDeck = {
            name: deckName,
            flashcards: []
        }

        res.user.library.push(newDeck);
        await res.user.save();

        res.status(200).json({ message: "Deck created"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update any users deck name by user ID and deck ID
router.patch('/users/:id/decks/:deck_id', checkReqBody, jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {
        const { name } = req.body

        const deck = res.user.library.id(req.params.deck_id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        if (name !== undefined) { deck.name = name }

        await res.user.save();

        res.status(200).json({ message: "Deck credentials patched" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete any users deck by user ID and deck ID
router.delete('/users/:id/decks/:deck_id', jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {
        const deck = res.user.library.id(req.params.deck_id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        deck.deleteOne()
        await res.user.save()
        res.json({ message: 'Deleted deck' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get any users flashcards given user ID and Deck ID
router.get('/users/:id/decks/:deck_id', jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try {

        const deck = res.user.library.id(req.params.deck_id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        const flashcards = deck.flashcards.map(flashcard => ({
            id: flashcard.id,
            term: flashcard.term,
            definition: flashcard.definition
        }))

        res.status(200).json(flashcards)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create a flashcard given user ID and Deck ID
router.post('/users/:id/decks/:deck_id', jwtAuth, confirmUser, isAdmin, getUser, async (req, res) => {
    try{

        const deck = res.user.library.id(req.params.deck_id)
        if (!deck) {
            res.status(404).json({ message: "Deck not found" })
        }

        const flashCard = {
            term: req.body.term,
            definition: req.body.definition
        }

        deck.flashcards.push(flashCard)
        await res.user.save()

        res.status(200).json({ message: "Flashcard created" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update any users flashcard given user ID, deck ID and flashcard ID

// Delete any users flashcard given user ID, deck ID and flashcard ID
router.delete('/users/:id/decks/:deck_id/flashcards/:flashcard_id', jwtAuth, confirmUser, isAdmin, getUser, async (req,res) => {
    try{

        const deck = res.user.library.id(req.params.deck_id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        const flashcard = deck.flashcards.id(req.params.flashcard_id)
        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" })
        }

        flashcard.deleteOne()
        await res.user.save()

        res.status(200).json({ message: "Flashcard deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router