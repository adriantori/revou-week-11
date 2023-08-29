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
exports.getAllRolesController = void 0;
const role_1 = __importDefault(require("../models/role")); // Adjust the path to match your file structure
function getAllRolesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roles = yield role_1.default.findAll(); // Retrieve all roles from the roles table
            res.status(200).json({
                message: 'Roles retrieved successfully',
                data: roles,
            });
        }
        catch (error) {
            console.error('Error retrieving roles:', error);
            res.status(500).json({ message: 'Error retrieving roles' });
        }
    });
}
exports.getAllRolesController = getAllRolesController;
