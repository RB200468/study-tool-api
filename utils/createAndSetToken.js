const jwt = require('jsonwebtoken');

function createAndSetToken(user, res) {
    const payload = {
        id: user.id,
        username: user.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,  
    });
}

module.exports = createAndSetToken