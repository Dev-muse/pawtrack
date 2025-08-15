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
  handleSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
};

export const PetContext = createContext<TPetContext | null>(null);

function PetContextProvider({ children, data }: PetContextProviderProps) {
// state to manage pets and selected pet ID
  const [pets, setPets] = useState(data);
  
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  

  //derives the selected pet from the list of pets
  const selectedPet = pets.find((pet) => pet.id === selectedPetId) ;


  // function to handle selection of a pet by ID
  const handleSelectedPetId = (id: string) => {
    console.log('selected', id)
    setSelectedPetId(id);
  };
  return (
    <PetContext.Provider value={{ pets, selectedPet ,selectedPetId, handleSelectedPetId }}>
      {children}
    </PetContext.Provider>
  );
}

export default PetContextProvider;
