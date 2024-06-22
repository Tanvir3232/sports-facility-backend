import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = Router();
router.post(
    '/signup',
    validateRequest(AuthValidations.userSignUpValidationSchema),
    AuthControllers.createUser
)
export const AuthRoutes = router;