import "server-only";

// marker package server only: used as extra security to ensure function not used on client

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, User } from "@prisma/client";
import prisma from "./db";

export const checkAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
};

export const getPetByPetId = async (petId: Pet["id"]) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet;
};
export const getPetsByUserId = async (userId: User["id"]) => {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
};

export const getUserByEmail = async (email: User["email"]) => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
