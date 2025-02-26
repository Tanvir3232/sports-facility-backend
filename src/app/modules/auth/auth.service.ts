import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./auth.interface";
import { User } from "./auth.model";
import { createToken } from "./auth.utils";

const createUserIntoDB = async (payload: TUser) => {
    const isUserExist = await User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new AppError(httpStatus.CONFLICT, "This email address already used for register!Please try another email address")
    }

    const result = await User.create(payload);
    return result;
}
const loginUserInDB = async (payload: TLoginUser) => {
    //checking if the user is exist
    const email = payload.email.toString();
    const user = await User.isUserExistsByEmail(email)
    console.log({ user })
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
    }

    const isPasswordMatched = await User.isPasswordMatched(payload?.password, user?.password);
    console.log(isPasswordMatched)
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");
    }
    //create token and send to the client 
    const jwtPayload = {
        userId: user?._id as string,
        email: user?.email,
        role: user.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, '1d');
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, '365d');
    return { user, accessToken, refreshToken }
}
export const AuthServices = {
    createUserIntoDB,
    loginUserInDB
}