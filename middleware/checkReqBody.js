async function checkReqBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body empty" })
    }
    next()
}

module.exports = checkReqBody