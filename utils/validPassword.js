function validPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

module.exports = validPassword