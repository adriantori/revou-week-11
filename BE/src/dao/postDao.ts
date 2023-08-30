import Post from "../models/post";

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
        const post = await Post.findAll({
            where:{
                post_isDeleted:0
            },
            attributes: ['post_id', 'post_title', 'post_content', 'user_id', 'createdAt', 'updatedAt']
        })
        return post;
    } catch (error: any) {
        console.log('Error creating post DAO: ' + error.message);
        throw new Error('Error creating post DAO: ' + error.message);
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