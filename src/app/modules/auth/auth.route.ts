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
router.post(
    '/login',
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser
)
export const AuthRoutes = router;