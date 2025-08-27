import React from "react";
import { Button } from "./ui/button";
 
type PetFormBtnProps = {
  actionType: "add" | "edit";
};

function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className=" ">{`${
      actionType == "add" ? "Add Pet" : "Edit Pet"
    }`}</Button>
  );
}

export default PetFormBtn;
