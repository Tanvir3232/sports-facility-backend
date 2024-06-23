import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facilty.service";

const createFacility = catchAsync(async (req, res) => {
    const result = await FacilityServices.createFacilityIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility added successfully",
        data: result
    })
})
const getAllFacilities = catchAsync(async (req, res) => {
    const result = await FacilityServices.getAllFacilitiesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facilities retrieved successfully",
        data: result
    })
})
const deleteFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacilityServices.deleteFacilityFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facility is deleted successfully",
        data: result
    })
})
export const FacilityControllers = {
    createFacility,
    getAllFacilities,
    deleteFacility
}