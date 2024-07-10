const request = require('supertest'); 
const server = require('../../server');      
const User = require('../../models/user');

/* FIXME: This test does not work currently, it always fails as it recieves 
          body length 0 instead of expected 2.
*/


jest.mock('../../models/user'); 

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(server).get('/users');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ _id: '1', username: 'UserOne', email: 'userone@example.com', password_hash: 'hashedpassword1', library: expect.any(Array) }),
            expect.objectContaining({ _id: '2', username: 'UserTwo', email: 'usertwo@example.com', password_hash: 'hashedpassword2', library: expect.any(Array) })
        ]));
    });

    it('should handle errors', async () => {
        User.find.mockRejectedValue(new Error('Database error'));
        const res = await request(server).get('/users');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message', 'Database error');
    });
});