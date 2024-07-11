const confirmUser = require('../../middleware/confirmUser');
const User = require('../../models/user');

// Mock the User model
jest.mock('../../models/user');

describe('confirmUser middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        id: '123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should set req.user and call next if user is found', async () => {
    const mockUser = { id: '123', name: 'Test User' };
    User.findById.mockResolvedValue(mockUser);

    await confirmUser(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('123');
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 if user is not found', async () => {
    User.findById.mockResolvedValue(null);

    await confirmUser(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 if there is an error', async () => {
    const errorMessage = 'Database error';
    User.findById.mockRejectedValue(new Error(errorMessage));

    await confirmUser(req, res, next);

    expect(User.findById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    expect(next).not.toHaveBeenCalled();
  });
});
