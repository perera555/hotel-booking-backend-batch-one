import express from 'express';
import { getUsers, loginUser, SaveUsers,  } from '../controllers/userControllers.js';

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/', SaveUsers)

usersRouter.post("/login",loginUser)

export default usersRouter;  