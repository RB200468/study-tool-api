const express = require('express')
const router = express.Router()
const getUser = require('../middleware/getUser');
const jwtAuth = require('../middleware/jwtAuth');
const checkReqBody = require('../middleware/checkReqBody');
const validPassword = require('../utils/validPassword');
const bcrypt = require('bcrypt')


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
router.patch('/', checkReqBody, jwtAuth, async (req, res) => {
    try {
        const { username, email, password, is_admin } = req.body

        const user = req.user;

        if (username !== undefined) { user.username = username }
        if (email !== undefined) { user.email = email }
        if (is_admin !== undefined) { user.is_admin = is_admin }
        
        if (password !== undefined) {
            if (!validPassword(password)){
                return res.status(400).json({ message: "Invalid password format" })
            }
            const password_hash = await bcrypt.hash(password, 10);
            user.password_hash = password_hash
        }

        await user.save();

        res.status(200).json({ message: "User credentials patched" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// delete user
router.delete('/', jwtAuth, async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router