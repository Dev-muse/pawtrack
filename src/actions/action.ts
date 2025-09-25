"use server";
 import prisma from "@/lib/db";
import { PetEssentials, petFormSchema, petIdSchema } from "@/lib/types";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const imagePlaceholder =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

export const addPet = async (pet: unknown) => {

  const validatedPet =  petFormSchema.safeParse(pet);
  if(!validatedPet.success) {
    const errorMessages = validatedPet.error.errors.map(err=>err.message).join(", ");
    return { message: `Invalid pet data` };
  }

  
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Failed to add pet. Please try again." };
  }
  revalidatePath("/app/dashboard");
};

export const editPet = async (petId:unknown, newPetData: unknown) => {

  const validatedPetId = petIdSchema.safeParse(petId);
  
  const validatedPet = petFormSchema.safeParse(newPetData);
  if(!validatedPet.success || !validatedPetId.success) {
     return { message: `Invalid pet data` };
  }
  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Failed to edit pet. Please try again." };
  }
  revalidatePath("/app/dashboard");
};

export const deletePet = async (petId:unknown) => {
const validatedPetId = petIdSchema.safeParse(petId);
  if(!validatedPetId.success) {
     return { message: `Invalid pet id` };
  }
  
  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return { message: "Failed to delete pet. Please try again." };
  }
  revalidatePath("/app/dashboard");
};
