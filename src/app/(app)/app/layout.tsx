import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/context/PetContextProvider";
import { Pet } from "@/lib/types";
import React from "react";

const layout = async({ children }: { children: React.ReactNode }) => {
  

  const response = await fetch('https:bytegrad.com/course-assets/projects/petsoft/api/pets');
  if(!response.ok) throw new Error()
  const data:Pet[] = await response.json()

 
  return (
    <>
    <BackgroundPattern />
      <div className=" flex flex-col min-h-screen max-w-5xl mx-auto px-4">
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default layout;
