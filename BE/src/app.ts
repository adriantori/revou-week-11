import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import fs from 'fs'
const yaml = require('yaml');
import swaggerUi from 'swagger-ui-express';

import { userRoute } from './routes/userRoute';
import { attachDB } from './middlewares/database';
import { postRoute } from './routes/postRoute';

dotenv.config();

const app = express();
const port = process.env.PORT

const file  = fs.readFileSync('./docs/openApi.yaml', 'utf8')
const swaggerDocument = yaml.parse(file)

app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err, `<=================== error ==================`);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(attachDB as any);

app.use('/api/v1', userRoute);
app.use('/api/v1', postRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err, `<=================== error ==================`);
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    })
  })

app.listen(port, () => {
    console.log('Server is running on port', port);
});

export default app;