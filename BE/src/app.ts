import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import fs from 'fs'
import yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express';
import openApiValidator = require("express-openapi-validator");

import { userRoute } from './routes/userRoute';
import { attachDB } from './middlewares/database';
import { postRoute } from './routes/postRoute';

dotenv.config();

const app = express();
const port = process.env.PORT

const openApiPath = './docs/openApi.yaml'
const file = fs.readFileSync(openApiPath, 'utf8');
const swaggerDocument = yaml.load(file);

console.log(typeof(swaggerDocument));

app.use(cors());
app.use(express.json());

app.use(attachDB as any);

app.use('/', swaggerUi.serve);
app.use('/', swaggerUi.setup(swaggerDocument!));


app.use('/api/v1', userRoute);
app.use('/api/v1', postRoute);

app.listen(port, () => {
    console.log('Server is running on port', port);
});

export default app;