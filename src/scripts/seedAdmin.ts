import axios from "axios"
import { UserRole } from "../../prisma/generated/prisma/enums"
import { prisma } from "../lib/prisma"

const seedAdmin = async ()=>{
    try {
        const adminData = {
            name : "admin",
            email : "admin@gmail.com",
            role : UserRole.ADMIN,
            password : "admin123"
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                email: adminData.email
            }
        })

        if(existingUser){
            throw new Error("User is already exist.")
        }

        const signUpAdmin = await axios.post("http://localhost:4000/api/auth/sign-up/email", adminData)
        return signUpAdmin;

    } catch (error) {
        return error
    }
}

seedAdmin();