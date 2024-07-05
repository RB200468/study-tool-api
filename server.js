require('dotenv').config()

const express = require('express');
const app = express();
const portNumber = 5001

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_STRING)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]});
})

app.listen(portNumber, () => {console.log(`Server listening on port ${portNumber}`)});