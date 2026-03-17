import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRouter.js';
import mongoose from 'mongoose';
import galleryitemsRouter from './routes/galleryitemsRouter.js'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
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
app.use("/api/gallary", galleryitemsRouter)

app.listen(5000, (req, res) => {
    console.log("Server is Running on Port 5000")
})

