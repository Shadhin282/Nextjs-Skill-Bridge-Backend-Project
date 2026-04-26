import { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service";

// POST /api/payments/create-intent
// Student calls this with { amount } to get a Stripe clientSecret
const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { amount, currency } = req.body;

    if (!amount || isNaN(Number(amount))) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }

    const result = await paymentService.createPaymentIntent(Number(amount), currency);

    return res.status(200).json({
      success: true,
      message: "Payment intent created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payments
// Admin can see all payments
const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await paymentService.getAllPayments();
    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payments/:bookingId
// Get payment for a specific booking (tutor/student can see this)
const getPaymentByBookingId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    if (!bookingId) {
      return res.status(400).json({ success: false, message: "Booking ID is required" });
    }

    const result = await paymentService.getPaymentByBookingId(bookingId as string);

    if (!result) {
      return res.status(404).json({ success: false, message: "Payment not found for this booking" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const paymentController = {
  createPaymentIntent,
  getAllPayments,
  getPaymentByBookingId,
};
