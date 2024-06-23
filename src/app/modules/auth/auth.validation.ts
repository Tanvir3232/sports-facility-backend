import { z } from "zod";

const userSignUpValidationSchema = z.object({
    body: z.object({
        name: z.string()
            .max(20, "Name cannot be more than 20 characters")
            .min(6, 'Name cannot be less than 6 characters'),
        email: z.string().email("Email is not valid"),
        password: z.string().nonempty("Password is required"),
        phone: z.string().nonempty("Phone is required"),
        role: z.enum(["admin", "user"], {
            errorMap: (issue, ctx) => {
                return { message: `${ctx.data} is not valid. User role values must be admin or user` };
            }
        }),
        address: z.string().optional()
    })
});

export const AuthValidations = {
    userSignUpValidationSchema
};
