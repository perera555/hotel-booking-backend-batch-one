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
    const passwordHash = bcrypt.hashSync(password, 10)
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

            const token = jwt.sign(userData,process.env.JWT_KEY , { expiresIn: "24h" })

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
export function updateUser(req, res) {
    const userId = req.params.id
    const updatedData = req.body

    // If password is being updated → hash it
    if (updatedData.password) {
        updatedData.password = bcrypt.hashSync(updatedData.password, 10)
    }

    User.findByIdAndUpdate(userId, updatedData, { new: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }

            res.json({
                message: "User Updated Successfully",
                user: updatedUser
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Update Failed",
                error: err.message
            })
        })
}
export function deleteUser(req, res) {
    const userId = req.params.id

    User.findByIdAndDelete(userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }

            res.json({
                message: "User Deleted Successfully"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Delete Failed",
                error: err.message
            })
        })
}