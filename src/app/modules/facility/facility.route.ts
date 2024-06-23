import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityControllers } from "./facilty.controller";

const router = Router();
router.post(
    '/',
    validateRequest(FacilityValidations.createFacilityValidationSchema),
    FacilityControllers.createFacility
)
export const FacilityRoutes = router;