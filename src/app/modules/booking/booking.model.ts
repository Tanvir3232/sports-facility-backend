import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    facility: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Facility"
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    payableAmount: {
        type: Number,
        required: true
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
        required: true
    }
})
export const Booking = mongoose.model<TBooking>("Booking", bookingSchema);