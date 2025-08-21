"use client";

import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

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
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, "id">) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ children, data }: PetContextProviderProps) {
  // state to manage pets and selected pet ID
  const [pets, setPets] = useState(data);

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derives the selected pet from the list of pets
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // helper functions:
const handleEditPet = (petId:string , updatedPet: Omit<Pet, "id">) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === petId ? {id:petId,...updatedPet } : pet))
    );
  }

  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets((prevPets) => [
      ...prevPets,
      { id: Date.now().toString(), ...newPet },
    ]);
  };  
  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPet,
        numberOfPets,
        selectedPetId,
        handleSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
