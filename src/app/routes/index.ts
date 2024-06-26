import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { CheckingRoutes } from "../modules/booking/checking.route";
import { FacilityRoutes } from "../modules/facility/facility.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/facility',
        route: FacilityRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: "/check-availability",
        route: CheckingRoutes
    }
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;