import Logo from "@/components/logo";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      <Logo />
      {children}
    </div>
  );
};

export default layout;
