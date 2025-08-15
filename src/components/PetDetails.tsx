"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import React from "react";

function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className=" flex flex-col size-full">
      <article className="flex items-center bg-white shadow border-b border border-black/[0.08] gap-2 px-8 py-5">
        <Image
          src={selectedPet?.imageUrl || "/placeholder.png"}
          alt={selectedPet?.name || "Selected Pet"}
          width={75}
          height={75}
          className="rounded-full object-cover size-[75px]"
        />
        <h2 className="text-3xl font-semibold leading-7">
          {selectedPet?.name}
        </h2>
      </article>
      <article className=" text-center flex items-center justify-around px-5 py-10">
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            Owner name
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
        </div>
        <div>
          <h3 className="text-[13px] font-medium uppercase text-zinc-700">
            age
          </h3>
          <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
        </div>
      </article>
      <section className="flex-1 bg-white px-5 py-10 rounded-md mb-9 mx-8 border ">
        {selectedPet?.notes}
      </section>
    </section>
  );
}

export default PetDetails;
