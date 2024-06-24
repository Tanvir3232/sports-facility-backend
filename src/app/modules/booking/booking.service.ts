import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../auth/auth.model";
import { Facility } from "../facility/facilty.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
const checkAvailability = async (facilityId: string, date: Date, startTime: string, endTime: string) => {
    const bookings = await Booking.find({ facility: facilityId, date });
    const newStart = new Date(`1999-12-01T${startTime}:00`).getTime();
    const newEnd = new Date(`1999-12-01T${endTime}:00`).getTime();

    for (const booking of bookings) {
        const existingStart = new Date(`1999-12-01T${booking.startTime}:00`).getTime();
        const existingEnd = new Date(`1999-12-01T${booking.endTime}:00`).getTime();

        if (
            (newStart >= existingStart && newStart < existingEnd) ||
            (newEnd > existingStart && newEnd <= existingEnd) ||
            (newStart <= existingStart && newEnd >= existingEnd)
        ) {
            return false;
        }
    }
    return true;
};
const createBookingIntoDB = async (payload: TBooking) => {
    const { user, facility, date, startTime, endTime } = payload;
    const isUserExists = await User.findById(user);
    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not found");
    }
    const isFacilityExists = await Facility.findById(facility);
    if (!isFacilityExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Facility is not found");
    }
    const isAvailable = await checkAvailability(facility.toString(), date, startTime, endTime);
    if (!isAvailable) {
        throw new AppError(httpStatus.CONFLICT, "Facility is not available during the requested time slot");
    }
    const start = new Date(`1999-12-01T${startTime}:00`);
    const end = new Date(`1999-12-01T${endTime}:00`);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // duration in hours
    const pricePerHour = isFacilityExists.pricePerHour;
    const payableAmount = duration * pricePerHour;

    const result = await Booking.create({ ...payload, payableAmount, isBooked: 'confirmed' });
    return result;
}
export const BookingServices = {
    createBookingIntoDB
}