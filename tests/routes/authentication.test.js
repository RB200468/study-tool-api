const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server'); 
const User = require('../../models/user');
const bcrypt = require('bcrypt');

describe('api/v1/auth', () => {
    let server;

    beforeAll(async () => {
        server = request(app);
        // Connect to a test database
        await mongoose.connect(process.env.CONNECTION_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create a test user
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        const user = new User({ username: 'testuser', password_hash: hashedPassword, email: 'test@example.com' });
        await user.save();
    });

    afterAll(async () => {
        // Clean up the database
        await User.deleteMany({});
        await mongoose.disconnect();
    });


    describe('POST /register', () => {
        it('should register a new user', async () => {
            const response = await server.post('/api/v1/auth/register').send({
                username: 'newuser',
                password: 'newpassword',
                email: 'newuser@example.com',
            });
    
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User registered');
        });
    })

    
    describe('GET /login', () => {
        it('should login a user with valid credentials', async () => {
            const response = await server.post('/api/v1/auth/login').send({
                username: 'testuser',
                password: 'testpassword',
            });
    
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Login Successful');
        });
    })
});
