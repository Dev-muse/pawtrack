"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./PetForm";
import { flushSync } from "react-dom";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void;
  pending?: boolean;
};

function PetButton({ actionType, children, onClick, pending }: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button
        disabled={pending}
        onClick={onClick}
        variant={"secondary"}
        className=""
      >
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button className="rounded-full" size={"icon"}>
            <PlusIcon className="size-6" />
          </Button>
        ) : (
          <Button>{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add Pet" : "Edit Pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmit={() => {
            // Close the form immediately after submission to improve UX
            // Use flushSync to ensure the state update is processed immediately
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PetButton;
