import { Router } from "express";
import { createPostController, deletePostController, getPostsController, updatePostController } from "../controllers/postController";
import { auth } from "../middlewares/auth";

export const postRoute = Router();

postRoute.post('/posts', auth(["user"]), createPostController);
postRoute.get('/posts', auth(["admin","user"]), getPostsController);
postRoute.patch('/posts', auth(["user"]), updatePostController);
postRoute.delete('/posts', auth(["admin"]), deletePostController);
