import express, { Express, Request, Response , Application } from 'express';
import { PrismaClient } from '../generated/prisma'
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
    res.send('Home');
});

app.listen(port, () => {
    console.log(`Server @ http://localhost:${port}`);
});