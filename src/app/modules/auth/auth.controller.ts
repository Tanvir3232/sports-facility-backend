/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body);
    const { password, ...userWithoutPassword } = result.toObject();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: userWithoutPassword
    });
});
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUserInDB(req.body);
    const { user, refreshToken, accessToken } = result;
    // Remove the password from the user object
    const { password, ...withoutPasswordData } = user.toObject();

    // Set the refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === "development",
        httpOnly: true,
    });

    // Send the response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        token: accessToken,
        data: withoutPasswordData
    });
});

export const AuthControllers = {
    createUser,
    loginUser
};
