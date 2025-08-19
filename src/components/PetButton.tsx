import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
};
function PetButton({ actionType, children }: PetButtonProps) {
  if (actionType === "add")
    return (
      <Button className="rounded-full" size={"icon"}>
        <PlusIcon className="size-6" />
      </Button>
    );

  if (actionType === "edit")
    return <Button >{children}</Button>;

  if (actionType === "checkout") {
    return (
      <Button variant={"secondary"} className="">
        {children}
      </Button>
    );
  }

 
}

export default PetButton;
