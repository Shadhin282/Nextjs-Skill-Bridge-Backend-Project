import { BookingStatus } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"

const getBooking = async ()=>{
        const result = await prisma.booking.findMany({
                include : {
                        student: true,
                        tutor: {
                                include:{
                                        user: true
                                }
                        }
                }
        })
        return result;
}

const getBookingById = async (id:string)=> {
        const result = await prisma.booking.findMany({
                where : {
                       studentId: id
                },
                include : {
                        student: true,
                        tutor: {
                                include:{
                                        user: true
                                }
                        }
                }
        })
        return result;
}

const postBooking = async (payload: {subject: string, time : Date, duration : number, date: Date; status?: string; tutorId: string }, userid : string) => {
        console.log("post booking ", payload)
        const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
                where : {
                        id : payload.tutorId
                }
        })
        console.log("tutor profile",tutorProfile)
        const result = await prisma.booking.create({
                data: {
                         subject: payload.subject,
                        date: payload.date,
                        status: payload.status as BookingStatus,
                        studentId : userid,
                        tutorId: payload.tutorId,
                        time : payload.time,
                        duration : payload.duration
                        
                }
        })
        console.log("booking create ", result)
        return result;
}

const deleteBookingId = async (id: string)=>{
                const result = await prisma.booking.delete({
                        where : {
                                id
                        }
                })
                return result
}

export const bookingService = {
        getBooking,
        postBooking,
        getBookingById,
        deleteBookingId
} 