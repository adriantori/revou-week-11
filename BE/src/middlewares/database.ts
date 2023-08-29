import { createPool, Pool, PoolConnection } from 'mysql2/promise';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

interface CustomRequest extends Request {
    pool: PoolConnection;
}

const dbConfig = {
    host: process.env.MYSQL_HOST! || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT!) || 3306,
    user: process.env.MYSQL_USER! || 'root',
    password: process.env.MYSQL_PASSWORD! || '',
    database: process.env.MYSQL_DATABASE! || '',
};

// Create a connection pool
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    port: dbConfig.port,
    logQueryParameters: true
});

const pool: Pool = createPool(dbConfig);

// Middleware function to attach the database connection pool to the request object
const attachDB = (req: CustomRequest, res: Response, next: NextFunction): void => {
    pool.getConnection().then((connection) => {
        req.pool = connection;
        next();
    }).catch((err) => {
        console.error('Error getting database connection:', err);
        res.status(500).json({ message: 'Database error' });
    });
};

export { attachDB, sequelize };
