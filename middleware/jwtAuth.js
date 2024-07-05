const jwt = require('jsonwebtoken')

function jwtAuth(req, res, next) {
    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        res.status(400).json({ message: "User not authenticated" })
    }
}

module.exports = jwtAuth