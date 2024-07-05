const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const checkUser = require('../utils/checkUser');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await checkUser(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (passwordMatch) {
            return res.status(200).json({ message: "Login Successful" });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
