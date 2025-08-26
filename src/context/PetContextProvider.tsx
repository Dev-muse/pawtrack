"use client";

import { addPet, deletePet, editPet } from "@/actions/action";
import { Pet } from "@/lib/types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, "id">) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ children, data }: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [...state, {
        ...newPet,
        id:Math.random().toString(36).substring(2, 9), // Generate a temporary ID
      }];
    }
  );
  // state to manage pets and selected pet ID
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derives the selected pet from the list of pets
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // helper functions:
  const handleEditPet = async (petId: string, updatedPet: Omit<Pet, "id">) => {
    const error = await editPet(petId, updatedPet);
    if (error) {
      toast.error(error.message);
    }
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.error(error.message);
      return;
    }
  };
  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: string) => {
    await deletePet(petId);
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPet,
        numberOfPets,
        selectedPetId,
        handleSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
