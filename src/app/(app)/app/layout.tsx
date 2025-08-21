import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/context/PetContextProvider";
import SearchContextProvider from "@/context/SearchContextProvider";
import prisma from "@/lib/db";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const data = await prisma.pet.findMany()

  return (
    <>
      <BackgroundPattern />
      <div className=" flex flex-col min-h-screen max-w-5xl mx-auto px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default layout;
