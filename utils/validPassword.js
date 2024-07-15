// Passwords must be at least 8 chars long, contain a number and an upper case char
function validPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

module.exports = validPassword