const mongoose = require('mongoose');
const connectDB = require('../../config/connectDB');

// Mock dotenv config to avoid actual file reads
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Mock mongoose functions
mongoose.connect = jest.fn();

describe('Database Connection', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should connect to the database', () => {
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_CONNECTION_STRING);
  });

  it('should handle database connection error', async () => {
    // Mock mongoose.connect to simulate a connection error
    mongoose.connect.mockRejectedValue(new Error('Mocked connection error'));

    // Call connectDB function and expect it to throw an error
    await expect(connectDB()).rejects.toThrow('Mocked connection error');
  });
});
