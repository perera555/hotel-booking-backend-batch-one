import express from "express";
import { CreateBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/",CreateBooking)

export default bookingRouter