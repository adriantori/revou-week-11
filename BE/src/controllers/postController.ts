import { Request, Response, response} from 'express'

import { createPostService, deletePostService, getPostsService, updatePostService } from '../services/postService';

async function createPostController(req: Request, res: Response) {
    const { postTitle, postBody } = req.body;

    try {
        const userId = res.locals.userId

        const post = await createPostService(postTitle, postBody, userId);
        res.status(201).json({
            message: 'Posted successfully',
            data: post,
        });
    } catch (error) {
        console.log("error createPost controller");
        res.status(500).json({ message: 'Error creating post' });
    }
}

async function getPostsController(req: Request, res: Response) {

    try {        
        const post = await getPostsService();
        res.status(201).json({
            message: 'Posted successfully',
            data: post,
        });
    } catch (error) {
        console.log("error createPost controller");
        res.status(500).json({ message: 'Error creating post' });
    }
}

async function updatePostController(req: Request, res: Response) {
    const { postTitle, postBody, postId } = req.body;

    try {
        const userId = res.locals.userId

        const post = await updatePostService(postTitle, postBody, userId, postId);
        res.status(201).json({
            message: 'Posted successfully',
            data: post,
        });
    } catch (error) {
        console.log("error createPost controller");
        res.status(500).json({ message: 'Error creating post' });
    }
}

async function deletePostController(req: Request, res: Response) {
    const { postId } = req.body;

    try {
        const post = await deletePostService(postId);
        res.status(201).json({
            message: 'Posted successfully',
            data: post,
        });
    } catch (error) {
        console.log("error createPost controller");
        res.status(500).json({ message: 'Error creating post' });
    }
}

export { createPostController, getPostsController, updatePostController, deletePostController }