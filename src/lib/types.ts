 import { Pet as PetType } from "@prisma/client";
import { z } from "zod";
import { imagePlaceholder } from "./utils";
export  type Pet = PetType;
 export type PetEssentials = Omit<Pet, "id" | "UpdatedAt" | "createdAt">;  

 export const petIdSchema = z.string().cuid();
 
 export const petFormSchema = z.object({
   name: z
     .string()
     .trim()
     .min(2, { message: "Name must be at least 2 characters." })
     .max(100),
   ownerName: z
     .string()
     .trim()
     .min(2, { message: "Owner name is required" })
     .max(100),
   imageUrl: z
     .string()
     .trim()
     .url({ message: "Image URL must be a valid URL." })
     .optional()
     .or(z.literal("")),
     // get string from form so coerce to number
   age: z.coerce.number().int().positive().max(999, { message: "Age must be a positive number." }),
   notes: z.union([z.string().trim().max(500), z.literal("")]),
 }).transform(data=>({
   ...data,
   imageUrl: data.imageUrl || imagePlaceholder
 }))
 
 export type TPetForm = z.infer<typeof petFormSchema>;