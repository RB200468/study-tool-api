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

// Routers
const usersRouter = require('./routes/users')
const authenticationRouter = require('./routes/authentication')
const deckRouter = require('./routes/decks')
const flashcardRouter = require('./routes/flashcards')
const adminRouter = require('./routes/admins')

const apiRouter = express.Router();

apiRouter.use('/users', usersRouter)
apiRouter.use('/auth', authenticationRouter)
apiRouter.use('/decks', deckRouter)
apiRouter.use('/flashcards', flashcardRouter)
apiRouter.use('/admins', adminRouter)

app.use('/api/v1', apiRouter);

// Start server only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
    connectDB()
    const PORT = process.env.PORT;
    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}


// Handle graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
        process.exit(0);
    } catch (err) {
        console.error('Error disconnecting MongoDB:', err.message);
        process.exit(1);
    }
});

module.exports = app