import { PetContext } from "@/context/PetContextProvider";
import { SearchContext } from "@/context/SearchContextProvider";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context)
    throw new Error(
      "Context is null , usePetContext must be used within a PetContextProvider"
    );
  return context;
}
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error(
      "Context is null , useSearchContext must be used within a PetContextProvider"
    );
  return context;
}
