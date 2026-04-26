import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || "sk_test_dummy");

// Creates a Stripe PaymentIntent and returns clientSecret + paymentIntentId
const createPaymentIntent = async (amount: number, currency: string = "usd") => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // convert dollars to cents
    currency,
    automatic_payment_methods: { enabled: true },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};

// Retrieves PaymentIntent from Stripe and checks if it succeeded
const verifyPayment = async (paymentIntentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent.status === "succeeded";
};

// Saves a completed payment record to the DB
const createPaymentRecord = async (
  bookingId: string,
  studentId: string,
  stripePaymentId: string,
  amount: number,
  currency: string = "usd"
) => {
  const payment = await prisma.payment.create({
    data: {
      bookingId,
      studentId,
      stripePaymentId,
      amount,
      currency,
      status: "COMPLETED",
    },
  });
  return payment;
};

// Get all payments (for admin/tutor view)
const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: {
      student: { select: { id: true, name: true, email: true, image: true } },
      booking: {
        include: {
          tutor: { include: { user: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get payment by bookingId
const getPaymentByBookingId = async (bookingId: string) => {
  return prisma.payment.findUnique({
    where: { bookingId },
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });
};

export const paymentService = {
  createPaymentIntent,
  verifyPayment,
  createPaymentRecord,
  getAllPayments,
  getPaymentByBookingId,
};
