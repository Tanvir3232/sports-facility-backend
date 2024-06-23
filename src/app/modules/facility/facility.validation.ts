import { z } from "zod";

const createFacilityValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "name is required." }),
        description: z.string({ required_error: "Description is required." }),
        pricePerHour: z.number({ required_error: "pricePerHour is required." }),
        location: z.string().optional(),
        isDeleted: z.boolean().optional()
    })
})
export const FacilityValidations = {
    createFacilityValidationSchema
}