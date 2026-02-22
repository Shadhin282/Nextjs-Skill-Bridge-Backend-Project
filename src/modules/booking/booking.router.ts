import express from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";


const router = express.Router();

router.get('/',bookingController.getBooking)
router.get('/:id', bookingController.getBookingById)
router.delete('/:id', bookingController.deleteBookingById)
router.post('/',auth(UserRole.STUDENT),bookingController.postBooking)




export const bookingRoute = router;