const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwtAuth = require('../middleware/jwtAuth');
const confirmUser = require('../middleware/confirmUser')

/* TODO:
    - Update name of deck
    - Get all decks given user id
*/

// get all for current authed user
router.get('/', jwtAuth, confirmUser, async (req, res) => {
    try {

        const decks = req.user.library.map(deck => ({
            id: deck.id,
            name: deck.name
        }))

        res.status(200).json(decks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// get one from current user's library
router.get('/:id', jwtAuth, confirmUser, async (req, res) => {
    try {

        const deck = req.user.library.id(req.params.id)
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
router.post('/', jwtAuth, confirmUser, async (req, res) => {
    try{
        const deckName = req.body.name;
    

        const newDeck = {
            name: deckName,
            flashcards: []
        }

        req.user.library.push(newDeck);
        await req.user.save();

        res.status(200).json({ message: "Deck created"})

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// delete one of the current user's decks
router.delete('/:id', jwtAuth, confirmUser, async (req, res) =>{
    try {

        const deck = req.user.library.id(req.params.id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        deck.deleteOne()
        await req.user.save();

        return res.status(200).json({ message: "Deck deleted" })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    } 
})


module.exports = router