import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/usersRouter.js';
import mongoose from 'mongoose';
import galleritemsRouter from './routes/galleryItemsRouter.js';
import jwt from "jsonwebtoken"


const app = express();
app.use(bodyParser.json())

app.use((req, res, next) => {
    const token = req.header("Authorization") ?.replace("Bearer ", "")
    if (token != null) {
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded != null){
                req.user = decoded //token detaill goes to decoded and decoded means user details//
                console.log(decoded)
                next()
            }else{
                next()
            }

        })
       
    }else{
        next()
    }

})

const connectionString = "mongodb+srv://admin:123@cluster0.7euvv8g.mongodb.net/?appName=Cluster0"
mongoose.connect(connectionString).then(() => {
    console.log("Connect to the Database")
}).catch((error) => {
    console.log("Connection Failed")
})



app.use("/api/users", usersRouter)
app.use("/api/gallary", galleritemsRouter)

app.listen(5000, (req, res) => {
    console.log("Server is Running on Port 5000")
})

