/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body);
    const { password, createdAt, updatedAt, ...userWithoutPassword } = result.toObject()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: userWithoutPassword
    });
});

export const AuthControllers = {
    createUser
};
