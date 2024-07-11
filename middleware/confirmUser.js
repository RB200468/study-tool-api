const User = require('../models/user')

async function confirmUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.user.id)
        if (user == null) {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.user = user
    next()
}

module.exports = confirmUser