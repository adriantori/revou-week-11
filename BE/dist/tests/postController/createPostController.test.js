"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../../controllers/userController");
const userService_1 = require("../../services/userService");
const jest_mock_1 = require("jest-mock");
jest.mock('../../services/userService'); // Mock the registerUserService module
describe('registerUserController', () => {
    const mockRequest = (body) => ({ body });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should register a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'password123' });
        const res = mockResponse();
        const mockedRegisterUserService = (0, jest_mock_1.mocked)(userService_1.registerUserService);
        mockedRegisterUserService.mockResolvedValueOnce({
            username: 'testuser',
            role: 'user',
        });
        yield (0, userController_1.registerUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Register success',
            data: {
                username: 'testuser',
                role: 'user',
            },
        });
    }));
    it('should handle username already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'password123' });
        const res = mockResponse();
        const mockedRegisterUserService = (0, jest_mock_1.mocked)(userService_1.registerUserService);
        mockedRegisterUserService.mockResolvedValueOnce(null); // Simulate username conflict
        yield (0, userController_1.registerUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'username already exist',
            data: null,
        });
    }));
    it('should handle invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'short' });
        const res = mockResponse();
        yield (0, userController_1.registerUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Password must be at least 8 characters long',
        });
    }));
    it('should handle password without letters and numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: '12345678' });
        const res = mockResponse();
        yield (0, userController_1.registerUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Password must contain both letters and numbers',
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'password123' });
        const res = mockResponse();
        const mockedRegisterUserService = (0, jest_mock_1.mocked)(userService_1.registerUserService);
        mockedRegisterUserService.mockRejectedValueOnce(new Error('Some error'));
        yield (0, userController_1.registerUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Some error',
        });
    }));
});
