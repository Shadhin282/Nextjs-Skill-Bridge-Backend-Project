import { BookingStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { paymentService } from "../payment/payment.service";

const getBooking = async () => {
  const result = await prisma.booking.findMany({
    include: {
      student: true,
      tutor: {
        include: {
          user: true,
        },
      },
      payment: true,
    },
  });
  return result;
};

const getBookingById = async (id: string) => {
  const result = await prisma.booking.findMany({
    where: {
      studentId: id,
    },
    include: {
      student: true,
      tutor: {
        include: {
          user: true,
        },
      },
      payment: true,
    },
  });
  return result;
};

const postBooking = async (
  payload: {
    subject: string;
    time: Date;
    duration: number;
    date: Date;
    status?: string;
    tutorId: string;
    paymentIntentId: string;
  },
  userid: string
) => {
  console.log("post booking ", payload);

  // 1. Verify the Stripe payment is actually succeeded before doing anything
  const isPaid = await paymentService.verifyPayment(payload.paymentIntentId);

  if (!isPaid) {
    throw new Error(
      "Payment not completed. Please complete the payment before confirming a booking."
    );
  }

  // 2. Fetch tutor to confirm they exist
  const tutorProfile = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      id: payload.tutorId,
    },
  });
  console.log("tutor profile", tutorProfile);

  // 3. Create the booking with CONFIRMED status since payment is verified
  const booking = await prisma.booking.create({
    data: {
      subject: payload.subject,
      date: payload.date,
      status: BookingStatus.CONFIRMED,
      studentId: userid,
      tutorId: payload.tutorId,
      time: payload.time,
      duration: payload.duration,
    },
  });
  console.log("booking created", booking);

  // 4. Save the payment record linked to this booking
  const amount = tutorProfile.hourlyRate
    ? tutorProfile.hourlyRate * payload.duration
    : 0;

  await paymentService.createPaymentRecord(
    booking.id,
    userid,
    payload.paymentIntentId,
    amount
  );

  return booking;
};

const deleteBookingId = async (id: string) => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookingService = {
  getBooking,
  postBooking,
  getBookingById,
  deleteBookingId,
};