import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityControllers } from "./facilty.controller";

const router = Router();
router.post(
    '/',
    auth("admin"),
    validateRequest(FacilityValidations.createFacilityValidationSchema),
    FacilityControllers.createFacility
)
router.get(
    '/',
    FacilityControllers.getAllFacilities
)
router.delete(
    '/:id',
    auth("admin"),
    FacilityControllers.deleteFacility
)
export const FacilityRoutes = router;