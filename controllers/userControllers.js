import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export function getUsers(req, res) {
    User.find().then(
        (userlist) => {
            res.json({
                list: userlist
            })

        }
    ).catch()

}
export function SaveUsers(req, res) {
    const user = req.body
    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password,10)
    user.password = passwordHash


    const newUser = new User(user)
    newUser.save()
        .then(() => {
            res.json({
                message: "User Created Successfully"
            })
        })
        .catch(() => {
            res.json({
                message: "User Created Failed"
            })
        })

}


export function updateUsers(req, res) {

    User.findAndUpdate(
        () => {

        })

}
export function loginUser(req, res) {

    const credentials = req.body

    User.findOne({ email: credentials.email })
        .then((user) => {

            if (user == null) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }

            // compare password with hashed password
            const isPasswordCorrect = bcrypt.compareSync(
                credentials.password,
                user.password
            )

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Invalid Password"
                })
            }

            const userData = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type
            }

            const token = jwt.sign(userData, "secret", { expiresIn: "24h" })

            res.json({
                message: "Login Successfully",
                user: userData,
                token: token
            })

        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Login Failed",
                error: err.message
            })
        })
} 