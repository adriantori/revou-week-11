import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import JWT_SIGN from '../configs/jwt';

import { loginUserService, registerUserService } from '../services/userService';

async function registerUserController(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const user = await registerUserService(username, password);
        res.status(201).json({
            message: 'Register success',
            data: user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
}

async function loginUserController(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const user = await loginUserService(username, password);
        if(user){
            const token = jwt.sign({ userId: user.user_id, username: user.user_name, role: user.role_name}, JWT_SIGN!);
            res.status(201).json({
                message: 'Login success',
                data: user, token
            })
        }else{
            res.status(400).json({
                error: 'Login data incorrect',
            });
        }
        
    } catch (error) {
        console.log("error login controller");
        res.status(500).json({ message: 'Error login user' });
    }
}

export { registerUserController, loginUserController }