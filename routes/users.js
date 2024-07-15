const express = require('express')
const router = express.Router()
const getUser = require('../middleware/getUser');
const jwtAuth = require('../middleware/jwtAuth');


/* TODO:
    - Update Username
    - Update Email
    - Update Password
    - Get user for current authenticated user
*/

// get user
router.get('/', jwtAuth, async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// update user
router.patch('/:id', jwtAuth, getUser, (req, res) => {
    
})

// delete user
router.delete('/:id', jwtAuth, getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router