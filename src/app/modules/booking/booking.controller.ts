import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
    const user = req.user.userId;
    console.log(user)
    const result = await BookingServices.createBookingIntoDB({ ...req.body, user });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking created successfully",
        data: result
    })
})
const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result
    })
})
const getBookingsByUser = catchAsync(async (req, res) => {
    const { user } = req.params;
    const result = await BookingServices.getBookingsByUserFromDB(user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result
    })
})
const cancelBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BookingServices.cancelBookingFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking cancelled successfully",
        data: result
    })
})
const checkAvailability = catchAsync(async (req, res) => {

    const date = req.query.date ? new Date(req.query.date as string) : new Date();
    const availableSlots = await BookingServices.checkAvailabilityFromDB(date.toString());

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Availability checked successfully",
        data: availableSlots
    });
});

export const BookingControllers = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking,
    checkAvailability
}