import { Request, Response } from 'express';
import { getUserPostListController } from '../../controllers/postController';
import { getUserPostListService } from '../../services/postService';
import { mocked } from 'jest-mock';

jest.mock('../../services/postService'); // Mock the getUserPostListService module

describe('getUserPostListController', () => {
  const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = {}; // Initialize locals property
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get user post list successfully', async () => {
    const username = 'testUser';
    const req = { params: { username } } as unknown as Request;
    const res = mockResponse();

    const mockedGetUserPostListService = mocked(getUserPostListService);

    const mockPosts = [
        { postId: 1, postTitle: 'User Post 1', postBody: 'Body 1' },
        { postId: 2, postTitle: 'User Post 2', postBody: 'Body 2' },
      ];
  
      mockedGetUserPostListService.mockResolvedValueOnce(mockPosts);
  
      res.locals.username = username;
  
      await getUserPostListController(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200); // Corrected expectation to 200
      expect(res.json).toHaveBeenCalledWith({
        message: 'Posts retrieved successfully',
        data: mockPosts,
      });
  });

  it("should return 'unauthorized' when trying to access other user's post list", async () => {
    const username = 'testUser';
    const req = { params: { username: 'otherUser' } } as unknown as Request;
    const res = mockResponse();

    await getUserPostListController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "You can't see other people's posts, yet.",
    });
  });

  it('should handle internal server error', async () => {
    const username = 'testUser';
    const req = { params: { username } } as unknown as Request;
    const res = mockResponse();

    const mockedGetUserPostListService = mocked(getUserPostListService);

    const error = new Error('Some error');
    mockedGetUserPostListService.mockRejectedValueOnce(error);

    res.locals.username = username;

    await getUserPostListController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error retrieving post lists',
    });
  });
});
