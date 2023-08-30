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
jest.mock('../../services/postService'); // Mock the getPostsService module
describe('getPostsController', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get posts successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        const mockedGetPostsService = (0, jest_mock_1.mocked)(postService_1.getPostsService);
        const mockPosts = [
            { postId: 1, postTitle: 'Title 1', postBody: 'Body 1' },
            { postId: 2, postTitle: 'Title 2', postBody: 'Body 2' },
        ];
        mockedGetPostsService.mockResolvedValueOnce(mockPosts);
        yield (0, postController_1.getPostsController)({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Posts retrieved successfully',
            data: mockPosts,
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        const mockedGetPostsService = (0, jest_mock_1.mocked)(postService_1.getPostsService);
        mockedGetPostsService.mockRejectedValueOnce(new Error('Some error'));
        yield (0, postController_1.getPostsController)({}, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error retrieving posts',
        });
    }));
});
