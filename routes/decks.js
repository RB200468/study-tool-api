const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const User = require('../models/user')
const getUser = require('../middleware/getUser');
const jwtAuth = require('../middleware/jwtAuth');

// get all
router.get('/', jwtAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user){
            return res.status(400).json({ message: "User not found" })
        }

        const decks = user.library.map(deck => ({
            id: deck.deck_id,
            name: deck.name
        }))

        return res.status(200).json(decks)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


// get one

// create one

// delete one


module.exports = router