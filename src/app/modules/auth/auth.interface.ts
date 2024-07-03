/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./auth.constant";

export interface TUser {
    toObject: any;
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user",
    address: string
}
export type TLoginUser = {
    id: Types.ObjectId;
    password: string;
}
export type TUserRole = keyof typeof USER_ROLE;
export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;

}