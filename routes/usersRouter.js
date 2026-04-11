import express from 'express';
import { deleteUser, getUser, loginUser, SaveUsers, updateUser,  } from '../controllers/userControllers.js';

const usersRouter = express.Router()

usersRouter.get('/', getUser)
usersRouter.post('/', SaveUsers)
usersRouter.post("/login",loginUser)
usersRouter.put("/:id", updateUser)
usersRouter.delete("/:id", deleteUser)

export default usersRouter;   