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
jest.mock('../../services/postService'); // Mock the getUserPostListService module
describe('getUserPostListController', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.locals = {}; // Initialize locals property
        return res;
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get user post list successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'testUser';
        const req = { params: { username } };
        const res = mockResponse();
        const mockedGetUserPostListService = (0, jest_mock_1.mocked)(postService_1.getUserPostListService);
        const mockPosts = [
            { postId: 1, postTitle: 'User Post 1', postBody: 'Body 1' },
            { postId: 2, postTitle: 'User Post 2', postBody: 'Body 2' },
        ];
        mockedGetUserPostListService.mockResolvedValueOnce(mockPosts);
        res.locals.username = username;
        yield (0, postController_1.getUserPostListController)(req, res);
        expect(res.status).toHaveBeenCalledWith(200); // Corrected expectation to 200
        expect(res.json).toHaveBeenCalledWith({
            message: 'Posts retrieved successfully',
            data: mockPosts,
        });
    }));
    it("should return 'unauthorized' when trying to access other user's post list", () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'testUser';
        const req = { params: { username: 'otherUser' } };
        const res = mockResponse();
        yield (0, postController_1.getUserPostListController)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "You can't see other people's posts, yet.",
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'testUser';
        const req = { params: { username } };
        const res = mockResponse();
        const mockedGetUserPostListService = (0, jest_mock_1.mocked)(postService_1.getUserPostListService);
        const error = new Error('Some error');
        mockedGetUserPostListService.mockRejectedValueOnce(error);
        res.locals.username = username;
        yield (0, postController_1.getUserPostListController)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error retrieving post lists',
        });
    }));
});
