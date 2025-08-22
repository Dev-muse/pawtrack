"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";
import React, { startTransition, use, useTransition } from "react";
import PetButton from "./PetButton";
import { deletePet } from "@/actions/action";

function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className=" flex flex-col size-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <PetInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: Pet;
};

function EmptyView() {
  return (
    <div className="h-full flex items-center justify-center ">
      <p className="text-2xl font-light">Pet not selected</p>
    </div>
  );
}

function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();
  //use transition for pending state
  const [isPending, startTransition] = useTransition();
  
  return (
    <article className="flex items-center bg-white shadow border-b border border-light gap-2 px-8 py-5">
      <Image
        src={pet?.imageUrl || "/placeholder.png"}
        alt={pet?.name || "Selected Pet"}
        width={75}
        height={75}
        className="rounded-full object-cover size-[75px]"
      />
      <h2 className="text-3xl font-semibold leading-7">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>

        <PetButton
        pending={isPending} 
          onClick={async () =>
            startTransition(async () => {
              await deletePet(pet.id);
            })
          }
          actionType="checkout"
        >
          Checkout
        </PetButton>
      </div>
    </article>
  );
}

function PetInfo({ pet }: Props) {
  return (
    <article className=" text-center flex items-center justify-around px-5 py-10">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </article>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="flex-1 bg-white px-5 py-10 rounded-md mb-9 mx-8 border ">
      {pet?.notes}
    </section>
  );
}
export default PetDetails;
