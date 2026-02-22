import { RequestHandler } from "express"
import { availabilityService } from "./availability.service"

const getAvailability : RequestHandler = async(req,res,next)=>{
    try {
        const result = await availabilityService.getAvailability()

         if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not get",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor availability fetched successfully",
      data: result,
    });

    } catch (error) {
        next(error)
    }
}

const postAvailability : RequestHandler = async (req,res,next)=>{
    try {
        const result = await availabilityService.postAvailability(req.body) 

         if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not create",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor availability created successfully",
      data: result,
    });

    } catch (error) {
        next(error)
    }
}

const putAvailability : RequestHandler = async( req, res, next)=>{
    try {
        const result = await availabilityService.putAvailability(req.body)

        if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor availability not update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutor availability updated successfully",
      data: result,
    });

    } catch (error) {
        next(error)
    }
}

export const availabilityController = {
    getAvailability,
    postAvailability,
    putAvailability
}