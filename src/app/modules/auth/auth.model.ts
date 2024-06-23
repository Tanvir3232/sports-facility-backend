/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./auth.interface";
const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }
}, {
    timestamps: true
})
//Document middleware
//hasing password and save into DB
userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next();
})
//set pasword empty('') after saving password
userSchema.post("save", function (doc, next) {
    doc.password = '';
    next();
})
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findById(id).select("+password");
}
userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp: Date, jwtIssuedTimestamp: number) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
}
export const User = model<TUser, UserModel>('User', userSchema);