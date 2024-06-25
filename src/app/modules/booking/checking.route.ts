import { Router } from "express";
import { BookingControllers } from "./booking.controller";

const router = Router();
router.get(
    "/",
    BookingControllers.checkAvailability
)
export const CheckingRoutes = router;