const express = require('express')
const router = express.Router()
const getUser = require('../middleware/getUser');
const jwtAuth = require('../middleware/jwtAuth');
const checkReqBody = require('../middleware/checkReqBody');
const validPassword = require('../utils/validPassword');
const bcrypt = require('bcrypt')


/* TODO:
    -
*/

// get user
router.get('/', jwtAuth, async (req, res) => {
    try {
        const user = {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            library: req.user.library
        }

        res.status(200).json(user)
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

module.exports = router