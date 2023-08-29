import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../middlewares/database';
import Role from './role'; // Adjust the path to match your file structure

class User extends Model {
    public user_id!: number;
    public user_name!: string;
    public user_pass!: string;
    public role_id!: 1 | 2;

    // Add the association
    public role!: Role;
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_pass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'role_id',
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false
    }
);

// Add the association to User
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

export default User;
