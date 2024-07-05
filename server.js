require('dotenv').config()
const express = require('express');
const app = express();
const portNumber = 5001
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB.js')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

// Database connection
connectDB()

// Routers
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const authenticationRouter = require('./routes/authentication.js')
app.use('/auth', authenticationRouter)



app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]});
})

app.listen(portNumber, () => {console.log(`Server listening on port ${portNumber}`)});