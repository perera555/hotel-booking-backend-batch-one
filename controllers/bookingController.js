import Booking from "../models/booking.js";
import { iscustomerValid } from "./userControllers.js";

export function CreateBooking(req, res) {
    if (!iscustomerValid(req)) {
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const satrtingId = 1200;
    //genarete new booking Id 
    Booking.countDocuments({}).then(
        (count) => {
            const newId = satrtingId + count + 1;
            const newBooking = new Booking({
                bookingId: newId,
                roomId: req.body.roomId,
                email: req.user.email,
                start: req.body.start,
                end: req.body.end
            })
            newBooking.save().then(
                (result)=>{
                    res.json({
                        message:"Booking Created Successfully",
                        result : result
                    })

            }).catch(
                (err)=>{
                    res.json({
                        message:"Booking Created Failed",
                        error:err
                    })


            })

        }).catch((err)=>{
            res.json({
                message:"Booking Created Failed",
                error:err
            })

        })

}