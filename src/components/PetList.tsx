"use client";
import Image from "next/image";
import React from "react";

import { type Pet } from "@/lib/types";
import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

function PetList() {
  const { pets, selectedPetId, handleSelectedPetId } = usePetContext();

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet: Pet) => (
        <li key={pet.id} className=" ">
          <button
            onClick={() => handleSelectedPetId(pet.id)}
            className={cn(
              "flex items-center px-5 cursor-pointer text-base h-[70px] gap-4 transition duration-300 w-full focus:bg-[#eff1f2] hover:bg-[#eff1f2]",
              {
                "bg-[#eff1f2]": selectedPetId === pet.id,
              }
            )}
          >
            <Image
              className="rounded-full object-cover size-[45px]"
              width={45}
              height={45}
              alt={pet.name}
              src={pet.imageUrl}
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PetList;
