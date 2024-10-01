import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facilty.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
}
const getAllFacilitiesFromDB = async () => {
    const result = await Facility.find({ isDeleted: false });
    return result;
}
const getSingleFacilityFromDB = async (id: string) => {
    const result = await Facility.findById(id)
    return result;
}
const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true
        }
    )
    return result;
}
const updateFacilityFromDB = async (id: string, payload: Partial<TFacility>) => {
    const isFacilityExists = await Facility.findById(id);
    if (!isFacilityExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This Facility is not found');
    }
    const result = await Facility.findByIdAndUpdate(id, payload, {
        new: true, runValidators: true
    })
    return result;
}
export const FacilityServices = {
    createFacilityIntoDB,
    getAllFacilitiesFromDB,
    deleteFacilityFromDB,
    updateFacilityFromDB,
    getSingleFacilityFromDB
}