"use server";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth, getPetByPetId } from "@/lib/server-utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const imagePlaceholder =
  "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";

//USER ACTIONS
export const login = async (prevState: unknown, formData: unknown) => {
  //don't know what data we get from client so need to validate before passing it on to next-auth
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data format",
    };
  }

  try {
    await signIn("credentials", formData);
    // after signIn next-auth calls redirect
    // but this throws and error here which is caught by catch block
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          };
        }

        default: {
          return {
            message: "Error: Could not Sign In",
          };
        }
      }
    }

    // throw error again to help redirect and trigger auth.ts redirect logic
    //specifically user signed in and trying to access public route
    throw error;
  }
};

export const logout = async () => {
  await sleep(2000);
  await signOut({ redirectTo: "/", redirect: true });
};

export const signUp = async (prevState: unknown, formData: unknown) => {
  // convert object
  if (!(formData instanceof FormData)) {
    return { message: "Invalid form data format" };
  }

  const formDataObject = Object.fromEntries(formData.entries());
  // validate

  const validatedData = authSchema.safeParse(formDataObject);
  if (!validatedData.success) {
    return { message: "Invalid data type" };
  }

  const { email, password } = validatedData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma?.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return {
          message: "Email already exists ",
        };
      }
    }
  }

  await signIn("credentials", formData);
};
// PET ACTION

export const addPet = async (pet: unknown) => {
  // check session logged in before validation
  const session = await checkAuth();

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
  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success || !validatedPetId.success) {
    return { message: `Invalid pet data` };
  }

  // authorization
  const pet = await getPetByPetId(validatedPetId.data);

  if (!pet) {
    return { message: "Cannot edit pet: pet does not exist!s" };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "User not authorized to edit pet data",
    };
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

  const session = await checkAuth();

  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: `Invalid pet id` };
  }

  // authorisation - check if deleted pet associated user id is the logged  userid

  const pet = await getPetByPetId(validatedPetId.data);

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

// payment actions

export const createCheckoutSession = async () => {
  const session = await checkAuth();

  // call stripe
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email as string,
    line_items: [
      {
        price: "price_1SRxmjE3wCco2qxQCV2haLP8",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.DEPLOYED_URL}/payment?success=true`,
    cancel_url: `${process.env.DEPLOYED_URL}/payment?cancelled=true`,
  });
  if (checkoutSession) {
    // redirect to checkout page
    redirect(checkoutSession.url!);
  }
};
