import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <BackgroundPattern />
      <div className=" flex flex-col min-h-screen max-w-5xl mx-auto px-4">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
};

export default layout;
