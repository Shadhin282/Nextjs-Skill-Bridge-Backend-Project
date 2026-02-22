import { Request, Response } from "express"

export const notFound = (req: Request, res: Response)=>{
        return res.status(400).json({
            message: "Route Not Found!",
            path : req.originalUrl,
            date : Date()
        })
}