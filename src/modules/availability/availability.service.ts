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


const putAvailability = async (payload: Availability)=>{
    const result = await prisma.availability.update({
        where : {
            tutorId : payload.id
        },
        data : payload
    })
    return result
}


export const availabilityService = {
    getAvailability,
    postAvailability,
    putAvailability
}