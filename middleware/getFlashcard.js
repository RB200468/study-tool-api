async function getFlashcard(req, res, next) {
    let flashcard
    try {
        flashcard = await res.deck.flashcards.id(req.params.flashcard_id)
        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.flashcard = flashcard
    next()
}

module.exports = getFlashcard