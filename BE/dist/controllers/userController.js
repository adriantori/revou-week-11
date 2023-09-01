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
exports.loginUserController = exports.registerUserController = void 0;
const userService_1 = require("../services/userService");
function registerUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            if (password.length < 8) {
                return res.status(400).json({
                    message: 'Password must be at least 8 characters long',
                });
            }
            if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
                return res.status(400).json({
                    message: 'Password must contain both letters and numbers',
                });
            }
            const user = yield (0, userService_1.registerUserService)(username, password);
            if (user) {
                res.status(201).json({
                    message: 'Register success',
                    data: user,
                });
            }
            else {
                res.status(409).json({
                    message: 'username already exist',
                    data: user,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
}
exports.registerUserController = registerUserController;
function loginUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        console.log(username, password);
        try {
            const user = yield (0, userService_1.loginUserService)(username, password);
            console.log(user);
            if (user) {
                //const token = jwt.sign({ userId: user.user_id, username: user.user_name, role: user.role.role_name }, JWT_SIGN!);
                res.status(201).json({
                    message: 'Login success',
                    data: user
                });
            }
            else {
                res.status(401).json({
                    message: 'Login data incorrect',
                    data: user
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
