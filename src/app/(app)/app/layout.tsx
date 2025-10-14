import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/context/PetContextProvider";
import SearchContextProvider from "@/context/SearchContextProvider";
import { checkAuth, getPetsByUserId } from "@/lib/server-utils";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await checkAuth();

  // only find pet of logged in user

  const pets = await getPetsByUserId(session.user.id);

  return (
    <>
      <BackgroundPattern />
      <div className=" flex flex-col min-h-screen max-w-5xl mx-auto px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
        <Toaster />
      </div>
    </>
  );
};

export default layout;
