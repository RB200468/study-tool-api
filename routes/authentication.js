require('dotenv').config()
const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const checkUser = require('../utils/checkUser');
const jwt = require('jsonwebtoken');
const createAndSetToken = require('../utils/createAndSetToken')

/* TODO:
    - 
*/

// Log user in
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await checkUser(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (passwordMatch) {
            createAndSetToken(user,res);

            return res.status(200).json({ message: "Login Successful" });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// register user
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, is_admin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, password_hash: hashedPassword, email, is_admin });

        await user.save();
        res.status(201).json({ message: "User registered" });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
})

module.exports = router;
