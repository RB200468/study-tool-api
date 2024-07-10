async function isAdmin (req, res, next) {
    if (!req.user.is_admin) {
        res.status(401).json({ message: "User unauthorised" })
    }
    next()
}

module.exports = isAdmin
