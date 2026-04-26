import express from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = express.Router();

// Student creates a payment intent before booking
router.post("/create-intent",auth(UserRole.STUDENT), paymentController.createPaymentIntent);

// Get payment for a specific booking (authenticated users)
router.get("/booking/:bookingId", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), paymentController.getPaymentByBookingId);

// Admin view of all payments
router.get("/", auth(UserRole.ADMIN), paymentController.getAllPayments);

export const paymentRoute = router;
