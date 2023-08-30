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
const postController_1 = require("../../controllers/postController"); // Import your deletePostController function
const postService_1 = require("../../services/postService"); // Import the corresponding service
const jest_mock_1 = require("jest-mock");
jest.mock('../../services/postService'); // Mock the deletePostService module
describe('deletePostController', () => {
    const mockRequest = (body) => ({ body });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should delete a post successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({
            postId: 1,
        });
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockedDeletePostService = (0, jest_mock_1.mocked)(postService_1.deletePostService);
        const mockDeletedPost = {
            postId: 1,
            postTitle: 'Deleted Title',
            postBody: 'Deleted Body',
            userId: 1,
        };
        mockedDeletePostService.mockResolvedValueOnce(mockDeletedPost);
        yield (0, postController_1.deletePostController)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Post deleted successfully',
            data: mockDeletedPost,
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({
            postId: 1,
        });
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockedDeletePostService = (0, jest_mock_1.mocked)(postService_1.deletePostService);
        mockedDeletePostService.mockRejectedValueOnce(new Error('Some error'));
        yield (0, postController_1.deletePostController)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error creating post',
        });
    }));
});
