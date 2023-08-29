"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoute = void 0;
const express_1 = require("express");
const testing_1 = require("../controllers/testing");
exports.testRoute = (0, express_1.Router)();
exports.testRoute.get('/', testing_1.getAllRolesController);
