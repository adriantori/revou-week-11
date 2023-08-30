import { Request, Response } from 'express';
import { deletePostController } from '../../controllers/postController'; // Import your deletePostController function
import { deletePostService } from '../../services/postService'; // Import the corresponding service
import { mocked } from 'jest-mock';

jest.mock('../../services/postService'); // Mock the deletePostService module

describe('deletePostController', () => {
  const mockRequest = (body: any) => ({ body }) as Request;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a post successfully', async () => {
    const req = mockRequest({
      postId: 1,
    });

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const mockedDeletePostService = mocked(deletePostService);

    const mockDeletedPost = {
      postId: 1,
      postTitle: 'Deleted Title',
      postBody: 'Deleted Body',
      userId: 1,
    };

    mockedDeletePostService.mockResolvedValueOnce(mockDeletedPost);

    await deletePostController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post deleted successfully',
      data: mockDeletedPost,
    });
  });

  it('should handle internal server error', async () => {
    const req = mockRequest({
      postId: 1,
    });

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const mockedDeletePostService = mocked(deletePostService);

    mockedDeletePostService.mockRejectedValueOnce(new Error('Some error'));

    await deletePostController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error creating post',
    });
  });
});
