import { Request, Response } from 'express';
import { loginUserController } from '../../controllers/userController';
import { loginUserService } from '../../services/userService';
import jwt from 'jsonwebtoken';
import { mocked } from 'jest-mock';

jest.mock('../../services/userService'); // Mock the loginService module
jest.mock('jsonwebtoken'); // Mock the jsonwebtoken module

describe('loginUserController', () => {
  const mockRequest = (body: any) => ({ body }) as Request;
  const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a user successfully', async () => {
    const req = mockRequest({ username: 'testuser', password: 'password123' });
    const res = mockResponse();

    const mockedLoginUserService = mocked(loginUserService);

    const mockUser = {
      user_id: 1,
      user_name: 'testuser',
      role: { role_name: 'user' },
    };

    mockedLoginUserService.mockResolvedValueOnce(mockUser);

    const mockToken = 'mockedToken';
    (jwt.sign as jest.Mock).mockReturnValueOnce(mockToken);

    await loginUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login success',
      data: mockUser,
      token: mockToken,
    });
  });

  it('should handle incorrect login data', async () => {
    const req = mockRequest({ username: 'testuser', password: 'wrongpassword' });
    const res = mockResponse();

    const mockedLoginUserService = mocked(loginUserService);

    mockedLoginUserService.mockResolvedValueOnce(null); // Simulate incorrect login

    await loginUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login data incorrect',
    });
  });

  it('should handle internal server error', async () => {
    const req = mockRequest({ username: 'testuser', password: 'password123' });
    const res = mockResponse();

    const mockedLoginUserService = mocked(loginUserService);

    mockedLoginUserService.mockRejectedValueOnce(new Error('Some error'));

    await loginUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error login user',
    });
  });
});
