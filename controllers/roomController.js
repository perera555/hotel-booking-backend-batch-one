
import Rooms from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

export function createRoom(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    const newRoom = new Rooms(req.body)
    newRoom.save().then(
        (result) => {
            res.json({
                message: "Room Created Successfully",
                result: result
            })

        }).catch((err) => {
            res.json({
                message: "Room Creation Failed",
                err: err
            })

        })
}
export function deleteRoom(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    const roomId = req.params.roomId
    Rooms.findOneAndDelete({ roomId: roomId }).then
        (() => {
            res.json({
                message: "Room deleted Successfully"
            })

        }).catch(
            (err) => {
                res.json({
                    message: "Room Deleted Faailed"
                })

            })


}
export function findRoomById(req, res) {
    const roomId = req.params.roomId
    Rooms.findOne({ roomId: roomId }).then(
        (result) => {
            if (result == null) {
                res.status(404).json({
                    message: "Room Not Found"
                })
                return
            } else {
                res.json({
                    message: "Room Found",
                    result: result
                })
            }

        }).catch(
            (err) => {
                res.json({
                    message: "Room Search Failed",
                    error: err
                })

            })

}

export function getRoom(req, res) {
    Rooms.find().then((
        result) => {
        res.json({
            rooms: result
        })

    }).catch(
        () => {
            res.json({
                message: "Failed to get Rooms"
            })

        })

}
export function updateRoom(req,res){
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }

    const roomId =req.params.roomId

    Rooms.findOneAndUpdate({
        roomId : roomId

    },req.body
).then(
    ()=>{
        res.json({
            message:"Room Updated Successfully"
        })

}).catch(()=>{
    res.json({
        message:"Room Updated Failed"
    })
})
}

export function getRoomByCategory(req,res){
    const category = req.params.category
    Rooms.find({category:category}).then(
        (result)=>{
            res.json({
                rooms:result
            })

    }).catch(()=>{
        res.json({
            message:"Failed to get Rooms"
        })
    })

}


