import mongoose, { Schema } from "mongoose";
import { TFacility } from "./facility.interface";


const faciltySchema = new Schema<TFacility>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    location: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    }
})
export const Facility = mongoose.model<TFacility>('Facility', faciltySchema);