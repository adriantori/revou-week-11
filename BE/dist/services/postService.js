"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostService = exports.updatePostService = exports.getPostsService = exports.createPostService = void 0;
const postDao_1 = require("../dao/postDao");
function createPostService(postTitle, postBody, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, postDao_1.createPost)(postTitle, postBody, user_id);
            return post;
        }
        catch (error) {
            throw new Error('Error registering user service: ' + error.message);
        }
    });
}
exports.createPostService = createPostService;
function getPostsService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, postDao_1.getPosts)();
            return post;
        }
        catch (error) {
            throw new Error('Error registering user service: ' + error.message);
        }
    });
}
exports.getPostsService = getPostsService;
function updatePostService(postTitle, postBody, user_id, post_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, postDao_1.updatePost)(postTitle, postBody, user_id, post_id);
            return post;
        }
        catch (error) {
            throw new Error('Error registering user service: ' + error.message);
        }
    });
}
exports.updatePostService = updatePostService;
function deletePostService(post_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, postDao_1.deletePost)(post_id);
            return post;
        }
        catch (error) {
            throw new Error('Error registering user service: ' + error.message);
        }
    });
}
exports.deletePostService = deletePostService;
