import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";

import { TUserRole } from "../modules/auth/auth.interface";
import { User } from "../modules/auth/auth.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        //If the token is sent from the client
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }
        //check if the given token is valid
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const { role, userId } = decoded;
        //checking if the user is exist

        const user = await User.isUserExistsByCustomId(userId);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
        }




        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are Not authorized")
        }
        //decoded undifined
        console.log(decoded)
        req.user = decoded as JwtPayload
        next()
    })
}
export default auth;