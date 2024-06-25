import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.body);
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
export const BookingControllers = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    cancelBooking
}