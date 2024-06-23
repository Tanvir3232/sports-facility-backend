import { Model, Types } from "mongoose";

export interface TUser {
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
export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}