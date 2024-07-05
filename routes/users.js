const express = require('express')
const router = express.Router()
const User = require('../models/user')
const getUser = require('../middleware/getUser')

// getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// getting one
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.username)
})

// creating one
router.post('/', async (req, res) => {
    try {
        const { username, password_hash, email } = req.body;
        const user = new User({ username, password_hash, email });
        await user.save();
        res.status(201).send('User registered');
      } catch (error) {
        res.status(400).send('Error registering user');
      }
})

// updating one
router.patch('/:id', getUser, (req, res) => {
    
})

// deleting one
router.delete('/:id', getUser, (req, res) => {
    
})

module.exports = router