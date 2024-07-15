async function getDeck(req, res, next) {
    let deck
    try {

        deck = await res.user.library.id(req.params.deck_id)
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.deck = deck
    next()
}

module.exports = getDeck