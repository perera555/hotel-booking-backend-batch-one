import express from "express";
import { createRoom, deleteRoom, findRoomById, getRoom, getRoomByCategory, updateRoom } from "../controllers/roomController.js";


const roomRouter = express.Router()


roomRouter.post("/",createRoom)
roomRouter.get("/",getRoom)
roomRouter.get("/by-category/:category", getRoomByCategory)
roomRouter.get("/:roomId",findRoomById)
roomRouter.put("/:roomId",updateRoom)
roomRouter.delete("/:roomId",deleteRoom)

export default roomRouter
