const express = require('express');
const app = express();
const portNumber = 5001

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]});
})

app.listen(portNumber, () => {console.log(`Server listening on port ${portNumber}`)});