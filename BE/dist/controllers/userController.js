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
exports.loginUserController = exports.registerUserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = __importDefault(require("../configs/jwt"));
const userService_1 = require("../services/userService");
function registerUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield (0, userService_1.registerUserService)(username, password);
            res.status(201).json({
                message: 'Register success',
                data: user,
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error registering user' });
        }
    });
}
exports.registerUserController = registerUserController;
function loginUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = yield (0, userService_1.loginUserService)(username, password);
            if (user) {
                const token = jsonwebtoken_1.default.sign({ userId: user.user_id, username: user.user_name, role: user.role_name }, jwt_1.default);
                res.status(201).json({
                    message: 'Login success',
                    data: user, token
                });
            }
            else {
                res.status(400).json({
                    error: 'Login data incorrect',
                });
            }
        }
        catch (error) {
            console.log("error login controller");
            res.status(500).json({ message: 'Error login user' });
        }
    });
}
exports.loginUserController = loginUserController;
