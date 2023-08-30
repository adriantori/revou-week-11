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
const postController_1 = require("../../controllers/postController");
const postService_1 = require("../../services/postService");
const jest_mock_1 = require("jest-mock");
const mockAuthMiddleware_1 = require("./mocks/mockAuthMiddleware");
jest.mock('../../services/postService'); // Mock the updatePostService module
describe('updatePostController', () => {
    const mockRequest = (body) => ({ body });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should update a post successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({
            postTitle: 'Updated Title',
            postBody: 'Updated Body',
            postId: 1,
        });
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, mockAuthMiddleware_1.mockAuthMiddleware)(['allowedRole1', 'allowedRole2'])(req, res, () => { });
        const mockedUpdatePostService = (0, jest_mock_1.mocked)(postService_1.updatePostService);
        const mockUpdatedPost = {
            postId: 1,
            postTitle: 'Updated Title',
            postBody: 'Updated Body',
            userId: 1,
        };
        mockedUpdatePostService.mockResolvedValueOnce(mockUpdatedPost);
        yield (0, postController_1.updatePostController)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Post updated successfully',
            data: mockUpdatedPost,
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({
            postTitle: 'Updated Title',
            postBody: 'Updated Body',
            postId: 1,
        });
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        (0, mockAuthMiddleware_1.mockAuthMiddleware)(['allowedRole1', 'allowedRole2'])(req, res, () => { });
        const mockedUpdatePostService = (0, jest_mock_1.mocked)(postService_1.updatePostService);
        mockedUpdatePostService.mockRejectedValueOnce(new Error('Some error'));
        yield (0, postController_1.updatePostController)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error updating post',
        });
    }));
});
