import express from 'express';
import { getUsers, loginUser, SaveUsers, updateUsers } from '../controllers/userControllers.js';

const usersRouter = express.Router()

usersRouter.get('/', getUsers)
usersRouter.post('/', SaveUsers)
usersRouter.put('/', updateUsers)
usersRouter.post("/login",loginUser)

export default usersRouter;  