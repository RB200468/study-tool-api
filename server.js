require('dotenv').config()
const express = require('express');
const app = express();
const portNumber = 5001
const mongoose = require('mongoose')
const connectDB = require('./config.js')

// Database connection
connectDB()

// Routers
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)



app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]});
})

app.listen(portNumber, () => {console.log(`Server listening on port ${portNumber}`)});