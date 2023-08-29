import { createPost, deletePost, getPosts, updatePost } from "../dao/postDao";

async function createPostService(postTitle: string, postBody: string, user_id: number) {
    try {

        const post = await createPost(postTitle, postBody, user_id);
        return post;
    } catch (error: any) {
        throw new Error('Error registering user service: ' + error.message);
    }
}

async function getPostsService() {
    try {
        const post = await getPosts();
        return post;
    } catch (error: any) {
        throw new Error('Error registering user service: ' + error.message);
    }
}

async function updatePostService(postTitle: string, postBody: string, user_id: number, post_id: number) {
    try {
        const post = await updatePost(postTitle, postBody, user_id, post_id)
        return post;
    } catch (error: any) {
        throw new Error('Error registering user service: ' + error.message);
    }
}


async function deletePostService(post_id: number) {
    try {
        const post = await deletePost(post_id)
        return post;
    } catch (error: any) {
        throw new Error('Error registering user service: ' + error.message);
    }
}
export { createPostService, getPostsService, updatePostService, deletePostService };