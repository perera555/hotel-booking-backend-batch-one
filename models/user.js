
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
     password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true,
        default:"customer"
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_rp_50_assets&w=740&q=80"
    },
   
    whatsApp:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    disabled:{
        type:Boolean,
        required:true,
        default:false
    },
    emailVerified:{
        type:Boolean,
        required:true,
        default:false
    }
    

})
const User = mongoose.model("Users", userSchema)
export default User;