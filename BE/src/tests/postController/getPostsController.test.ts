import { Request, Response } from 'express';
import { getPostsController } from '../../controllers/postController';
import { getPostsService } from '../../services/postService';
import { mocked } from 'jest-mock';

jest.mock('../../services/postService'); // Mock the getPostsService module

describe('getPostsController', () => {
  const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get posts successfully', async () => {
    const res = mockResponse();

    const mockedGetPostsService = mocked(getPostsService);

    const mockPosts = [
      { postId: 1, postTitle: 'Title 1', postBody: 'Body 1' },
      { postId: 2, postTitle: 'Title 2', postBody: 'Body 2' },
    ];

    mockedGetPostsService.mockResolvedValueOnce(mockPosts);

    await getPostsController({} as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Posts retrieved successfully',
      data: mockPosts,
    });
  });

  it('should handle internal server error', async () => {
    const res = mockResponse();

    const mockedGetPostsService = mocked(getPostsService);

    mockedGetPostsService.mockRejectedValueOnce(new Error('Some error'));

    await getPostsController({} as any, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error retrieving posts',
    });
  });
});
