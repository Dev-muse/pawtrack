"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

const imagePlaceholder =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

export const addPet = async (formData) => {
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || imagePlaceholder,
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });

  } catch (error) {
    return {message: "Failed to add pet. Please try again."};
  }
  revalidatePath("/app/dashboard");
};


export const editPet = async ( petId:string,formData) => {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || imagePlaceholder,
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    });
  } catch (error) {
    return {message: "Failed to edit pet. Please try again."};
  }
  revalidatePath("/app/dashboard");
}

export const deletePet = async (petId: string) => {
  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
  } catch (error) {
    return {message: "Failed to delete pet. Please try again."};
  }
  revalidatePath("/app/dashboard");
}   