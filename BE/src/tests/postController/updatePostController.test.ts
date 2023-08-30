import { Request, Response } from 'express';
import { updatePostController } from '../../controllers/postController';
import { updatePostService } from '../../services/postService';
import { mocked } from 'jest-mock';
import { mockAuthMiddleware } from './mocks/mockAuthMiddleware';

jest.mock('../../services/postService'); // Mock the updatePostService module

describe('updatePostController', () => {
  const mockRequest = (body: any) => ({ body }) as Request;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a post successfully', async () => {
    const req = mockRequest({
      postTitle: 'Updated Title',
      postBody: 'Updated Body',
      postId: 1,
    });

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    mockAuthMiddleware(['allowedRole1', 'allowedRole2'])(req, res, () => {});

    const mockedUpdatePostService = mocked(updatePostService);

    const mockUpdatedPost = {
      postId: 1,
      postTitle: 'Updated Title',
      postBody: 'Updated Body',
      userId: 1,
    };

    mockedUpdatePostService.mockResolvedValueOnce(mockUpdatedPost);

    await updatePostController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post updated successfully',
      data: mockUpdatedPost,
    });
  });

  it('should handle internal server error', async () => {
    const req = mockRequest({
      postTitle: 'Updated Title',
      postBody: 'Updated Body',
      postId: 1,
    });

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    mockAuthMiddleware(['allowedRole1', 'allowedRole2'])(req, res, () => {});

    const mockedUpdatePostService = mocked(updatePostService);

    mockedUpdatePostService.mockRejectedValueOnce(new Error('Some error'));

    await updatePostController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error updating post',
    });
  });
});
