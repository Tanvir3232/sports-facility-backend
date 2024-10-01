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
router.get(
    '/:id',
    FacilityControllers.getSingleFacility
)
router.delete(
    '/:id',
    auth("admin"),
    FacilityControllers.deleteFacility
)
router.patch(
    '/:id',
    auth("admin"),
    FacilityControllers.updateFacility
)
export const FacilityRoutes = router;