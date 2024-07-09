const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwtAuth = require('../middleware/jwtAuth');

// get all
router.get('/', jwtAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user){
            res.status(404).json({ message: "User not found" })
        }

        const decks = user.library.map(deck => ({
            id: deck.id,
            name: deck.name
        }))

        res.status(200).json(decks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get one from current user's library
router.get('/:id', jwtAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }

        const deck = user.library.id(req.params.id)
        if (!deck) {
            res.status(404).json({ message: "Deck not found" })
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

// create one for current user
router.post('/', jwtAuth, async (req, res) => {
    try{
        const deckName = req.body.name;

        const user = await User.findById(req.user.id)
        if (!user) {
            res.status(404).json({ message: "User not found"})
        }        

        const newDeck = {
            name: deckName,
            flashcards: []
        }

        user.library.push(newDeck);
        await user.save();

        res.status(200).json({ message: "Deck created"})

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// delete one of the current user's decks
router.delete('/:id', jwtAuth, async (req, res) =>{
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const deck = user.library.id(req.params.id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        deck.deleteOne()
        await user.save();

        return res.status(200).json({ message: "Deck deleted" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    } 
})


module.exports = router