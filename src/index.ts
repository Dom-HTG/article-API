import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Database } from './infrastructure/database';
import app from './infrastructure/server';

dotenv.config(); 
const port = Number(process.env.APP_PORT);

// init and start database.


(async () => {
    const db = new Database(); // initializes prisma client.
    await db.init();

    app.listen(port, () => console.log(`server is running on port: ${port}`));
})();

