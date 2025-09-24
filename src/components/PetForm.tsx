"use client";

import React, { act } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { imagePlaceholder, sleep } from "@/lib/utils";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit: () => void; // Optional callback for form submission
};

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes?: string;
};

function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  // Use the custom hook to access pet context
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<TPetForm>();

  return (
    <form
      action={async (formData) => {
        // Validate the form before submission
        const results = await trigger();
        if (!results) return;
        // Call the optional onFormSubmit callback
        onFormSubmit();

        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl: (formData.get("imageUrl") as string) || imagePlaceholder,
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit" && selectedPet) {
          await handleEditPet(selectedPet.id, petData);
        }
      }}
      className="flex flex-col gap-y-4"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-600">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            {...register("ownerName", { required: "Owner name is required",maxLength: { value: 10, message: "Owner name must be at most 10 characters" } })}
          />
          {errors.ownerName && (
            <p className="text-sm text-red-600">
              {errors.ownerName.message as string}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-sm text-red-600">
              {errors.imageUrl.message as string}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && (
            <p className="text-sm text-red-600">
              {errors.age.message as string}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes " {...register("notes")} />
          {errors.notes && (
            <p className="text-sm text-red-600">
              {errors.notes.message as string}
            </p>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}

export default PetForm;
