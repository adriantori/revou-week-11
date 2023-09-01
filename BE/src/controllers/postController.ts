import { Request, Response, response} from 'express'

import { createPostService, deletePostService, getPostsService, getUserPostListService, updatePostService } from '../services/postService';

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
        res.status(200).json({
            message: 'Posts retrieved successfully',
            data: post,
        });
    } catch (error) {
        console.log("error createPost controller");
        res.status(500).json({ message: 'Error retrieving posts' });
    }
}


async function getUserPostListController(req: Request, res: Response) {
    const username = req.params.username;
    try {        
        if(username == res.locals.username){
            const post = await getUserPostListService(username);
            res.status(200).json({
                message: 'Posts retrieved successfully',
                data: post,
            });
        }else{
            res.status(401).json({ message: `You can't see other people's posts, yet.` });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post lists!' });
    }
}

async function updatePostController(req: Request, res: Response) {
    const { postTitle, postBody, postId } = req.body;

    try {
        const userId = res.locals.userId

        const post = await updatePostService(postTitle, postBody, userId, postId);
        res.status(200).json({
            message: 'Post updated successfully',
            data: post,
        });
    } catch (error) {
        console.log("error updatePost controller");
        res.status(500).json({ message: 'Error updating post' });
    }
}

async function deletePostController(req: Request, res: Response) {
    const { postId } = req.body;
    console.log(postId);
    try {
        const post = await deletePostService(postId);
        res.status(201).json({
            message: 'Post deleted successfully',
            data: post,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
}

export { createPostController, getPostsController, updatePostController, deletePostController, getUserPostListController }