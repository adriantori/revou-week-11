import { Request, Response } from 'express';
import { registerUserController } from '../../controllers/userController';
import { registerUserService } from '../../services/userService';
import { mocked } from 'jest-mock';

jest.mock('../../services/userService'); // Mock the registerUserService module

describe('registerUserController', () => {
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

  it('should register a user successfully', async () => {
    const req = mockRequest({ username: 'testuser', password: 'password123' });
    const res = mockResponse();

    const mockedRegisterUserService = mocked(registerUserService);

    mockedRegisterUserService.mockResolvedValueOnce({
      username: 'testuser',
      role: 'user',
    });

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Register success',
      data: {
        username: 'testuser',
        role: 'user',
      },
    });
  });

  it('should handle username already exists', async () => {
    const req = mockRequest({ username: 'testuser', password: 'password123' });
    const res = mockResponse();

    const mockedRegisterUserService = mocked(registerUserService);

    mockedRegisterUserService.mockResolvedValueOnce(null); // Simulate username conflict

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'username already exist',
      data: null,
    });
  });

  it('should handle invalid password', async () => {
    const req = mockRequest({ username: 'testuser', password: 'short' });
    const res = mockResponse();

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Password must be at least 8 characters long',
    });
  });

  it('should handle password without letters and numbers', async () => {
    const req = mockRequest({ username: 'testuser', password: '12345678' });
    const res = mockResponse();

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Password must contain both letters and numbers',
    });
  });

  it('should handle internal server error', async () => {
    const req = mockRequest({ username: 'testuser', password: 'password123' });
    const res = mockResponse();

    const mockedRegisterUserService = mocked(registerUserService);

    mockedRegisterUserService.mockRejectedValueOnce(new Error('Some error'));

    await registerUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Some error',
    });
  });
});
