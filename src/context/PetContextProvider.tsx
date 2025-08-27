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
    (state, { action, payload }) => {
      switch (action) {
        case "add ":
          return [...state, { id: Date.now().toString(), ...payload }];

        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload } : pet
          );
        case "remove":
          return state.filter((pet) => pet.id !== payload.id);
        default:
          return state;
      }
    }
  );
  // state to manage pets and selected pet ID
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derives the selected pet from the list of pets
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  // helper functions:
  const handleEditPet = async (petId: string, updatedPet: Omit<Pet, "id">) => {
    setOptimisticPets({
      action: "edit",
      payload: { id: petId, ...updatedPet },
    });
    const error = await editPet(petId, updatedPet);
    if (error) {
      toast.error(error.message);
    }
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "add", payload: newPet });
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
    setOptimisticPets({ action: "remove", payload: { id: petId } });
   const error =  await deletePet(petId);
   if(error){
    toast.error(error.message);
    return; 
   }
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
