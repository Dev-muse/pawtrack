"use client";

import React, { act } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import { imagePlaceholder, sleep } from "@/lib/utils";
import PetFormBtn from "./PetFormBtn";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmit: () => void; // Optional callback for form submission
};


const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100),
  ownerName: z
    .string()
    .trim()
    .min(2, { message: "Owner name is required" })
    .max(100),
  imageUrl: z
    .string()
    .trim()
    .url({ message: "Image URL must be a valid URL." })
    .optional()
    .or(z.literal("")),
    // get string from form so coerce to number
  age: z.coerce.number().int().positive().max(999),
  notes: z.union([z.string().trim().max(500), z.literal("")]),
});

type TPetForm = z.infer<typeof petFormSchema>;

function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  // Use the custom hook to access pet context
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
  });

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
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-600">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
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
