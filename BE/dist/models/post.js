"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../middlewares/database");
const user_1 = __importDefault(require("./user")); // Adjust the path to match your file structure
class Post extends sequelize_1.Model {
}
Post.init({
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    post_title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    post_content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'user_id',
        },
    },
    post_isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true
});
// Add the association to Post
Post.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Post;
