"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post('/register', userController_1.registerUserController);
exports.userRoute.post('/login', userController_1.loginUserController);
