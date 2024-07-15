const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function jwtAuth(req, res, next) {
    const token = req.cookies.token;

    let user
    try {
        const userToken = jwt.verify(token, process.env.JWT_SECRET);

        user = await User.findById(userToken.id)
        if (user == null) {
            return res.status(404).json({ message: "User not found" })
        }

        req.user = user
        next();
    } catch (err) {
        res.clearCookie("token");
        res.status(400).json({ message: "User not authenticated" })
    }
}

module.exports = jwtAuth