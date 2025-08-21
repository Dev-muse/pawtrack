import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

function PetFormBtn({ actionType }: { actionType: "add" | "edit" }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className=" ">{`${
      pending ? "Loading..." : actionType == "add" ? "Add Pet" : "Edit Pet"
    }`}</Button>
  );
}

export default PetFormBtn;
