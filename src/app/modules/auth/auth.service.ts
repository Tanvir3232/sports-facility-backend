import { TUser } from "./auth.interface";
import { User } from "./auth.model";

const createUserIntoDB = async (payload: TUser) => {
    const user: TUser = { ...payload };
    user.password = payload.password;
    const result = await User.create(user);
    return result;
}
export const AuthServices = {
    createUserIntoDB
}