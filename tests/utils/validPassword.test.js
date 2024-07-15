const validatePassword = require('../../utils/validPassword');

describe('validatePassword function', () => {
    test('valid password', () => {
        const result = validatePassword('ValidPass1');
        expect(result).toBe(true);
    });

    test('invalid password (missing uppercase)', () => {
        const result = validatePassword('invalidpass1');
        expect(result).toBe(false);
    });

    test('invalid password (missing number)', () => {
        const result = validatePassword('InvalidPass');
        expect(result).toBe(false);
    });

    test('invalid password (too short)', () => {
        const result = validatePassword('Short1');
        expect(result).toBe(false);
    });
});