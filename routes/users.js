const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router()
const User = require('../models/user')
const getUser = require('../middleware/getUser');
const jwtAuth = require('../middleware/jwtAuth');
const confirmUser = require('../middleware/confirmUser');

/* TODO:
    - Update Username
    - Update Email
    - Update Password
    - Get user for current authenticated user
*/

// get user
router.get('/', jwtAuth, confirmUser, (req, res) => {
    res.send(req.user)
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