import express, { Application } from "express";
import cookieParser from 'cookie-parser';
import userRoutes from '../app/routes/user.routes';
import { HandleError } from "./errors/global-error-handler";

const app: Application = express();


// Register application level middlewares.
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes go here...
app.use('/api', userRoutes);

// Error handler.
app.use(HandleError);

export default app;
