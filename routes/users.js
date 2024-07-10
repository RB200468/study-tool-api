const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const User = require('../models/user')
const getUser = require('../middleware/getUser')

/* TODO:
    - Update Username
    - Update Email
    - Update Password
    - Get user for current authenticated user
*/

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get user
router.get('/:id', getUser, (req, res) => {
    res.send(res.user)
})

// update user
router.patch('/:id', getUser, (req, res) => {
    
})

// delete user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router