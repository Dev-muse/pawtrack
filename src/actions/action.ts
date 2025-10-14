"use server";
import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-utils";
import { PetEssentials, petFormSchema, petIdSchema } from "@/lib/types";
import { Pet } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const imagePlaceholder =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

//USER ACTIONS
export const login = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", authData);
};

export const logout = async () => {
  console.log("signed out");
  await signOut({ redirectTo: "/", redirect: true });
};

export const signUp = async (formData: FormData) => {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );
  await prisma?.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });

  await signIn("credentials", formData);
};

// PET ACTION

export const addPet = async (pet: unknown) => {
  // check session logged in before validation
  const session = await checkAuth()

  // vaidate data
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    const errorMessages = validatedPet.error.errors
      .map((err) => err.message)
      .join(", ");
    return { message: `Invalid pet data` };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Failed to add pet. Please try again." };
  }
  revalidatePath("/app/dashboard");
};

export const editPet = async (petId: unknown, newPetData: unknown) => {
  // authentication 
  const session = await checkAuth()

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return { message: `Invalid pet data` };
  }

  // authorization
const pet = await prisma.pet.findUnique({
  where:{
    id: validatedPetId.data
  }
})

if(!pet){
  return {message:'Cannot edit pet: pet does not exist!s'}
}

if(pet.userId !== session.user.id){
  return {
    message: 'User not authorized to edit pet data'
  }
}


  // db mutation
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

export const deletePet = async (petId: unknown) => {
  // authentication

    const session = await checkAuth()

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: `Invalid pet id` };
  }

  // authorisation - check if deleted pet associated user id is the logged  userid

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "User not authorised to delete pet",
    };
  }

  // db mutation
  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return { message: "Failed to delete pet. Please try again." };
  }
  revalidatePath("/app/dashboard");
};
