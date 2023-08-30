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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = void 0;
const post_1 = __importDefault(require("../models/post"));
function createPost(postTitle, postBody, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.create({
                post_title: postTitle,
                post_content: postBody,
                user_id: userId
            });
            return post;
        }
        catch (error) {
            console.log('Error creating post DAO: ' + error.message);
            throw new Error('Error creating post DAO: ' + error.message);
        }
    });
}
exports.createPost = createPost;
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.findAll({
                where: {
                    post_isDeleted: 0
                },
                attributes: ['post_id', 'post_title', 'post_content', 'user_id', 'createdAt', 'updatedAt']
            });
            return post;
        }
        catch (error) {
            console.log('Error creating post DAO: ' + error.message);
            throw new Error('Error creating post DAO: ' + error.message);
        }
    });
}
exports.getPosts = getPosts;
function updatePost(postTitle, postBody, userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.update({
                post_title: postTitle,
                post_content: postBody,
                user_id: userId
            }, {
                where: {
                    post_id: postId
                }
            });
            return post;
        }
        catch (error) {
            console.log('Error updating post DAO: ' + error.message);
            throw new Error('Error updating post DAO: ' + error.message);
        }
    });
}
exports.updatePost = updatePost;
function deletePost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.update({ post_isDeleted: 1 }, {
                where: {
                    post_id: postId
                }
            });
            return post;
        }
        catch (error) {
            console.log('Error creating post DAO: ' + error.message);
            throw new Error('Error creating post DAO: ' + error.message);
        }
    });
}
exports.deletePost = deletePost;
