import { Availability } from "../../../prisma/generated/prisma/client"
import { prisma } from "../../lib/prisma"


const getAvailability = async ()=>{
    const result = await prisma.availability.findMany()
    return result
}


const postAvailability = async (payload: Availability)=>{
    const result = await prisma.availability.create({
        data : payload
    })
    return result
}


const putAvailability = async (payload: {tutorId: string; day: string; startTime : string; endTime: string})=>{
    const result = await prisma.availability.update({
        where : {
            tutorId : payload.tutorId
        },
        data : {
            day : payload.day,
            startTime : payload.startTime,
            endTime : payload.endTime
        }
    })
    return result
}


export const availabilityService = {
    getAvailability,
    postAvailability,
    putAvailability
}