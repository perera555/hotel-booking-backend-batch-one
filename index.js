import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRouter.js';
import mongoose from 'mongoose';
import galleritemsRouter from './routes/galleryItemsRouter.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import categoryRouter from './routes/categoryRouter.js';
import roomRouter from './routes/roomRouter.js';
import bookingRouter from './routes/bookingRouter.js';
dotenv.config()


const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (token != null) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (decoded != null) {
                req.user = decoded //token detaill goes to decoded and decoded means user details//
                console.log(decoded)
                next()
            } else {
                next()
            }

        })

    } else {
        next()
    }

})

const connectionString = process.env.MONGO_URL
mongoose.connect(connectionString).then(() => {
    console.log("Connect to the Database")
}).catch((error) => {
    console.log("Connection Failed")
})



app.use("/api/users", usersRouter)
app.use("/api/gallary", galleritemsRouter)
app.use("/api/category", categoryRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)





app.listen(5000, (req, res) => {
    console.log("Server is Running on Port 5000")
})

