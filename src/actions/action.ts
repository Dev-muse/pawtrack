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
