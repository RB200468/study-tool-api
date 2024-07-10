require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB.js')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

/* TODO:
    - 
*/

// Database connection
connectDB()

// Routers
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const authenticationRouter = require('./routes/authentication.js')
app.use('/auth', authenticationRouter)

const deckRouter = require('./routes/decks.js')
app.use('/deck', deckRouter)

const flashcardRouter = require('./routes/flashcards.js')
app.use('/flashcard', flashcardRouter)

// Server listening message
app.listen(process.env.PORT, () => {console.log(`Server listening on port ${process.env.PORT}`)});