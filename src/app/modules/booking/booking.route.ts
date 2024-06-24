import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";
import { BookingValidations } from "./booking.validation";

const router = Router();
router.post(
    '/',
    auth("user"),
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking
)

export const BookingRoutes = router;