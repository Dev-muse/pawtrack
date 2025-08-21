"use client";

import React, { act } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit: () => void; // Optional callback for form submission
};

function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  // Use the custom hook to access pet context
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    // For example, you can call a function to add or edit a pet

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const newPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: +(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    if (actionType == "add") {
      handleAddPet(newPet);
    } else {
      handleEditPet(selectedPet!.id, newPet);
    }

    onFormSubmit(); // Call the optional callback if provided
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType == "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType == "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType == "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType == "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes "
            name="notes"
            rows={3}
            required
            defaultValue={actionType == "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <Button type="submit" className=" ">{`${
        actionType == "add" ? "Add Pet" : "Edit Pet"
      }`}</Button>
    </form>
  );
}

export default PetForm;
