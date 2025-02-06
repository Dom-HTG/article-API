import express, { Router } from 'express';
import * as userController from '../controllers/user';

const router: Router  = express.Router();

// check if server is healthy and running.
router.get('/healthcheck', userController.healthcheck);

// return all users registered.
router.get('/users', userController.allUsers);

// creates a new user.
router.post('/users', userController.creatUser);

export default router;