import { NextFunction, Request, RequestHandler, Response } from "express"
import { bookingService } from "./booking.service";



const getBooking= async (req:Request,res: Response,next:NextFunction)=>{
                try {
                        const result = await bookingService.getBooking()
                         if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Booking has not got"
                        })
                }
                res.status(200).json({
                        success: true,
                        message : "Booking Data fetch Successfully",
                        data : result
                })
                } catch (error) {
                        next(error)
                }
}


const getBookingById = async (req:Request, res:Response,next:NextFunction)=>{
        try {
                const {id} = req.params;
                console.log("booking id", id)
                if(!id){
                        return res.send("No ID");
                }
                const result = await bookingService.getBookingById(id as string)
                 if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Booking data has not got"
                        })
                }
                res.status(200).json({
                        success: true,
                        message : "Booking data has got Successfully",
                        data : result
                })
        } catch (error) {
                 next(error)
        }
}

const postBooking = async (req:Request, res: Response,next:NextFunction) => {
       try {
                 const bookingInfo = req.body;
                 console.log(bookingInfo)
                if(!req.user){
                        return res.send("Unauthorized")
                }
        const result = await bookingService.postBooking(bookingInfo, req.user.id as string)
         if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Booking has not created"
                        })
                }
               return res.status(200).json({
                        success: true,
                        message : "Booking Data has created Successfully",
                        data : result
                })
       } catch (error) {
         next(error)
       }
}


const deleteBookingById : RequestHandler = async (req,res,next)=>{
        try {
                const {id} = req.params;
                if(!id){
                        return res.send("No ID");
                }
                const result = await bookingService.deleteBookingId(id as string)
                 if(!result){
                        return res.status(400).json({
                        success: false,
                        message : "Booking data has not deleted"
                        })
                }
                res.status(200).json({
                        success: true,
                        message : "Booking data has deleted Successfully",
                        data : result
                })
        } catch (error) {
                 next(error)
        }
}
export const bookingController = {
        getBooking,
        postBooking,
        getBookingById,
        deleteBookingById
}