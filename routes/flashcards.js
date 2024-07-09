const express = require('express');
const User = require('../models/user');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

/* TODO:
    - Add Change Flashcard route
*/

// Create one given deck id, term and definition
router.post('/:id', jwtAuth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id)
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }

        const deck = user.library.id(req.params.id)
        if (!deck) {
            res.status(404).json({ message: "Deck not found" })
        }

        const flashCard = {
            term: req.body.term,
            definition: req.body.definition
        }

        deck.flashcards.push(flashCard)
        await user.save()

        res.status(200).json({ message: "Flashcard created" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Delete a flashcard
router.delete('/:id', jwtAuth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const deck = user.library.id(req.params.id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }

        const flashcard = deck.flashcards.id(req.body.flashcard_id)
        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" })
        }

        flashcard.deleteOne()
        await user.save()

        res.status(200).json({ message: "Flashcard created" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router