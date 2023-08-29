import { Sequelize } from "sequelize";
import Role from "../models/role";
import User from "../models/user";

async function registerUser(username: string, password: string): Promise<any> {
    try {
        const user = await User.create({
            user_name: username,
            user_pass: password,
            role_id: 2
        });

        return user;
    } catch (error: any) {
        throw new Error('Error creating user DAO: ' + error.message);
    }
}

async function loginUser (username: string): Promise<any> {
    try {
        const user = await User.findOne({
            where: {
                user_name: username
            },
            include: {
                model: Role,
                attributes: ['role_name'],
                where: {
                    role_id: Sequelize.col('User.role_id') // Assuming Sequelize is the ORM you're using
                },
                required: true // Inner join
            },
            attributes: ['user_id', 'user_name']
        });
        return user;
    } catch (error: any) {
        throw new Error('Error login user DAO: ' + error.message);
    }
}

export { registerUser, loginUser }