import Image from "next/image";
import React from "react";

function PetList() {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      <li className=" ">
        <button className="flex items-center px-5 cursor-pointer text-base h-[70px] gap-4 transition duration-300 w-full focus:bg-[#eff1f2] hover:bg-[#eff1f2]">
          <Image className="rounded-full object-cover" width={45} height={45} alt="pet" src={'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png'} />
          <p className="font-semibold">Ben</p>
        </button>
      </li>
    </ul>
  );
}

export default PetList;
