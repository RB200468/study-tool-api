const User = require('../models/user')

async function checkUser(username) {
    let user
    try {
        user = await User.findOne({ username })
        if (user != null) {
            return user
        }
    } catch (err) {
        throw new Error(`Error fetching user: ${err.message}`);
    }
}

module.exports = checkUser