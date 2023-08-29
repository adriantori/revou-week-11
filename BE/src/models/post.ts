import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../middlewares/database';
import User from './user'; // Adjust the path to match your file structure

class Post extends Model {
    public post_id!: number;
    public post_title!: string;
    public post_content!: string;
    public user_id!: number;
    public post_created!: Date;
}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'user_id',
            },
        },
        post_isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true
    }
);

// Add the association to Post
Post.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Post;
