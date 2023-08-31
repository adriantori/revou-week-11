import Post from "../models/post";
import User from "../models/user";

async function createPost(postTitle: string, postBody: string, userId: number): Promise<any> {
    try {
        const post = await Post.create({
            post_title: postTitle,
            post_content: postBody,
            user_id: userId
        });

        return post;
    } catch (error: any) {
        console.log('Error creating post DAO: ' + error.message);
        throw new Error('Error creating post DAO: ' + error.message);
    }
}

async function getPosts(): Promise<any> {
    try {
        const posts = await Post.findAll({
            where: {
                post_isDeleted: 0,
            },
            attributes: ['post_id', 'post_title', 'post_content', 'user_id', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_name'],
                },
            ],
            order: [['updatedAt', 'DESC']],
        });

        return posts.map(post => ({
            post_id: post.post_id,
            post_title: post.post_title,
            post_content: post.post_content,
            user_id: post.user_id,
            user_name: post.user.user_name,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));
    } catch (error: any) {
        console.log('Error getting posts: ' + error.message);
        throw new Error('Error getting posts: ' + error.message);
    }
}


async function updatePost(postTitle: string, postBody: string, userId: number, postId: number): Promise<any> {
    try {
        console.log('Inside updatePost DAO'); // Add this line
        const post = await Post.update({
            post_title: postTitle,
            post_content: postBody,
            user_id: userId
        }, {
            where: {
              post_id: postId
            }
        })

        return post;
    } catch (error: any) {
        console.log('Error updating post DAO: ' + error.message);
        throw new Error('Error updating post DAO: ' + error.message);
    }
}

async function deletePost(postId: number): Promise<any> {
    try {
        const post = await Post.update(
            {post_isDeleted: 1},
            {
                where: {
                    post_id: postId
                }
            }
        )

        return post;
    } catch (error: any) {
        console.log('Error creating post DAO: ' + error.message);
        throw new Error('Error creating post DAO: ' + error.message);
    }
}

export { createPost, getPosts, updatePost, deletePost };