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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../../controllers/userController");
const userService_1 = require("../../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jest_mock_1 = require("jest-mock");
jest.mock('../../services/userService'); // Mock the loginService module
jest.mock('jsonwebtoken'); // Mock the jsonwebtoken module
describe('loginUserController', () => {
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
    it('should log in a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'password123' });
        const res = mockResponse();
        const mockedLoginUserService = (0, jest_mock_1.mocked)(userService_1.loginUserService);
        const mockUser = {
            user_id: 1,
            user_name: 'testuser',
            role: { role_name: 'user' },
        };
        mockedLoginUserService.mockResolvedValueOnce(mockUser);
        const mockToken = 'mockedToken';
        jsonwebtoken_1.default.sign.mockReturnValueOnce(mockToken);
        yield (0, userController_1.loginUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login success',
            data: mockUser,
            token: mockToken,
        });
    }));
    it('should handle incorrect login data', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'wrongpassword' });
        const res = mockResponse();
        const mockedLoginUserService = (0, jest_mock_1.mocked)(userService_1.loginUserService);
        mockedLoginUserService.mockResolvedValueOnce(null); // Simulate incorrect login
        yield (0, userController_1.loginUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login data incorrect',
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ username: 'testuser', password: 'password123' });
        const res = mockResponse();
        const mockedLoginUserService = (0, jest_mock_1.mocked)(userService_1.loginUserService);
        mockedLoginUserService.mockRejectedValueOnce(new Error('Some error'));
        yield (0, userController_1.loginUserController)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error login user',
        });
    }));
});
