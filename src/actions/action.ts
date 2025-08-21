'use server';
import prisma from "@/lib/db";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

const imagePlaceholder = "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"

export const addPet = async (formData ) => {
  console.log(formData)
  try {
    const newPet = await prisma.pet.create({
      data: {
        name: formData.get("name") as string,
        ownerName: formData.get("ownerName") as string,
        imageUrl: formData.get("imageUrl") as string || imagePlaceholder,
        age: parseInt(formData.get("age") as string, 10),
        notes: formData.get("notes") as string,
      },
    });

    revalidatePath('/app/dashboard');

    return newPet;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
}