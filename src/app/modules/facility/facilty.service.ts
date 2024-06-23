import { TFacility } from "./facility.interface";
import { Facility } from "./facilty.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
}
export const FacilityServices = {
    createFacilityIntoDB
}